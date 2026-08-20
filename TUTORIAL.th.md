# DeepSeek Harness Ultimate: คู่มือสำหรับผู้เริ่มต้น

คู่มือนี้เขียนสำหรับผู้ที่ไม่เคยใช้ terminal มาก่อน ทำตามลำดับและตรวจสอบทุกขั้นตอนย่อย ไม่ต้องมีความรู้การเขียนโปรแกรม.

**ภาษาของคู่มือ:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · ไทย · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[กลับไปบทแนะนำ](README.th.md)

## 1. สิ่งที่จะติดตั้ง

Ultimate เป็นตัวติดตั้ง profile ไม่ใช่โมเดลหรือ desktop app ทางการของ DeepSeek AI ให้ชุดปลั๊กอินที่ใช้งานจริง ไม่มีซ้ำ ตรวจสอบสัญญาอนุญาตและตรึงเวอร์ชันแล้ว แต่ยังต้องใช้บัญชีโมเดลของคุณเอง.

## 2. การเตรียมและ Node.js

เตรียมคอมพิวเตอร์ที่รองรับ อินเทอร์เน็ตที่เสถียร สิทธิ์ติดตั้งสำหรับบัญชีของคุณ และโฟลเดอร์ง่ายๆ เช่น Documents/DSH-Work ติดตั้ง LTS จาก nodejs.org แล้วปิดและเปิด PowerShell หรือ Terminal ใหม่.

```text
node --version
```

`v22.x.x` หรือ major version ที่สูงกว่าคือสำเร็จ.

## 3. ดาวน์โหลดและติดตั้ง

บน GitHub เลือก Code → Download ZIP แตกไฟล์และเปิดโฟลเดอร์ที่มี package.json, profile, scripts และ windows บน Windows ดับเบิลคลิก windows/install-ultimate.cmd ได้ ส่วน macOS/Linux ใช้คำสั่งด้านล่าง.

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

การติดตั้งสำเร็จจะแสดง `Platform filter: windows`, `Platform filter: macos` หรือ `Platform filter: linux`.

## 4. การเริ่มครั้งแรกและโมเดล

เริ่ม DSH จากโฟลเดอร์ที่ต้องการให้ Agent ทำงาน 127.0.0.1 หมายถึงคอมพิวเตอร์ของคุณเท่านั้น ให้เปิด terminal ทิ้งไว้ จากนั้นเปิด Settings → Models และกรอก provider กับ key เฉพาะในหน้านั้น.

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

## 5. workspace และการทดสอบครั้งแรก

กด Choose workspace เพิ่มและเลือกโฟลเดอร์งาน สร้าง session ใหม่ แล้วส่งก่อนว่า: List the files in this workspace. Do not change anything. ถ้าเห็นไฟล์ถูกต้องและไม่มีข้อผิดพลาดโมเดล แสดงว่าการตั้งค่าพื้นฐานสำเร็จ.

## 6. แอปในเครื่องเดิมและปลั๊กอินทางเลือก

หากมีแอป macOS ในเครื่องที่เริ่ม profile web ให้ปิดแอปและคัดลอก ~/.dsh/profiles/web ก่อนติดตั้งลงที่นั่น cordis.patch.yml จะถูกเก็บไว้ แต่ npm อาจลบปลั๊กอินนอก manifest เปิดใช้โทรศัพท์ IM การแจ้งเตือน และความปลอดภัยหลังอ่าน COMPONENTS.md เท่านั้น.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. ตรวจสอบ อัปเดต ถอนการติดตั้ง และความปลอดภัย

เรียกใช้การตรวจสอบ profile บรรทัดสุดท้ายต้องเป็น Profile dependency integrity: OK ก่อนอัปเดตให้หยุด DSH และสำรอง profile หากต้องการลบ ให้หยุด DSH แล้วนำ ~/.dsh/profiles/ultimate ไปที่ถังขยะ อย่าลบไฟล์สุ่มเมื่อเกิดข้อผิดพลาด และอย่าเผยแพร่ key หรือ token.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

บรรทัดสุดท้ายที่คาดไว้: `Profile dependency integrity: OK`.

## การตรวจสอบสำหรับนักพัฒนา

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

ตัวติดตั้งและ manifest ใช้ MIT ส่วนประกอบที่ดาวน์โหลดคงสัญญาอนุญาต upstream; Ultimate ไม่เปลี่ยนสัญญาอนุญาต.
