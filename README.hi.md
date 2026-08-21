# DeepSeek Harness Ultimate

**DeepSeek Harness में अब इतने प्लगइन हैं कि उन्हें एक-एक करके शांति से तुलना करना कठिन है। Ultimate ने लाइसेंस जांचे, संस्करण तय किए, दोहराव हटाया और उपयोगी विकल्प व्यवस्थित किए हैं, इसलिए आप चुनाव की चिंता के बिना काम शुरू कर सकते हैं।**

> लगभग सभी व्यावहारिक श्रेणियों को कवर करने वाला पुनरुत्पाद्य, चुना हुआ DSH profile: कोडिंग टीमें, workflow, सुरक्षा, शोध और दैनिक automation।

**भाषाएं:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · हिन्दी · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: शुरुआती मार्गदर्शिका](TUTORIAL.hi.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## दृश्य मार्गदर्शिका

ये स्क्रीनशॉट ऐसे साफ profile से हैं जिनमें session, credentials या निजी workspace data नहीं है। macOS चित्र native shell दिखाते हैं; Windows चित्र असली Windows runner पर साझा DSH Web UI दिखाते हैं।

![macOS native app: खाली workspace home](assets/screenshots/macos-03-empty-workspace.jpg)

*macOS native app — खाली workspace home*

![Windows DSH Web UI: खाली workspace home](assets/screenshots/windows-03-empty-workspace.png)

*Windows DSH Web UI — खाली workspace home*

## Ultimate क्यों है

DSH ecosystem तेजी से बढ़ रहा है। दर्जनों repositories के features, licenses, versions, permissions और overlaps की तुलना करना स्वयं एक काम है। Ultimate एक सार्वजनिक manifest में audit योग्य चयन दर्ज करता है।

- हर overlapping role के लिए एक reviewed default चुना जाता है, upstream versions पूर्ण 40-character commit से pin होते हैं, और केवल दर्ज MIT, Apache-2.0 या BSD-3-Clause components लिए जाते हैं। dependencies पहले और बाद में audit होती हैं तथा sensitive integrations optional रहती हैं।

“लगभग सभी practical categories” का अर्थ प्रकाशित हर plugin नहीं है। Ultimate community-maintained है, DeepSeek AI की official release नहीं; upstream authors ownership और license रखते हैं।

## पहले से चुनी गई क्षमताएं

- बड़े कोड कार्य: Agent टीमें, dependency waves, Git worktree isolation, planning और verification।
- workflow और reliability: reusable flows, schedules, conditional wakeups, backups, memory और rules।
- productivity: bookmarks, auto-continue, design skills और Spotlight।
- notifications, IM, calls और authorized security research optional हैं।

TaskSwarm पहले ही dependency waves और Git worktree isolation संभालता है, इसलिए Captain duplicate default के बजाय alternative रहता है। यही नियम EXCLUDED_COMPONENTS.md में लागू है।

## पांच मिनट में शुरुआत

Windows 10/11 x64, macOS या Linux, Node.js 22 या नया और manifest में सार्वजनिक repositories तक नेटवर्क पहुँच चाहिए। ZIP डाउनलोड करने पर Git जरूरी नहीं है।

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

### local profile शुरू करें

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

पहली बार start होने के बाद Settings → Models खोलें, अपना provider और API key जोड़ें और workspace चुनें। Ultimate API key शामिल या copy नहीं करता।

## installer क्या बदलता है

installer उपयोगकर्ता का profile बनाता है, पहले आधिकारिक base और web-app layers रखता है और फिर चुने हुए bundles जोड़ता है। यह credentials, sessions या मौजूदा cordis.patch.yml हटाए बिना install से पहले और बाद में dependencies audit करता है।

## privacy, licenses और सीमाएं

repository में manifest, installer, audit rules और documentation हैं। यह third-party source, node_modules, API keys, phone numbers, email, browser sessions या private configuration को पुनर्वितरित नहीं करता।

repository code MIT है। Downloaded components अपने MIT, Apache-2.0 या BSD-3-Clause licenses और notices रखते हैं। DSH developer preview है और compatibility-breaking changes हो सकते हैं।

## verification और development

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
