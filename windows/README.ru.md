# DeepSeek Harness Ultimate для Windows

**Язык:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · Русский · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

Этот пакет устанавливает воспроизводимый профиль Ultimate DSH. Это не desktop-приложение; API-ключи и учетные данные в пакет не входят.

## Подготовка

Нужны Windows 10/11 x64, PowerShell 5.1/7 и Node.js 22+:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## Установка профиля

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

По умолчанию профиль находится в `%USERPROFILE%\.dsh\profiles\ultimate`. Для необязательных компонентов используйте `-IncludeOptional`. Учетные данные остаются в локальном DSH runtime.

## Сборка пакета

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

CI windows-2025 проверяет ZIP, NSIS, 12 языковых руководств и SHA-256. Совместимость macOS-only плагинов с Windows не заявляется.

Перед изменением целевого профиля установщик проверяет временный lockfile, а после установки — реальное дерево пакетов. Обычные зависимости от пакетов ядра DSH хоста отклоняются; фильтр Windows исключает компоненты только для macOS.
