# DeepSeek Harness Ultimate

**В DeepSeek Harness уже слишком много плагинов, чтобы спокойно сравнивать их по одному. Ultimate уже проверил лицензии, закрепил версии, убрал дубли и упорядочил полезные варианты, чтобы вы могли сразу начать работу без тревоги выбора.**

> Воспроизводимый отобранный профиль DSH, охватывающий почти все практические категории: команды разработки, workflow, безопасность, исследования и ежедневную автоматизацию.

**Языки:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · Русский · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: руководство для новичков](TUTORIAL.ru.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Наглядный обзор

Эти снимки сделаны из чистых profile без сессий, учётных данных и личных данных workspace. На macOS показана нативная оболочка, а на Windows — та же DSH Web UI на настоящем Windows runner.

![Нативное приложение macOS: Главная страница без workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Нативное приложение macOS — Главная страница без workspace*

![DSH Web UI в Windows: Главная страница без workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI в Windows — Главная страница без workspace*

## Зачем нужен Ultimate

Экосистема DSH быстро растет. Сравнение функций, лицензий, версий, разрешений и пересечений десятков репозиториев само по себе является работой. Ultimate фиксирует проверяемый выбор в открытом manifest.

- Для каждой пересекающейся роли выбран один проверенный вариант; upstream-версии закреплены полными 40-значными commit; допускаются только записанные MIT, Apache-2.0 или BSD-3-Clause; зависимости проверяются до и после установки; чувствительные интеграции остаются необязательными.

«Почти все практические категории» не означает все опубликованные плагины. Ultimate поддерживается сообществом и не является официальной версией DeepSeek AI; авторы upstream сохраняют права и лицензии.

## Что уже выбрано

- Крупные задачи разработки: команды Agent, волны зависимостей, изоляция Git worktree, планирование и проверка.
- Workflow и надежность: повторно используемые процессы, расписания, условный запуск, резервные копии, память и правила.
- Продуктивность: закладки, автопродолжение, навыки дизайна и Spotlight.
- Уведомления, IM, звонки и авторизованные инструменты безопасности остаются необязательными.

TaskSwarm уже покрывает волны зависимостей и изоляцию Git worktree, поэтому Captain остается альтернативой, а не дублирующим стандартом. То же правило действует в EXCLUDED_COMPONENTS.md.

## Запуск за пять минут

Нужны Windows 10/11 x64, macOS или Linux, Node.js 22 или новее и доступ к публичным репозиториям manifest. При загрузке ZIP Git не обязателен.

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

После первого запуска откройте Settings → Models, добавьте свой провайдер и API-ключ, затем выберите workspace. Ultimate никогда не содержит и не копирует ключи.

## Что меняет установщик

Установщик создает пользовательский profile, сначала добавляет официальные слои base и web-app, затем выбранные bundles. Он проверяет зависимости до и после установки, не удаляя учетные данные, сессии или существующий cordis.patch.yml.

## Приватность, лицензии и ограничения

Репозиторий содержит manifest, установщик, правила аудита и документацию. Он не распространяет чужой исходный код, node_modules, ключи API, телефоны, почту, браузерные сессии или приватную конфигурацию.

Код репозитория использует MIT. Загруженные компоненты сохраняют лицензии и уведомления MIT, Apache-2.0 или BSD-3-Clause. DSH остается предварительной версией и может вносить несовместимые изменения.

## Проверка и разработка

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
