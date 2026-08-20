# DeepSeek Harness Ultimate

**DeepSeek Harness artık tek tek sakin biçimde karşılaştırılamayacak kadar çok eklenti içeriyor. Ultimate lisansları denetledi, sürümleri sabitledi, tekrarları kaldırdı ve faydalı seçenekleri düzenledi; seçim kaygısı yaşamadan hemen çalışmaya başlayabilirsiniz.**

> Kodlama ekipleri, iş akışları, güvenlik, araştırma ve günlük otomasyon dahil neredeyse tüm pratik kategorileri kapsayan, yeniden üretilebilir seçilmiş DSH profili.

**Diller:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · Türkçe · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: başlangıç kılavuzu](TUTORIAL.tr.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Ultimate neden var

DSH ekosistemi hızla büyüyor. Onlarca deponun özelliklerini, lisanslarını, sürümlerini, izinlerini ve örtüşmelerini karşılaştırmak başlı başına iştir. Ultimate denetlenebilir seçimi herkese açık bir manifestte kaydeder.

- Örtüşen her rol için incelenmiş tek bir varsayılan seçilir; upstream sürümleri tam 40 karakterli commit ile sabitlenir; yalnızca kayıtlı MIT, Apache-2.0 veya BSD-3-Clause alınır; bağımlılıklar önce ve sonra denetlenir; hassas entegrasyonlar isteğe bağlı kalır.

“Neredeyse tüm pratik kategoriler” yayımlanmış her eklenti anlamına gelmez. Ultimate topluluk tarafından yönetilir ve resmi DeepSeek AI sürümü değildir; upstream yazarları sahiplik ve lisanslarını korur.

## Önceden seçilenler

- Büyük kod işleri: Agent ekipleri, bağımlılık dalgaları, Git worktree yalıtımı, planlama ve doğrulama.
- İş akışı ve güvenilirlik: yeniden kullanılabilir akışlar, zamanlama, koşullu uyandırma, yedekler, bellek ve kurallar.
- Üretkenlik: yer imleri, otomatik devam, tasarım skillleri ve Spotlight.
- Bildirimler, IM, aramalar ve yetkili güvenlik araştırması isteğe bağlıdır.

TaskSwarm bağımlılık dalgalarını ve Git worktree yalıtımını zaten kapsar; Captain yinelenen varsayılan yerine alternatif olarak kalır. Aynı kural EXCLUDED_COMPONENTS.md genelinde geçerlidir.

## Beş dakikada başlangıç

Windows 10/11 x64, macOS veya Linux, Node.js 22 ya da daha yenisi ve manifestteki herkese açık depolara ağ erişimi gerekir. ZIP indirildiğinde Git zorunlu değildir.

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

### Yerel profile başlatma

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

İlk başlatmadan sonra Settings → Models sayfasını açın, kendi sağlayıcınızı ve API anahtarınızı ekleyip workspace seçin. Ultimate anahtar içermez veya kopyalamaz.

## Yükleyicinin değiştirdikleri

Yükleyici kullanıcıya ait bir profile oluşturur; önce resmi base ve web-app katmanlarını, ardından seçilen bundleları koyar. Kimlik bilgilerini, oturumları veya mevcut cordis.patch.yml dosyasını silmeden bağımlılıkları önce ve sonra denetler.

## Gizlilik, lisanslar ve sınırlar

Depo manifest, yükleyici, denetim kuralları ve belgeleri içerir. Üçüncü taraf kaynak kodu, node_modules, API anahtarları, telefonlar, e-postalar, tarayıcı oturumları veya özel yapılandırma yeniden dağıtılmaz.

Depo kodu MIT lisanslıdır. İndirilen bileşenler MIT, Apache-2.0 veya BSD-3-Clause lisanslarını ve bildirimlerini korur. DSH geliştirici önizlemesidir ve uyumsuz değişiklikler yapabilir.

## Doğrulama ve geliştirme

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
