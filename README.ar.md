# DeepSeek Harness Ultimate

**يحتوي DeepSeek Harness الآن على إضافات أكثر مما يمكن مقارنته واحدةً واحدة بهدوء. قام Ultimate بالفعل بمراجعة التراخيص وتثبيت الإصدارات وإزالة التكرار وترتيب الخيارات المفيدة، حتى تبدأ العمل دون قلق من الاختيار.**

> ملف DSH منتقى وقابل لإعادة الإنتاج يغطي تقريباً كل الفئات العملية: فرق البرمجة، وسير العمل، والأمان، والبحث، والأتمتة اليومية.

**اللغات:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · العربية · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: دليل المبتدئين](TUTORIAL.ar.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## دليل مرئي

هذه اللقطات من profile نظيف بلا جلسات أو بيانات اعتماد أو بيانات workspace خاصة. صور macOS تعرض الغلاف الأصلي، وصور Windows تعرض واجهة DSH Web UI نفسها على runner حقيقي.

![تطبيق macOS الأصلي: الصفحة الرئيسية بلا workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*تطبيق macOS الأصلي — الصفحة الرئيسية بلا workspace*

![واجهة DSH Web UI في Windows: الصفحة الرئيسية بلا workspace](assets/screenshots/windows-03-empty-workspace.png)

*واجهة DSH Web UI في Windows — الصفحة الرئيسية بلا workspace*

## لماذا يوجد Ultimate

ينمو نظام DSH بسرعة. مقارنة وظائف وتراخيص وإصدارات وصلاحيات وتداخلات عشرات المستودعات عمل بحد ذاته. يسجل Ultimate اختياراً قابلاً للتدقيق في manifest عام.

- يُختار إعداد افتراضي واحد مُراجع لكل دور متداخل، وتُثبّت إصدارات upstream عبر commit كامل من 40 محرفاً، ولا تُقبل إلا تراخيص MIT أو Apache-2.0 أو BSD-3-Clause المسجلة. تُفحص التبعيات قبل التثبيت وبعده وتبقى التكاملات الحساسة اختيارية.

عبارة «تقريباً كل الفئات العملية» لا تعني كل إضافة نُشرت. Ultimate مشروع مجتمعي وليس إصداراً رسمياً من DeepSeek AI؛ يحتفظ مؤلفو upstream بالملكية والتراخيص.

## ما تم اختياره مسبقاً

- مهام برمجية كبيرة: فرق Agent، موجات التبعيات، عزل Git worktree، التخطيط والتحقق.
- سير العمل والموثوقية: تدفقات قابلة لإعادة الاستخدام، جدولة، إيقاظ مشروط، نسخ احتياطي، ذاكرة وقواعد.
- الإنتاجية: إشارات مرجعية، متابعة تلقائية، مهارات تصميم وSpotlight.
- الإشعارات وIM والاتصالات وأبحاث الأمان المصرح بها اختيارية.

يغطي TaskSwarm موجات التبعيات وعزل Git worktree بالفعل، لذلك يبقى Captain بديلاً بدلاً من إعداد افتراضي مكرر. تنطبق القاعدة نفسها في EXCLUDED_COMPONENTS.md.

## البدء خلال خمس دقائق

تحتاج إلى Windows 10/11 x64 أو macOS أو Linux وNode.js 22 أو أحدث واتصال بالشبكة إلى المستودعات العامة في manifest. لا يلزم Git عند تنزيل ZIP.

### macOS / Linux

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

### Windows PowerShell

```powershell
node --version
& .\windows\install-ultimate.ps1
```

### تشغيل profile المحلي

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

بعد التشغيل الأول افتح Settings → Models وأضف موفر الخدمة ومفتاح API الخاصين بك ثم اختر workspace. لا يحتوي Ultimate على مفاتيح API ولا ينسخها.

## ما الذي يغيره المثبت

ينشئ المثبت profile للمستخدم، ويضع طبقتي base وweb-app الرسميتين أولاً ثم bundleات المختارة. يفحص التبعيات قبل وبعد التثبيت دون حذف بيانات الاعتماد أو الجلسات أو cordis.patch.yml الموجود.

## الخصوصية والتراخيص والحدود

يحتوي المستودع على manifest والمثبت وقواعد التدقيق والوثائق. ولا يعيد توزيع مصدر طرف ثالث أو node_modules أو مفاتيح API أو أرقام هواتف أو بريد أو جلسات متصفح أو إعدادات خاصة.

كود المستودع بترخيص MIT. تحتفظ المكونات المنزلة بتراخيص وإشعارات MIT أو Apache-2.0 أو BSD-3-Clause. ما زال DSH إصدار معاينة للمطورين وقد يغيّر التوافق.

## التحقق والتطوير

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
