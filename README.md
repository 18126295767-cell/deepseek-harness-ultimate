# DeepSeek Harness Ultimate

**DeepSeek Harness now has more plugins than most people can reasonably compare. Ultimate has already reviewed, pinned, deduplicated, and organized the useful choices, so you can start working instead of spending hours choosing.**

> A reproducible curated DSH profile covering nearly every practical capability category: coding teams, workflow control, safety, research, and daily automation, with no need to search repositories one by one.

**Languages:** English · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[Beginner tutorial](TUTORIAL.md) · [Windows guide](windows/README.md) · [Component audit](COMPONENTS.md) · [Excluded duplicates](EXCLUDED_COMPONENTS.md)

## Why Ultimate exists

The DSH ecosystem is growing quickly. Comparing dozens of repositories, licenses,
versions, permissions, and overlapping features is real work. Ultimate makes that
decision once in a public manifest:

- one strong default per overlapping role instead of several plugins fighting to do the same job;
- exact 40-character upstream commit pins instead of moving branches;
- only components with recorded MIT, Apache-2.0, or BSD-3-Clause licensing;
- platform filtering, dependency preflight, and a second installed-tree audit;
- optional separation for integrations that need accounts, credentials, permissions, or authorization.

“Nearly every practical category” does not mean every plugin ever published. It
means curated coverage across the capability categories that can currently be
reproduced and publicly audited. Ultimate is community-maintained, not an official
DeepSeek AI release, and upstream authors keep ownership of their projects.

## What has already been chosen

- **Large coding work:** visual Agent teams, dependency-wave execution, Git worktree isolation, experience-aware planning, read-only verification, and plan review.
- **Workflow and reliability:** reusable workflows, scheduled sessions, condition-driven wakeups, backups, persistent memory, global rules, and macOS Keychain support.
- **Everyday productivity:** bookmarks, auto-continue, design skills, and a focused Spotlight surface.
- **Optional connections:** notifications, IM bridges, phone callbacks, and authorized security-research skills stay opt-in because they require extra trust or setup.

TaskSwarm already covers dependency waves and isolated worktrees, so Captain is
documented as an alternative rather than installed beside it. The same rule is
used throughout the profile; see [Excluded components](EXCLUDED_COMPONENTS.md).

## Five-minute start

Requirements: Windows 10/11 x64, macOS, or Linux; Node.js 22 or newer; and
network access to the public repositories in `profile/manifest.json`. Git is
recommended but is not required if you download the source ZIP.

### macOS or Linux

From the extracted repository folder:

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

### Windows PowerShell

From the extracted repository folder:

```powershell
node --version
& .\windows\install-ultimate.ps1
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

The first launch may download the official DSH runtime. Open **Settings →
Models**, add your own provider and API key, choose a workspace, and send a small
test task. Ultimate never contains or copies an API key.

For every click, expected message, and common error, use the
[beginner tutorial](TUTORIAL.md). It also explains how an existing local macOS
DeepSeek Harness app can use the curated `web` profile.

## What the installer changes

The installer creates a user-owned profile under
`$HOME/.dsh/profiles/ultimate` or `%USERPROFILE%\.dsh\profiles\ultimate`. It
places the official `@deepseek-ai/dsh-base` and `@deepseek-ai/dsh-web-app`
layers first, then the selected third-party bundle layers. It writes
`package.json`, `package-lock.json`, `COMPONENTS.json`, and a non-destructive
`cordis.patch.yml`, then downloads pinned upstream archives with npm.

Before touching the target profile, it resolves a temporary lockfile and rejects
plugins that install host `@deepseek-ai/dsh-*` packages as ordinary dependencies.
After installation it scans the physical package tree again. Existing credentials,
sessions, and user overrides are not deleted.

## Windows package

The `windows/` directory provides a profile installer plus reproducible portable
ZIP and NSIS packaging. It is not a separate DSH desktop application. The Windows
filter excludes macOS-only components such as `keyringseam`. See the
[Windows guide](windows/README.md).

## Privacy, licensing, and limits

This repository contains the manifest, installer, audit rules, and documentation.
It does not redistribute third-party source, `node_modules`, API keys, phone
numbers, email addresses, browser sessions, or private configuration. Provider
credentials belong in the local DSH secret store or environment, never in this
repository, screenshots, or public issues.

The repository code is MIT-licensed. Fetched components keep their upstream MIT,
Apache-2.0, or BSD-3-Clause licenses and notices. DSH is still a developer preview,
so compatibility-breaking upstream changes remain possible. Read [NOTICE](NOTICE),
[UPSTREAM.md](UPSTREAM.md), and [LICENSE](LICENSE) before redistribution.

## Verify or develop

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Contributions should keep the manifest reproducible, avoid duplicate roles, preserve
upstream notices, and update all language selectors when documentation changes.
