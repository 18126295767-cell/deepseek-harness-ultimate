# DeepSeek Harness Ultimate: guía para principiantes

Esta guía supone que nunca has usado una terminal. Sigue los pasos en orden y completa cada comprobación; no necesitas saber programar.

**Idiomas del tutorial:** [English](TUTORIAL.md) · [简体中文](TUTORIAL.zh-CN.md) · [繁體中文](TUTORIAL.zh-TW.md) · Español · [Français](TUTORIAL.fr.md) · [Deutsch](TUTORIAL.de.md) · [Português (Brasil)](TUTORIAL.pt-BR.md) · [Русский](TUTORIAL.ru.md) · [日本語](TUTORIAL.ja.md) · [한국어](TUTORIAL.ko.md) · [العربية](TUTORIAL.ar.md) · [हिन्दी](TUTORIAL.hi.md) · [Italiano](TUTORIAL.it.md) · [Bahasa Indonesia](TUTORIAL.id.md) · [Türkçe](TUTORIAL.tr.md) · [Tiếng Việt](TUTORIAL.vi.md) · [ไทย](TUTORIAL.th.md) · [Polski](TUTORIAL.pl.md) · [Nederlands](TUTORIAL.nl.md) · [Українська](TUTORIAL.uk.md)

[Volver a la introducción](README.es.md)

## 1. Qué vas a instalar

Ultimate es un instalador de profiles, no un modelo ni una aplicación oficial de DeepSeek AI. Proporciona un conjunto práctico sin duplicados, con licencias revisadas y versiones fijadas; debes aportar tu propia cuenta de modelo.

## 2. Preparación

Prepara un equipo compatible, internet estable, permiso para instalar en tu cuenta y una carpeta sencilla como Documents/DSH-Work. La primera instalación suele tardar entre 15 y 40 minutos.

## 3. Instalar y comprobar Node.js

Visita nodejs.org, instala la versión LTS con las opciones predeterminadas, cierra y vuelve a abrir PowerShell o Terminal y ejecuta la comprobación de versión. Un resultado v22 o superior es correcto.

```text
node --version
```

Un resultado `v22.x.x` o una versión principal superior es correcto.

## 4. Descargar Ultimate

En GitHub selecciona Code → Download ZIP, extrae y abre deepseek-harness-ultimate-main. La carpeta correcta contiene package.json, profile, scripts y windows. También puedes usar git clone.

```bash
git clone https://github.com/18126295767-cell/deepseek-harness-ultimate.git
cd deepseek-harness-ultimate
```

## 5. Instalar el profile

En Windows haz doble clic en windows/install-ultimate.cmd o usa PowerShell. En macOS/Linux escribe cd y un espacio, arrastra la carpeta a Terminal, pulsa Intro y ejecuta la auditoría y la instalación. No cierres la ventana durante la descarga.

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

La instalación correcta muestra `Platform filter: windows`, `Platform filter: macos` o `Platform filter: linux`.

## 6. Primer inicio

Antes de iniciar, entra en la carpeta donde quieres que trabaje el Agent y ejecuta el comando del profile. 127.0.0.1 significa únicamente tu equipo. Mantén la terminal abierta y usa Ctrl+C para detener el servicio.

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

## 7. Conectar el modelo con seguridad

En Settings → Models selecciona un proveedor que controles e introduce la clave solo en la pantalla de DSH. No la escribas en package.json, cordis.patch.yml, capturas ni issues públicos.

## 8. Elegir workspace y probar

Pulsa Choose workspace, añade y selecciona tu carpeta, crea una sesión y pide primero que enumere archivos sin modificarlos. Si ve la carpeta correcta y no falta un modelo, la instalación básica funciona.

```text
List the files in this workspace. Do not change anything.
```

## 9. Usar una app local existente

Si ya tienes una app local de macOS que inicia el profile web, ciérrala y copia ~/.dsh/profiles/web antes de instalar allí. Se conserva cordis.patch.yml, pero npm puede quitar plugins fuera del manifest de Ultimate.

```bash
node scripts/install-ultimate.mjs --profile-dir "$HOME/.dsh/profiles/web"
open -a "DeepSeek Harness"
```

## 10. Integraciones opcionales

Las integraciones de teléfono, IM, avisos y seguridad no vienen activadas. Lee COMPONENTS.md y añade solo lo necesario; Ultimate no configura números, correo, bot tokens ni permisos del sistema.

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 11. Verificar la instalación

Ejecuta la auditoría del profile instalado. La última línea debe decir Profile dependency integrity: OK. Si falla, no borres archivos al azar: actualiza o quita el plugin nombrado en el informe.

```bash
node scripts/audit-installed-profile.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

Última línea esperada: `Profile dependency integrity: OK`.

## 12. Actualizar con seguridad

Para actualizar, detén DSH, guarda una copia del profile, obtén la fuente nueva, revisa los cambios de componentes, reinstala, audita y prueba en una sesión nueva. No reutilices una sesión cortada a mitad de una llamada de herramienta.

## 13. Desinstalar o restaurar

Para desinstalar, detén DSH y mueve ~/.dsh/profiles/ultimate a la Papelera con el administrador de archivos. El runtime, las credenciales y otros profiles permanecen. Para volver atrás, restaura la copia con su nombre original.

## 14. Problemas comunes

Problemas comunes: reinstala Node LTS y abre otra terminal si no existe node; entra en la carpeta correcta si falta install-ultimate.mjs; reintenta tras arreglar la red; detén el DSH anterior si el puerto 3080 está ocupado; configura modelo y workspace si no puedes enviar.

## 15. Seguridad y privacidad

Usa claves propias y revocables. Revisa cada plugin antes de conceder accesibilidad, micrófono, avisos o automatización. Usa habilidades de ingeniería inversa solo con autorización y conserva los avisos ascendentes al redistribuir.

## 16. Verificación para desarrolladores

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```

El instalador y el manifest usan MIT. Los componentes descargados conservan sus licencias originales; Ultimate no vuelve a licenciarlos.
