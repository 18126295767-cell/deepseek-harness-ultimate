# DeepSeek Harness Ultimate لنظام Windows

**اللغة:** [简体中文](README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · العربية · [हिन्दी](README.hi.md) · [繁體中文](README.zh-TW.md)

تثبت هذه الحزمة ملف Ultimate DSH القابل لإعادة الإنتاج. ليست تطبيقا لسطح المكتب ولا تحتوي على مفاتيح API أو بيانات اعتماد.

## إعداد البيئة

تتطلب Windows 10/11 x64 وPowerShell 5.1/7 وNode.js 22 أو أحدث:

```powershell
Set-Location windows
& .\bootstrap-build-environment.ps1
```

## تثبيت الملف الشخصي

```powershell
& .\windows\install-ultimate.ps1
& .\windows\install-ultimate.ps1 -DryRun
```

المسار الافتراضي هو `%USERPROFILE%\.dsh\profiles\ultimate`. استخدم `-IncludeOptional` للمكونات الاختيارية. تبقى بيانات الاعتماد في DSH runtime المحلي.

## إنشاء الحزمة

```powershell
Set-Location windows
& .\build-release.ps1 -Version 1.0.0
```

تتحقق CI على windows-2025 من ZIP وNSIS و12 دليلا لغويا وSHA-256. لا نعلن توافق إضافات macOS-only مع Windows.

يدقق المثبت ملف lockfile مؤقتا قبل تغيير الهدف، ثم يفحص شجرة الحزم المثبتة. يرفض الاعتماد العادي على حزم DSH الأساسية في المضيف، ويستبعد مرشح Windows المكونات الخاصة بنظام macOS.
