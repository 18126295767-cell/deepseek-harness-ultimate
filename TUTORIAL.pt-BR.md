# DeepSeek Harness Ultimate: guia para iniciantes

Este guia pressupõe que você nunca usou um terminal. Siga os passos em ordem e faça cada pequena verificação; não é necessário saber programar.

**Idiomas do tutorial:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · Português (Brasil) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Voltar à apresentação](README.pt-BR.md)

## Guia visual

Estas capturas vêm de profiles limpos, sem sessões, credenciais ou dados privados. As imagens do macOS mostram o shell nativo; as do Windows mostram a mesma DSH Web UI em um runner Windows real.

![App nativo do macOS: Aviso de prévia para desenvolvedores](assets/screenshots/macos-01-developer-preview.jpg)

*App nativo do macOS — Aviso de prévia para desenvolvedores*

![App nativo do macOS: Onboarding com API Key vazia](assets/screenshots/macos-02-api-key-onboarding.jpg)

*App nativo do macOS — Onboarding com API Key vazia*

![App nativo do macOS: Início sem workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*App nativo do macOS — Início sem workspace*

![App nativo do macOS: Modelos com campo de chave vazio](assets/screenshots/macos-04-model-settings.jpg)

*App nativo do macOS — Modelos com campo de chave vazio*

![App nativo do macOS: Inventário com 133 plugins](assets/screenshots/macos-05-plugin-inventory.jpg)

*App nativo do macOS — Inventário com 133 plugins*

![DSH Web UI no Windows: Aviso de prévia para desenvolvedores](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI no Windows — Aviso de prévia para desenvolvedores*

![DSH Web UI no Windows: Onboarding com API Key vazia](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI no Windows — Onboarding com API Key vazia*

![DSH Web UI no Windows: Início sem workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI no Windows — Início sem workspace*

![DSH Web UI no Windows: Modelos com campo de chave vazio](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI no Windows — Modelos com campo de chave vazio*

![DSH Web UI no Windows: Inventário com 133 plugins](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI no Windows — Inventário com 133 plugins*

## 1. O que será instalado

Ultimate é um instalador de profiles, não um modelo nem um aplicativo oficial da DeepSeek AI. Ele oferece uma seleção prática sem duplicações, com licenças revisadas e versões fixadas; você ainda usa sua própria conta de modelo.

## 2. Preparação e Node.js

Prepare um computador compatível, internet estável, permissão para instalar em sua conta e uma pasta simples como Documents/DSH-Work. Instale a versão LTS em nodejs.org, feche e reabra PowerShell ou Terminal.

```text
node --version
```

Um resultado `v22.x.x` ou versão principal superior está correto.

## 3. Baixar e instalar

No GitHub escolha Code → Download ZIP, extraia e abra a pasta que contém package.json, profile, scripts e windows. No Windows você pode clicar duas vezes em windows/install-ultimate.cmd; no macOS/Linux execute os comandos abaixo.

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

Uma instalação correta mostra `Platform filter: windows`, `Platform filter: macos` ou `Platform filter: linux`.

## 4. Primeira inicialização e modelo

Inicie o DSH a partir da pasta onde o Agent deve trabalhar. 127.0.0.1 significa somente o seu computador; mantenha o terminal aberto. Depois abra Settings → Models e informe seu provedor e sua chave somente nessa tela.

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

## 5. Workspace e primeiro teste

Clique em Choose workspace, adicione e selecione sua pasta e crie uma sessão. Primeiro peça: List the files in this workspace. Do not change anything. Ver os arquivos certos sem erro de modelo confirma a configuração básica.

## 6. App local existente e plugins opcionais

Se você já possui um app local de macOS que usa o profile web, feche-o e faça uma cópia de ~/.dsh/profiles/web antes de instalar ali. cordis.patch.yml é preservado, porém npm pode remover plugins fora do manifest. Ative telefone, IM, avisos e segurança apenas depois de ler COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Verificar, atualizar, remover e manter segurança

Execute a auditoria do profile; a última linha deve ser Profile dependency integrity: OK. Antes de atualizar, pare o DSH e faça backup do profile. Para remover, pare o DSH e mova ~/.dsh/profiles/ultimate para a Lixeira. Não apague arquivos aleatórios após uma falha e nunca publique chaves ou tokens.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Última linha esperada: `Profile dependency integrity: OK`.

## Verificação para desenvolvedores

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

O instalador e o manifest usam MIT. Os componentes baixados mantêm suas licenças upstream; o Ultimate não os relicencia.
