# DeepSeek Harness Ultimate

**DeepSeek Harness heeft inmiddels te veel plugins om ze rustig één voor één te vergelijken. Ultimate heeft licenties gecontroleerd, versies vastgezet, dubbelen verwijderd en nuttige keuzes geordend, zodat u zonder keuzestress direct kunt werken.**

> Een reproduceerbaar, samengesteld DSH-profiel voor bijna alle praktische categorieën: codingteams, workflows, beveiliging, onderzoek en dagelijkse automatisering.

**Talen:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · Nederlands · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: gids voor beginners](TUTORIAL.nl.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Visuele gids

Deze screenshots komen uit schone profielen zonder sessies, inloggegevens of privégegevens. macOS toont de native shell; Windows toont dezelfde DSH Web UI op een echte Windows-runner.

![Native macOS-app: Start zonder workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Native macOS-app — Start zonder workspace*

![DSH Web UI voor Windows: Start zonder workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI voor Windows — Start zonder workspace*

## Waarom Ultimate bestaat

Het DSH-ecosysteem groeit snel. Functies, licenties, versies, rechten en overlap van tientallen repositories vergelijken is op zichzelf werk. Ultimate legt een controleerbare keuze vast in een openbaar manifest.

- Per overlappende rol is één gecontroleerde standaard gekozen; upstream-versies zijn vastgezet met volledige commits van 40 tekens; alleen vastgelegde MIT, Apache-2.0 of BSD-3-Clause worden opgenomen; afhankelijkheden worden vooraf en achteraf gecontroleerd; gevoelige integraties blijven optioneel.

“Bijna alle praktische categorieën” betekent niet elke ooit gepubliceerde plugin. Ultimate wordt door de gemeenschap onderhouden en is geen officiële DeepSeek AI-versie; upstream-auteurs behouden eigendom en licentie.

## Wat al is gekozen

- Grote codewerkzaamheden: Agent-teams, afhankelijkheidsgolven, Git-worktree-isolatie, planning en verificatie.
- Workflow en betrouwbaarheid: herbruikbare processen, planning, voorwaardelijk ontwaken, back-ups, geheugen en regels.
- Productiviteit: bladwijzers, automatisch doorgaan, design-skills en Spotlight.
- Meldingen, IM, telefoongesprekken en geautoriseerd beveiligingsonderzoek zijn optioneel.

TaskSwarm dekt afhankelijkheidsgolven en Git-worktree-isolatie al; Captain blijft daarom een alternatief en geen dubbele standaard. Dezelfde regel geldt in EXCLUDED_COMPONENTS.md.

## Start in vijf minuten

Windows 10/11 x64, macOS of Linux, Node.js 22 of nieuwer en netwerktoegang tot de openbare repositories in het manifest zijn nodig. Git is niet nodig bij het downloaden van ZIP.

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

### Lokaal profile starten

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Open na de eerste start Settings → Models, voeg uw eigen provider en API-sleutel toe en kies een workspace. Ultimate bevat of kopieert nooit sleutels.

## Wat de installer wijzigt

De installer maakt een gebruikersprofile, plaatst eerst de officiële base- en web-app-lagen en voegt daarna de geselecteerde bundles toe. Hij controleert afhankelijkheden voor en na installatie zonder gegevens, sessies of bestaande cordis.patch.yml te verwijderen.

## Privacy, licenties en grenzen

De repository bevat manifest, installer, auditregels en documentatie. Hij verspreidt geen broncode van derden, node_modules, API-sleutels, telefoonnummers, e-mail, browsersessies of privéconfiguratie.

De repositorycode gebruikt MIT. Gedownloade componenten behouden hun MIT-, Apache-2.0- of BSD-3-Clause-licenties en meldingen. DSH blijft een ontwikkelaarspreview en kan incompatibele wijzigingen invoeren.

## Controle en ontwikkeling

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
