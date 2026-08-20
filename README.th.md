# DeepSeek Harness Ultimate

**DeepSeek Harness มีปลั๊กอินมากเกินกว่าจะเปรียบเทียบทีละตัวได้อย่างสบายใจแล้ว Ultimate ตรวจสอบสัญญาอนุญาต ตรึงเวอร์ชัน ตัดของซ้ำ และจัดตัวเลือกที่มีประโยชน์ไว้ให้ เพื่อให้คุณเริ่มทำงานได้ทันทีโดยไม่ต้องกังวลเรื่องการเลือก.**

> profile DSH ที่คัดสรรและทำซ้ำได้ ครอบคลุมเกือบทุกหมวดความสามารถที่ใช้งานจริง: ทีมเขียนโค้ด workflow ความปลอดภัย งานวิจัย และระบบอัตโนมัติประจำวัน.

**ภาษา:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · ไทย · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: คู่มือสำหรับผู้เริ่มต้น](TUTORIAL.th.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## เหตุผลที่มี Ultimate

ระบบนิเวศ DSH เติบโตเร็วมาก การเปรียบเทียบความสามารถ สัญญาอนุญาต เวอร์ชัน สิทธิ์ และส่วนที่ซ้ำกันจากหลายสิบ repository เป็นงานในตัวเอง Ultimate บันทึกตัวเลือกที่ตรวจสอบได้ใน manifest สาธารณะ.

- เลือกค่าเริ่มต้นที่ตรวจสอบแล้วหนึ่งรายการต่อบทบาทที่ซ้ำกัน ตรึงเวอร์ชัน upstream ด้วย commit ครบ 40 ตัว รับเฉพาะ MIT, Apache-2.0 หรือ BSD-3-Clause ที่บันทึกไว้ ตรวจ dependency ก่อนและหลัง และคง integration ที่อ่อนไหวเป็นตัวเลือก.

“เกือบทุกหมวดที่ใช้งานจริง” ไม่ได้หมายถึงปลั๊กอินทุกตัวที่เคยเผยแพร่ Ultimate ดูแลโดยชุมชนและไม่ใช่รุ่นทางการของ DeepSeek AI ผู้เขียน upstream ยังคงสิทธิ์และสัญญาอนุญาต.

## สิ่งที่เลือกไว้แล้ว

- งานโค้ดขนาดใหญ่: ทีม Agent, dependency waves, Git worktree isolation, การวางแผนและตรวจสอบ.
- workflow และความเชื่อถือได้: ขั้นตอนใช้ซ้ำ ตารางเวลา การปลุกตามเงื่อนไข สำรองข้อมูล ความจำ และกฎ.
- ประสิทธิภาพ: bookmark, ต่ออัตโนมัติ, design skills และ Spotlight.
- การแจ้งเตือน IM โทรศัพท์ และงานวิจัยความปลอดภัยที่ได้รับอนุญาตเป็นตัวเลือก.

TaskSwarm ครอบคลุม dependency waves และ Git worktree isolation แล้ว จึงเก็บ Captain เป็นทางเลือก ไม่ใช่ค่าเริ่มต้นซ้ำ หลักเดียวกันใช้ทั่ว EXCLUDED_COMPONENTS.md.

## เริ่มในห้านาที

ต้องใช้ Windows 10/11 x64, macOS หรือ Linux, Node.js 22 ขึ้นไป และเครือข่ายไปยัง repository สาธารณะใน manifest หากดาวน์โหลด ZIP ไม่จำเป็นต้องมี Git.

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

### เริ่ม profile ในเครื่อง

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

หลังเริ่มครั้งแรก เปิด Settings → Models เพิ่ม provider และ API key ของคุณ แล้วเลือก workspace Ultimate ไม่รวมและไม่คัดลอก key.

## สิ่งที่ตัวติดตั้งเปลี่ยน

ตัวติดตั้งสร้าง profile ของผู้ใช้ วาง layer base และ web-app ทางการก่อน แล้วจึงเพิ่ม bundle ที่เลือก ตรวจสอบ dependency ก่อนและหลังติดตั้งโดยไม่ลบข้อมูลรับรอง session หรือ cordis.patch.yml ที่มีอยู่.

## ความเป็นส่วนตัว สัญญาอนุญาต และข้อจำกัด

repository นี้มี manifest ตัวติดตั้ง กฎตรวจสอบ และเอกสารเท่านั้น ไม่แจกจ่าย source ของบุคคลที่สาม node_modules API key โทรศัพท์ อีเมล browser session หรือการตั้งค่าส่วนตัว.

โค้ด repository ใช้ MIT ส่วนประกอบที่ดาวน์โหลดยังคงสัญญาอนุญาตและประกาศ MIT, Apache-2.0 หรือ BSD-3-Clause DSH ยังเป็น developer preview และอาจเปลี่ยนจนไม่เข้ากัน.

## การตรวจสอบและพัฒนา

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
