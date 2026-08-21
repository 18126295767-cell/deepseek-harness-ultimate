# DeepSeek Harness Ultimate

**DeepSeek Harness compte désormais trop de plugins pour être comparés sereinement. Ultimate a déjà vérifié les licences, figé les versions, supprimé les doublons et organisé les choix utiles afin que vous puissiez commencer sans anxiété de choix.**

> Un profil DSH reproductible et sélectionné couvrant presque toutes les catégories pratiques : équipes de code, workflows, sécurité, recherche et automatisation quotidienne.

**Langues:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · Français · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate : guide débutant](TUTORIAL.fr.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Guide visuel

Ces captures proviennent de profiles propres, sans sessions, identifiants ni données privées. Les images macOS montrent l’enveloppe native ; celles de Windows montrent la même DSH Web UI sur un runner Windows réel.

![App macOS native: Accueil sans workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*App macOS native — Accueil sans workspace*

![DSH Web UI Windows: Accueil sans workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI Windows — Accueil sans workspace*

## Pourquoi Ultimate existe

L’écosystème DSH grandit vite. Comparer les fonctions, licences, versions, permissions et recouvrements de dizaines de dépôts est un travail à part entière. Ultimate consigne une sélection vérifiable dans un manifest public.

- Une implémentation solide pour chaque rôle qui se chevauche.
- Commits upstream exacts sur 40 caractères.
- Uniquement des licences MIT, Apache-2.0 ou BSD-3-Clause consignées.
- Précontrôle des dépendances puis audit de l’arbre réellement installé.
- Intégrations nécessitant comptes, secrets ou permissions laissées optionnelles.

« Presque toutes les catégories pratiques » ne signifie pas tous les plugins publiés. Ultimate est maintenu par la communauté, pas une version officielle DeepSeek AI ; chaque auteur conserve la propriété et la licence de son projet.

## Ce qui est déjà choisi

- Grandes tâches de code : équipes Agent, vagues de dépendances, isolation Git worktree, planification et vérification.
- Workflow et fiabilité : processus réutilisables, planification, réveils conditionnels, sauvegardes, mémoire et règles.
- Productivité : signets, reprise automatique, compétences de design et Spotlight.
- Notifications, messagerie, appels et sécurité autorisée ne sont installés que sur demande.

TaskSwarm couvre déjà les vagues de dépendances et l’isolation Git worktree ; Captain reste donc une alternative et non un doublon par défaut. La même règle vaut dans EXCLUDED_COMPONENTS.md.

## Démarrage en cinq minutes

Windows 10/11 x64, macOS ou Linux, Node.js 22 ou plus récent et un accès réseau aux dépôts publics du manifest sont nécessaires. Git est facultatif avec le ZIP.

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

### Démarrer le profile local

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Au premier démarrage, ouvrez Settings → Models, ajoutez votre fournisseur et votre clé API, puis choisissez un workspace. Ultimate ne contient et ne copie jamais de clé.

## Ce que modifie l’installateur

L’installateur crée un profile utilisateur, place d’abord les couches officielles base et web-app, puis les bundles sélectionnés. Il audite les dépendances avant et après sans supprimer identifiants, sessions ni cordis.patch.yml existant.

## Confidentialité, licences et limites

Le dépôt contient le manifest, l’installateur, les règles d’audit et la documentation. Il ne redistribue ni sources tierces, ni node_modules, clés, téléphones, e-mails, sessions de navigateur ou configuration privée.

Le code du dépôt est sous MIT. Les composants téléchargés conservent leurs licences et notices MIT, Apache-2.0 ou BSD-3-Clause. DSH reste en préversion et peut introduire des ruptures de compatibilité.

## Vérification et développement

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
