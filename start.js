module.exports = {
    daemon: true,
    run: [
        {
            method: "input",
            params: {
                title: "Required Tokens",
                description: "Please provide the following Hugging Face tokens to launch the application. [Get them here](https://huggingface.co/settings/tokens)",
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
                venv: "env",
                env: {
                    HF_TOKEN: "{{input.sam3_token}}",
                    MERVE_TOKEN: "{{input.merve_token}}"
                },
                path: "app",
                message: [
                    "python app.py",
                ],
                on: [{
                    "event": "/(http:\/\/\\S+)/",
                    "done": true
                }]
            }
        },
        {
            method: "local.set",
            params: {
                url: "{{input.event[1]}}"
            }
        }
    ]
}
