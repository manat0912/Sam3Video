module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    // 1. Clean up previous installations to ensure a fresh start.
    {
      method: "shell.run",
      params: {
        message: [
          "{{(platform === 'win32' ? 'if exist app ( rmdir /s /q app )' : 'rm -rf app')}}",
          "{{(platform === 'win32' ? 'if exist temp_models ( rmdir /s /q temp_models )' : 'rm -rf temp_models')}}"
        ]
      }
    },
    // 2. Clone the primary repository.
    {
      method: "shell.run",
      params: {
        message: [ "git clone https://github.com/manat0912/Sam3Video.git app" ]
      }
    },
    // 3. Clone the second repository into a temporary directory.
    {
      method: "shell.run",
      params: {
        env: { "GIT_LFS_SKIP_SMUDGE": "1" },
        message: [ "git clone https://github.com/manat0912/SamsModels.git temp_models" ]
      }
    },
    // 4. Merge the files and clean up.
    {
      method: "shell.run",
      params: {
        message: [
          "{{(platform === 'win32' ? 'xcopy temp_models\\\\app app\\\\app /E /I /Y' : 'cp -r temp_models/app/* app/app/')}}",
          "{{(platform === 'win32' ? 'rmdir /s /q temp_models' : 'rm -rf temp_models')}}"
        ]
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
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
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



