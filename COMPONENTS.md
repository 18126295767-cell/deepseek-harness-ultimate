# Component audit

The default profile contains only components with a recorded upstream Git
repository, a pinned commit, and a declared MIT, Apache-2.0, or BSD-3-Clause
license. The installer fetches them at install time; it does not copy them into
this repository.

| Component | Upstream | License | Role | Default |
| --- | --- | --- | --- | --- |
| `dsh-agent-team-gui` | [toolclub/dsh-agent-team-gui](https://github.com/toolclub/dsh-agent-team-gui) | MIT | Team member/model/tool routing UI | Yes |
| `dsh-taskswarm` | [february2015/dsh-taskswarm](https://github.com/february2015/dsh-taskswarm) | MIT | Dependency waves, worktree isolation, recovery | Yes |
| `dsh-task-planner` | [ztl34245881-commits/dsh-task-planner](https://github.com/ztl34245881-commits/dsh-task-planner) | MIT | Historical planning and experience reuse | Yes |
| `dsh-proof` | [EvilIrving/dsh-proof](https://github.com/EvilIrving/dsh-proof) | MIT | Read-only acceptance verifier | Yes |
| `@dsh-external/workflow` | [icetomoyo/dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | MIT | Save, observe, resume workflows | Yes |
| `@dsh-external/dsh-plannotator` | [titanwings/dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | MIT | Annotate plans and return structured feedback | Yes |
| `@dsh-external/dsh-automation` | [titanwings/dsh-automation](https://github.com/titanwings/dsh-automation) | MIT | Auditable scheduled agent sessions | Yes |
| `@dsh-external/dsh-sentinel` | [fuhefei/dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | BSD-3-Clause | Condition-driven wakeups | Yes |
| `dsh-memento` | [PerryLink/dsh-memento](https://github.com/PerryLink/dsh-memento) | Apache-2.0 | Persistent memory | Yes |
| `dsh-backup` | [xiaoyuyu6420/dsh-backup](https://github.com/xiaoyuyu6420/dsh-backup) | MIT | Backup and restore | Yes |
| `keyringseam` | [fieldnote-ops/keyringseam](https://github.com/fieldnote-ops/keyringseam) | MIT | macOS Keychain credential provider | Yes |
| `dsh-bookmarks` | [penguin-oo/dsh-bookmarks](https://github.com/penguin-oo/dsh-bookmarks) | MIT | Conversation bookmarks | Yes |
| `dsh-client-auto-continue` | [HsiangNianian/dsh-auto-continue](https://github.com/HsiangNianian/dsh-auto-continue) | MIT | Continue after recoverable interruptions | Yes |
| `dsh-design-skills` | [zhaiyateng/dsh-design-skills](https://github.com/zhaiyateng/dsh-design-skills) | MIT | UI/design language skills | Yes |
| `dsh-global-rules` | [badai147/dsh-global-rules](https://github.com/badai147/dsh-global-rules) | MIT | Shared project rules | Yes |
| `@0xsline/dsh-spotlight` | [0xsline/dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | MIT | Productivity surface | Yes |
| `dsh-notifier` | [THEWOLFWALKER/dsh-notifier](https://github.com/THEWOLFWALKER/dsh-notifier) | MIT | Multi-channel notifications and approvals | Optional; credentials |
| `dsh-routines` | [Jesse-njx/dsh-routines](https://github.com/Jesse-njx/dsh-routines) | MIT | Cron-style agent routines | Optional |
| `dsh-im` | [xmanrui/dsh-im](https://github.com/xmanrui/dsh-im) | MIT | IM bridges | Optional; credentials |
| `dsh-plugin-call-me` | [radres/dsh-plugin-call-me](https://github.com/radres/dsh-plugin-call-me) | MIT | Phone/text callbacks | Optional; credentials/permission |
| `@dsh-voice/bundle` | [Jesse-njx/dsh-voice](https://github.com/Jesse-njx/dsh-voice) | MIT | Voice interaction | Optional; permission |
| `dsh-reverse-skill` | [dhicoc/dsh-reverse-skill](https://github.com/dhicoc/dsh-reverse-skill) | MIT | Authorized security research skills | Optional; authorization |
| `dsh-wuyun-liuqi` | [dhicoc/dsh-wuyun-liuqi](https://github.com/dhicoc/dsh-wuyun-liuqi) | MIT | Traditional medicine skills | Optional |

The pinned commits are recorded in `profile/manifest.json`. They are audit
references, not claims that an upstream author endorses this profile.
