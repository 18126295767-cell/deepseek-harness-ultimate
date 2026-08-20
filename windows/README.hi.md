# Windows के लिए DeepSeek Harness Ultimate

**भाषा:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [العربية](README.ar.md) · हिन्दी · [繁體中文](README.zh-TW.md)

यह पैकेज reproducible Ultimate DSH profile इंस्टॉल करता है। यह desktop app नहीं है और इसमें API keys या credentials शामिल नहीं हैं।

## वातावरण तैयार करें

Windows 10/11 x64, PowerShell 5.1/7 और Node.js 22+ आवश्यक हैं:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## profile इंस्टॉल करें

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

डिफ़ॉल्ट स्थान `%USERPROFILE%\.dsh\profiles\ultimate` है। वैकल्पिक घटकों के लिए `-IncludeOptional` उपयोग करें। credentials स्थानीय DSH runtime में रहते हैं।

## पैकेज बनाएं

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

windows-2025 CI ZIP, NSIS, 12 भाषा guides और SHA-256 की जाँच करती है। macOS-only plugins के Windows समर्थन का दावा नहीं किया जाता।

Installer target बदलने से पहले temporary lockfile की audit करता है और install के बाद वास्तविक package tree फिर जाँचता है। Host DSH core packages पर सामान्य dependencies अस्वीकार होती हैं और Windows platform filter macOS-only components हटाता है।
