# DeepSeek Harness Ultimate: посібник для початківців

Цей посібник розрахований на тих, хто ніколи не користувався терміналом. Виконуйте кроки по порядку й проходьте кожну маленьку перевірку; знання програмування не потрібні.

**Мови посібника:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · Українська

[Повернутися до опису](README.uk.md)

## Візуальний гід

Ці знімки зроблено з чистих profile без сесій, облікових даних і приватних даних workspace. Зображення macOS показують нативну оболонку, а Windows — той самий DSH Web UI на справжньому Windows runner.

![Нативна програма macOS: Повідомлення про попередню версію](assets/screenshots/macos-01-developer-preview.jpg)

*Нативна програма macOS — Повідомлення про попередню версію*

![Нативна програма macOS: Початкове налаштування з порожнім API-ключем](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Нативна програма macOS — Початкове налаштування з порожнім API-ключем*

![Нативна програма macOS: Домашня сторінка без workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Нативна програма macOS — Домашня сторінка без workspace*

![Нативна програма macOS: Налаштування моделей із порожнім полем ключа](assets/screenshots/macos-04-model-settings.jpg)

*Нативна програма macOS — Налаштування моделей із порожнім полем ключа*

![Нативна програма macOS: Інвентар 133 плагінів](assets/screenshots/macos-05-plugin-inventory.jpg)

*Нативна програма macOS — Інвентар 133 плагінів*

![DSH Web UI у Windows: Повідомлення про попередню версію](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI у Windows — Повідомлення про попередню версію*

![DSH Web UI у Windows: Початкове налаштування з порожнім API-ключем](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI у Windows — Початкове налаштування з порожнім API-ключем*

![DSH Web UI у Windows: Домашня сторінка без workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI у Windows — Домашня сторінка без workspace*

![DSH Web UI у Windows: Налаштування моделей із порожнім полем ключа](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI у Windows — Налаштування моделей із порожнім полем ключа*

![DSH Web UI у Windows: Інвентар 133 плагінів](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI у Windows — Інвентар 133 плагінів*

## 1. Що буде встановлено

Ultimate - це інсталятор profile, а не модель і не офіційна настільна програма DeepSeek AI. Він надає практичний набір без дублікатів, з перевіреними ліцензіями і зафіксованими версіями; вам усе одно потрібен власний обліковий запис моделі.

## 2. Підготовка та Node.js

Підготуйте підтримуваний комп’ютер, стабільний інтернет, дозвіл встановлення для свого облікового запису та просту робочу папку, наприклад Documents/DSH-Work. Встановіть LTS з nodejs.org, закрийте й знову відкрийте PowerShell або Terminal.

```text
node --version
```

`v22.x.x` або вища основна версія означає успіх.

## 3. Завантаження й встановлення

На GitHub оберіть Code → Download ZIP, розпакуйте і відкрийте папку з package.json, profile, scripts і windows. У Windows можна двічі натиснути windows/install-ultimate.cmd; у macOS/Linux використовуйте команди нижче.

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

Успішне встановлення показує `Platform filter: windows`, `Platform filter: macos` або `Platform filter: linux`.

## 4. Перший запуск і модель

Запускайте DSH з папки, де має працювати Agent. 127.0.0.1 означає лише ваш комп’ютер; залиште термінал відкритим. Далі відкрийте Settings → Models і введіть провайдера та ключ тільки на цьому екрані.

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

## 5. Workspace і перша перевірка

Натисніть Choose workspace, додайте й виберіть робочу папку, створіть нову сесію та спочатку надішліть: List the files in this workspace. Do not change anything. Правильні файли без помилки моделі означають успішне базове налаштування.

## 6. Наявна локальна програма та додаткові плагіни

Якщо вже є локальна програма macOS, що запускає profile web, закрийте її і скопіюйте ~/.dsh/profiles/web перед встановленням туди. cordis.patch.yml збережеться, але npm може видалити плагіни поза manifest. Увімкніть телефон, IM, сповіщення та безпеку лише після COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Перевірка, оновлення, видалення й безпека

Запустіть аудит profile; останній рядок має бути Profile dependency integrity: OK. Перед оновленням зупиніть DSH і збережіть profile. Для видалення зупиніть DSH і перемістіть ~/.dsh/profiles/ultimate у кошик. Не видаляйте випадкові файли після помилки й ніколи не публікуйте ключі або токени.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Очікуваний останній рядок: `Profile dependency integrity: OK`.

## Перевірка для розробників

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Інсталятор і manifest мають MIT. Завантажені компоненти зберігають upstream-ліцензії; Ultimate не змінює їх.
