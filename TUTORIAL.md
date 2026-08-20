# DeepSeek Harness Ultimate: beginner tutorial

This guide assumes you have never used a terminal. Follow the steps in order and
do not skip the small checks. Nothing here requires you to know programming.

**Tutorial languages:** English · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Back to README](README.md)

## 1. Know what you are installing

DeepSeek Harness has a very large plugin ecosystem. Ultimate is the already-made
choice: it covers nearly every practical capability category with a curated,
license-reviewed, version-pinned, non-duplicative set. You do not need to compare
dozens of similar repositories before starting.

Ultimate is a **profile installer**, not a model and not an official DeepSeek AI
desktop app. It installs plugin bundles into a local DSH profile. It does not
include an API key, account, private data, or third-party source code. You must use
your own model provider account.

Allow 15 to 40 minutes for the first installation. Most of the time is downloading.

## 2. Before you begin

Prepare these four things:

1. A Windows 10/11 x64, macOS, or Linux computer.
2. A stable internet connection.
3. Permission to install software for your own user account.
4. A simple work folder, such as `Documents/DSH-Work`.

Important safety rule: never paste an API key into a GitHub issue, chat message,
screenshot, tutorial command, or public file. Ultimate never asks you to send a key
to this repository.

### Identify your operating system

- If the bottom of the screen has a Start button, use the **Windows** steps.
- If the top-left menu has an Apple logo, use the **macOS** steps.
- If you use Ubuntu, Debian, Fedora, or another Linux distribution, use the **Linux** steps.

## 3. Install Node.js 22 or newer

Node.js is the engine that runs the installer and DSH.

### Windows or macOS, visual method

1. Open [nodejs.org](https://nodejs.org/).
2. Choose the button marked **LTS**. Any version 22 or newer is acceptable.
3. Open the downloaded installer.
4. Keep the default choices and finish the installation.
5. Close and reopen PowerShell or Terminal so it can see the new program.

### Check that Node.js works

On Windows, open **Start**, type `PowerShell`, and open **Windows PowerShell**.
On macOS, press Command+Space, type `Terminal`, and press Return. On Linux, open
your usual terminal.

Type this command and press Enter:

```text
node --version
```

Success looks like `v22.x.x`, `v24.x.x`, or a higher number. If you see “command
not found” or “is not recognized,” close the terminal, reopen it, and try again.
If it still fails, reinstall the Node.js LTS package.

## 4. Download Ultimate

You can use either method. Method A does not require Git.

### Method A: download a ZIP

1. Open [the Ultimate repository](https://github.com/18126295767-cell/deepseek-harness-ultimate).
2. Select the green **Code** button, then **Download ZIP**.
3. Open your Downloads folder.
4. Double-click the ZIP to extract it.
5. Open the extracted `deepseek-harness-ultimate-main` folder.

The correct folder contains `package.json`, `profile`, `scripts`, and `windows`.
If you see only one folder with the same name, open that inner folder first.

### Method B: use Git

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

## 5. Install on Windows

Skip this section if you use macOS or Linux.

### Easiest route

1. Open the extracted repository folder.
2. Open the `windows` folder.
3. Double-click `install-ultimate.cmd`.
4. Keep the black window open. Do not close it while packages are downloading.

The script installs the default profile at
`%USERPROFILE%\.dsh\profiles\ultimate`. It does not install macOS-only plugins.

### PowerShell route

In File Explorer, open the extracted repository folder. Click the address bar,
type `powershell`, and press Enter. Then run:

```powershell
node --version
& .\windows\install-ultimate.ps1
```

If Windows says script execution is disabled, use this process-only command from
the same trusted repository folder:

```powershell
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\windows\install-ultimate.ps1"
```

Do not use this bypass for scripts downloaded from an unknown source.

### What success looks like

Near the end you should see lines similar to:

```text
Installed 15 selected components into C:\Users\YOUR-NAME\.dsh\profiles\ultimate
Platform filter: windows
Profile entry point: npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Your user name will replace `YOUR-NAME`. The exact component count may change in
a later reviewed release.

## 6. Install on macOS

Skip this section if you use Windows or Linux.

1. Open Terminal with Command+Space, type `Terminal`, and press Return.
2. Type `cd` followed by one space, but do not press Return yet.
3. Drag the extracted `deepseek-harness-ultimate-main` folder from Finder into the Terminal window.
4. Press Return. Terminal is now inside the correct folder.
5. Run these commands one at a time:

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

The audit should report allowed licenses and unique pinned components. The final
installation messages should include:

```text
Platform filter: macos
Profile entry point: npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

macOS installs one additional macOS-only Keychain component, so its count may be
one higher than Windows or Linux.

## 7. Install on Linux

Open a terminal in the extracted repository folder, then run:

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Success includes `Platform filter: linux`. If your distribution does not provide
Node.js 22+, install a current Node.js LTS release from the Node.js instructions
for your distribution and repeat the check.

## 8. Start Ultimate for the first time

Before starting, move into the folder you want the Agent to work in. DSH uses the
invoking folder as its default filesystem location. For example:

```bash
cd "$HOME/Documents/DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Windows PowerShell uses:

```powershell
Set-Location "$HOME\Documents\DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

The command starts the local DSH interface, normally at
`http://127.0.0.1:3080`. `127.0.0.1` means your own computer; it is not a public
website. Keep the terminal window open while using DSH. Press Ctrl+C in that
window when you want to stop the local service.

## 9. Connect your model safely

1. In DSH, open **Settings → Models**.
2. Choose DeepSeek or another provider you own.
3. Enter the provider endpoint and API key in the DSH settings screen.
4. Save the model configuration.
5. Never add the key to `package.json`, `cordis.patch.yml`, or a tutorial command.

The names of buttons may move slightly because DSH is still in developer preview.
The provider configuration belongs to the local DSH runtime, not Ultimate.

## 10. Choose a workspace and run a first task

1. Select **Choose workspace**.
2. Add the work folder you created, such as `Documents/DSH-Work`.
3. Select that folder.
4. Create a new session.
5. Send this harmless first task:

```text
List the files in this workspace. Do not change anything. Then explain what you can help me do here.
```

Success means the Agent answers with the files in that chosen folder and does not
report a missing model. DSH will ask before operations that require approval under
your active permission policy.

## 11. Use an existing local DeepSeek Harness app

This section is only for someone who already installed a community macOS app that
launches the DSH `web` profile. Quit the app first. Installing into `web` replaces
its plugin dependency list with the curated Ultimate set, so make a backup before
continuing.

In Finder, choose **Go → Go to Folder**, enter `~/.dsh/profiles`, and duplicate the
`web` folder as `web-backup`. Then, from the Ultimate repository folder, run:

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

The installer preserves an existing `cordis.patch.yml`, but npm may remove plugins
that are not in the Ultimate manifest. To undo the change, quit the app, rename the
new `web` folder, and rename `web-backup` back to `web`.

An existing Windows launcher that explicitly launches profile `web` can use:

```powershell
& .\windows\install-ultimate.ps1 -ProfileDir "$env:USERPROFILE\.dsh\profiles\web"
```

## 12. Optional integrations

The default is intentionally useful without granting phone, IM, notification, or
security-research access. Read [COMPONENTS.md](COMPONENTS.md) before enabling one.

Install one reviewed optional component:

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

Install every currently listed optional component only after reviewing its accounts,
permissions, and data flow:

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include-optional
```

Ultimate does not configure phone numbers, email addresses, bot tokens, IM accounts,
or OS permissions for you.

## 13. Verify the installed profile

Run:

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

The last line should be:

```text
Profile dependency integrity: OK
```

If you know the directory containing the official DSH runtime, add a physical-copy
comparison:

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --runtime-dir /absolute/path/to/dsh-runtime
```

Replace `/absolute/path/to/dsh-runtime` with a real absolute path. Do not copy that
placeholder unchanged.

## 14. Update without losing your way

1. Stop DSH with Ctrl+C and quit any local app shell.
2. Back up the current `ultimate` or `web` profile folder.
3. Download or pull the newest Ultimate source.
4. Read `COMPONENTS.md` and `EXCLUDED_COMPONENTS.md` for selection changes.
5. Run the same installation command again.
6. Run the installed-profile audit and start a new test session.

Do not reuse a session that stopped in the middle of a tool call after a plugin
error. Start a fresh session and resend the task.

## 15. Uninstall or roll back

Ultimate deliberately has no command that deletes profiles automatically.

- Windows: enter `%USERPROFILE%\.dsh\profiles` in the File Explorer address bar.
- macOS: Finder → **Go → Go to Folder** → `~/.dsh/profiles`.
- Linux: open `~/.dsh/profiles` in your file manager.

Stop DSH first, then move the `ultimate` folder to the Recycle Bin/Trash. This
does not remove the separately managed DSH runtime, API credentials, or other
profiles. For rollback, restore the backup folder under its original name.

## 16. Common problems

### `node` is not recognized or command not found

Node.js is missing or the terminal has not refreshed. Install Node.js LTS, close
every terminal window, open a new one, and run `node --version` again.

### `Cannot find module ... scripts/install-ultimate.mjs`

The terminal is in the wrong folder. Open the folder that contains `package.json`,
then use the File Explorer address-bar method or the macOS drag-folder method again.

### PowerShell says scripts are disabled

Use the process-only command shown in the Windows section, and only for this
reviewed repository checkout. You do not need to change the computer-wide policy.

### Download fails with `ENOTFOUND`, timeout, or GitHub error

The network, DNS, proxy, or GitHub connection is unavailable. Keep the profile
folder, restore network access, and run the same installer again. Commit pins make
the request repeatable.

### Port 3080 is already in use

Another DSH process may already be running. Return to the older terminal and stop
it with Ctrl+C. If you intentionally need another instance, read the current DSH
Web help before choosing a different port:

```bash
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate --help
```

### The interface opens but no message can be sent

Configure a model under **Settings → Models**, save it, then select a workspace.
The composer remains unavailable until a workspace is selected.

### Integrity audit rejects a host-core dependency

A plugin tried to install a second physical copy of a host `@deepseek-ai/dsh-*`
package. Do not delete random files to force startup. Keep the error report, update
or remove the named plugin, then run the audit again.

### A plugin feature does not appear

Some plugins need settings, permissions, or a new session. Check `COMPONENTS.json`
inside the profile to confirm installation, review that plugin's upstream guide,
restart DSH, and create a fresh session.

## 17. Security and privacy checklist

- Use only API keys that belong to you and can be revoked.
- Never publish keys, bot tokens, phone numbers, email credentials, sessions, or screenshots containing them.
- Review optional plugins before granting Accessibility, Automation, microphone, contacts, or notification permissions.
- Use reverse-engineering skills only on systems you own or are explicitly authorized to test.
- Keep upstream license and copyright notices if you redistribute an installed profile.
- Remember that DSH is a developer preview and may introduce compatibility changes.

## 18. Developer verification

Contributors and redistributors should run:

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

The installer and manifest are MIT-licensed. Downloaded components keep their own
upstream licenses; Ultimate does not relicense them.
