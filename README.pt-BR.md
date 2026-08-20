# DeepSeek Harness Ultimate

**O DeepSeek Harness já possui plugins demais para comparar um por um com tranquilidade. O Ultimate já revisou licenças, fixou versões, removeu duplicações e organizou as opções úteis para você começar sem ansiedade de escolha.**

> Um perfil DSH reprodutível e selecionado que cobre quase todas as categorias práticas: equipes de código, fluxos de trabalho, segurança, pesquisa e automação diária.

**Idiomas:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · Português (Brasil) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: guia para iniciantes](TUTORIAL.pt-BR.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Por que o Ultimate existe

O ecossistema DSH cresce rapidamente. Comparar funções, licenças, versões, permissões e sobreposições em dezenas de repositórios já é um trabalho. O Ultimate registra uma seleção auditável em um manifest público.

- Há um padrão revisado por função sobreposta; versões upstream são fixadas por commits completos de 40 caracteres; somente licenças MIT, Apache-2.0 ou BSD-3-Clause registradas entram; dependências são verificadas antes e depois; integrações sensíveis continuam opcionais.

“Quase todas as categorias práticas” não significa todos os plugins já publicados. O Ultimate é mantido pela comunidade e não é uma versão oficial da DeepSeek AI; os autores upstream mantêm propriedade e licença.

## O que já foi escolhido

- Código de grande porte: equipes Agent, ondas de dependências, isolamento Git worktree, planejamento e verificação.
- Fluxo e confiabilidade: workflows reutilizáveis, agendamento, acionamento condicional, backup, memória e regras.
- Produtividade: favoritos, continuação automática, skills de design e Spotlight.
- Notificações, IM, chamadas e pesquisa de segurança autorizada permanecem opcionais.

TaskSwarm já cobre ondas de dependências e isolamento Git worktree; Captain permanece como alternativa, não como padrão duplicado. A mesma regra vale em EXCLUDED_COMPONENTS.md.

## Início em cinco minutos

Você precisa de Windows 10/11 x64, macOS ou Linux, Node.js 22 ou superior e acesso de rede aos repositórios públicos do manifest. Git é opcional quando usar o ZIP.

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

### Iniciar o profile local

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Após a primeira inicialização, abra Settings → Models, adicione seu próprio provedor e chave API e escolha um workspace. O Ultimate nunca inclui nem copia chaves.

## O que o instalador altera

O instalador cria um profile do usuário, coloca primeiro as camadas oficiais base e web-app e depois os bundles selecionados. Ele audita dependências antes e depois sem apagar credenciais, sessões ou um cordis.patch.yml existente.

## Privacidade, licenças e limites

O repositório contém manifest, instalador, regras de auditoria e documentação. Não redistribui código de terceiros, node_modules, chaves, telefones, e-mails, sessões do navegador nem configurações privadas.

O código do repositório usa MIT. Componentes baixados mantêm licenças e avisos MIT, Apache-2.0 ou BSD-3-Clause. O DSH continua em prévia para desenvolvedores e pode mudar de forma incompatível.

## Verificação e desenvolvimento

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
