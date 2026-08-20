# DeepSeek Harness Ultimate：零基礎教學

本教學假設你從未使用終端。請依序操作並完成每一步的小檢查，不需要任何程式基礎。

**教學語言:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · 繁體中文 · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[返回專案介紹](README.zh-TW.md)

## 1. 先了解安裝內容

Ultimate 是 profile 安裝器，不是模型或 DeepSeek AI 官方桌面 App。它提供已去重、固定版本並核對授權的實用外掛組合，你仍需使用自己的模型帳號。

## 2. 開始前準備

準備一台支援的電腦、穩定網路、目前帳號的安裝權限，以及名稱簡單的工作資料夾，例如 Documents/DSH-Work。第一次安裝通常需要 15 到 40 分鐘。

## 3. 安裝並檢查 Node.js

前往 nodejs.org 安裝標示 LTS 的版本，保持預設選項。關閉並重新開啟 PowerShell 或終端，再執行下面的版本檢查；看到 v22 或更高即成功。

```text
node --version
```

看到 `v22.x.x` 或更高主版本即表示成功。

## 4. 下載 Ultimate

在 GitHub 儲存庫點 Code → Download ZIP，解壓後開啟 deepseek-harness-ultimate-main。正確目錄中應有 package.json、profile、scripts 與 windows。也可以使用下方 git clone 命令。

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

## 5. 安裝 profile

Windows 可雙擊 windows/install-ultimate.cmd；PowerShell 使用下方命令。macOS/Linux 在終端輸入 cd 加空格，把資料夾拖入視窗後按 Enter，再逐行執行稽核與安裝命令。下載期間不要關閉視窗。

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

成功安裝時會顯示 `Platform filter: windows`、`Platform filter: macos` 或 `Platform filter: linux`。

## 6. 第一次啟動

啟動前先切換到希望 Agent 工作的資料夾，再執行 profile 啟動命令。127.0.0.1 只代表本機；使用時保持終端開啟，停止時按 Ctrl+C。

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

## 7. 安全連接模型

在 Settings → Models 選擇你擁有的供應商，只在 DSH 設定畫面輸入 API Key 並儲存。不要把密鑰寫進 package.json、cordis.patch.yml、截圖或公開 Issue。

## 8. 選擇工作區並測試

點 Choose workspace，加入並選取工作資料夾，新建工作階段，先要求 Agent 只列出檔案而不修改。能看到正確檔案且沒有缺少模型錯誤即表示基本設定成功。

```text
List the files in this workspace. Do not change anything.
```

## 9. 搭配既有本機 App

已有啟動 web profile 的本機 macOS App 時，先退出 App 並備份 ~/.dsh/profiles/web，再用下方命令安裝到 web。安裝器保留 cordis.patch.yml，但可能移除不在 Ultimate manifest 內的外掛。

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

## 10. 選用整合

電話、IM、通知與安全研究外掛預設不啟用。閱讀 COMPONENTS.md 後只加入需要的元件；Ultimate 不會替你設定電話、郵件、bot token 或系統權限。

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 11. 驗證安裝

執行已安裝 profile 稽核，最後一行應為 Profile dependency integrity: OK。若被拒絕，不要隨意刪除檔案；請依報告更新或移除造成重複宿主核心套件的外掛。

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

預期最後一行： `Profile dependency integrity: OK`.

## 12. 安全更新

更新前停止 DSH、備份 profile、取得最新版原始碼、閱讀元件變更、重跑安裝與稽核，最後新建工作階段測試。工具呼叫中斷後不要沿用損壞的舊工作階段。

## 13. 卸載或回復

卸載前停止 DSH，再用檔案管理員把 ~/.dsh/profiles/ultimate 移到垃圾桶。這不會刪除另外管理的 runtime、憑證或其他 profile；回復時把備份改回原名。

## 14. 常見問題

常見問題：找不到 node 時重裝 LTS 並重開終端；找不到 install-ultimate.mjs 表示目錄錯誤；下載逾時先修復網路再重跑；3080 被占用時停止舊 DSH；不能傳訊息時先設定模型並選工作區。

## 15. 安全與隱私

只使用可撤銷且屬於你的密鑰。授予輔助使用、麥克風、通知或自動化權限前先審閱外掛。逆向技能只能用於自有或明確授權的系統，重新散布時保留上游聲明。

## 16. 開發者驗證

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

安裝器與 manifest 採 MIT 授權；下載的元件保留各自上游授權，Ultimate 不會替它們重新授權。
