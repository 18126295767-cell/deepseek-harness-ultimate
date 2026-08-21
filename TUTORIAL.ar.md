# DeepSeek Harness Ultimate: دليل المبتدئين

يفترض هذا الدليل أنك لم تستخدم الطرفية من قبل. اتبع الخطوات بالترتيب ونفذ كل فحص صغير؛ لا تحتاج إلى معرفة برمجية.

**لغات الدليل:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · العربية · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[العودة إلى المقدمة](README.ar.md)

## دليل مرئي

هذه اللقطات من profile نظيف بلا جلسات أو بيانات اعتماد أو بيانات workspace خاصة. صور macOS تعرض الغلاف الأصلي، وصور Windows تعرض واجهة DSH Web UI نفسها على runner حقيقي.

![تطبيق macOS الأصلي: تنبيه المعاينة للمطورين](assets/screenshots/macos-01-developer-preview.jpg)

*تطبيق macOS الأصلي — تنبيه المعاينة للمطورين*

![تطبيق macOS الأصلي: إعداد مفتاح API فارغ](assets/screenshots/macos-02-api-key-onboarding.jpg)

*تطبيق macOS الأصلي — إعداد مفتاح API فارغ*

![تطبيق macOS الأصلي: الصفحة الرئيسية بلا workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*تطبيق macOS الأصلي — الصفحة الرئيسية بلا workspace*

![تطبيق macOS الأصلي: إعداد النماذج بحقل مفتاح فارغ](assets/screenshots/macos-04-model-settings.jpg)

*تطبيق macOS الأصلي — إعداد النماذج بحقل مفتاح فارغ*

![تطبيق macOS الأصلي: جرد 133 إضافة](assets/screenshots/macos-05-plugin-inventory.jpg)

*تطبيق macOS الأصلي — جرد 133 إضافة*

![واجهة DSH Web UI في Windows: تنبيه المعاينة للمطورين](assets/screenshots/windows-01-developer-preview.png)

*واجهة DSH Web UI في Windows — تنبيه المعاينة للمطورين*

![واجهة DSH Web UI في Windows: إعداد مفتاح API فارغ](assets/screenshots/windows-02-api-key-onboarding.png)

*واجهة DSH Web UI في Windows — إعداد مفتاح API فارغ*

![واجهة DSH Web UI في Windows: الصفحة الرئيسية بلا workspace](assets/screenshots/windows-03-empty-workspace.png)

*واجهة DSH Web UI في Windows — الصفحة الرئيسية بلا workspace*

![واجهة DSH Web UI في Windows: إعداد النماذج بحقل مفتاح فارغ](assets/screenshots/windows-04-model-settings.png)

*واجهة DSH Web UI في Windows — إعداد النماذج بحقل مفتاح فارغ*

![واجهة DSH Web UI في Windows: جرد 133 إضافة](assets/screenshots/windows-05-plugin-inventory.png)

*واجهة DSH Web UI في Windows — جرد 133 إضافة*

## 1. ما الذي سيتم تثبيته

Ultimate هو مثبت profile وليس نموذجاً أو تطبيق سطح مكتب رسمياً من DeepSeek AI. يقدم مجموعة إضافات عملية بلا تكرار ومراجعة الترخيص وتثبيت الإصدار؛ وما زلت تحتاج حساب النموذج الخاص بك.

## 2. التحضير وNode.js

جهز جهازاً مدعوماً وإنترنتاً مستقراً وإذن تثبيت لحسابك ومجلد عمل بسيطاً مثل Documents/DSH-Work. ثبّت LTS من nodejs.org ثم أغلق PowerShell أو Terminal وافتحه من جديد.

```text
node --version
```

النتيجة `v22.x.x` أو إصدار رئيسي أعلى تعني النجاح.

## 3. التنزيل والتثبيت

في GitHub اختر Code → Download ZIP، فك الضغط وافتح المجلد الذي فيه package.json وprofile وscripts وwindows. في Windows يمكن النقر مرتين على windows/install-ultimate.cmd؛ وفي macOS/Linux استخدم الأوامر أدناه.

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

### Windows PowerShell

```powershell
node --version
& .\windows\install-ultimate.ps1
```

### macOS / Linux

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

يعرض التثبيت الناجح `Platform filter: windows` أو `Platform filter: macos` أو `Platform filter: linux`.

## 4. التشغيل الأول والنموذج

شغّل DSH من المجلد الذي يجب أن يعمل فيه Agent. العنوان 127.0.0.1 يعني جهازك فقط؛ اترك الطرفية مفتوحة. بعد ذلك افتح Settings → Models وأدخل موفر الخدمة والمفتاح في تلك الشاشة فقط.

### macOS or Linux

```bash
cd "$HOME/Documents/DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

### Windows PowerShell

```powershell
Set-Location "$HOME\Documents\DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

## 5. مساحة العمل والاختبار الأول

اضغط Choose workspace وأضف مجلد العمل واختره وأنشئ جلسة جديدة ثم أرسل أولاً: List the files in this workspace. Do not change anything. ظهور الملفات الصحيحة بلا خطأ نموذج يعني نجاح الإعداد الأساسي.

## 6. تطبيق محلي موجود وإضافات اختيارية

إن كان لديك تطبيق macOS محلي يشغّل profile web، فأغلقه وانسخ ~/.dsh/profiles/web قبل التثبيت فيه. يُحتفظ بـ cordis.patch.yml لكن npm قد يزيل الإضافات خارج manifest. فعّل الهاتف وIM والإشعارات والأمان فقط بعد قراءة COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. التحقق والتحديث والإزالة والأمان

شغّل تدقيق profile؛ يجب أن يكون السطر الأخير Profile dependency integrity: OK. أوقف DSH واحفظ نسخة من profile قبل التحديث. للإزالة أوقف DSH وانقل ~/.dsh/profiles/ultimate إلى سلة المحذوفات. لا تحذف ملفات عشوائية بعد الخطأ ولا تنشر مفتاحاً أو token.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

السطر الأخير المتوقع: `Profile dependency integrity: OK`.

## تحقق المطور

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

المثبت وmanifest بترخيص MIT. تحتفظ المكونات المنزلة بتراخيص upstream ولا يعيد Ultimate ترخيصها.
