# DeepSeek Harness Ultimate: 初心者向けガイド

このガイドはターミナルを使ったことがない方を想定しています。順番に進め、各確認を行ってください。プログラミング知識は不要です。

**チュートリアル言語:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · 日本語 · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[紹介へ戻る](README.ja.md)

## 1. 何をインストールするか

Ultimate は profile インストーラであり、モデルや DeepSeek AI 公式デスクトップアプリではありません。ライセンス確認済み、版固定済み、重複なしの実用プラグインセットを提供しますが、モデルアカウントは自分のものを使います。

## 2. 準備と Node.js

対応コンピューター、安定したネットワーク、自分のアカウントでのインストール権限、Documents/DSH-Work のような簡単な作業フォルダを用意します。nodejs.org から LTS を入れ、PowerShell または Terminal を開き直します。

```text
node --version
```

`v22.x.x` またはそれ以上のメジャー版なら成功です。

## 3. ダウンロードとインストール

GitHub で Code → Download ZIP を選び、展開して package.json、profile、scripts、windows があるフォルダを開きます。Windows は windows/install-ultimate.cmd をダブルクリックできます。macOS/Linux は下のコマンドを使います。

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

成功時は `Platform filter: windows`、`Platform filter: macos`、または `Platform filter: linux` が表示されます。

## 4. 初回起動とモデル

Agent に作業させるフォルダから DSH を起動します。127.0.0.1 は自分のコンピューターだけを意味します。利用中はターミナルを閉じないでください。その後 Settings → Models を開き、自分のプロバイダーとキーをその画面だけに入力します。

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

## 5. ワークスペースと最初の確認

Choose workspace を押して作業フォルダを追加・選択し、新しいセッションを作成します。最初に List the files in this workspace. Do not change anything. と送ります。正しいファイルが表示され、モデルエラーがなければ基本設定は成功です。

## 6. 既存ローカルアプリと任意プラグイン

web profile を起動する既存の macOS ローカルアプリがある場合は、終了してから ~/.dsh/profiles/web をバックアップします。cordis.patch.yml は残りますが、manifest 外のプラグインは npm により削除されることがあります。電話、IM、通知、安全機能は COMPONENTS.md を読んでから有効にしてください。

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. 確認、更新、削除、安全性

profile 監査を実行し、最後に Profile dependency integrity: OK と表示されることを確認します。更新前に DSH を停止して profile を保存します。削除は DSH を停止して ~/.dsh/profiles/ultimate をゴミ箱へ移します。失敗時にランダムなファイルを消したり、キーやトークンを公開したりしないでください。

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

最後に表示される予定の行： `Profile dependency integrity: OK`.

## 開発者向け検証

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

インストーラと manifest は MIT です。ダウンロードした部品は上流ライセンスを維持し、Ultimate は再ライセンスしません。
