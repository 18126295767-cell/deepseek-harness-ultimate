# DeepSeek Harness Ultimate: शुरुआती मार्गदर्शिका

यह मार्गदर्शिका उन लोगों के लिए है जिन्होंने कभी terminal उपयोग नहीं किया। कदम क्रम में करें और हर छोटी जांच पूरी करें; programming ज्ञान की आवश्यकता नहीं है।

**मार्गदर्शिका भाषाएं:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · हिन्दी · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[परिचय पर लौटें](README.hi.md)

## 1. क्या स्थापित होगा

Ultimate एक profile installer है, model या DeepSeek AI का official desktop app नहीं। यह license-reviewed, version-pinned और duplicate-free practical plugin selection देता है; आपको अपना model account फिर भी चाहिए।

## 2. तैयारी और Node.js

एक supported computer, stable internet, अपने account के लिए install permission और Documents/DSH-Work जैसा सरल work folder तैयार करें। nodejs.org से LTS install करें, फिर PowerShell या Terminal बंद कर दोबारा खोलें।

```text
node --version
```

`v22.x.x` या उससे ऊंचा major version सफलता है।

## 3. डाउनलोड और install

GitHub पर Code → Download ZIP चुनें, extract करें और package.json, profile, scripts तथा windows वाला folder खोलें। Windows में windows/install-ultimate.cmd को double-click कर सकते हैं; macOS/Linux पर नीचे के commands चलाएं।

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

सफल install में `Platform filter: windows`, `Platform filter: macos` या `Platform filter: linux` दिखता है।

## 4. पहला start और model

जिस folder में Agent को काम करना है वहां से DSH start करें। 127.0.0.1 केवल आपका computer है; terminal खुला रखें। फिर Settings → Models खोलें और provider तथा key केवल उसी screen में भरें।

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

## 5. workspace और पहला test

Choose workspace दबाएं, work folder जोड़कर चुनें, नया session बनाएं और पहले भेजें: List the files in this workspace. Do not change anything. सही files दिखें और model error न हो तो basic setup सफल है।

## 6. मौजूदा local app और optional plugins

यदि आपके पास web profile चलाने वाला local macOS app है, उसे बंद करें और वहां install से पहले ~/.dsh/profiles/web की copy रखें। cordis.patch.yml रहता है, पर npm manifest के बाहर के plugins हटा सकता है। phone, IM, notification और security केवल COMPONENTS.md पढ़कर enable करें।

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. verify, update, remove और सुरक्षा

profile audit चलाएं; अंतिम line Profile dependency integrity: OK होनी चाहिए। update से पहले DSH रोकें और profile backup करें। remove करने के लिए DSH रोकें और ~/.dsh/profiles/ultimate को Trash में ले जाएं। error पर random files न हटाएं और key या token कभी public न करें।

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

अपेक्षित अंतिम line: `Profile dependency integrity: OK`.

## developer verification

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

installer और manifest MIT हैं। Downloaded components अपने upstream licenses रखते हैं; Ultimate उन्हें relicense नहीं करता।
