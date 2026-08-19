# DeepSeek Harness Ultimate Windows 版

本目录提供可复现的 Windows Ultimate DSH profile 安装包。它安装提交固定的
profile 脚本，并按需把清单中的上游组件下载到当前用户的 DSH profile。它不是把 DSH
打包进去的桌面应用，不包含 API 密钥、供应商设置、浏览器会话或第三方源代码。

## 环境要求

- Windows 10 或 Windows 11 x64
- PowerShell 5.1 或 PowerShell 7
- Node.js 22 或更高版本
- 能访问 `profile/manifest.json` 中 GitHub 归档地址的网络

## 准备环境

从仓库目录执行：

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

该脚本通过 `winget` 安装 Git、Node.js LTS 和 NSIS，并在未指定 `-SkipRuntime` 时创建
`%USERPROFILE%\dsh-runtime`，安装官方 `@deepseek-ai/dsh@0.1.0-rc.7` runtime。脚本不会
创建凭据。安装器改变 `PATH` 后请重新打开 PowerShell。

## 安装 profile

在仓库根目录执行：

```powershell
& .\windows\install-ultimate.ps1
```

默认 profile 目录为 `%USERPROFILE%\.dsh\profiles\ultimate`。只查看即将选择的组件、不
下载文件：

```powershell
& .\windows\install-ultimate.ps1 -DryRun
```

可选组件必须显式启用：

```powershell
& .\windows\install-ultimate.ps1 -IncludeOptional
```

安装器使用 `npm install --ignore-scripts --legacy-peer-deps`，并使用清单中的 40 位
commit 固定值。模型供应商和 API 密钥请配置在本地 DSH runtime 中，绝不要写入本仓库。

## 构建 Windows 安装包

在安装 NSIS 的 Windows 环境中执行：

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

脚本会在 `releases/` 生成便携 ZIP、当前用户 NSIS 安装器和 SHA-256 校验文件。安装器把
profile 包放入 `%LOCALAPPDATA%\DeepSeek Harness Ultimate`，并创建开始菜单快捷方式来
运行 profile 安装脚本。profile 本身位于 DSH profile 目录，卸载本安装包不会删除它。

## 与 DSH 配合使用

安装完成后，按照当前 DSH 版本支持的 profile 机制，让本地 DSH runtime 使用生成的
profile。Windows 包不宣称 macOS 专用控制插件可以在 Windows 上工作；请先审阅平台和
权限，再运行任何组件。

## 卸载

使用 NSIS 卸载器，或删除 `%LOCALAPPDATA%\DeepSeek Harness Ultimate`。这只删除本安装
包和快捷方式，刻意保留单独管理的 DSH runtime、profile 和凭据。
