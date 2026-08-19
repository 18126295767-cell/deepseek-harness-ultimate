# Excluded components and reasons

Exclusion means “not part of the reproducible public profile,” not a judgment
that an upstream project is unsafe or unusable.

| Component | Reason |
| --- | --- |
| `dsh-captain` | Functional overlap with TaskSwarm/Agent Team GUI; kept as an alternative so the default profile stays coherent. |
| `dsh-agent-teams` | Functional overlap with Agent Team GUI; no need to install two team abstractions by default. |
| `plugin-team-board` | Tracking surface only; the selected workflow/team tools already provide execution and observation. |
| `dsh-model-failover` | Package declares MIT but the installed package snapshot lacks a license file; hold until upstream license notice is confirmed in the exact release. |
| `@dsh-external/dsh-session-manager` | Installed snapshot has MIT text but no stable public upstream repository was recorded in the local audit. |
| `@dsh-external/dsh-diff-viewer` | BSD-3-Clause metadata was present, but no public upstream source/notice was recorded in the installed snapshot. |
| `@dsh-external/dsh-super-injector` | BSD-3-Clause but local-only link from `dsh-routing-suite`; not reproducible from a public upstream URL. |
| `aegis` | MIT notice exists, but the package is a cross-harness bundle with no public repository recorded in the installed snapshot; requires separate provenance review. |
| `dsh-tool-writing`, `dsh-at-file`, `dsh-mcpguard`, `dsh-cost-balance`, `dsh-plugin-writing-guard`, `dsh-skill-manager-ytxue`, `dsh-mac-control` | Local package snapshot or missing public provenance in the current audit; can be added after a public upstream URL and exact license notice are recorded. |
| `@deepseek-ai/dsh-toolkit` | Official/local package was installed, but it is part of the DSH toolchain rather than this curated third-party profile; install it from the official DSH distribution. |
| `dsh-github-login`, `dsh-im`, notification/phone integrations | Optional integrations are not enabled by default because they transmit data or require account, credential, or OS permission setup. `dsh-im` remains available as an opt-in manifest component. |

No excluded component is silently copied, relicensed, or represented as part of
the Ultimate default set.
