# Reproducible installation tutorial

This repository is an installer profile, not a source-code fork. It fetches
the pinned upstream components into a local DSH profile and keeps credentials
outside the repository.

## Requirements

- Node.js 22 or newer
- Git
- A separately installed DeepSeek Harness runtime
- Network access to the listed public GitHub repositories

## Install the curated default set

```bash
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

The installer uses commit-pinned GitHub archive URLs from `profile/manifest.json`,
runs npm with `--ignore-scripts` and `--legacy-peer-deps`, and writes only to the profile directory. It does not read
or transmit API keys, phone numbers, email addresses, browser sessions, or
private files.

## Add optional integrations

Optional components can require credentials, account access, or operating
system permissions. Review `COMPONENTS.md` first, then explicitly opt in:

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include-optional
```

To select one package instead:

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## Configure DSH

Point your local DSH installation at the generated profile according to the
runtime's profile configuration mechanism. Provider endpoints and API keys
belong in the local runtime's secret store or environment, never in this repo.

## Verify and reproduce

The audit must report the component count and allowed licenses. A clean clone
with the same manifest commits should produce the same dependency requests.
Review `npm ls --depth=0` in the profile directory and compare
`COMPONENTS.json` with `profile/manifest.json`.

## Windows setup and package

On Windows 10/11 x64, install PowerShell 5.1/7 and Node.js 22+. To prepare a
build machine, run:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

This uses `winget` for Git, Node.js LTS, and NSIS and installs the official
`@deepseek-ai/dsh@0.1.0-rc.7` runtime under `%USERPROFILE%\dsh-runtime`. Use
`-SkipRuntime` when a runtime is already managed elsewhere. Reopen PowerShell
after installers change `PATH`.

From the repository root, install the default profile:

```powershell
& .\windows\install-ultimate.ps1
```

The default destination is `%USERPROFILE%\.dsh\profiles\ultimate`. Use
`-DryRun` to inspect the selected commit pins without downloading packages and
`-IncludeOptional` to opt into optional components. The script delegates to the
same Node installer as macOS/Linux, including `--ignore-scripts` and
`--legacy-peer-deps`.

Build a portable ZIP, per-user NSIS installer, and SHA-256 manifest on Windows:

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

The release workflow repeats the tests, manifest audit, PowerShell smoke check,
and package build on `windows-2025`. A successful CI build proves the package
can be assembled on Windows; it does not prove provider login or network
behavior, which must be tested with user-owned runtime settings.

## Licensing

The installer and manifests are MIT-licensed. Fetched packages remain under
their upstream licenses. Preserve their notices when redistributing an
installed profile; do not relicense upstream code as MIT or as non-commercial.
