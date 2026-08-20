# DeepSeek Harness Ultimate pour Windows

**Langue :** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · Français · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

Ce paquet installe le profil DSH Ultimate reproductible. Ce n'est pas une application de bureau et il ne contient ni clés API ni identifiants.

## Préparer l'environnement

Windows 10/11 x64, PowerShell 5.1/7 et Node.js 22+ sont requis :

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## Installer le profil

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

Le dossier par défaut est `%USERPROFILE%\.dsh\profiles\ultimate`. Utilisez `-IncludeOptional` pour les composants optionnels. Les identifiants restent dans le runtime DSH local.

## Construire le paquet

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

La CI windows-2025 vérifie ZIP, NSIS, les 12 guides et SHA-256. Les plugins exclusifs macOS ne sont pas annoncés comme compatibles Windows.

L'installateur audite un lockfile temporaire avant de modifier la cible, puis contrôle l'arbre installé. Il refuse les dépendances ordinaires vers le cœur DSH de l'hôte et le filtre Windows exclut les composants réservés à macOS.
