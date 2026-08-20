# DeepSeek Harness Ultimate 小白教程

这份教程默认你从来没有用过终端，也不要求你懂编程。请从上到下依次操作，不要跳过每一步后面的“小检查”。

**教程语言：** [English](TUTORIAL.md) · 简体中文 · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[返回项目介绍](README.zh-CN.md)

## 1. 先弄清楚要安装的是什么

DeepSeek Harness 的插件已经非常多。Ultimate 就是已经替你做好的选择：它用一套经过许可证核对、版本固定和功能去重的精选配置，覆盖几乎所有实用能力类别。你不需要先比较几十个相似仓库才能开始工作。

Ultimate 是 **profile 安装器**，不是模型，也不是 DeepSeek AI 官方桌面 App。它把插件 bundle 安装进本地 DSH profile，不包含 API 密钥、账号、私人资料或第三方源码。模型供应商账号仍需要你自己提供。

第一次安装一般需要 15 到 40 分钟，其中大部分时间是在下载。

## 2. 开始前准备

请准备四样东西：

1. 一台 Windows 10/11 x64、macOS 或 Linux 电脑。
2. 稳定的网络。
3. 给当前用户安装软件的权限。
4. 一个名称简单的工作文件夹，例如 `文稿/DSH-Work`。

重要安全规则：绝不要把 API 密钥粘贴到 GitHub Issue、聊天消息、截图、教程命令或公开文件中。Ultimate 不会要求你把密钥发给本仓库。

### 判断自己的操作系统

- 屏幕底部有“开始”按钮：看 **Windows** 步骤。
- 屏幕左上角有苹果标志：看 **macOS** 步骤。
- 使用 Ubuntu、Debian、Fedora 等发行版：看 **Linux** 步骤。

## 3. 安装 Node.js 22 或更高版本

Node.js 是运行安装器和 DSH 的基础程序。

### Windows 或 macOS 图形安装法

1. 打开 [nodejs.org](https://nodejs.org/)。
2. 选择标有 **LTS** 的按钮，版本号是 22 或更高都可以。
3. 打开下载好的安装程序。
4. 保持默认选项，一直完成安装。
5. 关闭 PowerShell 或“终端”，再重新打开一次，让它识别新程序。

### 检查 Node.js 是否可用

Windows：打开“开始”，输入 `PowerShell`，打开“Windows PowerShell”。
macOS：按 Command+空格，输入“终端”或 `Terminal`，按回车。Linux 打开常用终端。

输入下面一行，再按回车：

```text
node --version
```

看到 `v22.x.x`、`v24.x.x` 或更高数字就是成功。如果看到“找不到命令”或“不是内部或外部命令”，先关闭终端再重新打开。如果仍失败，请重新安装 Node.js LTS。

## 4. 下载 Ultimate

下面两种方法任选一种。方法 A 不需要 Git。

### 方法 A：下载 ZIP

1. 打开 [Ultimate 仓库](https://github.com/18126295767-cell/deepseek-harness-ultimate)。
2. 点击绿色 **Code** 按钮，再点 **Download ZIP**。
3. 打开“下载”文件夹。
4. 双击 ZIP 解压。
5. 打开解压出的 `deepseek-harness-ultimate-main` 文件夹。

正确文件夹里能看到 `package.json`、`profile`、`scripts` 和 `windows`。如果只看到另一个同名文件夹，请再打开里面那一层。

### 方法 B：使用 Git

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

## 5. 在 Windows 安装

如果你使用 macOS 或 Linux，请跳过这一节。

### 最简单的方法

1. 打开解压后的仓库文件夹。
2. 打开 `windows` 文件夹。
3. 双击 `install-ultimate.cmd`。
4. 下载期间不要关闭出现的黑色窗口。

脚本默认安装到 `%USERPROFILE%\.dsh\profiles\ultimate`，不会安装 macOS 专用插件。

### PowerShell 方法

用“文件资源管理器”打开解压后的仓库文件夹，点一下顶部地址栏，输入 `powershell`，按回车。然后逐行执行：

```powershell
node --version
& .\windows\install-ultimate.ps1
```

如果 Windows 提示“禁止运行脚本”，只在这个可信仓库文件夹里使用下面这条仅对本次进程生效的命令：

```powershell
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\windows\install-ultimate.ps1"
```

不要对来源不明的脚本使用这条绕过命令。

### 成功时会看到什么

末尾应出现类似文字：

```text
Installed 15 selected components into C:\Users\你的用户名\.dsh\profiles\ultimate
Platform filter: windows
Profile entry point: npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

实际位置会显示你的用户名。以后经过审计的版本可能会调整组件数量。

## 6. 在 macOS 安装

如果你使用 Windows 或 Linux，请跳过这一节。

1. 按 Command+空格，输入“终端”或 `Terminal`，按回车。
2. 在终端输入 `cd`，再输入一个空格，先不要按回车。
3. 从 Finder 把解压后的 `deepseek-harness-ultimate-main` 文件夹拖进终端窗口。
4. 现在按回车，终端就进入了正确文件夹。
5. 逐行执行下面三条命令，每一行结束后按回车：

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

审计会报告许可证和固定提交的组件。安装末尾应看到：

```text
Platform filter: macos
Profile entry point: npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

macOS 会多安装一个钥匙串组件，所以数量可能比 Windows 或 Linux 多一个。

## 7. 在 Linux 安装

在解压后的仓库文件夹中打开终端，然后执行：

```bash
node --version
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/ultimate"
```

看到 `Platform filter: linux` 表示平台选择正确。如果系统软件源没有 Node.js 22 或更高版本，请按照 Node.js 针对该发行版的说明安装当前 LTS，再重新检查。

## 8. 第一次启动 Ultimate

启动前先进入希望 Agent 工作的文件夹。DSH 会把启动命令所在的文件夹当作默认文件位置。例如 macOS/Linux 执行：

```bash
cd "$HOME/Documents/DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Windows PowerShell 执行：

```powershell
Set-Location "$HOME\Documents\DSH-Work"
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

命令会启动本机 DSH 界面，通常地址是 `http://127.0.0.1:3080`。`127.0.0.1` 表示你自己的电脑，不是公开网站。使用 DSH 时请保持终端窗口打开；想停止本地服务时，回到该终端按 Ctrl+C。

## 9. 安全接入自己的模型

1. 在 DSH 中打开“设置 → 模型（Settings → Models）”。
2. 选择 DeepSeek 或你自己拥有的其他供应商。
3. 只在 DSH 设置界面填写供应商地址和 API 密钥。
4. 保存模型配置。
5. 不要把密钥写进 `package.json`、`cordis.patch.yml` 或教程命令。

DSH 仍处于开发者预览阶段，按钮位置以后可能略有移动。供应商配置属于本地 DSH runtime，不属于 Ultimate。

## 10. 选择工作目录并完成第一个任务

1. 点击“选择工作区（Choose workspace）”。
2. 添加刚才准备的工作文件夹，例如 `文稿/DSH-Work`。
3. 选中该文件夹。
4. 新建会话。
5. 发送下面这条无风险测试：

```text
列出这个工作区里的文件，不要修改任何内容。然后告诉我你可以在这里帮助我做什么。
```

如果 Agent 能回答所选文件夹中的内容，而且没有报告“未配置模型”，就说明基本接入成功。需要审批的操作仍会按照当前权限策略向你询问。

## 11. 让已有的本地 DeepSeek Harness App 使用 Ultimate

这一节只适用于已经安装了社区版 macOS 本地 App、并且该 App 启动 DSH `web` profile 的用户。先退出 App。安装到 `web` 会把插件依赖列表替换成 Ultimate 精选集合，所以一定先备份。

在 Finder 选择“前往 → 前往文件夹”，输入 `~/.dsh/profiles`，把 `web` 文件夹复制一份并改名为 `web-backup`。然后在 Ultimate 仓库文件夹执行：

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

安装器会保留已有 `cordis.patch.yml`，但 npm 可能移除不在 Ultimate 清单中的其他插件。需要恢复时，先退出 App，把新的 `web` 改名，再把 `web-backup` 改回 `web`。

如果已有 Windows 启动器明确启动 `web` profile，可以执行：

```powershell
& .\windows\install-ultimate.ps1 -ProfileDir "$env:USERPROFILE\.dsh\profiles\web"
```

## 12. 添加可选连接

默认集合不会主动获取电话、IM、通知或安全研究权限。启用前先阅读 [COMPONENTS.md](COMPONENTS.md)。

只添加一个已经审阅的可选组件：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

只有在逐项检查账号、权限和数据流后，才一次加入所有当前可选组件：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include-optional
```

Ultimate 不会替你填写电话号码、邮箱、机器人 token、IM 账号或系统权限。

## 13. 检查已安装的 profile

执行：

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

最后一行应为：

```text
Profile dependency integrity: OK
```

如果知道官方 DSH runtime 所在目录，可以再做物理副本对照：

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --runtime-dir /absolute/path/to/dsh-runtime
```

必须把 `/absolute/path/to/dsh-runtime` 换成真实绝对路径，不能原样照抄占位文字。

## 14. 安全更新

1. 在终端按 Ctrl+C 停止 DSH，并退出本地 App 外壳。
2. 备份当前 `ultimate` 或 `web` profile 文件夹。
3. 下载或拉取最新版 Ultimate 源码。
4. 阅读 `COMPONENTS.md` 和 `EXCLUDED_COMPONENTS.md`，查看选择是否变化。
5. 重新执行同一条安装命令。
6. 再做一次已安装 profile 审计，并新建会话测试。

如果插件错误发生在工具调用中途，不要继续复用那条已经中断的旧会话。请新建会话并重新发送任务。

## 15. 卸载或恢复

Ultimate 故意不提供自动删除 profile 的命令。

- Windows：在文件资源管理器地址栏输入 `%USERPROFILE%\.dsh\profiles`。
- macOS：Finder →“前往 → 前往文件夹”→ 输入 `~/.dsh/profiles`。
- Linux：用文件管理器打开 `~/.dsh/profiles`。

先停止 DSH，再把 `ultimate` 文件夹移入回收站。这样不会删除单独管理的 DSH runtime、API 凭据或其他 profile。需要回滚时，把备份文件夹恢复为原来的名称。

## 16. 常见问题

### 找不到 `node` 命令

Node.js 没装好，或者终端还没有刷新。安装 Node.js LTS，关闭所有终端窗口，重新打开后再执行 `node --version`。

### 出现 `Cannot find module ... scripts/install-ultimate.mjs`

终端进入了错误文件夹。请找到包含 `package.json` 的那一层，再使用 Windows 地址栏方法或 macOS 拖文件夹方法进入。

### PowerShell 提示禁止运行脚本

只对这个经过审阅的仓库使用 Windows 章节中的“仅本次进程”命令，不需要修改整台电脑的执行策略。

### 出现 `ENOTFOUND`、超时或 GitHub 下载错误

网络、DNS、代理或 GitHub 连接暂时不可用。保留现有 profile，恢复网络后重新运行相同安装命令即可。commit 固定值保证请求仍然一致。

### 3080 端口已被占用

可能已经有一个 DSH 在运行。找到旧终端，按 Ctrl+C 停止它。如果确实要开第二个实例，请先查看当前 DSH Web 参数：

```bash
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate --help
```

### 界面打开了但不能发送消息

先在“设置 → 模型”中配置并保存模型，再选择工作区。没有选定工作区时，输入区会保持不可用。

### 完整性审计拒绝宿主核心依赖

某个插件试图安装宿主 `@deepseek-ai/dsh-*` 包的第二份物理副本。不要随机删文件强行启动。保留错误报告，升级或移除报告中点名的插件，再重新审计。

### 某个插件功能没有出现

部分插件需要设置、系统权限或新会话。先查看 profile 里的 `COMPONENTS.json` 确认已经安装，再阅读该插件上游说明，重启 DSH 并新建会话。

## 17. 安全与隐私检查表

- 只使用属于你自己、可以随时撤销的 API 密钥。
- 不要公开密钥、机器人 token、电话号码、邮箱凭据、会话或包含这些内容的截图。
- 授予辅助功能、自动化、麦克风、通讯录或通知权限前，先审阅对应可选插件。
- 逆向工程技能只能用于你拥有或明确获准测试的系统。
- 再次分发安装后的 profile 时保留上游许可证和版权声明。
- 记住 DSH 仍是开发者预览版，后续可能出现兼容性变化。

## 18. 开发者验证

贡献者和再次分发者应执行：

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

安装器和清单采用 MIT 许可证；下载的组件继续使用各自上游许可证，Ultimate 不会替它们重新授权。
