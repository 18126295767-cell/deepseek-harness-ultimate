#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const allLanguages = [
  ['en', 'English'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'],
  ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch'],
  ['pt-BR', 'Português (Brasil)'], ['ru', 'Русский'], ['ja', '日本語'],
  ['ko', '한국어'], ['ar', 'العربية'], ['hi', 'हिन्दी'],
  ['it', 'Italiano'], ['id', 'Bahasa Indonesia'], ['tr', 'Türkçe'],
  ['vi', 'Tiếng Việt'], ['th', 'ไทย'], ['pl', 'Polski'],
  ['nl', 'Nederlands'], ['uk', 'Українська'],
];

const locales = [
  {
    code: 'zh-TW', name: '繁體中文',
    hero: 'DeepSeek Harness 的外掛已經多到難以逐一比較。Ultimate 已替你完成篩選、授權核對、版本固定、功能去重與分類，安裝後可以直接開始工作，不必再承受選擇焦慮。',
    quote: '覆蓋幾乎所有實用能力類別的可重現 DSH 精選設定：程式團隊、工作流程、安全、研究與日常自動化都已預先整理，不必逐個儲存庫尋找。',
    why: 'DSH 生態成長很快，比較數十個儲存庫的功能、授權、版本、權限與重複程度本身就是一項工作。Ultimate 把選擇公開記錄在 manifest 中。',
    principles: ['每個重疊職責只保留一個較完整的預設實作。', '以完整 40 位 commit 固定上游版本。', '只納入已記錄 MIT、Apache-2.0 或 BSD-3-Clause 授權的元件。', '安裝前檢查依賴，安裝後再掃描實際套件樹。', '需要帳號、憑證、系統權限或明確授權的整合維持選用。'],
    included: ['大型程式工作：視覺化 Agent 團隊、依賴分波、Git worktree 隔離、規劃與只讀驗收。', '工作流程與可靠性：可重用流程、排程、條件喚醒、備份、記憶與全域規則。', '日常效率：書籤、自動繼續、設計技能與 Spotlight 介面。', '通知、IM、電話回撥及授權安全研究工具僅在使用者主動選擇時安裝。'],
    requirements: '需要 Windows 10/11 x64、macOS 或 Linux、Node.js 22 以上，以及可存取 manifest 內公開儲存庫的網路。下載 ZIP 時不一定需要 Git。',
    firstLaunch: '首次啟動後，請在 Settings → Models 填入你自己的供應商與 API Key，再選擇工作區。Ultimate 絕不內建或複製 API Key。',
    installer: '安裝器建立使用者自己的 profile，先疊加官方 base 與 web-app，再加入精選第三方 bundle。寫入前後都會檢查依賴，既有憑證、工作階段與 cordis.patch.yml 不會被刪除。',
    boundary: '本儲存庫只包含 manifest、安裝器、稽核規則與文件，不重新散布第三方原始碼、node_modules、API Key、電話、電子郵件、瀏覽器工作階段或私人設定。',
    labels: ['為何需要 Ultimate', '已替你選好的能力', '五分鐘開始', '安裝器會做什麼', '隱私、授權與限制', '驗證與開發'],
    tutorialTitle: 'DeepSeek Harness Ultimate：零基礎教學',
    tutorialIntro: '本教學假設你從未使用終端。請依序操作並完成每一步的小檢查，不需要任何程式基礎。',
    tutorial: [
      'Ultimate 是 profile 安裝器，不是模型或 DeepSeek AI 官方桌面 App。它提供已去重、固定版本並核對授權的實用外掛組合，你仍需使用自己的模型帳號。',
      '準備一台支援的電腦、穩定網路、目前帳號的安裝權限，以及名稱簡單的工作資料夾，例如 Documents/DSH-Work。第一次安裝通常需要 15 到 40 分鐘。',
      '前往 nodejs.org 安裝標示 LTS 的版本，保持預設選項。關閉並重新開啟 PowerShell 或終端，再執行下面的版本檢查；看到 v22 或更高即成功。',
      '在 GitHub 儲存庫點 Code → Download ZIP，解壓後開啟 deepseek-harness-ultimate-main。正確目錄中應有 package.json、profile、scripts 與 windows。也可以使用下方 git clone 命令。',
      'Windows 可雙擊 windows/install-ultimate.cmd；PowerShell 使用下方命令。macOS/Linux 在終端輸入 cd 加空格，把資料夾拖入視窗後按 Enter，再逐行執行稽核與安裝命令。下載期間不要關閉視窗。',
      '啟動前先切換到希望 Agent 工作的資料夾，再執行 profile 啟動命令。127.0.0.1 只代表本機；使用時保持終端開啟，停止時按 Ctrl+C。',
      '在 Settings → Models 選擇你擁有的供應商，只在 DSH 設定畫面輸入 API Key 並儲存。不要把密鑰寫進 package.json、cordis.patch.yml、截圖或公開 Issue。',
      '點 Choose workspace，加入並選取工作資料夾，新建工作階段，先要求 Agent 只列出檔案而不修改。能看到正確檔案且沒有缺少模型錯誤即表示基本設定成功。',
      '已有啟動 web profile 的本機 macOS App 時，先退出 App 並備份 ~/.dsh/profiles/web，再用下方命令安裝到 web。安裝器保留 cordis.patch.yml，但可能移除不在 Ultimate manifest 內的外掛。',
      '電話、IM、通知與安全研究外掛預設不啟用。閱讀 COMPONENTS.md 後只加入需要的元件；Ultimate 不會替你設定電話、郵件、bot token 或系統權限。',
      '執行已安裝 profile 稽核，最後一行應為 Profile dependency integrity: OK。若被拒絕，不要隨意刪除檔案；請依報告更新或移除造成重複宿主核心套件的外掛。',
      '更新前停止 DSH、備份 profile、取得最新版原始碼、閱讀元件變更、重跑安裝與稽核，最後新建工作階段測試。工具呼叫中斷後不要沿用損壞的舊工作階段。',
      '卸載前停止 DSH，再用檔案管理員把 ~/.dsh/profiles/ultimate 移到垃圾桶。這不會刪除另外管理的 runtime、憑證或其他 profile；回復時把備份改回原名。',
      '常見問題：找不到 node 時重裝 LTS 並重開終端；找不到 install-ultimate.mjs 表示目錄錯誤；下載逾時先修復網路再重跑；3080 被占用時停止舊 DSH；不能傳訊息時先設定模型並選工作區。',
      '只使用可撤銷且屬於你的密鑰。授予輔助使用、麥克風、通知或自動化權限前先審閱外掛。逆向技能只能用於自有或明確授權的系統，重新散布時保留上游聲明。',
    ],
    tutorialHeadings: ['先了解安裝內容', '開始前準備', '安裝並檢查 Node.js', '下載 Ultimate', '安裝 profile', '第一次啟動', '安全連接模型', '選擇工作區並測試', '搭配既有本機 App', '選用整合', '驗證安裝', '安全更新', '卸載或回復', '常見問題', '安全與隱私'],
  },
  {
    code: 'es', name: 'Español',
    hero: 'DeepSeek Harness ya tiene más plugins de los que una persona puede comparar con calma. Ultimate ya revisó licencias, fijó versiones, eliminó duplicados y ordenó las opciones útiles para que puedas empezar sin ansiedad de elección.',
    quote: 'Un perfil DSH reproducible y seleccionado que cubre casi todas las categorías prácticas: equipos de programación, flujos de trabajo, seguridad, investigación y automatización diaria.',
    why: 'El ecosistema DSH crece rápido. Comparar funciones, licencias, versiones, permisos y solapamientos de decenas de repositorios es un trabajo en sí mismo. Ultimate registra una selección auditable en un manifest público.',
    principles: ['Una implementación sólida por función solapada.', 'Commits ascendentes exactos de 40 caracteres.', 'Solo licencias MIT, Apache-2.0 o BSD-3-Clause registradas.', 'Comprobación antes de instalar y auditoría del árbol real después.', 'Integraciones con cuentas, credenciales o permisos separadas como opcionales.'],
    included: ['Código a gran escala: equipos Agent, oleadas de dependencias, aislamiento Git worktree, planificación y verificación.', 'Flujos y fiabilidad: workflows reutilizables, horarios, activación condicional, copias de seguridad, memoria y reglas.', 'Productividad: marcadores, continuación automática, habilidades de diseño y Spotlight.', 'Notificaciones, IM, llamadas y seguridad autorizada solo se instalan por decisión explícita.'],
    requirements: 'Necesitas Windows 10/11 x64, macOS o Linux, Node.js 22 o superior y acceso de red a los repositorios públicos del manifest. Git no es obligatorio si descargas el ZIP.',
    firstLaunch: 'Tras el primer inicio, abre Settings → Models, añade tu propio proveedor y clave API, y elige un workspace. Ultimate nunca incluye ni copia claves.',
    installer: 'El instalador crea un profile del usuario, coloca primero las capas oficiales base y web-app y luego los bundles seleccionados. Audita dependencias antes y después sin borrar credenciales, sesiones ni un cordis.patch.yml existente.',
    boundary: 'El repositorio contiene el manifest, el instalador, las reglas de auditoría y la documentación. No redistribuye código de terceros, node_modules, claves, teléfonos, correos, sesiones del navegador ni configuración privada.',
    labels: ['Por qué existe Ultimate', 'Qué se ha elegido', 'Inicio en cinco minutos', 'Qué cambia el instalador', 'Privacidad, licencias y límites', 'Verificación y desarrollo'],
    tutorialTitle: 'DeepSeek Harness Ultimate: guía para principiantes',
    tutorialIntro: 'Esta guía supone que nunca has usado una terminal. Sigue los pasos en orden y completa cada comprobación; no necesitas saber programar.',
    tutorial: [
      'Ultimate es un instalador de profiles, no un modelo ni una aplicación oficial de DeepSeek AI. Proporciona un conjunto práctico sin duplicados, con licencias revisadas y versiones fijadas; debes aportar tu propia cuenta de modelo.',
      'Prepara un equipo compatible, internet estable, permiso para instalar en tu cuenta y una carpeta sencilla como Documents/DSH-Work. La primera instalación suele tardar entre 15 y 40 minutos.',
      'Visita nodejs.org, instala la versión LTS con las opciones predeterminadas, cierra y vuelve a abrir PowerShell o Terminal y ejecuta la comprobación de versión. Un resultado v22 o superior es correcto.',
      'En GitHub selecciona Code → Download ZIP, extrae y abre deepseek-harness-ultimate-main. La carpeta correcta contiene package.json, profile, scripts y windows. También puedes usar git clone.',
      'En Windows haz doble clic en windows/install-ultimate.cmd o usa PowerShell. En macOS/Linux escribe cd y un espacio, arrastra la carpeta a Terminal, pulsa Intro y ejecuta la auditoría y la instalación. No cierres la ventana durante la descarga.',
      'Antes de iniciar, entra en la carpeta donde quieres que trabaje el Agent y ejecuta el comando del profile. 127.0.0.1 significa únicamente tu equipo. Mantén la terminal abierta y usa Ctrl+C para detener el servicio.',
      'En Settings → Models selecciona un proveedor que controles e introduce la clave solo en la pantalla de DSH. No la escribas en package.json, cordis.patch.yml, capturas ni issues públicos.',
      'Pulsa Choose workspace, añade y selecciona tu carpeta, crea una sesión y pide primero que enumere archivos sin modificarlos. Si ve la carpeta correcta y no falta un modelo, la instalación básica funciona.',
      'Si ya tienes una app local de macOS que inicia el profile web, ciérrala y copia ~/.dsh/profiles/web antes de instalar allí. Se conserva cordis.patch.yml, pero npm puede quitar plugins fuera del manifest de Ultimate.',
      'Las integraciones de teléfono, IM, avisos y seguridad no vienen activadas. Lee COMPONENTS.md y añade solo lo necesario; Ultimate no configura números, correo, bot tokens ni permisos del sistema.',
      'Ejecuta la auditoría del profile instalado. La última línea debe decir Profile dependency integrity: OK. Si falla, no borres archivos al azar: actualiza o quita el plugin nombrado en el informe.',
      'Para actualizar, detén DSH, guarda una copia del profile, obtén la fuente nueva, revisa los cambios de componentes, reinstala, audita y prueba en una sesión nueva. No reutilices una sesión cortada a mitad de una llamada de herramienta.',
      'Para desinstalar, detén DSH y mueve ~/.dsh/profiles/ultimate a la Papelera con el administrador de archivos. El runtime, las credenciales y otros profiles permanecen. Para volver atrás, restaura la copia con su nombre original.',
      'Problemas comunes: reinstala Node LTS y abre otra terminal si no existe node; entra en la carpeta correcta si falta install-ultimate.mjs; reintenta tras arreglar la red; detén el DSH anterior si el puerto 3080 está ocupado; configura modelo y workspace si no puedes enviar.',
      'Usa claves propias y revocables. Revisa cada plugin antes de conceder accesibilidad, micrófono, avisos o automatización. Usa habilidades de ingeniería inversa solo con autorización y conserva los avisos ascendentes al redistribuir.',
    ],
    tutorialHeadings: ['Qué vas a instalar', 'Preparación', 'Instalar y comprobar Node.js', 'Descargar Ultimate', 'Instalar el profile', 'Primer inicio', 'Conectar el modelo con seguridad', 'Elegir workspace y probar', 'Usar una app local existente', 'Integraciones opcionales', 'Verificar la instalación', 'Actualizar con seguridad', 'Desinstalar o restaurar', 'Problemas comunes', 'Seguridad y privacidad'],
  },
  {
    code: 'fr', name: 'Français',
    hero: 'DeepSeek Harness compte désormais trop de plugins pour être comparés sereinement. Ultimate a déjà vérifié les licences, figé les versions, supprimé les doublons et organisé les choix utiles afin que vous puissiez commencer sans anxiété de choix.',
    quote: 'Un profil DSH reproductible et sélectionné couvrant presque toutes les catégories pratiques : équipes de code, workflows, sécurité, recherche et automatisation quotidienne.',
    why: 'L’écosystème DSH grandit vite. Comparer les fonctions, licences, versions, permissions et recouvrements de dizaines de dépôts est un travail à part entière. Ultimate consigne une sélection vérifiable dans un manifest public.',
    principles: ['Une implémentation solide pour chaque rôle qui se chevauche.', 'Commits upstream exacts sur 40 caractères.', 'Uniquement des licences MIT, Apache-2.0 ou BSD-3-Clause consignées.', 'Précontrôle des dépendances puis audit de l’arbre réellement installé.', 'Intégrations nécessitant comptes, secrets ou permissions laissées optionnelles.'],
    included: ['Grandes tâches de code : équipes Agent, vagues de dépendances, isolation Git worktree, planification et vérification.', 'Workflow et fiabilité : processus réutilisables, planification, réveils conditionnels, sauvegardes, mémoire et règles.', 'Productivité : signets, reprise automatique, compétences de design et Spotlight.', 'Notifications, messagerie, appels et sécurité autorisée ne sont installés que sur demande.'],
    requirements: 'Windows 10/11 x64, macOS ou Linux, Node.js 22 ou plus récent et un accès réseau aux dépôts publics du manifest sont nécessaires. Git est facultatif avec le ZIP.',
    firstLaunch: 'Au premier démarrage, ouvrez Settings → Models, ajoutez votre fournisseur et votre clé API, puis choisissez un workspace. Ultimate ne contient et ne copie jamais de clé.',
    installer: 'L’installateur crée un profile utilisateur, place d’abord les couches officielles base et web-app, puis les bundles sélectionnés. Il audite les dépendances avant et après sans supprimer identifiants, sessions ni cordis.patch.yml existant.',
    boundary: 'Le dépôt contient le manifest, l’installateur, les règles d’audit et la documentation. Il ne redistribue ni sources tierces, ni node_modules, clés, téléphones, e-mails, sessions de navigateur ou configuration privée.',
    labels: ['Pourquoi Ultimate existe', 'Ce qui est déjà choisi', 'Démarrage en cinq minutes', 'Ce que modifie l’installateur', 'Confidentialité, licences et limites', 'Vérification et développement'],
    tutorialTitle: 'DeepSeek Harness Ultimate : guide débutant',
    tutorialIntro: 'Ce guide suppose que vous n’avez jamais utilisé de terminal. Suivez les étapes dans l’ordre et effectuez chaque vérification ; aucune connaissance en programmation n’est requise.',
    tutorial: [
      'Ultimate est un installateur de profile, pas un modèle ni une application officielle DeepSeek AI. Il fournit un ensemble pratique dédoublonné, à licences vérifiées et versions figées ; vous utilisez votre propre compte de modèle.',
      'Préparez un ordinateur compatible, une connexion stable, le droit d’installer pour votre compte et un dossier simple comme Documents/DSH-Work. La première installation prend généralement 15 à 40 minutes.',
      'Ouvrez nodejs.org, installez la version LTS avec les options par défaut, fermez et rouvrez PowerShell ou Terminal puis lancez le contrôle de version. v22 ou plus est correct.',
      'Sur GitHub, choisissez Code → Download ZIP, décompressez puis ouvrez deepseek-harness-ultimate-main. Le bon dossier contient package.json, profile, scripts et windows. La commande git clone est aussi disponible.',
      'Sous Windows, double-cliquez sur windows/install-ultimate.cmd ou utilisez PowerShell. Sous macOS/Linux, tapez cd puis une espace, glissez le dossier dans Terminal, validez et exécutez audit puis installation. Ne fermez pas la fenêtre pendant le téléchargement.',
      'Avant le lancement, placez-vous dans le dossier de travail de l’Agent puis exécutez la commande du profile. 127.0.0.1 désigne uniquement votre ordinateur. Gardez le terminal ouvert et arrêtez avec Ctrl+C.',
      'Dans Settings → Models, choisissez un fournisseur que vous possédez et saisissez la clé uniquement dans DSH. Ne la placez jamais dans package.json, cordis.patch.yml, une capture ou un issue public.',
      'Cliquez sur Choose workspace, ajoutez et sélectionnez votre dossier, créez une session et demandez d’abord de lister les fichiers sans les modifier. Si les bons fichiers apparaissent sans erreur de modèle, la base fonctionne.',
      'Si une app macOS locale démarre déjà le profile web, quittez-la et sauvegardez ~/.dsh/profiles/web avant d’y installer Ultimate. cordis.patch.yml est conservé, mais npm peut retirer les plugins absents du manifest.',
      'Téléphone, messagerie, notifications et sécurité restent désactivés par défaut. Lisez COMPONENTS.md et n’ajoutez que le nécessaire ; Ultimate ne configure ni numéro, e-mail, bot token ou permission système.',
      'Lancez l’audit du profile installé. La dernière ligne doit être Profile dependency integrity: OK. En cas d’échec, ne supprimez rien au hasard : mettez à jour ou retirez le plugin cité.',
      'Pour mettre à jour, arrêtez DSH, sauvegardez le profile, récupérez la nouvelle source, examinez les composants, réinstallez, auditez et testez dans une nouvelle session. Ne réutilisez pas une session interrompue pendant un appel d’outil.',
      'Pour désinstaller, arrêtez DSH puis placez ~/.dsh/profiles/ultimate dans la Corbeille via le gestionnaire de fichiers. Runtime, identifiants et autres profiles restent intacts. Pour revenir, restaurez la sauvegarde sous son nom initial.',
      'Problèmes courants : réinstallez Node LTS et rouvrez le terminal si node manque ; ouvrez le bon dossier si install-ultimate.mjs est introuvable ; réessayez après rétablissement du réseau ; arrêtez l’ancien DSH si le port 3080 est occupé ; configurez modèle et workspace si l’envoi est bloqué.',
      'Utilisez des clés personnelles et révocables. Examinez les plugins avant toute permission d’accessibilité, microphone, notification ou automatisation. La rétro-ingénierie exige une autorisation et les notices upstream doivent être conservées.',
    ],
    tutorialHeadings: ['Comprendre l’installation', 'Préparation', 'Installer et vérifier Node.js', 'Télécharger Ultimate', 'Installer le profile', 'Premier démarrage', 'Connecter le modèle en sécurité', 'Choisir le workspace et tester', 'Utiliser une app locale existante', 'Intégrations facultatives', 'Vérifier l’installation', 'Mettre à jour sans risque', 'Désinstaller ou restaurer', 'Problèmes courants', 'Sécurité et confidentialité'],
  },
];

const commonByLocale = {
  'zh-TW': {
    scope: '「幾乎所有實用類別」不代表收錄所有曾發布的外掛。Ultimate 由社群維護，並非 DeepSeek AI 官方版本；各上游作者保有其專案與授權。',
    dedupe: 'TaskSwarm 已涵蓋依賴分波與 Git worktree 隔離，因此 Captain 僅列為替代方案，不會成為重複預設。相同原則適用於 EXCLUDED_COMPONENTS.md 中的所有項目。',
    license: '本儲存庫程式碼採 MIT 授權。下載的元件保留其 MIT、Apache-2.0 或 BSD-3-Clause 授權與聲明。DSH 仍是開發者預覽版，可能出現破壞相容性的變更。',
    nodeSuccess: '看到 `v22.x.x` 或更高主版本即表示成功。', installSuccess: '成功安裝時會顯示 `Platform filter: windows`、`Platform filter: macos` 或 `Platform filter: linux`。', expected: '預期最後一行：', developer: '開發者驗證', tutorialLicense: '安裝器與 manifest 採 MIT 授權；下載的元件保留各自上游授權，Ultimate 不會替它們重新授權。', back: '返回專案介紹',
  },
  es: {
    scope: '«Casi todas las categorías prácticas» no significa todos los plugins publicados. Ultimate es comunitario, no una versión oficial de DeepSeek AI; cada autor conserva la propiedad y licencia de su proyecto.',
    dedupe: 'TaskSwarm ya cubre las oleadas de dependencias y el aislamiento Git worktree, por lo que Captain queda como alternativa y no como valor predeterminado duplicado. La misma regla se aplica en EXCLUDED_COMPONENTS.md.',
    license: 'El código del repositorio usa MIT. Los componentes descargados conservan sus licencias y avisos MIT, Apache-2.0 o BSD-3-Clause. DSH sigue en vista previa y puede introducir cambios incompatibles.',
    nodeSuccess: 'Un resultado `v22.x.x` o una versión principal superior es correcto.', installSuccess: 'La instalación correcta muestra `Platform filter: windows`, `Platform filter: macos` o `Platform filter: linux`.', expected: 'Última línea esperada:', developer: 'Verificación para desarrolladores', tutorialLicense: 'El instalador y el manifest usan MIT. Los componentes descargados conservan sus licencias originales; Ultimate no vuelve a licenciarlos.', back: 'Volver a la introducción',
  },
  fr: {
    scope: '« Presque toutes les catégories pratiques » ne signifie pas tous les plugins publiés. Ultimate est maintenu par la communauté, pas une version officielle DeepSeek AI ; chaque auteur conserve la propriété et la licence de son projet.',
    dedupe: 'TaskSwarm couvre déjà les vagues de dépendances et l’isolation Git worktree ; Captain reste donc une alternative et non un doublon par défaut. La même règle vaut dans EXCLUDED_COMPONENTS.md.',
    license: 'Le code du dépôt est sous MIT. Les composants téléchargés conservent leurs licences et notices MIT, Apache-2.0 ou BSD-3-Clause. DSH reste en préversion et peut introduire des ruptures de compatibilité.',
    nodeSuccess: 'Un résultat `v22.x.x` ou une version majeure supérieure est correct.', installSuccess: 'Une installation réussie affiche `Platform filter: windows`, `Platform filter: macos` ou `Platform filter: linux`.', expected: 'Dernière ligne attendue :', developer: 'Vérification développeur', tutorialLicense: 'L’installateur et le manifest sont sous MIT. Les composants téléchargés conservent leurs licences upstream ; Ultimate ne les relicencie pas.', back: 'Retour à la présentation',
  },
  de: {
    principles: ['Pro überschneidender Aufgabe gilt ein geprüfter Standard; Upstream-Versionen sind mit vollständigen 40-stelligen Commits fixiert; nur dokumentierte MIT-, Apache-2.0- oder BSD-3-Clause-Komponenten werden aufgenommen; Abhängigkeiten werden vor und nach der Installation geprüft; sensible Integrationen bleiben optional.'],
    firstLaunch: 'Öffnen Sie nach dem ersten Start Settings → Models, tragen Sie Ihren eigenen Provider und API-Schlüssel ein und wählen Sie einen Workspace. Ultimate enthält oder kopiert niemals API-Schlüssel.',
    labels: ['Warum Ultimate existiert', 'Was bereits ausgewählt wurde', 'Start in fünf Minuten', 'Was der Installer ändert', 'Datenschutz, Lizenzen und Grenzen', 'Prüfung und Entwicklung'],
    scope: '„Fast alle praktischen Kategorien“ bedeutet nicht jedes jemals veröffentlichte Plugin. Ultimate wird von der Community gepflegt und ist keine offizielle DeepSeek-AI-Version; alle Upstream-Autoren behalten Eigentum und Lizenz.',
    dedupe: 'TaskSwarm deckt Abhängigkeitswellen und Git-worktree-Isolation bereits ab; Captain bleibt daher eine Alternative statt eines doppelten Standards. Dasselbe gilt in EXCLUDED_COMPONENTS.md.',
    license: 'Der Repository-Code steht unter MIT. Geladene Komponenten behalten ihre MIT-, Apache-2.0- oder BSD-3-Clause-Lizenzen und Hinweise. DSH bleibt eine Entwicklervorschau und kann inkompatible Änderungen einführen.',
    nodeSuccess: '`v22.x.x` oder eine höhere Hauptversion ist erfolgreich.', installSuccess: 'Eine erfolgreiche Installation zeigt `Platform filter: windows`, `Platform filter: macos` oder `Platform filter: linux`.', expected: 'Erwartete letzte Zeile:', developer: 'Entwicklerprüfung', tutorialLicense: 'Installer und Manifest stehen unter MIT. Geladene Komponenten behalten ihre Upstream-Lizenzen; Ultimate lizenziert sie nicht neu.', back: 'Zurück zur Einführung',
  },
  'pt-BR': {
    principles: ['Há um padrão revisado por função sobreposta; versões upstream são fixadas por commits completos de 40 caracteres; somente licenças MIT, Apache-2.0 ou BSD-3-Clause registradas entram; dependências são verificadas antes e depois; integrações sensíveis continuam opcionais.'],
    firstLaunch: 'Após a primeira inicialização, abra Settings → Models, adicione seu próprio provedor e chave API e escolha um workspace. O Ultimate nunca inclui nem copia chaves.',
    labels: ['Por que o Ultimate existe', 'O que já foi escolhido', 'Início em cinco minutos', 'O que o instalador altera', 'Privacidade, licenças e limites', 'Verificação e desenvolvimento'],
    scope: '“Quase todas as categorias práticas” não significa todos os plugins já publicados. O Ultimate é mantido pela comunidade e não é uma versão oficial da DeepSeek AI; os autores upstream mantêm propriedade e licença.',
    dedupe: 'TaskSwarm já cobre ondas de dependências e isolamento Git worktree; Captain permanece como alternativa, não como padrão duplicado. A mesma regra vale em EXCLUDED_COMPONENTS.md.',
    license: 'O código do repositório usa MIT. Componentes baixados mantêm licenças e avisos MIT, Apache-2.0 ou BSD-3-Clause. O DSH continua em prévia para desenvolvedores e pode mudar de forma incompatível.',
    nodeSuccess: 'Um resultado `v22.x.x` ou versão principal superior está correto.', installSuccess: 'Uma instalação correta mostra `Platform filter: windows`, `Platform filter: macos` ou `Platform filter: linux`.', expected: 'Última linha esperada:', developer: 'Verificação para desenvolvedores', tutorialLicense: 'O instalador e o manifest usam MIT. Os componentes baixados mantêm suas licenças upstream; o Ultimate não os relicencia.', back: 'Voltar à apresentação',
  },
  ru: {
    principles: ['Для каждой пересекающейся роли выбран один проверенный вариант; upstream-версии закреплены полными 40-значными commit; допускаются только записанные MIT, Apache-2.0 или BSD-3-Clause; зависимости проверяются до и после установки; чувствительные интеграции остаются необязательными.'],
    firstLaunch: 'После первого запуска откройте Settings → Models, добавьте свой провайдер и API-ключ, затем выберите workspace. Ultimate никогда не содержит и не копирует ключи.',
    labels: ['Зачем нужен Ultimate', 'Что уже выбрано', 'Запуск за пять минут', 'Что меняет установщик', 'Приватность, лицензии и ограничения', 'Проверка и разработка'],
    scope: '«Почти все практические категории» не означает все опубликованные плагины. Ultimate поддерживается сообществом и не является официальной версией DeepSeek AI; авторы upstream сохраняют права и лицензии.',
    dedupe: 'TaskSwarm уже покрывает волны зависимостей и изоляцию Git worktree, поэтому Captain остается альтернативой, а не дублирующим стандартом. То же правило действует в EXCLUDED_COMPONENTS.md.',
    license: 'Код репозитория использует MIT. Загруженные компоненты сохраняют лицензии и уведомления MIT, Apache-2.0 или BSD-3-Clause. DSH остается предварительной версией и может вносить несовместимые изменения.',
    nodeSuccess: 'Результат `v22.x.x` или более новая основная версия означает успех.', installSuccess: 'При успешной установке отображается `Platform filter: windows`, `Platform filter: macos` или `Platform filter: linux`.', expected: 'Ожидаемая последняя строка:', developer: 'Проверка для разработчиков', tutorialLicense: 'Установщик и manifest используют MIT. Загруженные компоненты сохраняют upstream-лицензии; Ultimate не перелицензирует их.', back: 'Вернуться к описанию',
  },
  ja: {
    principles: ['重複する役割ごとに一つの検証済み既定を選び、上流版は完全な 40 桁 commit で固定し、記録済みの MIT・Apache-2.0・BSD-3-Clause のみを採用します。依存関係は前後で監査し、機密性の高い連携は任意のままです。'],
    firstLaunch: '初回起動後に Settings → Models を開き、自分のプロバイダーと API キーを追加して workspace を選びます。Ultimate が API キーを内蔵またはコピーすることはありません。',
    labels: ['Ultimate が必要な理由', 'すでに選択済みの機能', '5 分で開始', 'インストーラが変更する内容', 'プライバシー・ライセンス・制限', '検証と開発'],
    scope: '「ほぼすべての実用カテゴリ」は、公開された全プラグインを意味しません。Ultimate はコミュニティ管理であり、DeepSeek AI 公式版ではありません。上流作者は所有権とライセンスを保持します。',
    dedupe: 'TaskSwarm は依存関係ウェーブと Git worktree 分離をすでにカバーするため、Captain は重複する既定ではなく代替として残します。同じ原則を EXCLUDED_COMPONENTS.md 全体に適用します。',
    license: '本リポジトリのコードは MIT です。ダウンロードした部品は MIT、Apache-2.0、BSD-3-Clause のライセンスと告知を保持します。DSH は開発者プレビューであり、互換性を壊す変更があり得ます。',
    nodeSuccess: '`v22.x.x` またはそれ以上のメジャー版なら成功です。', installSuccess: '成功時は `Platform filter: windows`、`Platform filter: macos`、または `Platform filter: linux` が表示されます。', expected: '最後に表示される予定の行：', developer: '開発者向け検証', tutorialLicense: 'インストーラと manifest は MIT です。ダウンロードした部品は上流ライセンスを維持し、Ultimate は再ライセンスしません。', back: '紹介へ戻る',
  },
  ko: {
    principles: ['겹치는 역할마다 검토된 기본값 하나를 선택하고, upstream 버전을 완전한 40자리 commit으로 고정하며, 기록된 MIT·Apache-2.0·BSD-3-Clause만 포함합니다. 설치 전후 의존성을 감사하고 민감한 연동은 선택 사항으로 둡니다.'],
    firstLaunch: '첫 실행 후 Settings → Models를 열어 본인의 공급자와 API 키를 추가하고 workspace를 선택하세요. Ultimate는 API 키를 포함하거나 복사하지 않습니다.',
    labels: ['Ultimate가 필요한 이유', '이미 선택된 기능', '5분 안에 시작', '설치기가 변경하는 내용', '개인정보·라이선스·제한', '검증과 개발'],
    scope: '“거의 모든 실용 범주”는 공개된 모든 플러그인을 뜻하지 않습니다. Ultimate는 커뮤니티가 관리하며 DeepSeek AI 공식 배포판이 아닙니다. upstream 작성자는 소유권과 라이선스를 유지합니다.',
    dedupe: 'TaskSwarm이 의존성 웨이브와 Git worktree 격리를 이미 담당하므로 Captain은 중복 기본값이 아닌 대안으로 남깁니다. 같은 원칙이 EXCLUDED_COMPONENTS.md 전체에 적용됩니다.',
    license: '저장소 코드는 MIT입니다. 내려받은 구성 요소는 MIT, Apache-2.0 또는 BSD-3-Clause 라이선스와 고지를 유지합니다. DSH는 개발자 미리보기이므로 호환성을 깨는 변경이 생길 수 있습니다.',
    nodeSuccess: '`v22.x.x` 또는 더 높은 주 버전이면 성공입니다.', installSuccess: '성공한 설치는 `Platform filter: windows`, `Platform filter: macos` 또는 `Platform filter: linux`를 표시합니다.', expected: '예상되는 마지막 줄:', developer: '개발자 검증', tutorialLicense: '설치기와 manifest는 MIT입니다. 내려받은 구성 요소는 upstream 라이선스를 유지하며 Ultimate는 재라이선스하지 않습니다.', back: '소개로 돌아가기',
  },
  ar: {
    principles: ['يُختار إعداد افتراضي واحد مُراجع لكل دور متداخل، وتُثبّت إصدارات upstream عبر commit كامل من 40 محرفاً، ولا تُقبل إلا تراخيص MIT أو Apache-2.0 أو BSD-3-Clause المسجلة. تُفحص التبعيات قبل التثبيت وبعده وتبقى التكاملات الحساسة اختيارية.'],
    firstLaunch: 'بعد التشغيل الأول افتح Settings → Models وأضف موفر الخدمة ومفتاح API الخاصين بك ثم اختر workspace. لا يحتوي Ultimate على مفاتيح API ولا ينسخها.',
    labels: ['لماذا يوجد Ultimate', 'ما تم اختياره مسبقاً', 'البدء خلال خمس دقائق', 'ما الذي يغيره المثبت', 'الخصوصية والتراخيص والحدود', 'التحقق والتطوير'],
    scope: 'عبارة «تقريباً كل الفئات العملية» لا تعني كل إضافة نُشرت. Ultimate مشروع مجتمعي وليس إصداراً رسمياً من DeepSeek AI؛ يحتفظ مؤلفو upstream بالملكية والتراخيص.',
    dedupe: 'يغطي TaskSwarm موجات التبعيات وعزل Git worktree بالفعل، لذلك يبقى Captain بديلاً بدلاً من إعداد افتراضي مكرر. تنطبق القاعدة نفسها في EXCLUDED_COMPONENTS.md.',
    license: 'كود المستودع بترخيص MIT. تحتفظ المكونات المنزلة بتراخيص وإشعارات MIT أو Apache-2.0 أو BSD-3-Clause. ما زال DSH إصدار معاينة للمطورين وقد يغيّر التوافق.',
    nodeSuccess: 'النتيجة `v22.x.x` أو إصدار رئيسي أعلى تعني النجاح.', installSuccess: 'يعرض التثبيت الناجح `Platform filter: windows` أو `Platform filter: macos` أو `Platform filter: linux`.', expected: 'السطر الأخير المتوقع:', developer: 'تحقق المطور', tutorialLicense: 'المثبت وmanifest بترخيص MIT. تحتفظ المكونات المنزلة بتراخيص upstream ولا يعيد Ultimate ترخيصها.', back: 'العودة إلى المقدمة',
  },
  hi: {
    principles: ['हर overlapping role के लिए एक reviewed default चुना जाता है, upstream versions पूर्ण 40-character commit से pin होते हैं, और केवल दर्ज MIT, Apache-2.0 या BSD-3-Clause components लिए जाते हैं। dependencies पहले और बाद में audit होती हैं तथा sensitive integrations optional रहती हैं।'],
    firstLaunch: 'पहली बार start होने के बाद Settings → Models खोलें, अपना provider और API key जोड़ें और workspace चुनें। Ultimate API key शामिल या copy नहीं करता।',
    labels: ['Ultimate क्यों है', 'पहले से चुनी गई क्षमताएं', 'पांच मिनट में शुरुआत', 'installer क्या बदलता है', 'privacy, licenses और सीमाएं', 'verification और development'],
    scope: '“लगभग सभी practical categories” का अर्थ प्रकाशित हर plugin नहीं है। Ultimate community-maintained है, DeepSeek AI की official release नहीं; upstream authors ownership और license रखते हैं।',
    dedupe: 'TaskSwarm पहले ही dependency waves और Git worktree isolation संभालता है, इसलिए Captain duplicate default के बजाय alternative रहता है। यही नियम EXCLUDED_COMPONENTS.md में लागू है।',
    license: 'repository code MIT है। Downloaded components अपने MIT, Apache-2.0 या BSD-3-Clause licenses और notices रखते हैं। DSH developer preview है और compatibility-breaking changes हो सकते हैं।',
    nodeSuccess: '`v22.x.x` या उससे ऊंचा major version सफलता है।', installSuccess: 'सफल install में `Platform filter: windows`, `Platform filter: macos` या `Platform filter: linux` दिखता है।', expected: 'अपेक्षित अंतिम line:', developer: 'developer verification', tutorialLicense: 'installer और manifest MIT हैं। Downloaded components अपने upstream licenses रखते हैं; Ultimate उन्हें relicense नहीं करता।', back: 'परिचय पर लौटें',
  },
  it: {
    principles: ['Per ogni ruolo sovrapposto viene scelto un solo valore predefinito revisionato; le versioni upstream sono fissate con commit completi di 40 caratteri; entrano solo licenze MIT, Apache-2.0 o BSD-3-Clause registrate; le dipendenze sono controllate prima e dopo; le integrazioni sensibili restano facoltative.'],
    firstLaunch: 'Dopo il primo avvio apri Settings → Models, aggiungi il tuo provider e la tua chiave API e scegli un workspace. Ultimate non include né copia chiavi.',
    labels: ['Perché esiste Ultimate', 'Cosa è già stato scelto', 'Avvio in cinque minuti', 'Cosa modifica l’installer', 'Privacy, licenze e limiti', 'Verifica e sviluppo'],
    scope: '“Quasi tutte le categorie pratiche” non significa ogni plugin pubblicato. Ultimate è mantenuto dalla comunità e non è una versione ufficiale DeepSeek AI; gli autori upstream conservano proprietà e licenza.',
    dedupe: 'TaskSwarm copre già le ondate di dipendenze e l’isolamento Git worktree; Captain resta quindi un’alternativa e non un valore predefinito duplicato. La stessa regola vale in EXCLUDED_COMPONENTS.md.',
    license: 'Il codice del repository usa MIT. I componenti scaricati mantengono licenze e avvisi MIT, Apache-2.0 o BSD-3-Clause. DSH resta una preview per sviluppatori e può introdurre cambiamenti incompatibili.',
    nodeSuccess: '`v22.x.x` o una versione principale superiore indica successo.', installSuccess: 'Un’installazione riuscita mostra `Platform filter: windows`, `Platform filter: macos` o `Platform filter: linux`.', expected: 'Ultima riga prevista:', developer: 'Verifica per sviluppatori', tutorialLicense: 'Installer e manifest usano MIT. I componenti scaricati conservano le licenze upstream; Ultimate non li rilicenzia.', back: 'Torna alla presentazione',
  },
  id: {
    principles: ['Satu default yang ditinjau dipilih untuk tiap peran tumpang tindih; versi upstream dikunci dengan commit penuh 40 karakter; hanya lisensi MIT, Apache-2.0 atau BSD-3-Clause yang tercatat; dependensi diperiksa sebelum dan sesudah; integrasi sensitif tetap opsional.'],
    firstLaunch: 'Setelah mulai pertama, buka Settings → Models, tambahkan provider dan kunci API Anda lalu pilih workspace. Ultimate tidak pernah menyertakan atau menyalin kunci.',
    labels: ['Mengapa Ultimate dibuat', 'Yang sudah dipilih', 'Mulai dalam lima menit', 'Yang diubah installer', 'Privasi, lisensi dan batasan', 'Verifikasi dan pengembangan'],
    scope: '“Hampir semua kategori praktis” bukan berarti semua plugin yang pernah diterbitkan. Ultimate dikelola komunitas dan bukan rilis resmi DeepSeek AI; penulis upstream mempertahankan kepemilikan dan lisensi.',
    dedupe: 'TaskSwarm sudah mencakup gelombang dependensi dan isolasi Git worktree; Captain tetap sebagai alternatif, bukan default duplikat. Aturan yang sama berlaku di EXCLUDED_COMPONENTS.md.',
    license: 'Kode repositori menggunakan MIT. Komponen unduhan mempertahankan lisensi dan pemberitahuan MIT, Apache-2.0 atau BSD-3-Clause. DSH masih pratinjau pengembang dan dapat mengalami perubahan yang memutus kompatibilitas.',
    nodeSuccess: '`v22.x.x` atau versi mayor lebih tinggi berarti berhasil.', installSuccess: 'Pemasangan berhasil menampilkan `Platform filter: windows`, `Platform filter: macos` atau `Platform filter: linux`.', expected: 'Baris akhir yang diharapkan:', developer: 'Verifikasi pengembang', tutorialLicense: 'Installer dan manifest menggunakan MIT. Komponen unduhan mempertahankan lisensi upstream; Ultimate tidak melisensikan ulang.', back: 'Kembali ke pengantar',
  },
  tr: {
    principles: ['Örtüşen her rol için incelenmiş tek bir varsayılan seçilir; upstream sürümleri tam 40 karakterli commit ile sabitlenir; yalnızca kayıtlı MIT, Apache-2.0 veya BSD-3-Clause alınır; bağımlılıklar önce ve sonra denetlenir; hassas entegrasyonlar isteğe bağlı kalır.'],
    firstLaunch: 'İlk başlatmadan sonra Settings → Models sayfasını açın, kendi sağlayıcınızı ve API anahtarınızı ekleyip workspace seçin. Ultimate anahtar içermez veya kopyalamaz.',
    labels: ['Ultimate neden var', 'Önceden seçilenler', 'Beş dakikada başlangıç', 'Yükleyicinin değiştirdikleri', 'Gizlilik, lisanslar ve sınırlar', 'Doğrulama ve geliştirme'],
    scope: '“Neredeyse tüm pratik kategoriler” yayımlanmış her eklenti anlamına gelmez. Ultimate topluluk tarafından yönetilir ve resmi DeepSeek AI sürümü değildir; upstream yazarları sahiplik ve lisanslarını korur.',
    dedupe: 'TaskSwarm bağımlılık dalgalarını ve Git worktree yalıtımını zaten kapsar; Captain yinelenen varsayılan yerine alternatif olarak kalır. Aynı kural EXCLUDED_COMPONENTS.md genelinde geçerlidir.',
    license: 'Depo kodu MIT lisanslıdır. İndirilen bileşenler MIT, Apache-2.0 veya BSD-3-Clause lisanslarını ve bildirimlerini korur. DSH geliştirici önizlemesidir ve uyumsuz değişiklikler yapabilir.',
    nodeSuccess: '`v22.x.x` veya daha yüksek ana sürüm başarılıdır.', installSuccess: 'Başarılı kurulum `Platform filter: windows`, `Platform filter: macos` veya `Platform filter: linux` gösterir.', expected: 'Beklenen son satır:', developer: 'Geliştirici doğrulaması', tutorialLicense: 'Yükleyici ve manifest MIT lisanslıdır. İndirilen bileşenler upstream lisanslarını korur; Ultimate yeniden lisanslamaz.', back: 'Tanıtıma dön',
  },
  vi: {
    principles: ['Mỗi vai trò chồng chéo chỉ có một mặc định đã duyệt; phiên bản upstream được ghim bằng commit đủ 40 ký tự; chỉ nhận MIT, Apache-2.0 hoặc BSD-3-Clause đã ghi; kiểm tra phụ thuộc trước và sau; tích hợp nhạy cảm vẫn tùy chọn.'],
    firstLaunch: 'Sau lần khởi động đầu, mở Settings → Models, thêm nhà cung cấp và khóa API của bạn rồi chọn workspace. Ultimate không bao giờ chứa hoặc sao chép khóa.',
    labels: ['Vì sao có Ultimate', 'Những gì đã được chọn', 'Bắt đầu trong năm phút', 'Trình cài đặt thay đổi gì', 'Riêng tư, giấy phép và giới hạn', 'Xác minh và phát triển'],
    scope: '“Gần như mọi nhóm thực tế” không có nghĩa mọi plugin từng phát hành. Ultimate do cộng đồng duy trì, không phải bản chính thức của DeepSeek AI; tác giả upstream giữ quyền sở hữu và giấy phép.',
    dedupe: 'TaskSwarm đã bao phủ đợt phụ thuộc và cách ly Git worktree, vì vậy Captain là lựa chọn thay thế chứ không phải mặc định trùng lặp. Quy tắc tương tự áp dụng trong EXCLUDED_COMPONENTS.md.',
    license: 'Mã kho dùng MIT. Thành phần tải về giữ giấy phép và thông báo MIT, Apache-2.0 hoặc BSD-3-Clause. DSH vẫn là bản xem trước cho nhà phát triển và có thể thay đổi không tương thích.',
    nodeSuccess: '`v22.x.x` hoặc phiên bản chính cao hơn là thành công.', installSuccess: 'Cài đặt thành công hiển thị `Platform filter: windows`, `Platform filter: macos` hoặc `Platform filter: linux`.', expected: 'Dòng cuối dự kiến:', developer: 'Xác minh cho nhà phát triển', tutorialLicense: 'Trình cài đặt và manifest dùng MIT. Thành phần tải về giữ giấy phép upstream; Ultimate không cấp lại giấy phép.', back: 'Quay lại giới thiệu',
  },
  th: {
    principles: ['เลือกค่าเริ่มต้นที่ตรวจสอบแล้วหนึ่งรายการต่อบทบาทที่ซ้ำกัน ตรึงเวอร์ชัน upstream ด้วย commit ครบ 40 ตัว รับเฉพาะ MIT, Apache-2.0 หรือ BSD-3-Clause ที่บันทึกไว้ ตรวจ dependency ก่อนและหลัง และคง integration ที่อ่อนไหวเป็นตัวเลือก.'],
    firstLaunch: 'หลังเริ่มครั้งแรก เปิด Settings → Models เพิ่ม provider และ API key ของคุณ แล้วเลือก workspace Ultimate ไม่รวมและไม่คัดลอก key.',
    labels: ['เหตุผลที่มี Ultimate', 'สิ่งที่เลือกไว้แล้ว', 'เริ่มในห้านาที', 'สิ่งที่ตัวติดตั้งเปลี่ยน', 'ความเป็นส่วนตัว สัญญาอนุญาต และข้อจำกัด', 'การตรวจสอบและพัฒนา'],
    scope: '“เกือบทุกหมวดที่ใช้งานจริง” ไม่ได้หมายถึงปลั๊กอินทุกตัวที่เคยเผยแพร่ Ultimate ดูแลโดยชุมชนและไม่ใช่รุ่นทางการของ DeepSeek AI ผู้เขียน upstream ยังคงสิทธิ์และสัญญาอนุญาต.',
    dedupe: 'TaskSwarm ครอบคลุม dependency waves และ Git worktree isolation แล้ว จึงเก็บ Captain เป็นทางเลือก ไม่ใช่ค่าเริ่มต้นซ้ำ หลักเดียวกันใช้ทั่ว EXCLUDED_COMPONENTS.md.',
    license: 'โค้ด repository ใช้ MIT ส่วนประกอบที่ดาวน์โหลดยังคงสัญญาอนุญาตและประกาศ MIT, Apache-2.0 หรือ BSD-3-Clause DSH ยังเป็น developer preview และอาจเปลี่ยนจนไม่เข้ากัน.',
    nodeSuccess: '`v22.x.x` หรือ major version ที่สูงกว่าคือสำเร็จ.', installSuccess: 'การติดตั้งสำเร็จจะแสดง `Platform filter: windows`, `Platform filter: macos` หรือ `Platform filter: linux`.', expected: 'บรรทัดสุดท้ายที่คาดไว้:', developer: 'การตรวจสอบสำหรับนักพัฒนา', tutorialLicense: 'ตัวติดตั้งและ manifest ใช้ MIT ส่วนประกอบที่ดาวน์โหลดคงสัญญาอนุญาต upstream; Ultimate ไม่เปลี่ยนสัญญาอนุญาต.', back: 'กลับไปบทแนะนำ',
  },
  pl: {
    principles: ['Dla każdej nakładającej się roli wybrano jeden sprawdzony standard; wersje upstream są przypięte pełnym 40-znakowym commit; dopuszczane są tylko zapisane MIT, Apache-2.0 lub BSD-3-Clause; zależności są sprawdzane przed i po; wrażliwe integracje pozostają opcjonalne.'],
    firstLaunch: 'Po pierwszym uruchomieniu otwórz Settings → Models, dodaj własnego dostawcę i klucz API, a następnie wybierz workspace. Ultimate nie zawiera ani nie kopiuje kluczy.',
    labels: ['Dlaczego istnieje Ultimate', 'Co zostało już wybrane', 'Start w pięć minut', 'Co zmienia instalator', 'Prywatność, licencje i ograniczenia', 'Weryfikacja i rozwój'],
    scope: '„Prawie wszystkie praktyczne kategorie” nie oznacza wszystkich opublikowanych wtyczek. Ultimate jest utrzymywany przez społeczność i nie jest oficjalnym wydaniem DeepSeek AI; autorzy upstream zachowują prawa i licencje.',
    dedupe: 'TaskSwarm obejmuje już fale zależności i izolację Git worktree, więc Captain pozostaje alternatywą, a nie zduplikowanym standardem. Ta sama zasada obowiązuje w EXCLUDED_COMPONENTS.md.',
    license: 'Kod repozytorium ma licencję MIT. Pobrane komponenty zachowują licencje i noty MIT, Apache-2.0 lub BSD-3-Clause. DSH jest nadal wersją deweloperską i może wprowadzać niezgodne zmiany.',
    nodeSuccess: '`v22.x.x` lub wyższa wersja główna oznacza sukces.', installSuccess: 'Poprawna instalacja pokazuje `Platform filter: windows`, `Platform filter: macos` lub `Platform filter: linux`.', expected: 'Oczekiwany ostatni wiersz:', developer: 'Weryfikacja dla programistów', tutorialLicense: 'Instalator i manifest mają MIT. Pobrane komponenty zachowują licencje upstream; Ultimate nie zmienia ich licencji.', back: 'Powrót do opisu',
  },
  nl: {
    principles: ['Per overlappende rol is één gecontroleerde standaard gekozen; upstream-versies zijn vastgezet met volledige commits van 40 tekens; alleen vastgelegde MIT, Apache-2.0 of BSD-3-Clause worden opgenomen; afhankelijkheden worden vooraf en achteraf gecontroleerd; gevoelige integraties blijven optioneel.'],
    firstLaunch: 'Open na de eerste start Settings → Models, voeg uw eigen provider en API-sleutel toe en kies een workspace. Ultimate bevat of kopieert nooit sleutels.',
    labels: ['Waarom Ultimate bestaat', 'Wat al is gekozen', 'Start in vijf minuten', 'Wat de installer wijzigt', 'Privacy, licenties en grenzen', 'Controle en ontwikkeling'],
    scope: '“Bijna alle praktische categorieën” betekent niet elke ooit gepubliceerde plugin. Ultimate wordt door de gemeenschap onderhouden en is geen officiële DeepSeek AI-versie; upstream-auteurs behouden eigendom en licentie.',
    dedupe: 'TaskSwarm dekt afhankelijkheidsgolven en Git-worktree-isolatie al; Captain blijft daarom een alternatief en geen dubbele standaard. Dezelfde regel geldt in EXCLUDED_COMPONENTS.md.',
    license: 'De repositorycode gebruikt MIT. Gedownloade componenten behouden hun MIT-, Apache-2.0- of BSD-3-Clause-licenties en meldingen. DSH blijft een ontwikkelaarspreview en kan incompatibele wijzigingen invoeren.',
    nodeSuccess: '`v22.x.x` of een hogere hoofdversie is succesvol.', installSuccess: 'Een geslaagde installatie toont `Platform filter: windows`, `Platform filter: macos` of `Platform filter: linux`.', expected: 'Verwachte laatste regel:', developer: 'Controle voor ontwikkelaars', tutorialLicense: 'Installer en manifest gebruiken MIT. Gedownloade componenten behouden hun upstream-licenties; Ultimate herlicentieert ze niet.', back: 'Terug naar de introductie',
  },
  uk: {
    principles: ['Для кожної ролі, що перетинається, обрано один перевірений стандарт; upstream-версії закріплено повними 40-символьними commit; приймаються лише записані MIT, Apache-2.0 або BSD-3-Clause; залежності перевіряються до і після; чутливі інтеграції лишаються необов’язковими.'],
    firstLaunch: 'Після першого запуску відкрийте Settings → Models, додайте власного провайдера й API-ключ, потім виберіть workspace. Ultimate не містить і не копіює ключі.',
    labels: ['Навіщо потрібен Ultimate', 'Що вже вибрано', 'Старт за п’ять хвилин', 'Що змінює інсталятор', 'Приватність, ліцензії та обмеження', 'Перевірка й розробка'],
    scope: '«Майже всі практичні категорії» не означає всі опубліковані плагіни. Ultimate підтримує спільнота, і це не офіційний випуск DeepSeek AI; upstream-автори зберігають права та ліцензії.',
    dedupe: 'TaskSwarm уже охоплює хвилі залежностей та ізоляцію Git worktree, тому Captain лишається альтернативою, а не дубльованим стандартом. Те саме правило діє в EXCLUDED_COMPONENTS.md.',
    license: 'Код репозиторію має MIT. Завантажені компоненти зберігають ліцензії й повідомлення MIT, Apache-2.0 або BSD-3-Clause. DSH лишається попередньою версією й може вносити несумісні зміни.',
    nodeSuccess: '`v22.x.x` або вища основна версія означає успіх.', installSuccess: 'Успішне встановлення показує `Platform filter: windows`, `Platform filter: macos` або `Platform filter: linux`.', expected: 'Очікуваний останній рядок:', developer: 'Перевірка для розробників', tutorialLicense: 'Інсталятор і manifest мають MIT. Завантажені компоненти зберігають upstream-ліцензії; Ultimate не змінює їх.', back: 'Повернутися до опису',
  },
};

const navigationByLocale = {
  'zh-TW': ['語言', '教學語言', '啟動本機 profile'],
  es: ['Idiomas', 'Idiomas del tutorial', 'Iniciar el profile local'],
  fr: ['Langues', 'Langues du tutoriel', 'Démarrer le profile local'],
  de: ['Sprachen', 'Sprachen der Anleitung', 'Lokales profile starten'],
  'pt-BR': ['Idiomas', 'Idiomas do tutorial', 'Iniciar o profile local'],
  ru: ['Языки', 'Языки руководства', 'Запуск локального profile'],
  ja: ['言語', 'チュートリアル言語', 'ローカル profile を起動'],
  ko: ['언어', '안내서 언어', '로컬 profile 시작'],
  ar: ['اللغات', 'لغات الدليل', 'تشغيل profile المحلي'],
  hi: ['भाषाएं', 'मार्गदर्शिका भाषाएं', 'local profile शुरू करें'],
  it: ['Lingue', 'Lingue della guida', 'Avviare il profile locale'],
  id: ['Bahasa', 'Bahasa panduan', 'Mulai profile lokal'],
  tr: ['Diller', 'Kılavuz dilleri', 'Yerel profile başlatma'],
  vi: ['Ngôn ngữ', 'Ngôn ngữ hướng dẫn', 'Khởi động profile cục bộ'],
  th: ['ภาษา', 'ภาษาของคู่มือ', 'เริ่ม profile ในเครื่อง'],
  pl: ['Języki', 'Języki przewodnika', 'Uruchomienie lokalnego profile'],
  nl: ['Talen', 'Talen van de gids', 'Lokaal profile starten'],
  uk: ['Мови', 'Мови посібника', 'Запуск локального profile'],
};

function compactLocale({ code, name, hero, quote, why, included, requirements, installer, boundary, title, intro, headings, sections }) {
  const common = commonByLocale[code];
  return {
    code, name, hero, quote, why,
    principles: common.principles,
    included,
    requirements,
    firstLaunch: common.firstLaunch,
    installer,
    boundary,
    labels: common.labels,
    tutorialTitle: title,
    tutorialIntro: intro,
    compactTutorial: { headings, sections },
  };
}

locales.push(
  compactLocale({
    code: 'de', name: 'Deutsch',
    hero: 'DeepSeek Harness hat inzwischen mehr Plugins, als man sinnvoll einzeln vergleichen kann. Ultimate hat Lizenzen geprüft, Versionen festgeschrieben, Doppelungen entfernt und die nützlichen Optionen geordnet, damit Sie sofort arbeiten können.',
    quote: 'Ein reproduzierbares, kuratiertes DSH-Profil für fast alle praktischen Bereiche: Coding-Teams, Workflows, Sicherheit, Forschung und tägliche Automatisierung.',
    why: 'Der DSH-Kosmos wächst schnell. Der Vergleich von Funktionen, Lizenzen, Versionen, Berechtigungen und Überschneidungen vieler Repositories ist selbst Arbeit. Ultimate dokumentiert eine prüfbare Auswahl in einem öffentlichen Manifest.',
    included: ['Große Coding-Aufgaben: Agent-Teams, Abhängigkeitswellen, Git-worktree-Isolation, Planung und Verifikation.', 'Workflows und Zuverlässigkeit: wiederverwendbare Abläufe, Zeitpläne, bedingtes Aufwachen, Backups, Speicher und Regeln.', 'Produktivität: Lesezeichen, automatische Fortsetzung, Design-Skills und Spotlight.', 'Benachrichtigungen, IM, Telefon und autorisierte Sicherheitsfunktionen bleiben optional.'],
    requirements: 'Erforderlich sind Windows 10/11 x64, macOS oder Linux, Node.js 22 oder neuer sowie Netzwerkzugriff auf die öffentlichen Manifest-Repositories. Bei ZIP-Download ist Git nicht nötig.',
    installer: 'Das Installationsprogramm erstellt ein eigenes Benutzerprofil, legt zuerst die offiziellen base- und web-app-Schichten an und fügt dann die ausgewählten Bundles hinzu. Es prüft Abhängigkeiten davor und danach, ohne Zugangsdaten, Sitzungen oder vorhandene cordis.patch.yml zu löschen.',
    boundary: 'Dieses Repository enthält Manifest, Installer, Prüfregeln und Dokumentation. Es verteilt weder Drittquellcode, node_modules, API-Schlüssel, Telefonnummern, E-Mails, Browsersitzungen noch private Konfigurationen.',
    title: 'DeepSeek Harness Ultimate: Anleitung für Einsteiger',
    intro: 'Diese Anleitung setzt keine Terminal- oder Programmierkenntnisse voraus. Folgen Sie den Schritten in der Reihenfolge und führen Sie die kleinen Prüfungen aus.',
    headings: ['Was wird installiert?', 'Vorbereitung und Node.js', 'Herunterladen und installieren', 'Erster Start und Modell', 'Workspace und erster Test', 'Vorhandene lokale App und optionale Plugins', 'Prüfen, aktualisieren, entfernen und sicher bleiben'],
    sections: ['Ultimate ist ein Profil-Installer, kein Modell und keine offizielle DeepSeek-AI-Desktop-App. Es liefert eine geprüfte, versionsfixierte und doppelfreie Plugin-Auswahl; Ihr eigenes Modellkonto bleibt erforderlich.', 'Bereiten Sie einen unterstützten Computer, stabiles Internet, Installationsrechte für Ihr Benutzerkonto und einen einfachen Arbeitsordner wie Documents/DSH-Work vor. Installieren Sie bei nodejs.org die LTS-Version, schließen Sie das Terminal und öffnen Sie es erneut.', 'Laden Sie auf GitHub über Code → Download ZIP das Repository herunter, entpacken Sie es und öffnen Sie den Ordner mit package.json, profile, scripts und windows. Windows-Nutzer können windows/install-ultimate.cmd doppelklicken; macOS/Linux führen die Befehle unten aus.', 'Starten Sie DSH aus dem Arbeitsordner. 127.0.0.1 bedeutet nur Ihr eigener Computer. Lassen Sie das Terminal während der Nutzung offen. Öffnen Sie anschließend Settings → Models und geben Sie Ihren Provider und Ihren Schlüssel ausschließlich dort ein.', 'Wählen Sie Choose workspace, fügen Sie Ihren Arbeitsordner hinzu und starten Sie eine neue Sitzung. Fragen Sie zuerst: List the files in this workspace. Do not change anything. Wenn die richtigen Dateien erscheinen und kein Modellfehler angezeigt wird, ist die Grundeinrichtung erfolgreich.', 'Eine bestehende lokale macOS-App mit dem Profil web muss zuerst beendet werden. Sichern Sie ~/.dsh/profiles/web, bevor Sie Ultimate dort installieren; cordis.patch.yml bleibt erhalten, aber nicht im Manifest enthaltene Plugins können entfernt werden. Telefon-, IM-, Benachrichtigungs- und Sicherheitsplugins nur nach Prüfung von COMPONENTS.md aktivieren.', 'Führen Sie die Profilprüfung aus; die letzte Zeile muss Profile dependency integrity: OK sein. Vor Updates DSH stoppen und das Profil sichern. Zum Entfernen DSH stoppen und ~/.dsh/profiles/ultimate in den Papierkorb verschieben. Löschen Sie bei einer Integritätswarnung keine zufälligen Dateien und veröffentlichen Sie niemals Schlüssel oder Tokens.'],
  }),
  compactLocale({
    code: 'pt-BR', name: 'Português (Brasil)',
    hero: 'O DeepSeek Harness já possui plugins demais para comparar um por um com tranquilidade. O Ultimate já revisou licenças, fixou versões, removeu duplicações e organizou as opções úteis para você começar sem ansiedade de escolha.',
    quote: 'Um perfil DSH reprodutível e selecionado que cobre quase todas as categorias práticas: equipes de código, fluxos de trabalho, segurança, pesquisa e automação diária.',
    why: 'O ecossistema DSH cresce rapidamente. Comparar funções, licenças, versões, permissões e sobreposições em dezenas de repositórios já é um trabalho. O Ultimate registra uma seleção auditável em um manifest público.',
    included: ['Código de grande porte: equipes Agent, ondas de dependências, isolamento Git worktree, planejamento e verificação.', 'Fluxo e confiabilidade: workflows reutilizáveis, agendamento, acionamento condicional, backup, memória e regras.', 'Produtividade: favoritos, continuação automática, skills de design e Spotlight.', 'Notificações, IM, chamadas e pesquisa de segurança autorizada permanecem opcionais.'],
    requirements: 'Você precisa de Windows 10/11 x64, macOS ou Linux, Node.js 22 ou superior e acesso de rede aos repositórios públicos do manifest. Git é opcional quando usar o ZIP.',
    installer: 'O instalador cria um profile do usuário, coloca primeiro as camadas oficiais base e web-app e depois os bundles selecionados. Ele audita dependências antes e depois sem apagar credenciais, sessões ou um cordis.patch.yml existente.',
    boundary: 'O repositório contém manifest, instalador, regras de auditoria e documentação. Não redistribui código de terceiros, node_modules, chaves, telefones, e-mails, sessões do navegador nem configurações privadas.',
    title: 'DeepSeek Harness Ultimate: guia para iniciantes',
    intro: 'Este guia pressupõe que você nunca usou um terminal. Siga os passos em ordem e faça cada pequena verificação; não é necessário saber programar.',
    headings: ['O que será instalado', 'Preparação e Node.js', 'Baixar e instalar', 'Primeira inicialização e modelo', 'Workspace e primeiro teste', 'App local existente e plugins opcionais', 'Verificar, atualizar, remover e manter segurança'],
    sections: ['Ultimate é um instalador de profiles, não um modelo nem um aplicativo oficial da DeepSeek AI. Ele oferece uma seleção prática sem duplicações, com licenças revisadas e versões fixadas; você ainda usa sua própria conta de modelo.', 'Prepare um computador compatível, internet estável, permissão para instalar em sua conta e uma pasta simples como Documents/DSH-Work. Instale a versão LTS em nodejs.org, feche e reabra PowerShell ou Terminal.', 'No GitHub escolha Code → Download ZIP, extraia e abra a pasta que contém package.json, profile, scripts e windows. No Windows você pode clicar duas vezes em windows/install-ultimate.cmd; no macOS/Linux execute os comandos abaixo.', 'Inicie o DSH a partir da pasta onde o Agent deve trabalhar. 127.0.0.1 significa somente o seu computador; mantenha o terminal aberto. Depois abra Settings → Models e informe seu provedor e sua chave somente nessa tela.', 'Clique em Choose workspace, adicione e selecione sua pasta e crie uma sessão. Primeiro peça: List the files in this workspace. Do not change anything. Ver os arquivos certos sem erro de modelo confirma a configuração básica.', 'Se você já possui um app local de macOS que usa o profile web, feche-o e faça uma cópia de ~/.dsh/profiles/web antes de instalar ali. cordis.patch.yml é preservado, porém npm pode remover plugins fora do manifest. Ative telefone, IM, avisos e segurança apenas depois de ler COMPONENTS.md.', 'Execute a auditoria do profile; a última linha deve ser Profile dependency integrity: OK. Antes de atualizar, pare o DSH e faça backup do profile. Para remover, pare o DSH e mova ~/.dsh/profiles/ultimate para a Lixeira. Não apague arquivos aleatórios após uma falha e nunca publique chaves ou tokens.'],
  }),
  compactLocale({
    code: 'ru', name: 'Русский',
    hero: 'В DeepSeek Harness уже слишком много плагинов, чтобы спокойно сравнивать их по одному. Ultimate уже проверил лицензии, закрепил версии, убрал дубли и упорядочил полезные варианты, чтобы вы могли сразу начать работу без тревоги выбора.',
    quote: 'Воспроизводимый отобранный профиль DSH, охватывающий почти все практические категории: команды разработки, workflow, безопасность, исследования и ежедневную автоматизацию.',
    why: 'Экосистема DSH быстро растет. Сравнение функций, лицензий, версий, разрешений и пересечений десятков репозиториев само по себе является работой. Ultimate фиксирует проверяемый выбор в открытом manifest.',
    included: ['Крупные задачи разработки: команды Agent, волны зависимостей, изоляция Git worktree, планирование и проверка.', 'Workflow и надежность: повторно используемые процессы, расписания, условный запуск, резервные копии, память и правила.', 'Продуктивность: закладки, автопродолжение, навыки дизайна и Spotlight.', 'Уведомления, IM, звонки и авторизованные инструменты безопасности остаются необязательными.'],
    requirements: 'Нужны Windows 10/11 x64, macOS или Linux, Node.js 22 или новее и доступ к публичным репозиториям manifest. При загрузке ZIP Git не обязателен.',
    installer: 'Установщик создает пользовательский profile, сначала добавляет официальные слои base и web-app, затем выбранные bundles. Он проверяет зависимости до и после установки, не удаляя учетные данные, сессии или существующий cordis.patch.yml.',
    boundary: 'Репозиторий содержит manifest, установщик, правила аудита и документацию. Он не распространяет чужой исходный код, node_modules, ключи API, телефоны, почту, браузерные сессии или приватную конфигурацию.',
    title: 'DeepSeek Harness Ultimate: руководство для новичков',
    intro: 'Это руководство рассчитано на человека, который никогда не пользовался терминалом. Выполняйте шаги по порядку и делайте небольшие проверки; программирование не требуется.',
    headings: ['Что устанавливается', 'Подготовка и Node.js', 'Загрузка и установка', 'Первый запуск и модель', 'Workspace и первая проверка', 'Существующее локальное приложение и дополнительные плагины', 'Проверка, обновление, удаление и безопасность'],
    sections: ['Ultimate - это установщик profile, а не модель и не официальное настольное приложение DeepSeek AI. Он дает проверенный набор плагинов без дубликатов и с закрепленными версиями; учетная запись модели должна быть вашей.', 'Подготовьте поддерживаемый компьютер, стабильный интернет, право установки для своей учетной записи и простой рабочий каталог, например Documents/DSH-Work. Установите LTS на nodejs.org, затем закройте и снова откройте PowerShell или Terminal.', 'На GitHub выберите Code → Download ZIP, распакуйте архив и откройте каталог с package.json, profile, scripts и windows. В Windows можно дважды щелкнуть windows/install-ultimate.cmd; в macOS/Linux используйте команды ниже.', 'Запускайте DSH из папки, где должен работать Agent. 127.0.0.1 означает только ваш компьютер; не закрывайте терминал. Затем откройте Settings → Models и вводите свой провайдер и ключ только там.', 'Нажмите Choose workspace, добавьте и выберите рабочую папку, создайте новую сессию. Сначала попросите: List the files in this workspace. Do not change anything. Правильный список файлов без ошибки модели означает успех.', 'Если уже есть локальное приложение macOS, запускающее profile web, выйдите из него и скопируйте ~/.dsh/profiles/web до установки туда. cordis.patch.yml сохраняется, но npm может удалить плагины вне manifest. Телефон, IM, уведомления и безопасность включайте только после чтения COMPONENTS.md.', 'Запустите аудит profile; последняя строка должна быть Profile dependency integrity: OK. Перед обновлением остановите DSH и сохраните profile. Для удаления остановите DSH и переместите ~/.dsh/profiles/ultimate в корзину. Не удаляйте случайные файлы при ошибке и никогда не публикуйте ключи или токены.'],
  }),
  compactLocale({
    code: 'ja', name: '日本語',
    hero: 'DeepSeek Harness には、落ち着いて一つずつ比較できないほど多くのプラグインがあります。Ultimate はライセンス確認、バージョン固定、重複排除、実用的な整理を済ませているため、選択に悩まずすぐ作業を始められます。',
    quote: 'コーディングチーム、ワークフロー、安全性、研究、日常自動化という、ほぼすべての実用カテゴリをカバーする再現可能な厳選 DSH プロファイルです。',
    why: 'DSH のエコシステムは急速に成長しています。数十のリポジトリの機能、ライセンス、版、権限、重複を比較すること自体が仕事です。Ultimate は監査可能な選択を公開 manifest に記録します。',
    included: ['大規模コーディング: Agent チーム、依存関係ウェーブ、Git worktree 分離、計画、検証。', 'ワークフローと信頼性: 再利用可能なフロー、スケジュール、条件起動、バックアップ、記憶、ルール。', '生産性: ブックマーク、自動継続、デザインスキル、Spotlight。', '通知、IM、電話、許可済みセキュリティ機能は任意です。'],
    requirements: 'Windows 10/11 x64、macOS または Linux、Node.js 22 以上、manifest 内の公開リポジトリへ接続できるネットワークが必要です。ZIP を使う場合 Git は必須ではありません。',
    installer: 'インストーラはユーザー用 profile を作成し、公式 base と web-app の層を先に置いてから選択済み bundle を追加します。資格情報、セッション、既存の cordis.patch.yml を削除せず、前後で依存関係を監査します。',
    boundary: 'このリポジトリには manifest、インストーラ、監査ルール、文書のみが含まれます。第三者ソース、node_modules、API キー、電話番号、メール、ブラウザセッション、私的設定は配布しません。',
    title: 'DeepSeek Harness Ultimate: 初心者向けガイド',
    intro: 'このガイドはターミナルを使ったことがない方を想定しています。順番に進め、各確認を行ってください。プログラミング知識は不要です。',
    headings: ['何をインストールするか', '準備と Node.js', 'ダウンロードとインストール', '初回起動とモデル', 'ワークスペースと最初の確認', '既存ローカルアプリと任意プラグイン', '確認、更新、削除、安全性'],
    sections: ['Ultimate は profile インストーラであり、モデルや DeepSeek AI 公式デスクトップアプリではありません。ライセンス確認済み、版固定済み、重複なしの実用プラグインセットを提供しますが、モデルアカウントは自分のものを使います。', '対応コンピューター、安定したネットワーク、自分のアカウントでのインストール権限、Documents/DSH-Work のような簡単な作業フォルダを用意します。nodejs.org から LTS を入れ、PowerShell または Terminal を開き直します。', 'GitHub で Code → Download ZIP を選び、展開して package.json、profile、scripts、windows があるフォルダを開きます。Windows は windows/install-ultimate.cmd をダブルクリックできます。macOS/Linux は下のコマンドを使います。', 'Agent に作業させるフォルダから DSH を起動します。127.0.0.1 は自分のコンピューターだけを意味します。利用中はターミナルを閉じないでください。その後 Settings → Models を開き、自分のプロバイダーとキーをその画面だけに入力します。', 'Choose workspace を押して作業フォルダを追加・選択し、新しいセッションを作成します。最初に List the files in this workspace. Do not change anything. と送ります。正しいファイルが表示され、モデルエラーがなければ基本設定は成功です。', 'web profile を起動する既存の macOS ローカルアプリがある場合は、終了してから ~/.dsh/profiles/web をバックアップします。cordis.patch.yml は残りますが、manifest 外のプラグインは npm により削除されることがあります。電話、IM、通知、安全機能は COMPONENTS.md を読んでから有効にしてください。', 'profile 監査を実行し、最後に Profile dependency integrity: OK と表示されることを確認します。更新前に DSH を停止して profile を保存します。削除は DSH を停止して ~/.dsh/profiles/ultimate をゴミ箱へ移します。失敗時にランダムなファイルを消したり、キーやトークンを公開したりしないでください。'],
  }),
  compactLocale({
    code: 'ko', name: '한국어',
    hero: 'DeepSeek Harness에는 하나씩 비교하기 어려울 만큼 많은 플러그인이 있습니다. Ultimate가 라이선스를 검토하고 버전을 고정하며 중복을 제거하고 유용한 선택지를 정리했으므로, 선택 불안 없이 바로 작업을 시작할 수 있습니다.',
    quote: '코딩 팀, 워크플로, 보안, 연구, 일상 자동화 등 거의 모든 실용 범주를 다루는 재현 가능한 큐레이션 DSH profile입니다.',
    why: 'DSH 생태계는 빠르게 성장합니다. 수십 개 저장소의 기능, 라이선스, 버전, 권한, 중복을 비교하는 일 자체가 작업입니다. Ultimate는 감사 가능한 선택을 공개 manifest에 기록합니다.',
    included: ['대규모 코드 작업: Agent 팀, 의존성 웨이브, Git worktree 격리, 계획과 검증.', '워크플로와 안정성: 재사용 흐름, 예약, 조건 깨우기, 백업, 메모리, 규칙.', '생산성: 북마크, 자동 계속, 디자인 skill, Spotlight.', '알림, IM, 전화, 승인된 보안 기능은 선택 사항입니다.'],
    requirements: 'Windows 10/11 x64, macOS 또는 Linux, Node.js 22 이상과 manifest의 공개 저장소에 연결할 네트워크가 필요합니다. ZIP을 내려받으면 Git은 필수가 아닙니다.',
    installer: '설치기는 사용자 profile을 만들고 공식 base와 web-app 레이어를 먼저 둔 뒤 선택된 bundle을 추가합니다. 설치 전후 의존성을 감사하며 자격 증명, 세션, 기존 cordis.patch.yml을 삭제하지 않습니다.',
    boundary: '이 저장소에는 manifest, 설치기, 감사 규칙, 문서만 있습니다. 타사 소스, node_modules, API 키, 전화번호, 이메일, 브라우저 세션, 개인 설정을 재배포하지 않습니다.',
    title: 'DeepSeek Harness Ultimate: 초보자 안내서',
    intro: '이 안내서는 터미널을 한 번도 사용하지 않은 분을 대상으로 합니다. 순서대로 진행하고 각 확인을 수행하세요. 프로그래밍 지식은 필요 없습니다.',
    headings: ['무엇을 설치하는가', '준비와 Node.js', '다운로드와 설치', '첫 실행과 모델', '워크스페이스와 첫 테스트', '기존 로컬 앱과 선택 플러그인', '검증, 업데이트, 제거, 보안'],
    sections: ['Ultimate는 profile 설치기이며 모델이나 DeepSeek AI 공식 데스크톱 앱이 아닙니다. 라이선스 확인, 버전 고정, 중복 제거된 실용 플러그인 모음을 제공하지만 모델 계정은 본인의 것을 사용해야 합니다.', '지원되는 컴퓨터, 안정적인 인터넷, 본인 계정의 설치 권한, Documents/DSH-Work 같은 간단한 작업 폴더를 준비하세요. nodejs.org에서 LTS를 설치한 뒤 PowerShell 또는 Terminal을 다시 여세요.', 'GitHub에서 Code → Download ZIP을 선택하고 압축을 푼 뒤 package.json, profile, scripts, windows가 있는 폴더를 여세요. Windows에서는 windows/install-ultimate.cmd를 두 번 클릭할 수 있고 macOS/Linux에서는 아래 명령을 사용합니다.', 'Agent가 작업할 폴더에서 DSH를 시작합니다. 127.0.0.1은 본인 컴퓨터만 뜻합니다. 사용하는 동안 터미널을 열어 두세요. 이어서 Settings → Models에서 본인의 공급자와 키를 그 화면에만 입력합니다.', 'Choose workspace를 눌러 작업 폴더를 추가하고 선택한 뒤 새 세션을 만드세요. 먼저 List the files in this workspace. Do not change anything. 을 보냅니다. 올바른 파일이 보이고 모델 오류가 없으면 기본 설정이 성공한 것입니다.', 'web profile을 시작하는 기존 macOS 로컬 앱이 있다면 종료하고 ~/.dsh/profiles/web을 백업한 뒤 설치하세요. cordis.patch.yml은 보존되지만 manifest 밖 플러그인은 npm이 제거할 수 있습니다. 전화, IM, 알림, 보안 기능은 COMPONENTS.md를 읽고 나서만 활성화하세요.', 'profile 감사를 실행해 마지막 줄이 Profile dependency integrity: OK 인지 확인하세요. 업데이트 전 DSH를 멈추고 profile을 백업합니다. 제거하려면 DSH를 멈추고 ~/.dsh/profiles/ultimate를 휴지통으로 옮기세요. 실패 시 임의 파일을 지우거나 키와 토큰을 공개하지 마세요.'],
  }),
  compactLocale({
    code: 'it', name: 'Italiano',
    hero: 'DeepSeek Harness ha ormai più plugin di quanti sia ragionevole confrontare uno per uno. Ultimate ha già verificato le licenze, fissato le versioni, eliminato i duplicati e ordinato le opzioni utili: puoi iniziare senza ansia da scelta.',
    quote: 'Un profilo DSH riproducibile e selezionato per quasi tutte le categorie pratiche: team di sviluppo, workflow, sicurezza, ricerca e automazione quotidiana.',
    why: 'L’ecosistema DSH cresce rapidamente. Confrontare funzioni, licenze, versioni, permessi e sovrapposizioni di decine di repository è un lavoro a sé. Ultimate registra una scelta verificabile in un manifest pubblico.',
    included: ['Grandi attività di codice: team Agent, ondate di dipendenze, isolamento Git worktree, pianificazione e verifica.', 'Workflow e affidabilità: flussi riutilizzabili, pianificazioni, risvegli condizionali, backup, memoria e regole.', 'Produttività: segnalibri, continuazione automatica, skill di design e Spotlight.', 'Notifiche, IM, chiamate e ricerca di sicurezza autorizzata sono facoltative.'],
    requirements: 'Servono Windows 10/11 x64, macOS o Linux, Node.js 22 o successivo e accesso ai repository pubblici del manifest. Git non è obbligatorio se si scarica il ZIP.',
    installer: 'L’installer crea un profile utente, mette prima i layer ufficiali base e web-app e poi i bundle selezionati. Controlla le dipendenze prima e dopo senza eliminare credenziali, sessioni o un cordis.patch.yml esistente.',
    boundary: 'Il repository contiene manifest, installer, regole di audit e documentazione. Non ridistribuisce codice di terzi, node_modules, chiavi API, telefoni, email, sessioni del browser o configurazione privata.',
    title: 'DeepSeek Harness Ultimate: guida per principianti',
    intro: 'Questa guida presuppone che tu non abbia mai usato un terminale. Segui i passaggi in ordine e svolgi ogni verifica; non servono conoscenze di programmazione.',
    headings: ['Cosa viene installato', 'Preparazione e Node.js', 'Scaricare e installare', 'Primo avvio e modello', 'Workspace e primo test', 'App locale esistente e plugin facoltativi', 'Verificare, aggiornare, rimuovere e proteggersi'],
    sections: ['Ultimate è un installer di profile, non un modello né un’app desktop ufficiale di DeepSeek AI. Offre una selezione pratica senza duplicati, con licenze verificate e versioni fissate; il tuo account modello resta necessario.', 'Prepara un computer supportato, internet stabile, autorizzazione a installare per il tuo utente e una cartella semplice come Documents/DSH-Work. Installa LTS da nodejs.org e riapri PowerShell o Terminal.', 'Su GitHub scegli Code → Download ZIP, estrai e apri la cartella con package.json, profile, scripts e windows. In Windows puoi fare doppio clic su windows/install-ultimate.cmd; in macOS/Linux usa i comandi sotto.', 'Avvia DSH dalla cartella in cui deve lavorare l’Agent. 127.0.0.1 indica solo il tuo computer; lascia aperto il terminale. Poi apri Settings → Models e inserisci provider e chiave solo in quella schermata.', 'Premi Choose workspace, aggiungi e seleziona la cartella, crea una sessione e invia prima: List the files in this workspace. Do not change anything. Se compaiono i file corretti senza errore di modello, la configurazione base funziona.', 'Se hai già un’app macOS locale che avvia il profile web, chiudila e copia ~/.dsh/profiles/web prima di installare lì. cordis.patch.yml viene mantenuto, ma npm può rimuovere plugin fuori dal manifest. Attiva telefono, IM, notifiche e sicurezza solo dopo COMPONENTS.md.', 'Esegui l’audit del profile: l’ultima riga deve essere Profile dependency integrity: OK. Prima di aggiornare ferma DSH e salva il profile. Per rimuovere, ferma DSH e sposta ~/.dsh/profiles/ultimate nel Cestino. Non eliminare file casuali dopo un errore e non pubblicare mai chiavi o token.'],
  }),
  compactLocale({
    code: 'id', name: 'Bahasa Indonesia',
    hero: 'DeepSeek Harness kini memiliki terlalu banyak plugin untuk dibandingkan satu per satu dengan tenang. Ultimate sudah memeriksa lisensi, mengunci versi, menghapus duplikasi, dan menyusun pilihan berguna sehingga Anda dapat langsung bekerja tanpa kecemasan memilih.',
    quote: 'Profile DSH terkurasi dan dapat direproduksi untuk hampir semua kategori praktis: tim coding, workflow, keamanan, riset, dan otomatisasi harian.',
    why: 'Ekosistem DSH tumbuh cepat. Membandingkan fungsi, lisensi, versi, izin, dan tumpang tindih dari puluhan repositori adalah pekerjaan tersendiri. Ultimate mencatat pilihan yang dapat diaudit dalam manifest publik.',
    included: ['Pekerjaan kode besar: tim Agent, gelombang dependensi, isolasi Git worktree, perencanaan dan verifikasi.', 'Workflow dan keandalan: alur yang dapat digunakan kembali, jadwal, pemicu bersyarat, cadangan, memori dan aturan.', 'Produktivitas: bookmark, lanjut otomatis, skill desain dan Spotlight.', 'Notifikasi, IM, telepon dan riset keamanan berizin tetap opsional.'],
    requirements: 'Diperlukan Windows 10/11 x64, macOS atau Linux, Node.js 22 atau lebih baru, serta akses jaringan ke repositori publik dalam manifest. Git tidak wajib bila menggunakan ZIP.',
    installer: 'Installer membuat profile milik pengguna, menempatkan layer resmi base dan web-app lebih dahulu lalu bundle terpilih. Dependensi diaudit sebelum dan sesudah pemasangan tanpa menghapus kredensial, sesi atau cordis.patch.yml yang ada.',
    boundary: 'Repositori ini berisi manifest, installer, aturan audit dan dokumentasi. Ia tidak mendistribusikan ulang kode pihak ketiga, node_modules, kunci API, nomor telepon, email, sesi browser atau konfigurasi pribadi.',
    title: 'DeepSeek Harness Ultimate: panduan pemula',
    intro: 'Panduan ini menganggap Anda belum pernah memakai terminal. Ikuti langkah secara berurutan dan lakukan setiap pemeriksaan; pengetahuan pemrograman tidak diperlukan.',
    headings: ['Yang akan dipasang', 'Persiapan dan Node.js', 'Mengunduh dan memasang', 'Mulai pertama dan model', 'Workspace dan tes pertama', 'Aplikasi lokal yang ada dan plugin opsional', 'Memeriksa, memperbarui, menghapus dan tetap aman'],
    sections: ['Ultimate adalah installer profile, bukan model atau aplikasi desktop resmi DeepSeek AI. Ia menyediakan pilihan plugin praktis tanpa duplikasi, dengan lisensi diperiksa dan versi dikunci; Anda tetap memerlukan akun model sendiri.', 'Siapkan komputer yang didukung, internet stabil, izin memasang untuk akun Anda dan folder kerja sederhana seperti Documents/DSH-Work. Pasang LTS dari nodejs.org lalu tutup dan buka kembali PowerShell atau Terminal.', 'Di GitHub pilih Code → Download ZIP, ekstrak dan buka folder berisi package.json, profile, scripts dan windows. Di Windows Anda dapat klik dua kali windows/install-ultimate.cmd; di macOS/Linux gunakan perintah di bawah.', 'Jalankan DSH dari folder tempat Agent harus bekerja. 127.0.0.1 hanya berarti komputer Anda sendiri; biarkan terminal tetap terbuka. Kemudian buka Settings → Models dan masukkan provider serta kunci hanya di layar itu.', 'Tekan Choose workspace, tambah dan pilih folder kerja, buat sesi baru dan kirim dahulu: List the files in this workspace. Do not change anything. Jika file yang benar tampil tanpa kesalahan model, pengaturan dasar berhasil.', 'Jika sudah memiliki aplikasi macOS lokal yang menjalankan profile web, tutup dan salin ~/.dsh/profiles/web sebelum memasang di sana. cordis.patch.yml dipertahankan, tetapi npm dapat menghapus plugin di luar manifest. Aktifkan telepon, IM, notifikasi dan keamanan hanya setelah membaca COMPONENTS.md.', 'Jalankan audit profile; baris terakhir harus Profile dependency integrity: OK. Sebelum memperbarui, hentikan DSH dan cadangkan profile. Untuk menghapus, hentikan DSH dan pindahkan ~/.dsh/profiles/ultimate ke Sampah. Jangan hapus file acak saat gagal dan jangan pernah menerbitkan kunci atau token.'],
  }),
  compactLocale({
    code: 'tr', name: 'Türkçe',
    hero: 'DeepSeek Harness artık tek tek sakin biçimde karşılaştırılamayacak kadar çok eklenti içeriyor. Ultimate lisansları denetledi, sürümleri sabitledi, tekrarları kaldırdı ve faydalı seçenekleri düzenledi; seçim kaygısı yaşamadan hemen çalışmaya başlayabilirsiniz.',
    quote: 'Kodlama ekipleri, iş akışları, güvenlik, araştırma ve günlük otomasyon dahil neredeyse tüm pratik kategorileri kapsayan, yeniden üretilebilir seçilmiş DSH profili.',
    why: 'DSH ekosistemi hızla büyüyor. Onlarca deponun özelliklerini, lisanslarını, sürümlerini, izinlerini ve örtüşmelerini karşılaştırmak başlı başına iştir. Ultimate denetlenebilir seçimi herkese açık bir manifestte kaydeder.',
    included: ['Büyük kod işleri: Agent ekipleri, bağımlılık dalgaları, Git worktree yalıtımı, planlama ve doğrulama.', 'İş akışı ve güvenilirlik: yeniden kullanılabilir akışlar, zamanlama, koşullu uyandırma, yedekler, bellek ve kurallar.', 'Üretkenlik: yer imleri, otomatik devam, tasarım skillleri ve Spotlight.', 'Bildirimler, IM, aramalar ve yetkili güvenlik araştırması isteğe bağlıdır.'],
    requirements: 'Windows 10/11 x64, macOS veya Linux, Node.js 22 ya da daha yenisi ve manifestteki herkese açık depolara ağ erişimi gerekir. ZIP indirildiğinde Git zorunlu değildir.',
    installer: 'Yükleyici kullanıcıya ait bir profile oluşturur; önce resmi base ve web-app katmanlarını, ardından seçilen bundleları koyar. Kimlik bilgilerini, oturumları veya mevcut cordis.patch.yml dosyasını silmeden bağımlılıkları önce ve sonra denetler.',
    boundary: 'Depo manifest, yükleyici, denetim kuralları ve belgeleri içerir. Üçüncü taraf kaynak kodu, node_modules, API anahtarları, telefonlar, e-postalar, tarayıcı oturumları veya özel yapılandırma yeniden dağıtılmaz.',
    title: 'DeepSeek Harness Ultimate: başlangıç kılavuzu',
    intro: 'Bu kılavuz hiç terminal kullanmamış kişileri hedefler. Adımları sırayla izleyin ve her küçük kontrolü yapın; programlama bilmeniz gerekmez.',
    headings: ['Ne kuruluyor', 'Hazırlık ve Node.js', 'İndirme ve kurulum', 'İlk başlatma ve model', 'Çalışma alanı ve ilk test', 'Mevcut yerel uygulama ve isteğe bağlı eklentiler', 'Doğrulama, güncelleme, kaldırma ve güvenlik'],
    sections: ['Ultimate bir profile yükleyicisidir; model veya resmi DeepSeek AI masaüstü uygulaması değildir. Lisansı incelenmiş, sürümü sabitlenmiş, tekrarsız pratik eklenti seçimi sunar; kendi model hesabınızı kullanmanız gerekir.', 'Desteklenen bilgisayar, kararlı internet, hesabınız için yükleme izni ve Documents/DSH-Work gibi basit bir çalışma klasörü hazırlayın. nodejs.org üzerinden LTS kurun, ardından PowerShell veya Terminali kapatıp yeniden açın.', 'GitHub’da Code → Download ZIP seçin, arşivi açın ve package.json, profile, scripts, windows bulunan klasörü açın. Windows’ta windows/install-ultimate.cmd dosyasına çift tıklayabilirsiniz; macOS/Linux’ta aşağıdaki komutları kullanın.', 'DSH’yi Agent’ın çalışacağı klasörden başlatın. 127.0.0.1 yalnızca kendi bilgisayarınızı ifade eder; terminali açık bırakın. Ardından Settings → Models sayfasını açın ve sağlayıcı ile anahtarı yalnızca o ekrana girin.', 'Choose workspace düğmesine basın, klasörü ekleyip seçin, yeni oturum oluşturun ve önce şunu gönderin: List the files in this workspace. Do not change anything. Doğru dosyalar görünür ve model hatası olmazsa temel kurulum başarılıdır.', 'web profile başlatan yerel macOS uygulamanız varsa kapatın ve oraya kurmadan önce ~/.dsh/profiles/web kopyasını alın. cordis.patch.yml korunur; ancak npm manifest dışındaki eklentileri kaldırabilir. Telefon, IM, bildirim ve güvenliği yalnız COMPONENTS.md okuduktan sonra etkinleştirin.', 'Profile denetimini çalıştırın; son satır Profile dependency integrity: OK olmalıdır. Güncellemeden önce DSH’yi durdurup profile yedekleyin. Kaldırmak için DSH’yi durdurun ve ~/.dsh/profiles/ultimate klasörünü Çöp Kutusuna taşıyın. Hata sonrası rastgele dosya silmeyin, anahtar veya token yayımlamayın.'],
  }),
  compactLocale({
    code: 'vi', name: 'Tiếng Việt',
    hero: 'DeepSeek Harness hiện có quá nhiều plugin để có thể bình tĩnh so sánh từng cái. Ultimate đã kiểm tra giấy phép, cố định phiên bản, loại bỏ trùng lặp và sắp xếp các lựa chọn hữu ích để bạn bắt đầu ngay mà không lo lắng khi lựa chọn.',
    quote: 'Profile DSH được tuyển chọn và có thể tái lập, bao phủ gần như mọi nhóm khả năng thực tế: đội lập trình, workflow, bảo mật, nghiên cứu và tự động hóa hằng ngày.',
    why: 'Hệ sinh thái DSH phát triển rất nhanh. So sánh chức năng, giấy phép, phiên bản, quyền và phần chồng chéo của hàng chục kho đã là một công việc. Ultimate ghi lại lựa chọn có thể kiểm tra trong manifest công khai.',
    included: ['Công việc mã lớn: đội Agent, đợt phụ thuộc, cách ly Git worktree, lập kế hoạch và kiểm tra.', 'Workflow và độ tin cậy: luồng tái sử dụng, lịch, đánh thức theo điều kiện, sao lưu, bộ nhớ và quy tắc.', 'Năng suất: dấu trang, tiếp tục tự động, skill thiết kế và Spotlight.', 'Thông báo, IM, gọi điện và nghiên cứu bảo mật được ủy quyền là tùy chọn.'],
    requirements: 'Cần Windows 10/11 x64, macOS hoặc Linux, Node.js 22 trở lên và mạng tới các kho công khai trong manifest. Git không bắt buộc khi dùng ZIP.',
    installer: 'Trình cài đặt tạo profile thuộc người dùng, đặt các lớp base và web-app chính thức trước rồi thêm bundle đã chọn. Nó kiểm tra phụ thuộc trước và sau mà không xóa thông tin xác thực, phiên hay cordis.patch.yml hiện có.',
    boundary: 'Kho này chứa manifest, trình cài đặt, quy tắc kiểm tra và tài liệu. Nó không phân phối lại mã bên thứ ba, node_modules, khóa API, số điện thoại, email, phiên trình duyệt hay cấu hình riêng tư.',
    title: 'DeepSeek Harness Ultimate: hướng dẫn cho người mới',
    intro: 'Hướng dẫn này dành cho người chưa từng dùng terminal. Hãy làm theo thứ tự và thực hiện từng kiểm tra nhỏ; không cần biết lập trình.',
    headings: ['Sẽ cài đặt gì', 'Chuẩn bị và Node.js', 'Tải xuống và cài đặt', 'Lần khởi động đầu và mô hình', 'Workspace và kiểm tra đầu tiên', 'Ứng dụng cục bộ hiện có và plugin tùy chọn', 'Xác minh, cập nhật, gỡ bỏ và an toàn'],
    sections: ['Ultimate là trình cài đặt profile, không phải mô hình hay ứng dụng desktop chính thức của DeepSeek AI. Nó cung cấp bộ plugin thực tế không trùng lặp, đã kiểm tra giấy phép và cố định phiên bản; bạn vẫn cần tài khoản mô hình của mình.', 'Chuẩn bị máy tính được hỗ trợ, internet ổn định, quyền cài đặt cho tài khoản và thư mục đơn giản như Documents/DSH-Work. Cài LTS tại nodejs.org rồi đóng và mở lại PowerShell hoặc Terminal.', 'Trên GitHub chọn Code → Download ZIP, giải nén và mở thư mục có package.json, profile, scripts, windows. Windows có thể nhấp đúp windows/install-ultimate.cmd; macOS/Linux dùng lệnh bên dưới.', 'Khởi động DSH từ thư mục Agent sẽ làm việc. 127.0.0.1 chỉ là máy tính của bạn; giữ terminal mở. Sau đó mở Settings → Models và chỉ nhập nhà cung cấp cùng khóa ở màn hình đó.', 'Nhấn Choose workspace, thêm và chọn thư mục làm việc, tạo phiên mới và gửi trước: List the files in this workspace. Do not change anything. Nếu thấy đúng tệp và không có lỗi mô hình, thiết lập cơ bản thành công.', 'Nếu đã có ứng dụng macOS cục bộ chạy profile web, hãy thoát và sao chép ~/.dsh/profiles/web trước khi cài vào đó. cordis.patch.yml được giữ lại nhưng npm có thể gỡ plugin ngoài manifest. Chỉ bật điện thoại, IM, thông báo và bảo mật sau khi đọc COMPONENTS.md.', 'Chạy kiểm tra profile; dòng cuối phải là Profile dependency integrity: OK. Trước khi cập nhật hãy dừng DSH và sao lưu profile. Để gỡ, dừng DSH rồi chuyển ~/.dsh/profiles/ultimate vào Thùng rác. Không xóa tệp ngẫu nhiên khi lỗi và không bao giờ công khai khóa hoặc token.'],
  }),
  compactLocale({
    code: 'th', name: 'ไทย',
    hero: 'DeepSeek Harness มีปลั๊กอินมากเกินกว่าจะเปรียบเทียบทีละตัวได้อย่างสบายใจแล้ว Ultimate ตรวจสอบสัญญาอนุญาต ตรึงเวอร์ชัน ตัดของซ้ำ และจัดตัวเลือกที่มีประโยชน์ไว้ให้ เพื่อให้คุณเริ่มทำงานได้ทันทีโดยไม่ต้องกังวลเรื่องการเลือก.',
    quote: 'profile DSH ที่คัดสรรและทำซ้ำได้ ครอบคลุมเกือบทุกหมวดความสามารถที่ใช้งานจริง: ทีมเขียนโค้ด workflow ความปลอดภัย งานวิจัย และระบบอัตโนมัติประจำวัน.',
    why: 'ระบบนิเวศ DSH เติบโตเร็วมาก การเปรียบเทียบความสามารถ สัญญาอนุญาต เวอร์ชัน สิทธิ์ และส่วนที่ซ้ำกันจากหลายสิบ repository เป็นงานในตัวเอง Ultimate บันทึกตัวเลือกที่ตรวจสอบได้ใน manifest สาธารณะ.',
    included: ['งานโค้ดขนาดใหญ่: ทีม Agent, dependency waves, Git worktree isolation, การวางแผนและตรวจสอบ.', 'workflow และความเชื่อถือได้: ขั้นตอนใช้ซ้ำ ตารางเวลา การปลุกตามเงื่อนไข สำรองข้อมูล ความจำ และกฎ.', 'ประสิทธิภาพ: bookmark, ต่ออัตโนมัติ, design skills และ Spotlight.', 'การแจ้งเตือน IM โทรศัพท์ และงานวิจัยความปลอดภัยที่ได้รับอนุญาตเป็นตัวเลือก.'],
    requirements: 'ต้องใช้ Windows 10/11 x64, macOS หรือ Linux, Node.js 22 ขึ้นไป และเครือข่ายไปยัง repository สาธารณะใน manifest หากดาวน์โหลด ZIP ไม่จำเป็นต้องมี Git.',
    installer: 'ตัวติดตั้งสร้าง profile ของผู้ใช้ วาง layer base และ web-app ทางการก่อน แล้วจึงเพิ่ม bundle ที่เลือก ตรวจสอบ dependency ก่อนและหลังติดตั้งโดยไม่ลบข้อมูลรับรอง session หรือ cordis.patch.yml ที่มีอยู่.',
    boundary: 'repository นี้มี manifest ตัวติดตั้ง กฎตรวจสอบ และเอกสารเท่านั้น ไม่แจกจ่าย source ของบุคคลที่สาม node_modules API key โทรศัพท์ อีเมล browser session หรือการตั้งค่าส่วนตัว.',
    title: 'DeepSeek Harness Ultimate: คู่มือสำหรับผู้เริ่มต้น',
    intro: 'คู่มือนี้เขียนสำหรับผู้ที่ไม่เคยใช้ terminal มาก่อน ทำตามลำดับและตรวจสอบทุกขั้นตอนย่อย ไม่ต้องมีความรู้การเขียนโปรแกรม.',
    headings: ['สิ่งที่จะติดตั้ง', 'การเตรียมและ Node.js', 'ดาวน์โหลดและติดตั้ง', 'การเริ่มครั้งแรกและโมเดล', 'workspace และการทดสอบครั้งแรก', 'แอปในเครื่องเดิมและปลั๊กอินทางเลือก', 'ตรวจสอบ อัปเดต ถอนการติดตั้ง และความปลอดภัย'],
    sections: ['Ultimate เป็นตัวติดตั้ง profile ไม่ใช่โมเดลหรือ desktop app ทางการของ DeepSeek AI ให้ชุดปลั๊กอินที่ใช้งานจริง ไม่มีซ้ำ ตรวจสอบสัญญาอนุญาตและตรึงเวอร์ชันแล้ว แต่ยังต้องใช้บัญชีโมเดลของคุณเอง.', 'เตรียมคอมพิวเตอร์ที่รองรับ อินเทอร์เน็ตที่เสถียร สิทธิ์ติดตั้งสำหรับบัญชีของคุณ และโฟลเดอร์ง่ายๆ เช่น Documents/DSH-Work ติดตั้ง LTS จาก nodejs.org แล้วปิดและเปิด PowerShell หรือ Terminal ใหม่.', 'บน GitHub เลือก Code → Download ZIP แตกไฟล์และเปิดโฟลเดอร์ที่มี package.json, profile, scripts และ windows บน Windows ดับเบิลคลิก windows/install-ultimate.cmd ได้ ส่วน macOS/Linux ใช้คำสั่งด้านล่าง.', 'เริ่ม DSH จากโฟลเดอร์ที่ต้องการให้ Agent ทำงาน 127.0.0.1 หมายถึงคอมพิวเตอร์ของคุณเท่านั้น ให้เปิด terminal ทิ้งไว้ จากนั้นเปิด Settings → Models และกรอก provider กับ key เฉพาะในหน้านั้น.', 'กด Choose workspace เพิ่มและเลือกโฟลเดอร์งาน สร้าง session ใหม่ แล้วส่งก่อนว่า: List the files in this workspace. Do not change anything. ถ้าเห็นไฟล์ถูกต้องและไม่มีข้อผิดพลาดโมเดล แสดงว่าการตั้งค่าพื้นฐานสำเร็จ.', 'หากมีแอป macOS ในเครื่องที่เริ่ม profile web ให้ปิดแอปและคัดลอก ~/.dsh/profiles/web ก่อนติดตั้งลงที่นั่น cordis.patch.yml จะถูกเก็บไว้ แต่ npm อาจลบปลั๊กอินนอก manifest เปิดใช้โทรศัพท์ IM การแจ้งเตือน และความปลอดภัยหลังอ่าน COMPONENTS.md เท่านั้น.', 'เรียกใช้การตรวจสอบ profile บรรทัดสุดท้ายต้องเป็น Profile dependency integrity: OK ก่อนอัปเดตให้หยุด DSH และสำรอง profile หากต้องการลบ ให้หยุด DSH แล้วนำ ~/.dsh/profiles/ultimate ไปที่ถังขยะ อย่าลบไฟล์สุ่มเมื่อเกิดข้อผิดพลาด และอย่าเผยแพร่ key หรือ token.'],
  }),
  compactLocale({
    code: 'ar', name: 'العربية',
    hero: 'يحتوي DeepSeek Harness الآن على إضافات أكثر مما يمكن مقارنته واحدةً واحدة بهدوء. قام Ultimate بالفعل بمراجعة التراخيص وتثبيت الإصدارات وإزالة التكرار وترتيب الخيارات المفيدة، حتى تبدأ العمل دون قلق من الاختيار.',
    quote: 'ملف DSH منتقى وقابل لإعادة الإنتاج يغطي تقريباً كل الفئات العملية: فرق البرمجة، وسير العمل، والأمان، والبحث، والأتمتة اليومية.',
    why: 'ينمو نظام DSH بسرعة. مقارنة وظائف وتراخيص وإصدارات وصلاحيات وتداخلات عشرات المستودعات عمل بحد ذاته. يسجل Ultimate اختياراً قابلاً للتدقيق في manifest عام.',
    included: ['مهام برمجية كبيرة: فرق Agent، موجات التبعيات، عزل Git worktree، التخطيط والتحقق.', 'سير العمل والموثوقية: تدفقات قابلة لإعادة الاستخدام، جدولة، إيقاظ مشروط، نسخ احتياطي، ذاكرة وقواعد.', 'الإنتاجية: إشارات مرجعية، متابعة تلقائية، مهارات تصميم وSpotlight.', 'الإشعارات وIM والاتصالات وأبحاث الأمان المصرح بها اختيارية.'],
    requirements: 'تحتاج إلى Windows 10/11 x64 أو macOS أو Linux وNode.js 22 أو أحدث واتصال بالشبكة إلى المستودعات العامة في manifest. لا يلزم Git عند تنزيل ZIP.',
    installer: 'ينشئ المثبت profile للمستخدم، ويضع طبقتي base وweb-app الرسميتين أولاً ثم bundleات المختارة. يفحص التبعيات قبل وبعد التثبيت دون حذف بيانات الاعتماد أو الجلسات أو cordis.patch.yml الموجود.',
    boundary: 'يحتوي المستودع على manifest والمثبت وقواعد التدقيق والوثائق. ولا يعيد توزيع مصدر طرف ثالث أو node_modules أو مفاتيح API أو أرقام هواتف أو بريد أو جلسات متصفح أو إعدادات خاصة.',
    title: 'DeepSeek Harness Ultimate: دليل المبتدئين',
    intro: 'يفترض هذا الدليل أنك لم تستخدم الطرفية من قبل. اتبع الخطوات بالترتيب ونفذ كل فحص صغير؛ لا تحتاج إلى معرفة برمجية.',
    headings: ['ما الذي سيتم تثبيته', 'التحضير وNode.js', 'التنزيل والتثبيت', 'التشغيل الأول والنموذج', 'مساحة العمل والاختبار الأول', 'تطبيق محلي موجود وإضافات اختيارية', 'التحقق والتحديث والإزالة والأمان'],
    sections: ['Ultimate هو مثبت profile وليس نموذجاً أو تطبيق سطح مكتب رسمياً من DeepSeek AI. يقدم مجموعة إضافات عملية بلا تكرار ومراجعة الترخيص وتثبيت الإصدار؛ وما زلت تحتاج حساب النموذج الخاص بك.', 'جهز جهازاً مدعوماً وإنترنتاً مستقراً وإذن تثبيت لحسابك ومجلد عمل بسيطاً مثل Documents/DSH-Work. ثبّت LTS من nodejs.org ثم أغلق PowerShell أو Terminal وافتحه من جديد.', 'في GitHub اختر Code → Download ZIP، فك الضغط وافتح المجلد الذي فيه package.json وprofile وscripts وwindows. في Windows يمكن النقر مرتين على windows/install-ultimate.cmd؛ وفي macOS/Linux استخدم الأوامر أدناه.', 'شغّل DSH من المجلد الذي يجب أن يعمل فيه Agent. العنوان 127.0.0.1 يعني جهازك فقط؛ اترك الطرفية مفتوحة. بعد ذلك افتح Settings → Models وأدخل موفر الخدمة والمفتاح في تلك الشاشة فقط.', 'اضغط Choose workspace وأضف مجلد العمل واختره وأنشئ جلسة جديدة ثم أرسل أولاً: List the files in this workspace. Do not change anything. ظهور الملفات الصحيحة بلا خطأ نموذج يعني نجاح الإعداد الأساسي.', 'إن كان لديك تطبيق macOS محلي يشغّل profile web، فأغلقه وانسخ ~/.dsh/profiles/web قبل التثبيت فيه. يُحتفظ بـ cordis.patch.yml لكن npm قد يزيل الإضافات خارج manifest. فعّل الهاتف وIM والإشعارات والأمان فقط بعد قراءة COMPONENTS.md.', 'شغّل تدقيق profile؛ يجب أن يكون السطر الأخير Profile dependency integrity: OK. أوقف DSH واحفظ نسخة من profile قبل التحديث. للإزالة أوقف DSH وانقل ~/.dsh/profiles/ultimate إلى سلة المحذوفات. لا تحذف ملفات عشوائية بعد الخطأ ولا تنشر مفتاحاً أو token.'],
  }),
  compactLocale({
    code: 'hi', name: 'हिन्दी',
    hero: 'DeepSeek Harness में अब इतने प्लगइन हैं कि उन्हें एक-एक करके शांति से तुलना करना कठिन है। Ultimate ने लाइसेंस जांचे, संस्करण तय किए, दोहराव हटाया और उपयोगी विकल्प व्यवस्थित किए हैं, इसलिए आप चुनाव की चिंता के बिना काम शुरू कर सकते हैं।',
    quote: 'लगभग सभी व्यावहारिक श्रेणियों को कवर करने वाला पुनरुत्पाद्य, चुना हुआ DSH profile: कोडिंग टीमें, workflow, सुरक्षा, शोध और दैनिक automation।',
    why: 'DSH ecosystem तेजी से बढ़ रहा है। दर्जनों repositories के features, licenses, versions, permissions और overlaps की तुलना करना स्वयं एक काम है। Ultimate एक सार्वजनिक manifest में audit योग्य चयन दर्ज करता है।',
    included: ['बड़े कोड कार्य: Agent टीमें, dependency waves, Git worktree isolation, planning और verification।', 'workflow और reliability: reusable flows, schedules, conditional wakeups, backups, memory और rules।', 'productivity: bookmarks, auto-continue, design skills और Spotlight।', 'notifications, IM, calls और authorized security research optional हैं।'],
    requirements: 'Windows 10/11 x64, macOS या Linux, Node.js 22 या नया और manifest में सार्वजनिक repositories तक नेटवर्क पहुँच चाहिए। ZIP डाउनलोड करने पर Git जरूरी नहीं है।',
    installer: 'installer उपयोगकर्ता का profile बनाता है, पहले आधिकारिक base और web-app layers रखता है और फिर चुने हुए bundles जोड़ता है। यह credentials, sessions या मौजूदा cordis.patch.yml हटाए बिना install से पहले और बाद में dependencies audit करता है।',
    boundary: 'repository में manifest, installer, audit rules और documentation हैं। यह third-party source, node_modules, API keys, phone numbers, email, browser sessions या private configuration को पुनर्वितरित नहीं करता।',
    title: 'DeepSeek Harness Ultimate: शुरुआती मार्गदर्शिका',
    intro: 'यह मार्गदर्शिका उन लोगों के लिए है जिन्होंने कभी terminal उपयोग नहीं किया। कदम क्रम में करें और हर छोटी जांच पूरी करें; programming ज्ञान की आवश्यकता नहीं है।',
    headings: ['क्या स्थापित होगा', 'तैयारी और Node.js', 'डाउनलोड और install', 'पहला start और model', 'workspace और पहला test', 'मौजूदा local app और optional plugins', 'verify, update, remove और सुरक्षा'],
    sections: ['Ultimate एक profile installer है, model या DeepSeek AI का official desktop app नहीं। यह license-reviewed, version-pinned और duplicate-free practical plugin selection देता है; आपको अपना model account फिर भी चाहिए।', 'एक supported computer, stable internet, अपने account के लिए install permission और Documents/DSH-Work जैसा सरल work folder तैयार करें। nodejs.org से LTS install करें, फिर PowerShell या Terminal बंद कर दोबारा खोलें।', 'GitHub पर Code → Download ZIP चुनें, extract करें और package.json, profile, scripts तथा windows वाला folder खोलें। Windows में windows/install-ultimate.cmd को double-click कर सकते हैं; macOS/Linux पर नीचे के commands चलाएं।', 'जिस folder में Agent को काम करना है वहां से DSH start करें। 127.0.0.1 केवल आपका computer है; terminal खुला रखें। फिर Settings → Models खोलें और provider तथा key केवल उसी screen में भरें।', 'Choose workspace दबाएं, work folder जोड़कर चुनें, नया session बनाएं और पहले भेजें: List the files in this workspace. Do not change anything. सही files दिखें और model error न हो तो basic setup सफल है।', 'यदि आपके पास web profile चलाने वाला local macOS app है, उसे बंद करें और वहां install से पहले ~/.dsh/profiles/web की copy रखें। cordis.patch.yml रहता है, पर npm manifest के बाहर के plugins हटा सकता है। phone, IM, notification और security केवल COMPONENTS.md पढ़कर enable करें।', 'profile audit चलाएं; अंतिम line Profile dependency integrity: OK होनी चाहिए। update से पहले DSH रोकें और profile backup करें। remove करने के लिए DSH रोकें और ~/.dsh/profiles/ultimate को Trash में ले जाएं। error पर random files न हटाएं और key या token कभी public न करें।'],
  }),
  compactLocale({
    code: 'pl', name: 'Polski',
    hero: 'DeepSeek Harness ma już zbyt wiele wtyczek, aby rozsądnie porównywać je pojedynczo. Ultimate sprawdził licencje, przypiął wersje, usunął duplikaty i uporządkował użyteczne opcje, więc możesz zacząć pracę bez lęku przed wyborem.',
    quote: 'Odtwarzalny, wyselekcjonowany profil DSH obejmujący prawie wszystkie praktyczne kategorie: zespoły programistyczne, workflow, bezpieczeństwo, badania i codzienną automatyzację.',
    why: 'Ekosystem DSH szybko rośnie. Porównanie funkcji, licencji, wersji, uprawnień i nakładania się dziesiątek repozytoriów jest pracą samą w sobie. Ultimate zapisuje audytowalny wybór w publicznym manifeście.',
    included: ['Duże zadania kodowe: zespoły Agent, fale zależności, izolacja Git worktree, planowanie i weryfikacja.', 'Workflow i niezawodność: ponowne użycie przepływów, harmonogramy, warunkowe wybudzanie, kopie zapasowe, pamięć i reguły.', 'Produktywność: zakładki, automatyczne kontynuowanie, umiejętności designu i Spotlight.', 'Powiadomienia, IM, rozmowy i autoryzowane badania bezpieczeństwa są opcjonalne.'],
    requirements: 'Wymagane są Windows 10/11 x64, macOS albo Linux, Node.js 22 lub nowszy oraz dostęp do publicznych repozytoriów z manifestu. Git nie jest wymagany przy pobraniu ZIP.',
    installer: 'Instalator tworzy profile użytkownika, najpierw umieszcza oficjalne warstwy base i web-app, a potem wybrane bundle. Sprawdza zależności przed i po instalacji bez usuwania poświadczeń, sesji ani istniejącego cordis.patch.yml.',
    boundary: 'Repozytorium zawiera manifest, instalator, reguły audytu i dokumentację. Nie redystrybuuje kodu stron trzecich, node_modules, kluczy API, telefonów, e-maili, sesji przeglądarki ani prywatnej konfiguracji.',
    title: 'DeepSeek Harness Ultimate: przewodnik dla początkujących',
    intro: 'Ten przewodnik zakłada, że nigdy nie używałeś terminala. Wykonuj kroki po kolei i zrób każdą małą kontrolę; wiedza programistyczna nie jest potrzebna.',
    headings: ['Co zostanie zainstalowane', 'Przygotowanie i Node.js', 'Pobranie i instalacja', 'Pierwsze uruchomienie i model', 'Workspace i pierwszy test', 'Istniejąca aplikacja lokalna i opcjonalne wtyczki', 'Weryfikacja, aktualizacja, usunięcie i bezpieczeństwo'],
    sections: ['Ultimate jest instalatorem profile, a nie modelem ani oficjalną aplikacją desktopową DeepSeek AI. Dostarcza praktyczny zestaw bez duplikatów, ze sprawdzonymi licencjami i przypiętymi wersjami; nadal potrzebujesz własnego konta modelu.', 'Przygotuj wspierany komputer, stabilny internet, prawo instalacji dla swojego konta i prosty folder roboczy, np. Documents/DSH-Work. Zainstaluj LTS z nodejs.org, zamknij i ponownie otwórz PowerShell albo Terminal.', 'W GitHub wybierz Code → Download ZIP, rozpakuj i otwórz folder z package.json, profile, scripts i windows. W Windows możesz dwukrotnie kliknąć windows/install-ultimate.cmd; w macOS/Linux użyj poleceń poniżej.', 'Uruchom DSH z folderu, w którym ma pracować Agent. 127.0.0.1 oznacza tylko twój komputer; zostaw terminal otwarty. Następnie otwórz Settings → Models i wpisz dostawcę oraz klucz tylko na tym ekranie.', 'Naciśnij Choose workspace, dodaj i wybierz folder roboczy, utwórz sesję i najpierw wyślij: List the files in this workspace. Do not change anything. Prawidłowe pliki bez błędu modelu oznaczają udaną konfigurację podstawową.', 'Jeśli masz lokalną aplikację macOS uruchamiającą profile web, zamknij ją i skopiuj ~/.dsh/profiles/web przed instalacją tam. cordis.patch.yml zostaje, ale npm może usunąć wtyczki poza manifestem. Telefon, IM, powiadomienia i bezpieczeństwo włączaj dopiero po przeczytaniu COMPONENTS.md.', 'Uruchom audyt profile; ostatni wiersz musi brzmieć Profile dependency integrity: OK. Przed aktualizacją zatrzymaj DSH i zachowaj profile. Aby usunąć, zatrzymaj DSH i przenieś ~/.dsh/profiles/ultimate do Kosza. Nie kasuj losowych plików po błędzie i nigdy nie publikuj kluczy ani tokenów.'],
  }),
  compactLocale({
    code: 'nl', name: 'Nederlands',
    hero: 'DeepSeek Harness heeft inmiddels te veel plugins om ze rustig één voor één te vergelijken. Ultimate heeft licenties gecontroleerd, versies vastgezet, dubbelen verwijderd en nuttige keuzes geordend, zodat u zonder keuzestress direct kunt werken.',
    quote: 'Een reproduceerbaar, samengesteld DSH-profiel voor bijna alle praktische categorieën: codingteams, workflows, beveiliging, onderzoek en dagelijkse automatisering.',
    why: 'Het DSH-ecosysteem groeit snel. Functies, licenties, versies, rechten en overlap van tientallen repositories vergelijken is op zichzelf werk. Ultimate legt een controleerbare keuze vast in een openbaar manifest.',
    included: ['Grote codewerkzaamheden: Agent-teams, afhankelijkheidsgolven, Git-worktree-isolatie, planning en verificatie.', 'Workflow en betrouwbaarheid: herbruikbare processen, planning, voorwaardelijk ontwaken, back-ups, geheugen en regels.', 'Productiviteit: bladwijzers, automatisch doorgaan, design-skills en Spotlight.', 'Meldingen, IM, telefoongesprekken en geautoriseerd beveiligingsonderzoek zijn optioneel.'],
    requirements: 'Windows 10/11 x64, macOS of Linux, Node.js 22 of nieuwer en netwerktoegang tot de openbare repositories in het manifest zijn nodig. Git is niet nodig bij het downloaden van ZIP.',
    installer: 'De installer maakt een gebruikersprofile, plaatst eerst de officiële base- en web-app-lagen en voegt daarna de geselecteerde bundles toe. Hij controleert afhankelijkheden voor en na installatie zonder gegevens, sessies of bestaande cordis.patch.yml te verwijderen.',
    boundary: 'De repository bevat manifest, installer, auditregels en documentatie. Hij verspreidt geen broncode van derden, node_modules, API-sleutels, telefoonnummers, e-mail, browsersessies of privéconfiguratie.',
    title: 'DeepSeek Harness Ultimate: gids voor beginners',
    intro: 'Deze gids gaat ervan uit dat u nog nooit een terminal hebt gebruikt. Volg de stappen op volgorde en voer elke kleine controle uit; programmeerkennis is niet nodig.',
    headings: ['Wat wordt geïnstalleerd', 'Voorbereiding en Node.js', 'Downloaden en installeren', 'Eerste start en model', 'Workspace en eerste test', 'Bestaande lokale app en optionele plugins', 'Controleren, bijwerken, verwijderen en veiligheid'],
    sections: ['Ultimate is een profile-installer, geen model en geen officiële DeepSeek AI-desktopapp. Hij biedt een praktische selectie zonder dubbelen, met gecontroleerde licenties en vaste versies; u hebt nog steeds uw eigen modelaccount nodig.', 'Bereid een ondersteunde computer, stabiel internet, installatierecht voor uw account en een eenvoudige werkmap zoals Documents/DSH-Work voor. Installeer LTS vanaf nodejs.org en open PowerShell of Terminal opnieuw.', 'Kies op GitHub Code → Download ZIP, pak uit en open de map met package.json, profile, scripts en windows. In Windows kunt u windows/install-ultimate.cmd dubbelklikken; op macOS/Linux gebruikt u de opdrachten hieronder.', 'Start DSH vanuit de map waar de Agent moet werken. 127.0.0.1 betekent alleen uw eigen computer; laat de terminal open. Open daarna Settings → Models en voer provider en sleutel alleen daar in.', 'Klik op Choose workspace, voeg uw werkmap toe en selecteer deze, maak een nieuwe sessie en stuur eerst: List the files in this workspace. Do not change anything. Verschijnen de juiste bestanden zonder modelfout, dan werkt de basisconfiguratie.', 'Hebt u al een lokale macOS-app die profile web start, sluit die dan en kopieer ~/.dsh/profiles/web voordat u daar installeert. cordis.patch.yml blijft behouden, maar npm kan plugins buiten het manifest verwijderen. Schakel telefoon, IM, meldingen en beveiliging pas in na COMPONENTS.md.', 'Voer de profile-audit uit; de laatste regel moet Profile dependency integrity: OK zijn. Stop DSH en bewaar de profile vóór een update. Voor verwijderen stopt u DSH en verplaatst u ~/.dsh/profiles/ultimate naar de prullenmand. Verwijder bij een fout geen willekeurige bestanden en publiceer nooit sleutels of tokens.'],
  }),
  compactLocale({
    code: 'uk', name: 'Українська',
    hero: 'У DeepSeek Harness уже надто багато плагінів, щоб спокійно порівнювати їх по одному. Ultimate перевірив ліцензії, зафіксував версії, прибрав дублікати та впорядкував корисні варіанти, тому ви можете почати роботу без тривоги вибору.',
    quote: 'Відтворюваний відібраний профіль DSH, що охоплює майже всі практичні категорії: команди кодування, workflow, безпеку, дослідження та щоденну автоматизацію.',
    why: 'Екосистема DSH швидко зростає. Порівняння функцій, ліцензій, версій, дозволів і перетинів десятків репозиторіїв саме по собі є роботою. Ultimate записує перевірюваний вибір у публічному manifest.',
    included: ['Великі завдання коду: команди Agent, хвилі залежностей, ізоляція Git worktree, планування та перевірка.', 'Workflow і надійність: повторно використовувані процеси, розклади, умовне пробудження, резервні копії, пам’ять і правила.', 'Продуктивність: закладки, автопродовження, design skills і Spotlight.', 'Сповіщення, IM, дзвінки та авторизовані дослідження безпеки є необов’язковими.'],
    requirements: 'Потрібні Windows 10/11 x64, macOS або Linux, Node.js 22 чи новіший і доступ до публічних репозиторіїв у manifest. Якщо завантажуєте ZIP, Git не обов’язковий.',
    installer: 'Інсталятор створює profile користувача, спочатку додає офіційні шари base і web-app, а потім вибрані bundles. Він перевіряє залежності до і після встановлення, не видаляючи облікові дані, сесії чи наявний cordis.patch.yml.',
    boundary: 'Репозиторій містить manifest, інсталятор, правила аудиту й документацію. Він не розповсюджує чужий вихідний код, node_modules, API-ключі, телефони, електронну пошту, браузерні сесії чи приватну конфігурацію.',
    title: 'DeepSeek Harness Ultimate: посібник для початківців',
    intro: 'Цей посібник розрахований на тих, хто ніколи не користувався терміналом. Виконуйте кроки по порядку й проходьте кожну маленьку перевірку; знання програмування не потрібні.',
    headings: ['Що буде встановлено', 'Підготовка та Node.js', 'Завантаження й встановлення', 'Перший запуск і модель', 'Workspace і перша перевірка', 'Наявна локальна програма та додаткові плагіни', 'Перевірка, оновлення, видалення й безпека'],
    sections: ['Ultimate - це інсталятор profile, а не модель і не офіційна настільна програма DeepSeek AI. Він надає практичний набір без дублікатів, з перевіреними ліцензіями і зафіксованими версіями; вам усе одно потрібен власний обліковий запис моделі.', 'Підготуйте підтримуваний комп’ютер, стабільний інтернет, дозвіл встановлення для свого облікового запису та просту робочу папку, наприклад Documents/DSH-Work. Встановіть LTS з nodejs.org, закрийте й знову відкрийте PowerShell або Terminal.', 'На GitHub оберіть Code → Download ZIP, розпакуйте і відкрийте папку з package.json, profile, scripts і windows. У Windows можна двічі натиснути windows/install-ultimate.cmd; у macOS/Linux використовуйте команди нижче.', 'Запускайте DSH з папки, де має працювати Agent. 127.0.0.1 означає лише ваш комп’ютер; залиште термінал відкритим. Далі відкрийте Settings → Models і введіть провайдера та ключ тільки на цьому екрані.', 'Натисніть Choose workspace, додайте й виберіть робочу папку, створіть нову сесію та спочатку надішліть: List the files in this workspace. Do not change anything. Правильні файли без помилки моделі означають успішне базове налаштування.', 'Якщо вже є локальна програма macOS, що запускає profile web, закрийте її і скопіюйте ~/.dsh/profiles/web перед встановленням туди. cordis.patch.yml збережеться, але npm може видалити плагіни поза manifest. Увімкніть телефон, IM, сповіщення та безпеку лише після COMPONENTS.md.', 'Запустіть аудит profile; останній рядок має бути Profile dependency integrity: OK. Перед оновленням зупиніть DSH і збережіть profile. Для видалення зупиніть DSH і перемістіть ~/.dsh/profiles/ultimate у кошик. Не видаляйте випадкові файли після помилки й ніколи не публікуйте ключі або токени.'],
  }),
);

const fileFor = (kind, code) => code === 'en' ? `${kind}.md` : `${kind}.${code}.md`;

function selector(kind, current) {
  return allLanguages.map(([code, name]) => code === current ? name : `[${name}](${fileFor(kind, code)})`).join(' · ');
}

const macInstall = `\`\`\`bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
\`\`\``;
const windowsInstall = `\`\`\`powershell
node --version
& .\\windows\\install-ultimate.ps1
\`\`\``;
const startMac = `\`\`\`bash
cd "$HOME/Documents/DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
\`\`\``;
const startWindows = `\`\`\`powershell
Set-Location "$HOME\\Documents\\DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
\`\`\``;
const clone = `\`\`\`bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
\`\`\``;
const appInstall = `\`\`\`bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
\`\`\``;
const optional = `\`\`\`bash
node scripts/install-ultimate.mjs \\
  --profile-dir "$HOME/.dsh/profiles/ultimate" \\
  --include dsh-notifier
\`\`\``;
const audit = `\`\`\`bash
node scripts/audit-installed-profile.mjs \\
  --profile-dir "$HOME/.dsh/profiles/ultimate"
\`\`\``;
const develop = `\`\`\`bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
\`\`\``;

function makeReadme(l) {
  const common = commonByLocale[l.code];
  const navigation = navigationByLocale[l.code];
  return `# DeepSeek Harness Ultimate

**${l.hero}**

> ${l.quote}

**${navigation[0]}:** ${selector('README', l.code)}

[${l.tutorialTitle}](TUTORIAL.${l.code}.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## ${l.labels[0]}

${l.why}

${l.principles.map(item => `- ${item}`).join('\n')}

${common.scope}

## ${l.labels[1]}

${l.included.map(item => `- ${item}`).join('\n')}

${common.dedupe}

## ${l.labels[2]}

${l.requirements}

### macOS / Linux

${macInstall}

### Windows PowerShell

${windowsInstall}

### ${navigation[2]}

\`\`\`text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
\`\`\`

${l.firstLaunch}

## ${l.labels[3]}

${l.installer}

## ${l.labels[4]}

${l.boundary}

${common.license}

## ${l.labels[5]}

${develop}
`;
}

function makeTutorial(l) {
  const common = commonByLocale[l.code];
  const navigation = navigationByLocale[l.code];
  const tutorial = l.compactTutorial ?? { headings: l.tutorialHeadings, sections: l.tutorial };
  const sections = tutorial.sections.map((body, index) => `## ${index + 1}. ${tutorial.headings[index]}\n\n${body}`);
  if (l.compactTutorial) {
    sections[1] += `\n\n\`\`\`text\nnode --version\n\`\`\`\n\n${common.nodeSuccess}`;
    sections[2] += `\n\n${clone}\n\n### Windows PowerShell\n\n${windowsInstall}\n\n### macOS / Linux\n\n${macInstall}\n\n${common.installSuccess}`;
    sections[3] += `\n\n### macOS or Linux\n\n${startMac}\n\n### Windows PowerShell\n\n${startWindows}`;
    sections[5] += `\n\n${appInstall}\n\n${optional}`;
    sections[6] += `\n\n${audit}\n\n${common.expected} \`Profile dependency integrity: OK\`.`;
    return `# ${l.tutorialTitle}

${l.tutorialIntro}

**${navigation[1]}:** ${selector('TUTORIAL', l.code)}

[${common.back}](README.${l.code}.md)

${sections.join('\n\n')}

## ${common.developer}

${develop}

${common.tutorialLicense}
`;
  }
  sections[2] += `\n\n\`\`\`text\nnode --version\n\`\`\`\n\n${common.nodeSuccess}`;
  sections[3] += `\n\n${clone}`;
  sections[4] += `\n\n### Windows PowerShell\n\n${windowsInstall}\n\n### macOS / Linux\n\n${macInstall}\n\n${common.installSuccess}`;
  sections[5] += `\n\n### macOS or Linux\n\n${startMac}\n\n### Windows PowerShell\n\n${startWindows}`;
  sections[7] += `\n\n\`\`\`text\nList the files in this workspace. Do not change anything.\n\`\`\``;
  sections[8] += `\n\n${appInstall}`;
  sections[9] += `\n\n${optional}`;
  sections[10] += `\n\n${audit}\n\n${common.expected} \`Profile dependency integrity: OK\`.`;
  return `# ${l.tutorialTitle}

${l.tutorialIntro}

**${navigation[1]}:** ${selector('TUTORIAL', l.code)}

[${common.back}](README.${l.code}.md)

${sections.join('\n\n')}

## 16. ${common.developer}

${develop}

${common.tutorialLicense}
`;
}

for (const locale of locales) {
  fs.writeFileSync(path.join(root, `README.${locale.code}.md`), makeReadme(locale));
  fs.writeFileSync(path.join(root, `TUTORIAL.${locale.code}.md`), makeTutorial(locale));
}
