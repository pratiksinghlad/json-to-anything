# Build Fix Walkthrough

I have updated the project configuration to support your **Visual Studio 2025** installation and ensure that the build environment correctly captures all necessary MSVC variables.

## Changes Made

### 1. Updated Rust version
I updated the [Cargo.toml](file:///d:/Code/UI/json-to-anything/src-tauri/Cargo.toml) to require **Rust 1.84.0** or later. This version provides much better support for Visual Studio 2025 and the latest MSVC toolchains.

### 2. Robust Build Script
I improved [build.ps1](file:///d:/Code/UI/json-to-anything/build.ps1) with:
- **Fallback Detection**: If the specific `x64` component isn't found, it falls back to the latest general VS installation.
- **Improved Variable Capture**: It now more reliably captures environment variables from `vcvarsall.bat` by trimming whitespace and filtering empty keys.

## Final Steps for You

> [!IMPORTANT]
> To ensure the build works, please follow these steps in order:
> 1. **Update Rust**: Run this command in your terminal:
>    ```powershell
>    rustup update stable
>    ```
> 2. **Install Missing Components**: (If you haven't already from the plan)
>    - Ensure **Windows 11 SDK** is installed via Visual Studio Installer.
>    - Ensure **MSVC v143 - VS 2022 C++ x64/x86 build tools** is installed (for compatibility).
> 3. **Run the Build**:
>    ```powershell
>    npm run build:windows
>    ```

The build should now correctly find the linker and compile the `icu_properties_data` and other crates that were previously failing.
