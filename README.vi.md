# DeepSeek Harness Ultimate

**DeepSeek Harness hiện có quá nhiều plugin để có thể bình tĩnh so sánh từng cái. Ultimate đã kiểm tra giấy phép, cố định phiên bản, loại bỏ trùng lặp và sắp xếp các lựa chọn hữu ích để bạn bắt đầu ngay mà không lo lắng khi lựa chọn.**

> Profile DSH được tuyển chọn và có thể tái lập, bao phủ gần như mọi nhóm khả năng thực tế: đội lập trình, workflow, bảo mật, nghiên cứu và tự động hóa hằng ngày.

**Ngôn ngữ:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · Tiếng Việt · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: hướng dẫn cho người mới](TUTORIAL.vi.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Hướng dẫn trực quan

Ảnh chụp lấy từ profile sạch, không có session, thông tin xác thực hay dữ liệu workspace riêng. Ảnh macOS cho thấy shell gốc; ảnh Windows cho thấy cùng DSH Web UI trên runner Windows thật.

![Ứng dụng macOS gốc: Trang chủ chưa có workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Ứng dụng macOS gốc — Trang chủ chưa có workspace*

![DSH Web UI trên Windows: Trang chủ chưa có workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI trên Windows — Trang chủ chưa có workspace*

## Vì sao có Ultimate

Hệ sinh thái DSH phát triển rất nhanh. So sánh chức năng, giấy phép, phiên bản, quyền và phần chồng chéo của hàng chục kho đã là một công việc. Ultimate ghi lại lựa chọn có thể kiểm tra trong manifest công khai.

- Mỗi vai trò chồng chéo chỉ có một mặc định đã duyệt; phiên bản upstream được ghim bằng commit đủ 40 ký tự; chỉ nhận MIT, Apache-2.0 hoặc BSD-3-Clause đã ghi; kiểm tra phụ thuộc trước và sau; tích hợp nhạy cảm vẫn tùy chọn.

“Gần như mọi nhóm thực tế” không có nghĩa mọi plugin từng phát hành. Ultimate do cộng đồng duy trì, không phải bản chính thức của DeepSeek AI; tác giả upstream giữ quyền sở hữu và giấy phép.

## Những gì đã được chọn

- Công việc mã lớn: đội Agent, đợt phụ thuộc, cách ly Git worktree, lập kế hoạch và kiểm tra.
- Workflow và độ tin cậy: luồng tái sử dụng, lịch, đánh thức theo điều kiện, sao lưu, bộ nhớ và quy tắc.
- Năng suất: dấu trang, tiếp tục tự động, skill thiết kế và Spotlight.
- Thông báo, IM, gọi điện và nghiên cứu bảo mật được ủy quyền là tùy chọn.

TaskSwarm đã bao phủ đợt phụ thuộc và cách ly Git worktree, vì vậy Captain là lựa chọn thay thế chứ không phải mặc định trùng lặp. Quy tắc tương tự áp dụng trong EXCLUDED_COMPONENTS.md.

## Bắt đầu trong năm phút

Cần Windows 10/11 x64, macOS hoặc Linux, Node.js 22 trở lên và mạng tới các kho công khai trong manifest. Git không bắt buộc khi dùng ZIP.

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

### Khởi động profile cục bộ

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Sau lần khởi động đầu, mở Settings → Models, thêm nhà cung cấp và khóa API của bạn rồi chọn workspace. Ultimate không bao giờ chứa hoặc sao chép khóa.

## Trình cài đặt thay đổi gì

Trình cài đặt tạo profile thuộc người dùng, đặt các lớp base và web-app chính thức trước rồi thêm bundle đã chọn. Nó kiểm tra phụ thuộc trước và sau mà không xóa thông tin xác thực, phiên hay cordis.patch.yml hiện có.

## Riêng tư, giấy phép và giới hạn

Kho này chứa manifest, trình cài đặt, quy tắc kiểm tra và tài liệu. Nó không phân phối lại mã bên thứ ba, node_modules, khóa API, số điện thoại, email, phiên trình duyệt hay cấu hình riêng tư.

Mã kho dùng MIT. Thành phần tải về giữ giấy phép và thông báo MIT, Apache-2.0 hoặc BSD-3-Clause. DSH vẫn là bản xem trước cho nhà phát triển và có thể thay đổi không tương thích.

## Xác minh và phát triển

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
