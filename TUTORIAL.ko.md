# DeepSeek Harness Ultimate: 초보자 안내서

이 안내서는 터미널을 한 번도 사용하지 않은 분을 대상으로 합니다. 순서대로 진행하고 각 확인을 수행하세요. 프로그래밍 지식은 필요 없습니다.

**안내서 언어:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · 한국어 · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[소개로 돌아가기](README.ko.md)

## 1. 무엇을 설치하는가

Ultimate는 profile 설치기이며 모델이나 DeepSeek AI 공식 데스크톱 앱이 아닙니다. 라이선스 확인, 버전 고정, 중복 제거된 실용 플러그인 모음을 제공하지만 모델 계정은 본인의 것을 사용해야 합니다.

## 2. 준비와 Node.js

지원되는 컴퓨터, 안정적인 인터넷, 본인 계정의 설치 권한, Documents/DSH-Work 같은 간단한 작업 폴더를 준비하세요. nodejs.org에서 LTS를 설치한 뒤 PowerShell 또는 Terminal을 다시 여세요.

```text
node --version
```

`v22.x.x` 또는 더 높은 주 버전이면 성공입니다.

## 3. 다운로드와 설치

GitHub에서 Code → Download ZIP을 선택하고 압축을 푼 뒤 package.json, profile, scripts, windows가 있는 폴더를 여세요. Windows에서는 windows/install-ultimate.cmd를 두 번 클릭할 수 있고 macOS/Linux에서는 아래 명령을 사용합니다.

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

성공한 설치는 `Platform filter: windows`, `Platform filter: macos` 또는 `Platform filter: linux`를 표시합니다.

## 4. 첫 실행과 모델

Agent가 작업할 폴더에서 DSH를 시작합니다. 127.0.0.1은 본인 컴퓨터만 뜻합니다. 사용하는 동안 터미널을 열어 두세요. 이어서 Settings → Models에서 본인의 공급자와 키를 그 화면에만 입력합니다.

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

## 5. 워크스페이스와 첫 테스트

Choose workspace를 눌러 작업 폴더를 추가하고 선택한 뒤 새 세션을 만드세요. 먼저 List the files in this workspace. Do not change anything. 을 보냅니다. 올바른 파일이 보이고 모델 오류가 없으면 기본 설정이 성공한 것입니다.

## 6. 기존 로컬 앱과 선택 플러그인

web profile을 시작하는 기존 macOS 로컬 앱이 있다면 종료하고 ~/.dsh/profiles/web을 백업한 뒤 설치하세요. cordis.patch.yml은 보존되지만 manifest 밖 플러그인은 npm이 제거할 수 있습니다. 전화, IM, 알림, 보안 기능은 COMPONENTS.md를 읽고 나서만 활성화하세요.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. 검증, 업데이트, 제거, 보안

profile 감사를 실행해 마지막 줄이 Profile dependency integrity: OK 인지 확인하세요. 업데이트 전 DSH를 멈추고 profile을 백업합니다. 제거하려면 DSH를 멈추고 ~/.dsh/profiles/ultimate를 휴지통으로 옮기세요. 실패 시 임의 파일을 지우거나 키와 토큰을 공개하지 마세요.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

예상되는 마지막 줄: `Profile dependency integrity: OK`.

## 개발자 검증

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

설치기와 manifest는 MIT입니다. 내려받은 구성 요소는 upstream 라이선스를 유지하며 Ultimate는 재라이선스하지 않습니다.
