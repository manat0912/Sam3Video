module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    
    {
      method: "shell.run",
      params: {
        env: { "GIT_LFS_SKIP_SMUDGE": "1" },
        message: [ "git clone --depth 1 https://github.com/manat0912/SamsModels.git app" ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app/app",
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
        path: "app/app",
        message: [
          "uv pip install gradio devicetorch -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app/app",
        message: [
          "python merge_models.py"
        ]
      }
    }
  ]
}



