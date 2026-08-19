# Windows용 DeepSeek Harness Ultimate

**언어:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · 한국어 · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

이 패키지는 재현 가능한 Ultimate DSH profile을 설치합니다. 데스크톱 앱이 아니며 API 키나 자격 증명을 포함하지 않습니다.

## 환경 준비

Windows 10/11 x64, PowerShell 5.1/7, Node.js 22 이상이 필요합니다.

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## profile 설치

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

기본 경로는 `%USERPROFILE%\.dsh\profiles\ultimate`입니다. 선택적 구성 요소는 `-IncludeOptional`을 사용합니다. 자격 증명은 로컬 DSH runtime에만 남습니다.

## 패키지 빌드

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

windows-2025 CI는 ZIP, NSIS, 12개 언어 문서와 SHA-256을 검증합니다. macOS 전용 플러그인의 Windows 동작은 보장하지 않습니다.
