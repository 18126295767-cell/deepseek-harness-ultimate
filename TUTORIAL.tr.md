# DeepSeek Harness Ultimate: başlangıç kılavuzu

Bu kılavuz hiç terminal kullanmamış kişileri hedefler. Adımları sırayla izleyin ve her küçük kontrolü yapın; programlama bilmeniz gerekmez.

**Kılavuz dilleri:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · [Español](TUTORIAL.es.md) · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · Türkçe · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Tanıtıma dön](README.tr.md)

## Görsel rehber

Bu ekran görüntüleri oturum, kimlik bilgisi veya özel workspace verisi olmayan temiz profile kaynaklanır. macOS görselleri yerel kabuğu, Windows görselleri gerçek bir Windows runner üzerindeki ortak DSH Web UI’yi gösterir.

![Yerel macOS uygulaması: Geliştirici önizleme bildirimi](assets/screenshots/macos-01-developer-preview.jpg)

*Yerel macOS uygulaması — Geliştirici önizleme bildirimi*

![Yerel macOS uygulaması: Boş API anahtarı kurulumu](assets/screenshots/macos-02-api-key-onboarding.jpg)

*Yerel macOS uygulaması — Boş API anahtarı kurulumu*

![Yerel macOS uygulaması: Boş workspace ana sayfası](assets/screenshots/macos-03-empty-workspace.jpg)

*Yerel macOS uygulaması — Boş workspace ana sayfası*

![Yerel macOS uygulaması: Anahtar alanı boş model ayarları](assets/screenshots/macos-04-model-settings.jpg)

*Yerel macOS uygulaması — Anahtar alanı boş model ayarları*

![Yerel macOS uygulaması: 133 eklentilik envanter](assets/screenshots/macos-05-plugin-inventory.jpg)

*Yerel macOS uygulaması — 133 eklentilik envanter*

![Windows DSH Web UI: Geliştirici önizleme bildirimi](assets/screenshots/windows-01-developer-preview.png)

*Windows DSH Web UI — Geliştirici önizleme bildirimi*

![Windows DSH Web UI: Boş API anahtarı kurulumu](assets/screenshots/windows-02-api-key-onboarding.png)

*Windows DSH Web UI — Boş API anahtarı kurulumu*

![Windows DSH Web UI: Boş workspace ana sayfası](assets/screenshots/windows-03-empty-workspace.png)

*Windows DSH Web UI — Boş workspace ana sayfası*

![Windows DSH Web UI: Anahtar alanı boş model ayarları](assets/screenshots/windows-04-model-settings.png)

*Windows DSH Web UI — Anahtar alanı boş model ayarları*

![Windows DSH Web UI: 133 eklentilik envanter](assets/screenshots/windows-05-plugin-inventory.png)

*Windows DSH Web UI — 133 eklentilik envanter*

## 1. Ne kuruluyor

Ultimate bir profile yükleyicisidir; model veya resmi DeepSeek AI masaüstü uygulaması değildir. Lisansı incelenmiş, sürümü sabitlenmiş, tekrarsız pratik eklenti seçimi sunar; kendi model hesabınızı kullanmanız gerekir.

## 2. Hazırlık ve Node.js

Desteklenen bilgisayar, kararlı internet, hesabınız için yükleme izni ve Documents/DSH-Work gibi basit bir çalışma klasörü hazırlayın. nodejs.org üzerinden LTS kurun, ardından PowerShell veya Terminali kapatıp yeniden açın.

```text
node --version
```

`v22.x.x` veya daha yüksek ana sürüm başarılıdır.

## 3. İndirme ve kurulum

GitHub’da Code → Download ZIP seçin, arşivi açın ve package.json, profile, scripts, windows bulunan klasörü açın. Windows’ta windows/install-ultimate.cmd dosyasına çift tıklayabilirsiniz; macOS/Linux’ta aşağıdaki komutları kullanın.

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

Başarılı kurulum `Platform filter: windows`, `Platform filter: macos` veya `Platform filter: linux` gösterir.

## 4. İlk başlatma ve model

DSH’yi Agent’ın çalışacağı klasörden başlatın. 127.0.0.1 yalnızca kendi bilgisayarınızı ifade eder; terminali açık bırakın. Ardından Settings → Models sayfasını açın ve sağlayıcı ile anahtarı yalnızca o ekrana girin.

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

## 5. Çalışma alanı ve ilk test

Choose workspace düğmesine basın, klasörü ekleyip seçin, yeni oturum oluşturun ve önce şunu gönderin: List the files in this workspace. Do not change anything. Doğru dosyalar görünür ve model hatası olmazsa temel kurulum başarılıdır.

## 6. Mevcut yerel uygulama ve isteğe bağlı eklentiler

web profile başlatan yerel macOS uygulamanız varsa kapatın ve oraya kurmadan önce ~/.dsh/profiles/web kopyasını alın. cordis.patch.yml korunur; ancak npm manifest dışındaki eklentileri kaldırabilir. Telefon, IM, bildirim ve güvenliği yalnız COMPONENTS.md okuduktan sonra etkinleştirin.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 7. Doğrulama, güncelleme, kaldırma ve güvenlik

Profile denetimini çalıştırın; son satır Profile dependency integrity: OK olmalıdır. Güncellemeden önce DSH’yi durdurup profile yedekleyin. Kaldırmak için DSH’yi durdurun ve ~/.dsh/profiles/ultimate klasörünü Çöp Kutusuna taşıyın. Hata sonrası rastgele dosya silmeyin, anahtar veya token yayımlamayın.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Beklenen son satır: `Profile dependency integrity: OK`.

## Geliştirici doğrulaması

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

Yükleyici ve manifest MIT lisanslıdır. İndirilen bileşenler upstream lisanslarını korur; Ultimate yeniden lisanslamaz.
