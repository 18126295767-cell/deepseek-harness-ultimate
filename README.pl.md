# DeepSeek Harness Ultimate

**DeepSeek Harness ma już zbyt wiele wtyczek, aby rozsądnie porównywać je pojedynczo. Ultimate sprawdził licencje, przypiął wersje, usunął duplikaty i uporządkował użyteczne opcje, więc możesz zacząć pracę bez lęku przed wyborem.**

> Odtwarzalny, wyselekcjonowany profil DSH obejmujący prawie wszystkie praktyczne kategorie: zespoły programistyczne, workflow, bezpieczeństwo, badania i codzienną automatyzację.

**Języki:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · Polski · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: przewodnik dla początkujących](TUTORIAL.pl.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Dlaczego istnieje Ultimate

Ekosystem DSH szybko rośnie. Porównanie funkcji, licencji, wersji, uprawnień i nakładania się dziesiątek repozytoriów jest pracą samą w sobie. Ultimate zapisuje audytowalny wybór w publicznym manifeście.

- Dla każdej nakładającej się roli wybrano jeden sprawdzony standard; wersje upstream są przypięte pełnym 40-znakowym commit; dopuszczane są tylko zapisane MIT, Apache-2.0 lub BSD-3-Clause; zależności są sprawdzane przed i po; wrażliwe integracje pozostają opcjonalne.

„Prawie wszystkie praktyczne kategorie” nie oznacza wszystkich opublikowanych wtyczek. Ultimate jest utrzymywany przez społeczność i nie jest oficjalnym wydaniem DeepSeek AI; autorzy upstream zachowują prawa i licencje.

## Co zostało już wybrane

- Duże zadania kodowe: zespoły Agent, fale zależności, izolacja Git worktree, planowanie i weryfikacja.
- Workflow i niezawodność: ponowne użycie przepływów, harmonogramy, warunkowe wybudzanie, kopie zapasowe, pamięć i reguły.
- Produktywność: zakładki, automatyczne kontynuowanie, umiejętności designu i Spotlight.
- Powiadomienia, IM, rozmowy i autoryzowane badania bezpieczeństwa są opcjonalne.

TaskSwarm obejmuje już fale zależności i izolację Git worktree, więc Captain pozostaje alternatywą, a nie zduplikowanym standardem. Ta sama zasada obowiązuje w EXCLUDED_COMPONENTS.md.

## Start w pięć minut

Wymagane są Windows 10/11 x64, macOS albo Linux, Node.js 22 lub nowszy oraz dostęp do publicznych repozytoriów z manifestu. Git nie jest wymagany przy pobraniu ZIP.

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

### Uruchomienie lokalnego profile

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Po pierwszym uruchomieniu otwórz Settings → Models, dodaj własnego dostawcę i klucz API, a następnie wybierz workspace. Ultimate nie zawiera ani nie kopiuje kluczy.

## Co zmienia instalator

Instalator tworzy profile użytkownika, najpierw umieszcza oficjalne warstwy base i web-app, a potem wybrane bundle. Sprawdza zależności przed i po instalacji bez usuwania poświadczeń, sesji ani istniejącego cordis.patch.yml.

## Prywatność, licencje i ograniczenia

Repozytorium zawiera manifest, instalator, reguły audytu i dokumentację. Nie redystrybuuje kodu stron trzecich, node_modules, kluczy API, telefonów, e-maili, sesji przeglądarki ani prywatnej konfiguracji.

Kod repozytorium ma licencję MIT. Pobrane komponenty zachowują licencje i noty MIT, Apache-2.0 lub BSD-3-Clause. DSH jest nadal wersją deweloperską i może wprowadzać niezgodne zmiany.

## Weryfikacja i rozwój

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
