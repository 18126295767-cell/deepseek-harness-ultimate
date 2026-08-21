# DeepSeek Harness Ultimate

**У DeepSeek Harness уже надто багато плагінів, щоб спокійно порівнювати їх по одному. Ultimate перевірив ліцензії, зафіксував версії, прибрав дублікати та впорядкував корисні варіанти, тому ви можете почати роботу без тривоги вибору.**

> Відтворюваний відібраний профіль DSH, що охоплює майже всі практичні категорії: команди кодування, workflow, безпеку, дослідження та щоденну автоматизацію.

**Мови:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · Українська

[DeepSeek Harness Ultimate: посібник для початківців](TUTORIAL.uk.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Візуальний гід

Ці знімки зроблено з чистих profile без сесій, облікових даних і приватних даних workspace. Зображення macOS показують нативну оболонку, а Windows — той самий DSH Web UI на справжньому Windows runner.

![Нативна програма macOS: Домашня сторінка без workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Нативна програма macOS — Домашня сторінка без workspace*

![DSH Web UI у Windows: Домашня сторінка без workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI у Windows — Домашня сторінка без workspace*

## Навіщо потрібен Ultimate

Екосистема DSH швидко зростає. Порівняння функцій, ліцензій, версій, дозволів і перетинів десятків репозиторіїв саме по собі є роботою. Ultimate записує перевірюваний вибір у публічному manifest.

- Для кожної ролі, що перетинається, обрано один перевірений стандарт; upstream-версії закріплено повними 40-символьними commit; приймаються лише записані MIT, Apache-2.0 або BSD-3-Clause; залежності перевіряються до і після; чутливі інтеграції лишаються необов’язковими.

«Майже всі практичні категорії» не означає всі опубліковані плагіни. Ultimate підтримує спільнота, і це не офіційний випуск DeepSeek AI; upstream-автори зберігають права та ліцензії.

## Що вже вибрано

- Великі завдання коду: команди Agent, хвилі залежностей, ізоляція Git worktree, планування та перевірка.
- Workflow і надійність: повторно використовувані процеси, розклади, умовне пробудження, резервні копії, пам’ять і правила.
- Продуктивність: закладки, автопродовження, design skills і Spotlight.
- Сповіщення, IM, дзвінки та авторизовані дослідження безпеки є необов’язковими.

TaskSwarm уже охоплює хвилі залежностей та ізоляцію Git worktree, тому Captain лишається альтернативою, а не дубльованим стандартом. Те саме правило діє в EXCLUDED_COMPONENTS.md.

## Старт за п’ять хвилин

Потрібні Windows 10/11 x64, macOS або Linux, Node.js 22 чи новіший і доступ до публічних репозиторіїв у manifest. Якщо завантажуєте ZIP, Git не обов’язковий.

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

### Запуск локального profile

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Після першого запуску відкрийте Settings → Models, додайте власного провайдера й API-ключ, потім виберіть workspace. Ultimate не містить і не копіює ключі.

## Що змінює інсталятор

Інсталятор створює profile користувача, спочатку додає офіційні шари base і web-app, а потім вибрані bundles. Він перевіряє залежності до і після встановлення, не видаляючи облікові дані, сесії чи наявний cordis.patch.yml.

## Приватність, ліцензії та обмеження

Репозиторій містить manifest, інсталятор, правила аудиту й документацію. Він не розповсюджує чужий вихідний код, node_modules, API-ключі, телефони, електронну пошту, браузерні сесії чи приватну конфігурацію.

Код репозиторію має MIT. Завантажені компоненти зберігають ліцензії й повідомлення MIT, Apache-2.0 або BSD-3-Clause. DSH лишається попередньою версією й може вносити несумісні зміни.

## Перевірка й розробка

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
