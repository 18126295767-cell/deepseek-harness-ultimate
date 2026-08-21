# DeepSeek Harness Ultimate: Anleitung für Einsteiger

Diese Anleitung setzt keine Terminal- oder Programmierkenntnisse voraus. Folgen Sie den Schritten in der Reihenfolge und führen Sie die kleinen Prüfungen aus.

**Sprachen der Anleitung:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · Deutsch · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Zurück zur Einführung](README.de.md)

## Bilder zur Orientierung

Diese Aufnahmen stammen aus sauberen Profilen ohne Sitzungen, Zugangsdaten oder private Workspace-Daten. Die macOS-Bilder zeigen die native Hülle; die Windows-Bilder zeigen dieselbe DSH Web UI auf einem echten Windows-Runner.

![Native macOS-App: Hinweis zur Entwicklervorschau](assets/screenshots/macos-01-developer-preview.jpg)

*Native macOS-App — Hinweis zur Entwicklervorschau*

![Native macOS-App: Einrichtung mit leerem API-Key](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Native macOS-App — Einrichtung mit leerem API-Key*

![Native macOS-App: Startseite ohne Workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Native macOS-App — Startseite ohne Workspace*

![Native macOS-App: Modelle mit leerem Schlüsselfeld](assets/screenshots/macos-04-model-settings.jpg)

*Native macOS-App — Modelle mit leerem Schlüsselfeld*

![Native macOS-App: Plugin-Inventar mit 133 Einträgen](assets/screenshots/macos-05-plugin-inventory.jpg)

*Native macOS-App — Plugin-Inventar mit 133 Einträgen*

![DSH Web UI unter Windows: Hinweis zur Entwicklervorschau](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI unter Windows — Hinweis zur Entwicklervorschau*

![DSH Web UI unter Windows: Einrichtung mit leerem API-Key](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI unter Windows — Einrichtung mit leerem API-Key*

![DSH Web UI unter Windows: Startseite ohne Workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI unter Windows — Startseite ohne Workspace*

![DSH Web UI unter Windows: Modelle mit leerem Schlüsselfeld](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI unter Windows — Modelle mit leerem Schlüsselfeld*

![DSH Web UI unter Windows: Plugin-Inventar mit 133 Einträgen](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI unter Windows — Plugin-Inventar mit 133 Einträgen*

## 1. Was wird installiert?

Ultimate ist ein Profil-Installer, kein Modell und keine offizielle DeepSeek-AI-Desktop-App. Es liefert eine geprüfte, versionsfixierte und doppelfreie Plugin-Auswahl; Ihr eigenes Modellkonto bleibt erforderlich.

## 2. Vorbereitung und Node.js

Bereiten Sie einen unterstützten Computer, stabiles Internet, Installationsrechte für Ihr Benutzerkonto und einen einfachen Arbeitsordner wie Documents/DSH-Work vor. Installieren Sie bei nodejs.org die LTS-Version, schließen Sie das Terminal und öffnen Sie es erneut.

```text
node --version
```

`v22.x.x` oder eine höhere Hauptversion ist erfolgreich.

## 3. Herunterladen und installieren

Laden Sie auf GitHub über Code → Download ZIP das Repository herunter, entpacken Sie es und öffnen Sie den Ordner mit package.json, profile, scripts und windows. Windows-Nutzer können windows/install-ultimate.cmd doppelklicken; macOS/Linux führen die Befehle unten aus.

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

Eine erfolgreiche Installation zeigt `Platform filter: windows`, `Platform filter: macos` oder `Platform filter: linux`.

## 4. Erster Start und Modell

Starten Sie DSH aus dem Arbeitsordner. 127.0.0.1 bedeutet nur Ihr eigener Computer. Lassen Sie das Terminal während der Nutzung offen. Öffnen Sie anschließend Settings → Models und geben Sie Ihren Provider und Ihren Schlüssel ausschließlich dort ein.

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

## 5. Workspace und erster Test

Wählen Sie Choose workspace, fügen Sie Ihren Arbeitsordner hinzu und starten Sie eine neue Sitzung. Fragen Sie zuerst: List the files in this workspace. Do not change anything. Wenn die richtigen Dateien erscheinen und kein Modellfehler angezeigt wird, ist die Grundeinrichtung erfolgreich.

## 6. Vorhandene lokale App und optionale Plugins

Eine bestehende lokale macOS-App mit dem Profil web muss zuerst beendet werden. Sichern Sie ~/.dsh/profiles/web, bevor Sie Ultimate dort installieren; cordis.patch.yml bleibt erhalten, aber nicht im Manifest enthaltene Plugins können entfernt werden. Telefon-, IM-, Benachrichtigungs- und Sicherheitsplugins nur nach Prüfung von COMPONENTS.md aktivieren.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Prüfen, aktualisieren, entfernen und sicher bleiben

Führen Sie die Profilprüfung aus; die letzte Zeile muss Profile dependency integrity: OK sein. Vor Updates DSH stoppen und das Profil sichern. Zum Entfernen DSH stoppen und ~/.dsh/profiles/ultimate in den Papierkorb verschieben. Löschen Sie bei einer Integritätswarnung keine zufälligen Dateien und veröffentlichen Sie niemals Schlüssel oder Tokens.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Erwartete letzte Zeile: `Profile dependency integrity: OK`.

## Entwicklerprüfung

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Installer und Manifest stehen unter MIT. Geladene Komponenten behalten ihre Upstream-Lizenzen; Ultimate lizenziert sie nicht neu.
