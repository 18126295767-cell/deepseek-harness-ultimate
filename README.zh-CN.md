# DeepSeek Harness Ultimate

**现在 DeepSeek Harness 的插件已经多到很难逐个比较。Ultimate 已替你完成筛选、许可证核对、版本固定、功能去重和分类整理，下载后不必再为“到底该装哪一个”反复纠结，可以直接开始工作。**

> 覆盖几乎所有实用能力类别的可复现 DSH 精选配置：编程团队、工作流控制、安全、研究和日常自动化都已预先整理，不必再逐个仓库寻找。

**语言：** [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[小白教程](TUTORIAL.zh-CN.md) · [Windows 指南](windows/README.zh-CN.md) · [组件审计](COMPONENTS.md) · [重复功能排除说明](EXCLUDED_COMPONENTS.md)

## 为什么要做 Ultimate

DSH 生态增长很快。逐个比较几十个仓库的功能、许可证、版本、权限和重复程度，本身就是一项费时的工作。Ultimate 把这次选择公开记录在清单里：

- 每种重叠职责只保留一个较完整的默认实现，避免多个插件互相争抢同一功能；
- 使用上游完整 40 位 commit 固定版本，不跟随随时变化的分支；
- 只纳入已记录 MIT、Apache-2.0 或 BSD-3-Clause 许可证的组件；
- 按操作系统过滤，安装前检查依赖，安装后再扫描实际文件树；
- 需要账号、凭据、系统权限或明确授权的连接功能全部放到可选区。

“覆盖几乎所有实用能力类别”不等于收录历史上发布过的每一个插件，而是指对目前能够公开审计、可复现的实用类别进行精选覆盖。本项目由社区维护，不是 DeepSeek AI 官方发行版；各上游作者仍拥有自己的项目和许可证。

## 已经替你选好的能力

- **大型代码执行：** 可视化 Agent 团队、依赖分波执行、Git worktree 隔离、经验规划、只读验收和计划批注。
- **工作流与可靠性：** 可复用工作流、定时会话、条件唤醒、备份、长期记忆、全局规则和 macOS 钥匙串。
- **日常效率：** 会话书签、自动继续、设计技能和保持专注的 Spotlight 面板。
- **可选连接：** 通知、IM、电话回拨和授权安全研究技能需要更多信任或配置，因此不会默认打开。

TaskSwarm 已经负责依赖分波和隔离 worktree，所以 Captain 只作为替代方案记录，不会重复安装。其他重叠功能也采用同一原则，详见[排除说明](EXCLUDED_COMPONENTS.md)。

## 五分钟开始

要求：Windows 10/11 x64、macOS 或 Linux；Node.js 22 或更高版本；能够访问 `profile/manifest.json` 中的公开仓库。如果选择下载 ZIP，Git 不是必需项。

### macOS 或 Linux

在解压后的仓库文件夹中执行：

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

### Windows PowerShell

在解压后的仓库文件夹中执行：

```powershell
node --version
& .\windows\install-ultimate.ps1
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

第一次启动可能会下载官方 DSH runtime。打开“设置 → 模型”，填写你自己的模型供应商和 API 密钥，选择工作目录，再发送一个简单任务。Ultimate 从不内置或复制 API 密钥。

不会使用终端也没关系：[小白教程](TUTORIAL.zh-CN.md)逐步写明每一次点击、应该看到的文字和常见错误，也说明了怎样让已有的 macOS 本地 DeepSeek Harness App 使用这套精选 `web` profile。

## 安装器会改动什么

安装器在 `$HOME/.dsh/profiles/ultimate` 或 `%USERPROFILE%\.dsh\profiles\ultimate` 创建用户自己的 profile。它先放入官方 `@deepseek-ai/dsh-base` 和 `@deepseek-ai/dsh-web-app`，再按顺序叠加精选的第三方 bundle。它会写入 `package.json`、`package-lock.json`、`COMPONENTS.json` 和不会覆盖已有内容的 `cordis.patch.yml`，然后用 npm 下载固定提交的上游归档。

写入目标 profile 前，安装器会在临时目录解析锁文件，拒绝把宿主 `@deepseek-ai/dsh-*` 核心包放进普通依赖的插件；安装完成后再扫描一次实际物理包树。已有的凭据、会话和用户覆盖配置不会被删除。

## Windows 安装包

`windows/` 提供 profile 安装器，以及可复现的便携 ZIP 和 NSIS 打包流程；它本身不是另一套 DSH 桌面应用。Windows 会排除 `keyringseam` 等 macOS 专用组件。完整步骤见 [Windows 指南](windows/README.zh-CN.md)。

## 隐私、许可证与边界

本仓库只包含清单、安装器、审计规则和文档，不再分发第三方源码、`node_modules`、API 密钥、电话号码、邮箱、浏览器会话或私有配置。模型凭据只能放在本地 DSH 密钥存储或环境变量里，绝不要发到本仓库、截图或公开 Issue。

本仓库代码采用 MIT 许可证；下载的组件继续遵守各自上游的 MIT、Apache-2.0 或 BSD-3-Clause 许可证和声明。DSH 仍处于开发者预览阶段，上游仍可能出现破坏兼容性的更改。再次分发前请阅读 [NOTICE](NOTICE)、[UPSTREAM.md](UPSTREAM.md) 和 [LICENSE](LICENSE)。

## 验证与开发

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

贡献新组件时，应保持清单可复现、避免重复职责、保留上游声明，并同步更新所有语言的导航和教程。
