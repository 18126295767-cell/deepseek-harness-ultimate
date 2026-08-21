# DeepSeek Harness Ultimate: руководство для новичков

Это руководство рассчитано на человека, который никогда не пользовался терминалом. Выполняйте шаги по порядку и делайте небольшие проверки; программирование не требуется.

**Языки руководства:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · Русский · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Вернуться к описанию](README.ru.md)

## Наглядный обзор

Эти снимки сделаны из чистых profile без сессий, учётных данных и личных данных workspace. На macOS показана нативная оболочка, а на Windows — та же DSH Web UI на настоящем Windows runner.

![Нативное приложение macOS: Уведомление о предварительной версии](assets/screenshots/macos-01-developer-preview.jpg)

*Нативное приложение macOS — Уведомление о предварительной версии*

![Нативное приложение macOS: Настройка с пустым API-ключом](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Нативное приложение macOS — Настройка с пустым API-ключом*

![Нативное приложение macOS: Главная страница без workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Нативное приложение macOS — Главная страница без workspace*

![Нативное приложение macOS: Модели с пустым полем ключа](assets/screenshots/macos-04-model-settings.jpg)

*Нативное приложение macOS — Модели с пустым полем ключа*

![Нативное приложение macOS: Инвентарь из 133 плагинов](assets/screenshots/macos-05-plugin-inventory.jpg)

*Нативное приложение macOS — Инвентарь из 133 плагинов*

![DSH Web UI в Windows: Уведомление о предварительной версии](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI в Windows — Уведомление о предварительной версии*

![DSH Web UI в Windows: Настройка с пустым API-ключом](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI в Windows — Настройка с пустым API-ключом*

![DSH Web UI в Windows: Главная страница без workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI в Windows — Главная страница без workspace*

![DSH Web UI в Windows: Модели с пустым полем ключа](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI в Windows — Модели с пустым полем ключа*

![DSH Web UI в Windows: Инвентарь из 133 плагинов](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI в Windows — Инвентарь из 133 плагинов*

## 1. Что устанавливается

Ultimate - это установщик profile, а не модель и не официальное настольное приложение DeepSeek AI. Он дает проверенный набор плагинов без дубликатов и с закрепленными версиями; учетная запись модели должна быть вашей.

## 2. Подготовка и Node.js

Подготовьте поддерживаемый компьютер, стабильный интернет, право установки для своей учетной записи и простой рабочий каталог, например Documents/DSH-Work. Установите LTS на nodejs.org, затем закройте и снова откройте PowerShell или Terminal.

```text
node --version
```

Результат `v22.x.x` или более новая основная версия означает успех.

## 3. Загрузка и установка

На GitHub выберите Code → Download ZIP, распакуйте архив и откройте каталог с package.json, profile, scripts и windows. В Windows можно дважды щелкнуть windows/install-ultimate.cmd; в macOS/Linux используйте команды ниже.

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

При успешной установке отображается `Platform filter: windows`, `Platform filter: macos` или `Platform filter: linux`.

## 4. Первый запуск и модель

Запускайте DSH из папки, где должен работать Agent. 127.0.0.1 означает только ваш компьютер; не закрывайте терминал. Затем откройте Settings → Models и вводите свой провайдер и ключ только там.

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

## 5. Workspace и первая проверка

Нажмите Choose workspace, добавьте и выберите рабочую папку, создайте новую сессию. Сначала попросите: List the files in this workspace. Do not change anything. Правильный список файлов без ошибки модели означает успех.

## 6. Существующее локальное приложение и дополнительные плагины

Если уже есть локальное приложение macOS, запускающее profile web, выйдите из него и скопируйте ~/.dsh/profiles/web до установки туда. cordis.patch.yml сохраняется, но npm может удалить плагины вне manifest. Телефон, IM, уведомления и безопасность включайте только после чтения COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Проверка, обновление, удаление и безопасность

Запустите аудит profile; последняя строка должна быть Profile dependency integrity: OK. Перед обновлением остановите DSH и сохраните profile. Для удаления остановите DSH и переместите ~/.dsh/profiles/ultimate в корзину. Не удаляйте случайные файлы при ошибке и никогда не публикуйте ключи или токены.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Ожидаемая последняя строка: `Profile dependency integrity: OK`.

## Проверка для разработчиков

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Установщик и manifest используют MIT. Загруженные компоненты сохраняют upstream-лицензии; Ultimate не перелицензирует их.
