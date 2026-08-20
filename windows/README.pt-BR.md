# DeepSeek Harness Ultimate para Windows

**Idioma:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · Português · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

Este pacote instala o perfil DSH Ultimate reproduzível. Não é um aplicativo desktop e não contém chaves de API ou credenciais.

## Preparar o ambiente

Requer Windows 10/11 x64, PowerShell 5.1/7 e Node.js 22+:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## Instalar o perfil

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

O destino padrão é `%USERPROFILE%\.dsh\profiles\ultimate`. Use `-IncludeOptional` para os componentes opcionais. As credenciais permanecem no runtime DSH local.

## Criar o pacote

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

A CI windows-2025 verifica ZIP, NSIS, 12 guias de idioma e SHA-256. Plugins exclusivos do macOS não são declarados compatíveis com Windows.

O instalador audita um lockfile temporário antes de alterar o destino e verifica novamente a árvore instalada. Dependências comuns de pacotes centrais do host DSH são rejeitadas, e o filtro do Windows exclui componentes exclusivos do macOS.
