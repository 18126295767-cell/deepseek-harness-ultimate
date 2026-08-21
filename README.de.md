# DeepSeek Harness Ultimate

**DeepSeek Harness hat inzwischen mehr Plugins, als man sinnvoll einzeln vergleichen kann. Ultimate hat Lizenzen geprüft, Versionen festgeschrieben, Doppelungen entfernt und die nützlichen Optionen geordnet, damit Sie sofort arbeiten können.**

> Ein reproduzierbares, kuratiertes DSH-Profil für fast alle praktischen Bereiche: Coding-Teams, Workflows, Sicherheit, Forschung und tägliche Automatisierung.

**Sprachen:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · Deutsch · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: Anleitung für Einsteiger](TUTORIAL.de.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Bilder zur Orientierung

Diese Aufnahmen stammen aus sauberen Profilen ohne Sitzungen, Zugangsdaten oder private Workspace-Daten. Die macOS-Bilder zeigen die native Hülle; die Windows-Bilder zeigen dieselbe DSH Web UI auf einem echten Windows-Runner.

![Native macOS-App: Startseite ohne Workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Native macOS-App — Startseite ohne Workspace*

![DSH Web UI unter Windows: Startseite ohne Workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI unter Windows — Startseite ohne Workspace*

## Warum Ultimate existiert

Der DSH-Kosmos wächst schnell. Der Vergleich von Funktionen, Lizenzen, Versionen, Berechtigungen und Überschneidungen vieler Repositories ist selbst Arbeit. Ultimate dokumentiert eine prüfbare Auswahl in einem öffentlichen Manifest.

- Pro überschneidender Aufgabe gilt ein geprüfter Standard; Upstream-Versionen sind mit vollständigen 40-stelligen Commits fixiert; nur dokumentierte MIT-, Apache-2.0- oder BSD-3-Clause-Komponenten werden aufgenommen; Abhängigkeiten werden vor und nach der Installation geprüft; sensible Integrationen bleiben optional.

„Fast alle praktischen Kategorien“ bedeutet nicht jedes jemals veröffentlichte Plugin. Ultimate wird von der Community gepflegt und ist keine offizielle DeepSeek-AI-Version; alle Upstream-Autoren behalten Eigentum und Lizenz.

## Was bereits ausgewählt wurde

- Große Coding-Aufgaben: Agent-Teams, Abhängigkeitswellen, Git-worktree-Isolation, Planung und Verifikation.
- Workflows und Zuverlässigkeit: wiederverwendbare Abläufe, Zeitpläne, bedingtes Aufwachen, Backups, Speicher und Regeln.
- Produktivität: Lesezeichen, automatische Fortsetzung, Design-Skills und Spotlight.
- Benachrichtigungen, IM, Telefon und autorisierte Sicherheitsfunktionen bleiben optional.

TaskSwarm deckt Abhängigkeitswellen und Git-worktree-Isolation bereits ab; Captain bleibt daher eine Alternative statt eines doppelten Standards. Dasselbe gilt in EXCLUDED_COMPONENTS.md.

## Start in fünf Minuten

Erforderlich sind Windows 10/11 x64, macOS oder Linux, Node.js 22 oder neuer sowie Netzwerkzugriff auf die öffentlichen Manifest-Repositories. Bei ZIP-Download ist Git nicht nötig.

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

### Lokales profile starten

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Öffnen Sie nach dem ersten Start Settings → Models, tragen Sie Ihren eigenen Provider und API-Schlüssel ein und wählen Sie einen Workspace. Ultimate enthält oder kopiert niemals API-Schlüssel.

## Was der Installer ändert

Das Installationsprogramm erstellt ein eigenes Benutzerprofil, legt zuerst die offiziellen base- und web-app-Schichten an und fügt dann die ausgewählten Bundles hinzu. Es prüft Abhängigkeiten davor und danach, ohne Zugangsdaten, Sitzungen oder vorhandene cordis.patch.yml zu löschen.

## Datenschutz, Lizenzen und Grenzen

Dieses Repository enthält Manifest, Installer, Prüfregeln und Dokumentation. Es verteilt weder Drittquellcode, node_modules, API-Schlüssel, Telefonnummern, E-Mails, Browsersitzungen noch private Konfigurationen.

Der Repository-Code steht unter MIT. Geladene Komponenten behalten ihre MIT-, Apache-2.0- oder BSD-3-Clause-Lizenzen und Hinweise. DSH bleibt eine Entwicklervorschau und kann inkompatible Änderungen einführen.

## Prüfung und Entwicklung

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
