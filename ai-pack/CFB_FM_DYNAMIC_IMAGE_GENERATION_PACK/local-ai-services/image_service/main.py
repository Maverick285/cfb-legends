from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Literal
from pathlib import Path
from datetime import datetime
import json
import uuid

app = FastAPI(title="CFB-FM Local Image Service")

ASSET_ROOT = Path("../../assets/generated").resolve()
ASSET_ROOT.mkdir(parents=True, exist_ok=True)

JOBS: Dict[str, dict] = {}


class EntityRef(BaseModel):
    type: str
    id: str
    label: Optional[str] = None


class ImageGenerationPayload(BaseModel):
    jobId: str
    assetType: Literal["news_image", "scrapbook_image", "game_moment_image"]
    prompt: str
    negativePrompt: Optional[str] = None
    seed: int
    width: int = 1280
    height: int = 720
    sourceEventId: str
    sourceNewsId: Optional[str] = None
    entityRefs: List[EntityRef] = []
    referenceImagePath: Optional[str] = None
    metadata: Dict[str, object] = {}


class GeneratedAsset(BaseModel):
    id: str
    assetType: str
    entityRefs: List[EntityRef]
    sourceEventId: Optional[str] = None
    sourceNewsId: Optional[str] = None
    filePath: Optional[str] = None
    thumbnailPath: Optional[str] = None
    prompt: str
    negativePrompt: Optional[str] = None
    seed: int
    provider: str
    status: Literal["queued", "generating", "ready", "failed", "fallback"]
    locked: bool = False
    createdAt: str
    updatedAt: str
    metadata: Dict[str, object] = {}


@app.get("/health")
def health():
    return {
        "ok": True,
        "providers": {
            "mock": "available",
            "comfyui": "configure_in_provider"
        }
    }


@app.post("/image/generate", response_model=GeneratedAsset)
def generate_image(payload: ImageGenerationPayload):
    asset_id = f"asset_{payload.jobId}_{uuid.uuid4().hex[:8]}"

    asset = GeneratedAsset(
        id=asset_id,
        assetType=payload.assetType,
        entityRefs=payload.entityRefs,
        sourceEventId=payload.sourceEventId,
        sourceNewsId=payload.sourceNewsId,
        prompt=payload.prompt,
        negativePrompt=payload.negativePrompt,
        seed=payload.seed,
        provider="mock",
        status="queued",
        locked=False,
        createdAt=datetime.utcnow().isoformat(),
        updatedAt=datetime.utcnow().isoformat(),
        metadata=payload.metadata,
    )

    JOBS[payload.jobId] = {
        "payload": payload.model_dump(),
        "asset": asset.model_dump(),
        "status": "queued"
    }

    try:
        output_path = run_mock_or_real_provider(payload, asset_id)
        asset.filePath = str(output_path)
        asset.status = "ready"
        asset.updatedAt = datetime.utcnow().isoformat()

        JOBS[payload.jobId]["asset"] = asset.model_dump()
        JOBS[payload.jobId]["status"] = "ready"

        return asset
    except Exception as exc:
        asset.status = "failed"
        asset.updatedAt = datetime.utcnow().isoformat()
        asset.metadata["error"] = str(exc)

        JOBS[payload.jobId]["asset"] = asset.model_dump()
        JOBS[payload.jobId]["status"] = "failed"

        return asset


@app.get("/image/jobs/{job_id}", response_model=GeneratedAsset)
def job_status(job_id: str):
    job = JOBS.get(job_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return GeneratedAsset(**job["asset"])


def run_mock_or_real_provider(payload: ImageGenerationPayload, asset_id: str) -> Path:
    folder = ASSET_ROOT / payload.assetType
    folder.mkdir(parents=True, exist_ok=True)

    prompt_path = folder / f"{asset_id}_prompt.json"
    prompt_path.write_text(
        json.dumps(payload.model_dump(), indent=2),
        encoding="utf-8"
    )

    placeholder_path = folder / f"{asset_id}.txt"
    placeholder_path.write_text(
        f"MOCK IMAGE PLACEHOLDER\n\nPROMPT:\n{payload.prompt}\n",
        encoding="utf-8"
    )

    return placeholder_path
