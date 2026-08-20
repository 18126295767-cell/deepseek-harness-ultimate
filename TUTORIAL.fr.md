# DeepSeek Harness Ultimate : guide débutant

Ce guide suppose que vous n’avez jamais utilisé de terminal. Suivez les étapes dans l’ordre et effectuez chaque vérification ; aucune connaissance en programmation n’est requise.

**Langues du tutoriel:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · Français · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Retour à la présentation](README.fr.md)

## 1. Comprendre l’installation

Ultimate est un installateur de profile, pas un modèle ni une application officielle DeepSeek AI. Il fournit un ensemble pratique dédoublonné, à licences vérifiées et versions figées ; vous utilisez votre propre compte de modèle.

## 2. Préparation

Préparez un ordinateur compatible, une connexion stable, le droit d’installer pour votre compte et un dossier simple comme Documents/DSH-Work. La première installation prend généralement 15 à 40 minutes.

## 3. Installer et vérifier Node.js

Ouvrez nodejs.org, installez la version LTS avec les options par défaut, fermez et rouvrez PowerShell ou Terminal puis lancez le contrôle de version. v22 ou plus est correct.

```text
node --version
```

Un résultat `v22.x.x` ou une version majeure supérieure est correct.

## 4. Télécharger Ultimate

Sur GitHub, choisissez Code → Download ZIP, décompressez puis ouvrez deepseek-harness-ultimate-main. Le bon dossier contient package.json, profile, scripts et windows. La commande git clone est aussi disponible.

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

## 5. Installer le profile

Sous Windows, double-cliquez sur windows/install-ultimate.cmd ou utilisez PowerShell. Sous macOS/Linux, tapez cd puis une espace, glissez le dossier dans Terminal, validez et exécutez audit puis installation. Ne fermez pas la fenêtre pendant le téléchargement.

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

Une installation réussie affiche `Platform filter: windows`, `Platform filter: macos` ou `Platform filter: linux`.

## 6. Premier démarrage

Avant le lancement, placez-vous dans le dossier de travail de l’Agent puis exécutez la commande du profile. 127.0.0.1 désigne uniquement votre ordinateur. Gardez le terminal ouvert et arrêtez avec Ctrl+C.

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

## 7. Connecter le modèle en sécurité

Dans Settings → Models, choisissez un fournisseur que vous possédez et saisissez la clé uniquement dans DSH. Ne la placez jamais dans package.json, cordis.patch.yml, une capture ou un issue public.

## 8. Choisir le workspace et tester

Cliquez sur Choose workspace, ajoutez et sélectionnez votre dossier, créez une session et demandez d’abord de lister les fichiers sans les modifier. Si les bons fichiers apparaissent sans erreur de modèle, la base fonctionne.

```text
List the files in this workspace. Do not change anything.
```

## 9. Utiliser une app locale existante

Si une app macOS locale démarre déjà le profile web, quittez-la et sauvegardez ~/.dsh/profiles/web avant d’y installer Ultimate. cordis.patch.yml est conservé, mais npm peut retirer les plugins absents du manifest.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

## 10. Intégrations facultatives

Téléphone, messagerie, notifications et sécurité restent désactivés par défaut. Lisez COMPONENTS.md et n’ajoutez que le nécessaire ; Ultimate ne configure ni numéro, e-mail, bot token ou permission système.

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 11. Vérifier l’installation

Lancez l’audit du profile installé. La dernière ligne doit être Profile dependency integrity: OK. En cas d’échec, ne supprimez rien au hasard : mettez à jour ou retirez le plugin cité.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Dernière ligne attendue : `Profile dependency integrity: OK`.

## 12. Mettre à jour sans risque

Pour mettre à jour, arrêtez DSH, sauvegardez le profile, récupérez la nouvelle source, examinez les composants, réinstallez, auditez et testez dans une nouvelle session. Ne réutilisez pas une session interrompue pendant un appel d’outil.

## 13. Désinstaller ou restaurer

Pour désinstaller, arrêtez DSH puis placez ~/.dsh/profiles/ultimate dans la Corbeille via le gestionnaire de fichiers. Runtime, identifiants et autres profiles restent intacts. Pour revenir, restaurez la sauvegarde sous son nom initial.

## 14. Problèmes courants

Problèmes courants : réinstallez Node LTS et rouvrez le terminal si node manque ; ouvrez le bon dossier si install-ultimate.mjs est introuvable ; réessayez après rétablissement du réseau ; arrêtez l’ancien DSH si le port 3080 est occupé ; configurez modèle et workspace si l’envoi est bloqué.

## 15. Sécurité et confidentialité

Utilisez des clés personnelles et révocables. Examinez les plugins avant toute permission d’accessibilité, microphone, notification ou automatisation. La rétro-ingénierie exige une autorisation et les notices upstream doivent être conservées.

## 16. Vérification développeur

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

L’installateur et le manifest sont sous MIT. Les composants téléchargés conservent leurs licences upstream ; Ultimate ne les relicencie pas.
