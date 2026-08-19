# DeepSeek Harness Ultimate

**A reproducible, curated DSH profile covering nearly every practical capability category—coding teams, workflow control, safety, research, and daily automation—so you do not have to hunt through repositories one by one.**

Language / 语言: [简体中文](README.zh-CN.md) · [English](README.md)

DeepSeek Harness Ultimate is a community-maintained installer profile for the
open-source [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).
It combines a non-duplicative set of plugins that were reviewed for a clear
MIT, Apache-2.0, or BSD-3-Clause license. The repository contains the manifest,
audit rules, and installer only; it does not redistribute third-party source,
`node_modules`, API keys, phone numbers, email addresses, sessions, or private
configuration.

“Nearly every” here means the publicly auditable capability categories in this
profile, not every plugin ever published. This is a curated compatibility profile,
not an official DeepSeek AI release
and not a promise that every DSH plugin or every future DSH version will work
unchanged. Upstream authors keep ownership of their projects and licenses.

[中文介绍](README.zh-CN.md) · [English tutorial](TUTORIAL.md) ·
[中文教程](TUTORIAL.zh-CN.md) · [Component audit](COMPONENTS.md)

## What is included

- **Large coding execution:** Agent Team GUI for model/tool routing, TaskSwarm for dependency waves and worktree isolation, Task Planner for experience-aware planning, Proof for read-only acceptance, and Plannotator for plan feedback.
- **Workflow and reliability:** Workflow orchestration, scheduled automation, Sentinel conditions, model failover, backups, Keychain credentials, and MCP guardrails.
- **Productivity and UI:** bookmarks, file mentions, auto-continue, global rules, attention status, design skills, writing tools, and the Spotlight surface.
- **Optional integrations:** notifications, IM bridges, voice/phone tools, and authorized security-research skills. These are opt-in because they may require credentials, permissions, or domain-specific review; components without a complete public notice stay excluded.

The default set intentionally chooses one strong implementation per overlapping
role. For example, TaskSwarm covers dependency waves and isolated worktrees;
Captain is listed as an alternative rather than installed alongside it.

## Quick start

Requirements: macOS or Linux, Node.js 22+, Git, and a separately installed DSH
runtime. From this repository:

```bash
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

The installer writes a clean profile manifest and fetches only the selected
upstream repositories. Configure providers and API keys in the local runtime;
never commit them to this repository.

## Licensing and redistribution

The installer and manifests in this repository are MIT-licensed. Components
listed in `profile/manifest.json` remain under their upstream MIT, Apache-2.0,
or BSD-3-Clause licenses. Keep their notices when distributing an installed
profile. Components with unclear metadata, private package flags, local-only
paths, or overlapping functionality are documented in
`EXCLUDED_COMPONENTS.md` and are not silently bundled.

See [NOTICE](NOTICE), [UPSTREAM.md](UPSTREAM.md), and
[LICENSE](LICENSE) before making a derivative distribution.
