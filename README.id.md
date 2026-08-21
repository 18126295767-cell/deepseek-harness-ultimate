# DeepSeek Harness Ultimate

**DeepSeek Harness kini memiliki terlalu banyak plugin untuk dibandingkan satu per satu dengan tenang. Ultimate sudah memeriksa lisensi, mengunci versi, menghapus duplikasi, dan menyusun pilihan berguna sehingga Anda dapat langsung bekerja tanpa kecemasan memilih.**

> Profile DSH terkurasi dan dapat direproduksi untuk hampir semua kategori praktis: tim coding, workflow, keamanan, riset, dan otomatisasi harian.

**Bahasa:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · Bahasa Indonesia · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: panduan pemula](TUTORIAL.id.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Panduan visual

Tangkapan ini berasal dari profile bersih tanpa sesi, kredensial, atau data workspace pribadi. Gambar macOS menampilkan shell native; gambar Windows menampilkan DSH Web UI yang sama pada runner Windows nyata.

![Aplikasi native macOS: Beranda tanpa workspace](assets/screenshots/macos-03-empty-workspace.jpg)

*Aplikasi native macOS — Beranda tanpa workspace*

![DSH Web UI Windows: Beranda tanpa workspace](assets/screenshots/windows-03-empty-workspace.png)

*DSH Web UI Windows — Beranda tanpa workspace*

## Mengapa Ultimate dibuat

Ekosistem DSH tumbuh cepat. Membandingkan fungsi, lisensi, versi, izin, dan tumpang tindih dari puluhan repositori adalah pekerjaan tersendiri. Ultimate mencatat pilihan yang dapat diaudit dalam manifest publik.

- Satu default yang ditinjau dipilih untuk tiap peran tumpang tindih; versi upstream dikunci dengan commit penuh 40 karakter; hanya lisensi MIT, Apache-2.0 atau BSD-3-Clause yang tercatat; dependensi diperiksa sebelum dan sesudah; integrasi sensitif tetap opsional.

“Hampir semua kategori praktis” bukan berarti semua plugin yang pernah diterbitkan. Ultimate dikelola komunitas dan bukan rilis resmi DeepSeek AI; penulis upstream mempertahankan kepemilikan dan lisensi.

## Yang sudah dipilih

- Pekerjaan kode besar: tim Agent, gelombang dependensi, isolasi Git worktree, perencanaan dan verifikasi.
- Workflow dan keandalan: alur yang dapat digunakan kembali, jadwal, pemicu bersyarat, cadangan, memori dan aturan.
- Produktivitas: bookmark, lanjut otomatis, skill desain dan Spotlight.
- Notifikasi, IM, telepon dan riset keamanan berizin tetap opsional.

TaskSwarm sudah mencakup gelombang dependensi dan isolasi Git worktree; Captain tetap sebagai alternatif, bukan default duplikat. Aturan yang sama berlaku di EXCLUDED_COMPONENTS.md.

## Mulai dalam lima menit

Diperlukan Windows 10/11 x64, macOS atau Linux, Node.js 22 atau lebih baru, serta akses jaringan ke repositori publik dalam manifest. Git tidak wajib bila menggunakan ZIP.

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

### Mulai profile lokal

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Setelah mulai pertama, buka Settings → Models, tambahkan provider dan kunci API Anda lalu pilih workspace. Ultimate tidak pernah menyertakan atau menyalin kunci.

## Yang diubah installer

Installer membuat profile milik pengguna, menempatkan layer resmi base dan web-app lebih dahulu lalu bundle terpilih. Dependensi diaudit sebelum dan sesudah pemasangan tanpa menghapus kredensial, sesi atau cordis.patch.yml yang ada.

## Privasi, lisensi dan batasan

Repositori ini berisi manifest, installer, aturan audit dan dokumentasi. Ia tidak mendistribusikan ulang kode pihak ketiga, node_modules, kunci API, nomor telepon, email, sesi browser atau konfigurasi pribadi.

Kode repositori menggunakan MIT. Komponen unduhan mempertahankan lisensi dan pemberitahuan MIT, Apache-2.0 atau BSD-3-Clause. DSH masih pratinjau pengembang dan dapat mengalami perubahan yang memutus kompatibilitas.

## Verifikasi dan pengembangan

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
