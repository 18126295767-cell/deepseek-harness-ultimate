# DeepSeek Harness Ultimate Windows 版

**言語:** [简体中文](README.zh-CN.md) · [English](README.md) · 日本語 · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

このパッケージは再現可能な Ultimate DSH profile をインストールします。デスクトップアプリではなく、API キーや認証情報を含みません。

## 環境準備

Windows 10/11 x64、PowerShell 5.1/7、Node.js 22 以降が必要です。

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## profile のインストール

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

既定の保存先は `%USERPROFILE%\.dsh\profiles\ultimate` です。任意コンポーネントには `-IncludeOptional` を使用します。認証情報はローカル DSH runtime に残ります。

## パッケージのビルド

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

windows-2025 CI は ZIP、NSIS、12 言語ガイド、SHA-256 を検証します。macOS 専用プラグインの Windows 動作は保証しません。

インストーラーは対象を変更する前に一時 lockfile を監査し、インストール後に実際のパッケージツリーを再検査します。ホスト DSH コアへの通常依存は拒否され、Windows の platform フィルターは macOS 専用コンポーネントを除外します。
