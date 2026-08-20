# 可复现安装教程

本仓库是插件安装配置，不是第三方源码的分叉。它会把清单中固定提交的上游组件获取到
本地 DSH 配置目录，并将凭据留在仓库之外。

## 环境要求

- Node.js 22 或更高版本
- Git
- 单独安装的 DeepSeek Harness 运行时
- 能访问清单中公开 GitHub 仓库的网络

## 安装精选默认集合

```bash
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

安装器使用 `profile/manifest.json` 中的提交固定 GitHub 归档地址，以 `--ignore-scripts` 和
`--legacy-peer-deps` 运行 npm，
只写入指定配置目录。在写入前，它会用临时目录解析锁文件，拒绝普通依赖中的 DSH 宿主
核心包；安装后还会再次审计实际物理包树。它不会读取或传输 API 密钥、电话号码、邮箱、
浏览器会话或私有文件。

## 添加可选集成

可选组件可能需要凭据、账号授权或操作系统权限。请先阅读 `COMPONENTS.md`，再显式启用：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include-optional
```

只选择一个插件：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 配置 DSH

请根据本地 DSH 运行时支持的配置机制，让它使用生成的 profile。模型供应商地址和 API
密钥应放在本地运行时的密钥存储或环境变量中，绝不要写入本仓库。

## 验证与复现

审计脚本应报告组件数量和允许的许可证。使用相同清单提交值的全新克隆应产生相同的依赖
请求。请在配置目录执行 `npm ls --depth=0`，并将 `COMPONENTS.json` 与
`profile/manifest.json` 对照。

如果已知 runtime 目录，可执行更严格的物理副本检查：

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --runtime-dir /绝对路径/dsh-runtime
```

## Windows 环境与安装包

在 Windows 10/11 x64 上准备 PowerShell 5.1/7 和 Node.js 22 或更高版本。准备构建机：

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

该脚本通过 `winget` 安装 Git、Node.js LTS 和 NSIS，并在
`%USERPROFILE%\dsh-runtime` 安装官方 `@deepseek-ai/dsh@0.1.0-rc.7` runtime。已有其他
runtime 时使用 `-SkipRuntime`。安装器改变 `PATH` 后请重新打开 PowerShell。

在仓库根目录安装默认 profile：

```powershell
& .\windows\install-ultimate.ps1
```

默认目标目录是 `%USERPROFILE%\.dsh\profiles\ultimate`。使用 `-DryRun` 可只查看选中的
commit 固定值而不下载组件；使用 `-IncludeOptional` 才会加入可选组件。该脚本与
macOS/Linux 共用同一个 Node 安装器，仍会使用 `--ignore-scripts` 和
`--legacy-peer-deps`。它会显式选择 `windows` 平台，因此不会安装 `keyringseam` 等
macOS 专用组件。

在 Windows 上生成便携 ZIP、当前用户 NSIS 安装包和 SHA-256 校验文件：

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

发布工作流会在 `windows-2025` 上重复测试、清单审计、PowerShell 冒烟检查和打包。CI
构建成功只证明安装包可以在 Windows 上组装，不代表供应商登录或网络行为已经验证；这些
行为仍需使用用户自己的 runtime 设置单独测试。

## 许可证

安装器和清单采用 MIT 许可证。获取的插件仍受其上游许可证约束。再次分发安装后的配置时
必须保留对应声明；不得把上游代码改称 MIT 或“非商用”许可证。
