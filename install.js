module.exports = {
    requires: {
        bundle: "ai"
    },
    run: [
        {
            method: "input",
            params: {
                title: "Required Tokens",
                description: "Please provide your Hugging Face tokens to install the application. [Get them here](https://huggingface.co/settings/tokens)",
                form: [
                    {
                        key: "sam3_token",
                        label: "SAM3_TOKEN (Facebook/SAM3)",
                        type: "password",
                        placeholder: "hf_...",
                        help: "Enter your SAM3 access token"
                    },
                    {
                        key: "merve_token",
                        label: "MERVE_TOKEN (Merve/SAM3)",
                        type: "password",
                        placeholder: "hf_...",
                        help: "Enter your Merve/SAM3 access token"
                    }
                ]
            }
        },
        {
            method: "shell.run",
            params: {
                message: [
                    "git clone https://huggingface.co/spaces/merve/SAM3-video-segmentation app",
                ]
            }
        },
        {
            method: "script.start",
            params: {
                uri: "torch.js",
                params: {
                    venv: "env",
                    path: "app",
                    xformers: true,
                    triton: true,
                    sageattention: true
                }
            }
        },
        {
            method: "shell.run",
            params: {
                venv: "env",
                path: "app",
                message: [
                    "uv pip install -U huggingface_hub",
                    "uv pip install gradio devicetorch",
                    "uv pip install -r requirements.txt"
                ]
            }
        },
        {
            method: "shell.run",
            params: {
                venv: "env",
                path: "app",
                message: "huggingface-cli download merve/SAM3-video-segmentation --repo-type space --local-dir .",
                env: {
                    HF_TOKEN: "{{input.sam3_token}}",
                    MERVE_TOKEN: "{{input.merve_token}}"
                }
            }
        }
    ]
}
