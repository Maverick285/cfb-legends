import type { GeneratedAsset } from "../../domain/assets/generatedAsset";
import type { ImagePromptPayload } from "../../domain/assets/newsImage";

export interface AssetGenerationService {
  queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset>;
  getJobStatus(jobId: string): Promise<GeneratedAsset>;
}

export class LocalImageAssetService implements AssetGenerationService {
  constructor(private readonly baseUrl: string) {}

  async queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset> {
    const response = await fetch(`${this.baseUrl}/image/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Image service failed: ${response.status}`);
    }

    return response.json();
  }

  async getJobStatus(jobId: string): Promise<GeneratedAsset> {
    const response = await fetch(`${this.baseUrl}/image/jobs/${jobId}`);

    if (!response.ok) {
      throw new Error(`Image job status failed: ${response.status}`);
    }

    return response.json();
  }
}

export class MockImageAssetService implements AssetGenerationService {
  async queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset> {
    const now = new Date().toISOString();

    return {
      id: `asset_${payload.jobId}`,
      assetType: payload.assetType,
      entityRefs: payload.entityRefs,
      sourceEventId: payload.sourceEventId,
      sourceNewsId: payload.sourceNewsId,
      prompt: payload.prompt,
      negativePrompt: payload.negativePrompt,
      seed: payload.seed,
      provider: "mock",
      status: "fallback",
      locked: false,
      createdAt: now,
      updatedAt: now,
      metadata: payload.metadata
    };
  }

  async getJobStatus(jobId: string): Promise<GeneratedAsset> {
    const now = new Date().toISOString();

    return {
      id: `asset_${jobId}`,
      assetType: "news_image",
      entityRefs: [],
      prompt: "",
      seed: 0,
      provider: "mock",
      status: "fallback",
      locked: false,
      createdAt: now,
      updatedAt: now,
      metadata: {}
    };
  }
}
