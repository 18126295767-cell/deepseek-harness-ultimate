# DeepSeek Harness Ultimate

**DeepSeek Harness には、落ち着いて一つずつ比較できないほど多くのプラグインがあります。Ultimate はライセンス確認、バージョン固定、重複排除、実用的な整理を済ませているため、選択に悩まずすぐ作業を始められます。**

> コーディングチーム、ワークフロー、安全性、研究、日常自動化という、ほぼすべての実用カテゴリをカバーする再現可能な厳選 DSH プロファイルです。

**言語:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · 日本語 · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: 初心者向けガイド](TUTORIAL.ja.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Ultimate が必要な理由

DSH のエコシステムは急速に成長しています。数十のリポジトリの機能、ライセンス、版、権限、重複を比較すること自体が仕事です。Ultimate は監査可能な選択を公開 manifest に記録します。

- 重複する役割ごとに一つの検証済み既定を選び、上流版は完全な 40 桁 commit で固定し、記録済みの MIT・Apache-2.0・BSD-3-Clause のみを採用します。依存関係は前後で監査し、機密性の高い連携は任意のままです。

「ほぼすべての実用カテゴリ」は、公開された全プラグインを意味しません。Ultimate はコミュニティ管理であり、DeepSeek AI 公式版ではありません。上流作者は所有権とライセンスを保持します。

## すでに選択済みの機能

- 大規模コーディング: Agent チーム、依存関係ウェーブ、Git worktree 分離、計画、検証。
- ワークフローと信頼性: 再利用可能なフロー、スケジュール、条件起動、バックアップ、記憶、ルール。
- 生産性: ブックマーク、自動継続、デザインスキル、Spotlight。
- 通知、IM、電話、許可済みセキュリティ機能は任意です。

TaskSwarm は依存関係ウェーブと Git worktree 分離をすでにカバーするため、Captain は重複する既定ではなく代替として残します。同じ原則を EXCLUDED_COMPONENTS.md 全体に適用します。

## 5 分で開始

Windows 10/11 x64、macOS または Linux、Node.js 22 以上、manifest 内の公開リポジトリへ接続できるネットワークが必要です。ZIP を使う場合 Git は必須ではありません。

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

### ローカル profile を起動

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

初回起動後に Settings → Models を開き、自分のプロバイダーと API キーを追加して workspace を選びます。Ultimate が API キーを内蔵またはコピーすることはありません。

## インストーラが変更する内容

インストーラはユーザー用 profile を作成し、公式 base と web-app の層を先に置いてから選択済み bundle を追加します。資格情報、セッション、既存の cordis.patch.yml を削除せず、前後で依存関係を監査します。

## プライバシー・ライセンス・制限

このリポジトリには manifest、インストーラ、監査ルール、文書のみが含まれます。第三者ソース、node_modules、API キー、電話番号、メール、ブラウザセッション、私的設定は配布しません。

本リポジトリのコードは MIT です。ダウンロードした部品は MIT、Apache-2.0、BSD-3-Clause のライセンスと告知を保持します。DSH は開発者プレビューであり、互換性を壊す変更があり得ます。

## 検証と開発

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
