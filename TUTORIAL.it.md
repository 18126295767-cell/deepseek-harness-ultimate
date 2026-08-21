# DeepSeek Harness Ultimate: guida per principianti

Questa guida presuppone che tu non abbia mai usato un terminale. Segui i passaggi in ordine e svolgi ogni verifica; non servono conoscenze di programmazione.

**Lingue della guida:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · Italiano · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Torna alla presentazione](README.it.md)

## Guida visiva

Queste schermate provengono da profile puliti senza sessioni, credenziali o dati privati del workspace. Le immagini macOS mostrano lo shell nativo; quelle Windows mostrano la DSH Web UI condivisa su un runner Windows reale.

![App nativa macOS: Avviso di anteprima per sviluppatori](assets/screenshots/macos-01-developer-preview.jpg)

*App nativa macOS — Avviso di anteprima per sviluppatori*

![App nativa macOS: Onboarding con API Key vuota](assets/screenshots/macos-02-api-key-onboarding.jpg)

*App nativa macOS — Onboarding con API Key vuota*

![App nativa macOS: Home senza workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*App nativa macOS — Home senza workspace*

![App nativa macOS: Impostazioni modello con chiave vuota](assets/screenshots/macos-04-model-settings.jpg)

*App nativa macOS — Impostazioni modello con chiave vuota*

![App nativa macOS: Inventario di 133 plugin](assets/screenshots/macos-05-plugin-inventory.jpg)

*App nativa macOS — Inventario di 133 plugin*

![DSH Web UI Windows: Avviso di anteprima per sviluppatori](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI Windows — Avviso di anteprima per sviluppatori*

![DSH Web UI Windows: Onboarding con API Key vuota](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI Windows — Onboarding con API Key vuota*

![DSH Web UI Windows: Home senza workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI Windows — Home senza workspace*

![DSH Web UI Windows: Impostazioni modello con chiave vuota](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI Windows — Impostazioni modello con chiave vuota*

![DSH Web UI Windows: Inventario di 133 plugin](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI Windows — Inventario di 133 plugin*

## 1. Cosa viene installato

Ultimate è un installer di profile, non un modello né un’app desktop ufficiale di DeepSeek AI. Offre una selezione pratica senza duplicati, con licenze verificate e versioni fissate; il tuo account modello resta necessario.

## 2. Preparazione e Node.js

Prepara un computer supportato, internet stabile, autorizzazione a installare per il tuo utente e una cartella semplice come Documents/DSH-Work. Installa LTS da nodejs.org e riapri PowerShell o Terminal.

```text
node --version
```

`v22.x.x` o una versione principale superiore indica successo.

## 3. Scaricare e installare

Su GitHub scegli Code → Download ZIP, estrai e apri la cartella con package.json, profile, scripts e windows. In Windows puoi fare doppio clic su windows/install-ultimate.cmd; in macOS/Linux usa i comandi sotto.

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

Un’installazione riuscita mostra `Platform filter: windows`, `Platform filter: macos` o `Platform filter: linux`.

## 4. Primo avvio e modello

Avvia DSH dalla cartella in cui deve lavorare l’Agent. 127.0.0.1 indica solo il tuo computer; lascia aperto il terminale. Poi apri Settings → Models e inserisci provider e chiave solo in quella schermata.

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

## 5. Workspace e primo test

Premi Choose workspace, aggiungi e seleziona la cartella, crea una sessione e invia prima: List the files in this workspace. Do not change anything. Se compaiono i file corretti senza errore di modello, la configurazione base funziona.

## 6. App locale esistente e plugin facoltativi

Se hai già un’app macOS locale che avvia il profile web, chiudila e copia ~/.dsh/profiles/web prima di installare lì. cordis.patch.yml viene mantenuto, ma npm può rimuovere plugin fuori dal manifest. Attiva telefono, IM, notifiche e sicurezza solo dopo COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Verificare, aggiornare, rimuovere e proteggersi

Esegui l’audit del profile: l’ultima riga deve essere Profile dependency integrity: OK. Prima di aggiornare ferma DSH e salva il profile. Per rimuovere, ferma DSH e sposta ~/.dsh/profiles/ultimate nel Cestino. Non eliminare file casuali dopo un errore e non pubblicare mai chiavi o token.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Ultima riga prevista: `Profile dependency integrity: OK`.

## Verifica per sviluppatori

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Installer e manifest usano MIT. I componenti scaricati conservano le licenze upstream; Ultimate non li rilicenzia.
