# DeepSeek Harness Ultimate: przewodnik dla początkujących

Ten przewodnik zakłada, że nigdy nie używałeś terminala. Wykonuj kroki po kolei i zrób każdą małą kontrolę; wiedza programistyczna nie jest potrzebna.

**Języki przewodnika:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · Polski · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Powrót do opisu](README.pl.md)

## 1. Co zostanie zainstalowane

Ultimate jest instalatorem profile, a nie modelem ani oficjalną aplikacją desktopową DeepSeek AI. Dostarcza praktyczny zestaw bez duplikatów, ze sprawdzonymi licencjami i przypiętymi wersjami; nadal potrzebujesz własnego konta modelu.

## 2. Przygotowanie i Node.js

Przygotuj wspierany komputer, stabilny internet, prawo instalacji dla swojego konta i prosty folder roboczy, np. Documents/DSH-Work. Zainstaluj LTS z nodejs.org, zamknij i ponownie otwórz PowerShell albo Terminal.

```text
node --version
```

`v22.x.x` lub wyższa wersja główna oznacza sukces.

## 3. Pobranie i instalacja

W GitHub wybierz Code → Download ZIP, rozpakuj i otwórz folder z package.json, profile, scripts i windows. W Windows możesz dwukrotnie kliknąć windows/install-ultimate.cmd; w macOS/Linux użyj poleceń poniżej.

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

Poprawna instalacja pokazuje `Platform filter: windows`, `Platform filter: macos` lub `Platform filter: linux`.

## 4. Pierwsze uruchomienie i model

Uruchom DSH z folderu, w którym ma pracować Agent. 127.0.0.1 oznacza tylko twój komputer; zostaw terminal otwarty. Następnie otwórz Settings → Models i wpisz dostawcę oraz klucz tylko na tym ekranie.

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

## 5. Workspace i pierwszy test

Naciśnij Choose workspace, dodaj i wybierz folder roboczy, utwórz sesję i najpierw wyślij: List the files in this workspace. Do not change anything. Prawidłowe pliki bez błędu modelu oznaczają udaną konfigurację podstawową.

## 6. Istniejąca aplikacja lokalna i opcjonalne wtyczki

Jeśli masz lokalną aplikację macOS uruchamiającą profile web, zamknij ją i skopiuj ~/.dsh/profiles/web przed instalacją tam. cordis.patch.yml zostaje, ale npm może usunąć wtyczki poza manifestem. Telefon, IM, powiadomienia i bezpieczeństwo włączaj dopiero po przeczytaniu COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Weryfikacja, aktualizacja, usunięcie i bezpieczeństwo

Uruchom audyt profile; ostatni wiersz musi brzmieć Profile dependency integrity: OK. Przed aktualizacją zatrzymaj DSH i zachowaj profile. Aby usunąć, zatrzymaj DSH i przenieś ~/.dsh/profiles/ultimate do Kosza. Nie kasuj losowych plików po błędzie i nigdy nie publikuj kluczy ani tokenów.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Oczekiwany ostatni wiersz: `Profile dependency integrity: OK`.

## Weryfikacja dla programistów

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Instalator i manifest mają MIT. Pobrane komponenty zachowują licencje upstream; Ultimate nie zmienia ich licencji.
