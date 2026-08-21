# DeepSeek Harness Ultimate: hướng dẫn cho người mới

Hướng dẫn này dành cho người chưa từng dùng terminal. Hãy làm theo thứ tự và thực hiện từng kiểm tra nhỏ; không cần biết lập trình.

**Ngôn ngữ hướng dẫn:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · Tiếng Việt · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Quay lại giới thiệu](README.vi.md)

## Hướng dẫn trực quan

Ảnh chụp lấy từ profile sạch, không có session, thông tin xác thực hay dữ liệu workspace riêng. Ảnh macOS cho thấy shell gốc; ảnh Windows cho thấy cùng DSH Web UI trên runner Windows thật.

![Ứng dụng macOS gốc: Thông báo bản xem trước](assets/screenshots/macos-01-developer-preview.jpg)

*Ứng dụng macOS gốc — Thông báo bản xem trước*

![Ứng dụng macOS gốc: Thiết lập API key trống](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Ứng dụng macOS gốc — Thiết lập API key trống*

![Ứng dụng macOS gốc: Trang chủ chưa có workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Ứng dụng macOS gốc — Trang chủ chưa có workspace*

![Ứng dụng macOS gốc: Cài đặt model với ô khóa trống](assets/screenshots/macos-04-model-settings.jpg)

*Ứng dụng macOS gốc — Cài đặt model với ô khóa trống*

![Ứng dụng macOS gốc: Danh mục 133 plugin](assets/screenshots/macos-05-plugin-inventory.jpg)

*Ứng dụng macOS gốc — Danh mục 133 plugin*

![DSH Web UI trên Windows: Thông báo bản xem trước](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI trên Windows — Thông báo bản xem trước*

![DSH Web UI trên Windows: Thiết lập API key trống](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI trên Windows — Thiết lập API key trống*

![DSH Web UI trên Windows: Trang chủ chưa có workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI trên Windows — Trang chủ chưa có workspace*

![DSH Web UI trên Windows: Cài đặt model với ô khóa trống](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI trên Windows — Cài đặt model với ô khóa trống*

![DSH Web UI trên Windows: Danh mục 133 plugin](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI trên Windows — Danh mục 133 plugin*

## 1. Sẽ cài đặt gì

Ultimate là trình cài đặt profile, không phải mô hình hay ứng dụng desktop chính thức của DeepSeek AI. Nó cung cấp bộ plugin thực tế không trùng lặp, đã kiểm tra giấy phép và cố định phiên bản; bạn vẫn cần tài khoản mô hình của mình.

## 2. Chuẩn bị và Node.js

Chuẩn bị máy tính được hỗ trợ, internet ổn định, quyền cài đặt cho tài khoản và thư mục đơn giản như Documents/DSH-Work. Cài LTS tại nodejs.org rồi đóng và mở lại PowerShell hoặc Terminal.

```text
node --version
```

`v22.x.x` hoặc phiên bản chính cao hơn là thành công.

## 3. Tải xuống và cài đặt

Trên GitHub chọn Code → Download ZIP, giải nén và mở thư mục có package.json, profile, scripts, windows. Windows có thể nhấp đúp windows/install-ultimate.cmd; macOS/Linux dùng lệnh bên dưới.

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

Cài đặt thành công hiển thị `Platform filter: windows`, `Platform filter: macos` hoặc `Platform filter: linux`.

## 4. Lần khởi động đầu và mô hình

Khởi động DSH từ thư mục Agent sẽ làm việc. 127.0.0.1 chỉ là máy tính của bạn; giữ terminal mở. Sau đó mở Settings → Models và chỉ nhập nhà cung cấp cùng khóa ở màn hình đó.

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

## 5. Workspace và kiểm tra đầu tiên

Nhấn Choose workspace, thêm và chọn thư mục làm việc, tạo phiên mới và gửi trước: List the files in this workspace. Do not change anything. Nếu thấy đúng tệp và không có lỗi mô hình, thiết lập cơ bản thành công.

## 6. Ứng dụng cục bộ hiện có và plugin tùy chọn

Nếu đã có ứng dụng macOS cục bộ chạy profile web, hãy thoát và sao chép ~/.dsh/profiles/web trước khi cài vào đó. cordis.patch.yml được giữ lại nhưng npm có thể gỡ plugin ngoài manifest. Chỉ bật điện thoại, IM, thông báo và bảo mật sau khi đọc COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Xác minh, cập nhật, gỡ bỏ và an toàn

Chạy kiểm tra profile; dòng cuối phải là Profile dependency integrity: OK. Trước khi cập nhật hãy dừng DSH và sao lưu profile. Để gỡ, dừng DSH rồi chuyển ~/.dsh/profiles/ultimate vào Thùng rác. Không xóa tệp ngẫu nhiên khi lỗi và không bao giờ công khai khóa hoặc token.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Dòng cuối dự kiến: `Profile dependency integrity: OK`.

## Xác minh cho nhà phát triển

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Trình cài đặt và manifest dùng MIT. Thành phần tải về giữ giấy phép upstream; Ultimate không cấp lại giấy phép.
