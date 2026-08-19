# DeepSeek Harness Ultimate für Windows

**Sprache:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · Deutsch · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

Dieses Paket installiert das reproduzierbare Ultimate-DSH-Profil. Es ist kein Desktop-Programm und enthält keine API-Schlüssel oder Zugangsdaten.

## Vorbereitung

Windows 10/11 x64, PowerShell 5.1/7 und Node.js 22+ werden benötigt:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## Profil installieren

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

Das Profil liegt standardmäßig unter `%USERPROFILE%\.dsh\profiles\ultimate`. Optionale Komponenten erfordern `-IncludeOptional`. Zugangsdaten bleiben im lokalen DSH-Runtime.

## Paket bauen

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

Die Windows-2025-CI prüft ZIP, NSIS, 12 Sprachdateien und SHA-256. macOS-exklusive Plugins werden unter Windows nicht versprochen.
