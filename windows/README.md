# DeepSeek Harness Ultimate for Windows

This package provides a reproducible Windows installer for the Ultimate DSH
profile. It installs the commit-pinned profile scripts and can then fetch the
selected upstream packages into a user-owned DSH profile. It is not a bundled
DSH desktop application and does not contain API keys, provider settings,
browser sessions, or third-party source code.

## Requirements

- Windows 10 or Windows 11 x64
- PowerShell 5.1 or PowerShell 7
- Node.js 22 or newer
- Network access to the GitHub archive URLs recorded in `profile/manifest.json`

## Prepare the environment

From a checkout, run:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

The bootstrap uses `winget` to install Git, Node.js LTS, and NSIS. It also
creates `%USERPROFILE%\dsh-runtime` and installs the official
`@deepseek-ai/dsh@0.1.0-rc.7` runtime unless `-SkipRuntime` is supplied. It
does not create credentials. Reopen PowerShell after an installer changes
`PATH`.

## Install the profile

From the repository root:

```powershell
& .\windows\install-ultimate.ps1
```

The default profile is `%USERPROFILE%\.dsh\profiles\ultimate`. To preview the
exact selected packages without downloading them:

```powershell
& .\windows\install-ultimate.ps1 -DryRun
```

Optional components are opt-in:

```powershell
& .\windows\install-ultimate.ps1 -IncludeOptional
```

The installer uses `npm install --ignore-scripts --legacy-peer-deps` and the
40-character commit pins in the manifest. Configure providers and API keys in
your local DSH runtime, never in this repository.

## Build Windows packages

On Windows with NSIS installed:

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

This creates a portable ZIP, a per-user NSIS installer, and a SHA-256 manifest
under `releases/`. The installer places the profile package under
`%LOCALAPPDATA%\DeepSeek Harness Ultimate` and creates a Start Menu shortcut
that runs the profile installer. The profile itself remains under your DSH
profile directory and is not removed by uninstalling this package.

## Use with DSH

After installation, point your local DSH runtime at the generated profile using
the profile mechanism supported by your DSH version. The Windows package does
not claim that macOS-only control plugins work on Windows. Run only components
whose platform and permissions you have reviewed.

## Uninstall

Use the NSIS uninstaller or remove `%LOCALAPPDATA%\DeepSeek Harness Ultimate`.
This removes the package and shortcuts, but deliberately leaves the separately
managed DSH runtime, profile, and credentials untouched.
