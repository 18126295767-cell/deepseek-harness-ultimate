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

The installer uses the commit pins in `profile/manifest.json`, runs npm with
`--ignore-scripts`, and writes only to the profile directory. It does not read
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

## Licensing

The installer and manifests are MIT-licensed. Fetched packages remain under
their upstream licenses. Preserve their notices when redistributing an
installed profile; do not relicense upstream code as MIT or as non-commercial.
