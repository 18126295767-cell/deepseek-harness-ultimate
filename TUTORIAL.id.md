# DeepSeek Harness Ultimate: panduan pemula

Panduan ini menganggap Anda belum pernah memakai terminal. Ikuti langkah secara berurutan dan lakukan setiap pemeriksaan; pengetahuan pemrograman tidak diperlukan.

**Bahasa panduan:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · Bahasa Indonesia · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Kembali ke pengantar](README.id.md)

## Panduan visual

Tangkapan ini berasal dari profile bersih tanpa sesi, kredensial, atau data workspace pribadi. Gambar macOS menampilkan shell native; gambar Windows menampilkan DSH Web UI yang sama pada runner Windows nyata.

![Aplikasi native macOS: Pemberitahuan pratinjau pengembang](assets/screenshots/macos-01-developer-preview.jpg)

*Aplikasi native macOS — Pemberitahuan pratinjau pengembang*

![Aplikasi native macOS: Onboarding API key kosong](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Aplikasi native macOS — Onboarding API key kosong*

![Aplikasi native macOS: Beranda tanpa workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Aplikasi native macOS — Beranda tanpa workspace*

![Aplikasi native macOS: Pengaturan model dengan kolom kunci kosong](assets/screenshots/macos-04-model-settings.jpg)

*Aplikasi native macOS — Pengaturan model dengan kolom kunci kosong*

![Aplikasi native macOS: Inventaris 133 plugin](assets/screenshots/macos-05-plugin-inventory.jpg)

*Aplikasi native macOS — Inventaris 133 plugin*

![DSH Web UI Windows: Pemberitahuan pratinjau pengembang](assets/screenshots/windows-01-developer-preview.png)

*DSH Web UI Windows — Pemberitahuan pratinjau pengembang*

![DSH Web UI Windows: Onboarding API key kosong](assets/screenshots/windows-02-api-key-onboarding.png)

*DSH Web UI Windows — Onboarding API key kosong*

![DSH Web UI Windows: Beranda tanpa workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI Windows — Beranda tanpa workspace*

![DSH Web UI Windows: Pengaturan model dengan kolom kunci kosong](assets/screenshots/windows-04-model-settings.png)

*DSH Web UI Windows — Pengaturan model dengan kolom kunci kosong*

![DSH Web UI Windows: Inventaris 133 plugin](assets/screenshots/windows-05-plugin-inventory.png)

*DSH Web UI Windows — Inventaris 133 plugin*

## 1. Yang akan dipasang

Ultimate adalah installer profile, bukan model atau aplikasi desktop resmi DeepSeek AI. Ia menyediakan pilihan plugin praktis tanpa duplikasi, dengan lisensi diperiksa dan versi dikunci; Anda tetap memerlukan akun model sendiri.

## 2. Persiapan dan Node.js

Siapkan komputer yang didukung, internet stabil, izin memasang untuk akun Anda dan folder kerja sederhana seperti Documents/DSH-Work. Pasang LTS dari nodejs.org lalu tutup dan buka kembali PowerShell atau Terminal.

```text
node --version
```

`v22.x.x` atau versi mayor lebih tinggi berarti berhasil.

## 3. Mengunduh dan memasang

Di GitHub pilih Code → Download ZIP, ekstrak dan buka folder berisi package.json, profile, scripts dan windows. Di Windows Anda dapat klik dua kali windows/install-ultimate.cmd; di macOS/Linux gunakan perintah di bawah.

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

Pemasangan berhasil menampilkan `Platform filter: windows`, `Platform filter: macos` atau `Platform filter: linux`.

## 4. Mulai pertama dan model

Jalankan DSH dari folder tempat Agent harus bekerja. 127.0.0.1 hanya berarti komputer Anda sendiri; biarkan terminal tetap terbuka. Kemudian buka Settings → Models dan masukkan provider serta kunci hanya di layar itu.

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

## 5. Workspace dan tes pertama

Tekan Choose workspace, tambah dan pilih folder kerja, buat sesi baru dan kirim dahulu: List the files in this workspace. Do not change anything. Jika file yang benar tampil tanpa kesalahan model, pengaturan dasar berhasil.

## 6. Aplikasi lokal yang ada dan plugin opsional

Jika sudah memiliki aplikasi macOS lokal yang menjalankan profile web, tutup dan salin ~/.dsh/profiles/web sebelum memasang di sana. cordis.patch.yml dipertahankan, tetapi npm dapat menghapus plugin di luar manifest. Aktifkan telepon, IM, notifikasi dan keamanan hanya setelah membaca COMPONENTS.md.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Memeriksa, memperbarui, menghapus dan tetap aman

Jalankan audit profile; baris terakhir harus Profile dependency integrity: OK. Sebelum memperbarui, hentikan DSH dan cadangkan profile. Untuk menghapus, hentikan DSH dan pindahkan ~/.dsh/profiles/ultimate ke Sampah. Jangan hapus file acak saat gagal dan jangan pernah menerbitkan kunci atau token.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Baris akhir yang diharapkan: `Profile dependency integrity: OK`.

## Verifikasi pengembang

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Installer dan manifest menggunakan MIT. Komponen unduhan mempertahankan lisensi upstream; Ultimate tidak melisensikan ulang.
