# DeepSeek Harness Ultimate

**覆盖几乎所有实用能力类别的可复现 DSH 精选配置——编程团队、工作流控制、安全、研究和日常自动化都已预先整理，不必再逐个仓库寻找。**

语言 / Language: [简体中文](README.zh-CN.md) · [English](README.md)

DeepSeek Harness Ultimate 是面向开源
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的社区维护安装配置。
它组合了一组经过许可证核对、功能去重的插件，目前只纳入许可证明确为 MIT、Apache-2.0
或 BSD-3-Clause 的组件。本仓库只发布清单、审计规则和安装器，不再分发第三方源码、
`node_modules`、API 密钥、电话号码、邮箱、会话或私有配置。

这里的“几乎所有”指本配置中已经完成公开来源和许可证审计的实用能力类别，并不等于所有
历史上发布过的插件。本项目是精选兼容配置，不是 DeepSeek AI 官方发行版，也不承诺所有 DSH 插件或未来的
所有 DSH 版本都能不经调整地工作。各上游作者仍拥有自己的项目和许可证。

[English](README.md) · [英文教程](TUTORIAL.md) · [中文教程](TUTORIAL.zh-CN.md) ·
[组件审计](COMPONENTS.md)

## 包含内容

- **大型代码执行：** Agent Team GUI 负责模型与工具路由，TaskSwarm 负责依赖分波和
  Git worktree 隔离，Task Planner 负责经验规划，Proof 负责只读验收，Plannotator 负责
  计划反馈。
- **工作流与可靠性：** 工作流编排、定时自动化、Sentinel 条件唤醒、模型故障转移、备份、
  Keychain 凭据和 MCP 安全边界。
- **效率与界面：** 书签、文件提及、自动继续、全局规则、注意力状态、设计技能、写作工具
  和 Spotlight 面板。
- **可选集成：** 通知、IM 桥接、语音/电话工具和经过授权的安全研究技能。它们可能需要
  凭据、系统权限或领域审查，因此默认不启用；缺少完整公开声明的组件会继续排除。

默认集合会对重叠职责选择一个较完整的实现。例如 TaskSwarm 已覆盖依赖分波和隔离
worktree，因此 Captain 作为替代方案记录，不与它同时安装。

## 快速开始

要求：macOS 或 Linux、Node.js 22+、Git，以及单独安装的 DSH 运行时。在本仓库根目录执行：

```bash
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

安装器会写入干净的配置清单，只从指定的上游仓库获取所选组件。请在本地运行时配置
模型供应商和 API 密钥，绝不要把它们提交到本仓库。

写入目标 profile 之前，安装器会先在临时目录解析锁文件，并拒绝把宿主
`@deepseek-ai/dsh-*` 核心包放入普通 `dependencies` 的插件；安装完成后还会再次扫描
实际物理包树。宿主核心包必须放在 `peerDependencies`，检查过程不会删除凭据或会话。

## Windows 安装包

Windows 10/11 x64 通过 `windows/` profile 安装层支持。它是同一套可复现 Node profile
的 Windows 打包方式，不代表 macOS 专用控制插件可以在 Windows 上运行。执行
`windows/bootstrap-build-environment.ps1` 可准备 Git、Node.js LTS、NSIS，以及可选的
官方 DSH runtime；再执行 `windows/install-ultimate.ps1` 安装 profile，或使用
`windows/build-release.ps1` 生成的 ZIP/NSIS 安装包。仓库的 `windows-v*` 工作流会在真实
`windows-2025` runner 上构建这些产物。
Windows 安装器还会自动排除标为 `platform: "macos"` 的组件，并拒绝显式选择不兼容组件。

完整步骤见 [中文 Windows 指南](windows/README.zh-CN.md)，英文说明见
[Windows guide](windows/README.md)。

## 许可证与再发布

本仓库中的安装器和清单采用 MIT 许可证。`profile/manifest.json` 中的组件仍分别采用
上游的 MIT、Apache-2.0 或 BSD-3-Clause 许可证。分发安装后的配置时必须保留对应的
版权与许可证声明。元数据不完整、标记为 private、依赖本地路径或功能重复的组件记录在
`EXCLUDED_COMPONENTS.md`，不会被静默打包。

发布衍生版本前，请阅读 [NOTICE](NOTICE)、[UPSTREAM.md](UPSTREAM.md) 和
[LICENSE](LICENSE)。
