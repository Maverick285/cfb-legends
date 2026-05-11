from pathlib import Path
import requests
import json
import time


class ComfyUIProvider:
    def __init__(self, base_url: str, workflow_template_path: str, node_config: dict):
        self.base_url = base_url.rstrip("/")
        self.workflow_template_path = Path(workflow_template_path)
        self.node_config = node_config

    def generate(self, payload, output_path: Path) -> Path:
        workflow = json.loads(self.workflow_template_path.read_text())

        nodes = self.node_config

        workflow[nodes["positive_prompt"]]["inputs"]["text"] = payload.prompt

        if nodes.get("negative_prompt") and payload.negativePrompt:
            workflow[nodes["negative_prompt"]]["inputs"]["text"] = payload.negativePrompt

        if nodes.get("seed"):
            workflow[nodes["seed"]]["inputs"]["seed"] = payload.seed

        if nodes.get("width_height"):
            workflow[nodes["width_height"]]["inputs"]["width"] = payload.width
            workflow[nodes["width_height"]]["inputs"]["height"] = payload.height

        if nodes.get("reference_image") and payload.referenceImagePath:
            workflow[nodes["reference_image"]]["inputs"]["image"] = payload.referenceImagePath

        response = requests.post(
            f"{self.base_url}/prompt",
            json={"prompt": workflow},
            timeout=30
        )
        response.raise_for_status()

        prompt_id = response.json()["prompt_id"]

        for _ in range(300):
            history = requests.get(
                f"{self.base_url}/history/{prompt_id}",
                timeout=10
            ).json()

            if prompt_id in history:
                return self._copy_latest_output_to(output_path)

            time.sleep(1)

        raise TimeoutError("ComfyUI generation timed out")

    def _copy_latest_output_to(self, output_path: Path) -> Path:
        # TODO:
        # Replace this with real ComfyUI output lookup based on your workflow output node.
        raise NotImplementedError("Implement ComfyUI output extraction for your workflow.")
