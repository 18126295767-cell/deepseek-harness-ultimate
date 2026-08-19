# DeepSeek Harness Ultimate Windows 版

**語言：** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · 繁體中文

本套件會安裝可重現的 Ultimate DSH profile。它不是桌面應用程式，也不包含 API 金鑰或憑證。

## 準備環境

需要 Windows 10/11 x64、PowerShell 5.1/7 和 Node.js 22 或更新版本：

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## 安裝 profile

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

預設位置是 `%USERPROFILE%\.dsh\profiles\ultimate`。選用元件請使用 `-IncludeOptional`。憑證會留在本機 DSH runtime。

## 建置套件

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

windows-2025 CI 會驗證 ZIP、NSIS、12 種語言指南和 SHA-256；不宣稱 macOS 專用外掛可在 Windows 上運作。
