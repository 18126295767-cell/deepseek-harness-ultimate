# DeepSeek Harness Ultimate

**DeepSeek Harness 的外掛已經多到難以逐一比較。Ultimate 已替你完成篩選、授權核對、版本固定、功能去重與分類，安裝後可以直接開始工作，不必再承受選擇焦慮。**

> 覆蓋幾乎所有實用能力類別的可重現 DSH 精選設定：程式團隊、工作流程、安全、研究與日常自動化都已預先整理，不必逐個儲存庫尋找。

**語言:** [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文 · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate：零基礎教學](TUTORIAL.zh-TW.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## 為何需要 Ultimate

DSH 生態成長很快，比較數十個儲存庫的功能、授權、版本、權限與重複程度本身就是一項工作。Ultimate 把選擇公開記錄在 manifest 中。

- 每個重疊職責只保留一個較完整的預設實作。
- 以完整 40 位 commit 固定上游版本。
- 只納入已記錄 MIT、Apache-2.0 或 BSD-3-Clause 授權的元件。
- 安裝前檢查依賴，安裝後再掃描實際套件樹。
- 需要帳號、憑證、系統權限或明確授權的整合維持選用。

「幾乎所有實用類別」不代表收錄所有曾發布的外掛。Ultimate 由社群維護，並非 DeepSeek AI 官方版本；各上游作者保有其專案與授權。

## 已替你選好的能力

- 大型程式工作：視覺化 Agent 團隊、依賴分波、Git worktree 隔離、規劃與只讀驗收。
- 工作流程與可靠性：可重用流程、排程、條件喚醒、備份、記憶與全域規則。
- 日常效率：書籤、自動繼續、設計技能與 Spotlight 介面。
- 通知、IM、電話回撥及授權安全研究工具僅在使用者主動選擇時安裝。

TaskSwarm 已涵蓋依賴分波與 Git worktree 隔離，因此 Captain 僅列為替代方案，不會成為重複預設。相同原則適用於 EXCLUDED_COMPONENTS.md 中的所有項目。

## 五分鐘開始

需要 Windows 10/11 x64、macOS 或 Linux、Node.js 22 以上，以及可存取 manifest 內公開儲存庫的網路。下載 ZIP 時不一定需要 Git。

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

### 啟動本機 profile

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

首次啟動後，請在 Settings → Models 填入你自己的供應商與 API Key，再選擇工作區。Ultimate 絕不內建或複製 API Key。

## 安裝器會做什麼

安裝器建立使用者自己的 profile，先疊加官方 base 與 web-app，再加入精選第三方 bundle。寫入前後都會檢查依賴，既有憑證、工作階段與 cordis.patch.yml 不會被刪除。

## 隱私、授權與限制

本儲存庫只包含 manifest、安裝器、稽核規則與文件，不重新散布第三方原始碼、node_modules、API Key、電話、電子郵件、瀏覽器工作階段或私人設定。

本儲存庫程式碼採 MIT 授權。下載的元件保留其 MIT、Apache-2.0 或 BSD-3-Clause 授權與聲明。DSH 仍是開發者預覽版，可能出現破壞相容性的變更。

## 驗證與開發

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
