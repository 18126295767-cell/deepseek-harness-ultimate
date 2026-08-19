# DeepSeek Harness Ultimate para Windows

**Idioma:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · Español · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

Este paquete instala el perfil Ultimate DSH reproducible. No es una aplicación de escritorio y no contiene claves API ni credenciales.

## Preparar el entorno

Requiere Windows 10/11 x64, PowerShell 5.1/7 y Node.js 22+:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## Instalar el perfil

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

El destino predeterminado es `%USERPROFILE%\.dsh\profiles\ultimate`. Usa `-IncludeOptional` para componentes opcionales. Las credenciales permanecen en el runtime DSH local.

## Crear el paquete

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

La CI windows-2025 verifica ZIP, NSIS, 12 guías de idioma y SHA-256. No se garantiza que los plugins exclusivos de macOS funcionen en Windows.
