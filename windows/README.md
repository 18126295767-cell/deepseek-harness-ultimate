# DeepSeek Harness Ultimate for Windows

**Language:** [简体中文](README.zh-CN.md) · English · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

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

Before changing the target profile, it resolves a lockfile in a temporary
directory and rejects plugins that bundle host DSH core packages. It then
audits the installed package tree. The Windows platform filter excludes
`platform: "macos"` components; no files are silently removed to bypass a
failure.

## Build Windows packages

On Windows with NSIS installed:

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

This creates a portable ZIP, a per-user NSIS installer, and a SHA-256 manifest
under `releases/`. It verifies all 12 language guides, the ZIP contents, the
installer's Windows executable header, and the recorded hashes. The installer places the profile package under
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

The installer audits a temporary lockfile before changing the target and scans
the installed tree afterward. Ordinary dependencies on host DSH core packages
are rejected, and the Windows platform filter excludes macOS-only components.
