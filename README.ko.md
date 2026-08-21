# DeepSeek Harness Ultimate

**DeepSeek Harness에는 하나씩 비교하기 어려울 만큼 많은 플러그인이 있습니다. Ultimate가 라이선스를 검토하고 버전을 고정하며 중복을 제거하고 유용한 선택지를 정리했으므로, 선택 불안 없이 바로 작업을 시작할 수 있습니다.**

> 코딩 팀, 워크플로, 보안, 연구, 일상 자동화 등 거의 모든 실용 범주를 다루는 재현 가능한 큐레이션 DSH profile입니다.

**언어:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · 한국어 · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: 초보자 안내서](TUTORIAL.ko.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## 화면 안내

세션, 자격 증명, 개인 workspace 데이터가 없는 깨끗한 profile에서 캡처했습니다. macOS 이미지는 네이티브 셸을, Windows 이미지는 실제 Windows runner에서 렌더링한 공통 DSH Web UI를 보여 줍니다.

![macOS 네이티브 앱: workspace가 비어 있는 홈](assets/screenshots/macos-03-empty-workspace.jpg)

*macOS 네이티브 앱 — workspace가 비어 있는 홈*

![Windows DSH Web UI: workspace가 비어 있는 홈](assets/screenshots/windows-03-empty-workspace.png)

*Windows DSH Web UI — workspace가 비어 있는 홈*

## Ultimate가 필요한 이유

DSH 생태계는 빠르게 성장합니다. 수십 개 저장소의 기능, 라이선스, 버전, 권한, 중복을 비교하는 일 자체가 작업입니다. Ultimate는 감사 가능한 선택을 공개 manifest에 기록합니다.

- 겹치는 역할마다 검토된 기본값 하나를 선택하고, upstream 버전을 완전한 40자리 commit으로 고정하며, 기록된 MIT·Apache-2.0·BSD-3-Clause만 포함합니다. 설치 전후 의존성을 감사하고 민감한 연동은 선택 사항으로 둡니다.

“거의 모든 실용 범주”는 공개된 모든 플러그인을 뜻하지 않습니다. Ultimate는 커뮤니티가 관리하며 DeepSeek AI 공식 배포판이 아닙니다. upstream 작성자는 소유권과 라이선스를 유지합니다.

## 이미 선택된 기능

- 대규모 코드 작업: Agent 팀, 의존성 웨이브, Git worktree 격리, 계획과 검증.
- 워크플로와 안정성: 재사용 흐름, 예약, 조건 깨우기, 백업, 메모리, 규칙.
- 생산성: 북마크, 자동 계속, 디자인 skill, Spotlight.
- 알림, IM, 전화, 승인된 보안 기능은 선택 사항입니다.

TaskSwarm이 의존성 웨이브와 Git worktree 격리를 이미 담당하므로 Captain은 중복 기본값이 아닌 대안으로 남깁니다. 같은 원칙이 EXCLUDED_COMPONENTS.md 전체에 적용됩니다.

## 5분 안에 시작

Windows 10/11 x64, macOS 또는 Linux, Node.js 22 이상과 manifest의 공개 저장소에 연결할 네트워크가 필요합니다. ZIP을 내려받으면 Git은 필수가 아닙니다.

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

### 로컬 profile 시작

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

첫 실행 후 Settings → Models를 열어 본인의 공급자와 API 키를 추가하고 workspace를 선택하세요. Ultimate는 API 키를 포함하거나 복사하지 않습니다.

## 설치기가 변경하는 내용

설치기는 사용자 profile을 만들고 공식 base와 web-app 레이어를 먼저 둔 뒤 선택된 bundle을 추가합니다. 설치 전후 의존성을 감사하며 자격 증명, 세션, 기존 cordis.patch.yml을 삭제하지 않습니다.

## 개인정보·라이선스·제한

이 저장소에는 manifest, 설치기, 감사 규칙, 문서만 있습니다. 타사 소스, node_modules, API 키, 전화번호, 이메일, 브라우저 세션, 개인 설정을 재배포하지 않습니다.

저장소 코드는 MIT입니다. 내려받은 구성 요소는 MIT, Apache-2.0 또는 BSD-3-Clause 라이선스와 고지를 유지합니다. DSH는 개발자 미리보기이므로 호환성을 깨는 변경이 생길 수 있습니다.

## 검증과 개발

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
