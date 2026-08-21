# DeepSeek Harness Ultimate

**DeepSeek Harness ha ormai più plugin di quanti sia ragionevole confrontare uno per uno. Ultimate ha già verificato le licenze, fissato le versioni, eliminato i duplicati e ordinato le opzioni utili: puoi iniziare senza ansia da scelta.**

> Un profilo DSH riproducibile e selezionato per quasi tutte le categorie pratiche: team di sviluppo, workflow, sicurezza, ricerca e automazione quotidiana.

**Lingue:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · Italiano · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: guida per principianti](TUTORIAL.it.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Guida visiva

Queste schermate provengono da profile puliti senza sessioni, credenziali o dati privati del workspace. Le immagini macOS mostrano lo shell nativo; quelle Windows mostrano la DSH Web UI condivisa su un runner Windows reale.

![App nativa macOS: Home senza workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*App nativa macOS — Home senza workspace*

![DSH Web UI Windows: Home senza workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI Windows — Home senza workspace*

## Perché esiste Ultimate

L’ecosistema DSH cresce rapidamente. Confrontare funzioni, licenze, versioni, permessi e sovrapposizioni di decine di repository è un lavoro a sé. Ultimate registra una scelta verificabile in un manifest pubblico.

- Per ogni ruolo sovrapposto viene scelto un solo valore predefinito revisionato; le versioni upstream sono fissate con commit completi di 40 caratteri; entrano solo licenze MIT, Apache-2.0 o BSD-3-Clause registrate; le dipendenze sono controllate prima e dopo; le integrazioni sensibili restano facoltative.

“Quasi tutte le categorie pratiche” non significa ogni plugin pubblicato. Ultimate è mantenuto dalla comunità e non è una versione ufficiale DeepSeek AI; gli autori upstream conservano proprietà e licenza.

## Cosa è già stato scelto

- Grandi attività di codice: team Agent, ondate di dipendenze, isolamento Git worktree, pianificazione e verifica.
- Workflow e affidabilità: flussi riutilizzabili, pianificazioni, risvegli condizionali, backup, memoria e regole.
- Produttività: segnalibri, continuazione automatica, skill di design e Spotlight.
- Notifiche, IM, chiamate e ricerca di sicurezza autorizzata sono facoltative.

TaskSwarm copre già le ondate di dipendenze e l’isolamento Git worktree; Captain resta quindi un’alternativa e non un valore predefinito duplicato. La stessa regola vale in EXCLUDED_COMPONENTS.md.

## Avvio in cinque minuti

Servono Windows 10/11 x64, macOS o Linux, Node.js 22 o successivo e accesso ai repository pubblici del manifest. Git non è obbligatorio se si scarica il ZIP.

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

### Avviare il profile locale

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Dopo il primo avvio apri Settings → Models, aggiungi il tuo provider e la tua chiave API e scegli un workspace. Ultimate non include né copia chiavi.

## Cosa modifica l’installer

L’installer crea un profile utente, mette prima i layer ufficiali base e web-app e poi i bundle selezionati. Controlla le dipendenze prima e dopo senza eliminare credenziali, sessioni o un cordis.patch.yml esistente.

## Privacy, licenze e limiti

Il repository contiene manifest, installer, regole di audit e documentazione. Non ridistribuisce codice di terzi, node_modules, chiavi API, telefoni, email, sessioni del browser o configurazione privata.

Il codice del repository usa MIT. I componenti scaricati mantengono licenze e avvisi MIT, Apache-2.0 o BSD-3-Clause. DSH resta una preview per sviluppatori e può introdurre cambiamenti incompatibili.

## Verifica e sviluppo

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
