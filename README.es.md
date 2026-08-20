# DeepSeek Harness Ultimate

**DeepSeek Harness ya tiene más plugins de los que una persona puede comparar con calma. Ultimate ya revisó licencias, fijó versiones, eliminó duplicados y ordenó las opciones útiles para que puedas empezar sin ansiedad de elección.**

> Un perfil DSH reproducible y seleccionado que cubre casi todas las categorías prácticas: equipos de programación, flujos de trabajo, seguridad, investigación y automatización diaria.

**Idiomas:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · Español · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [Italiano](README.it.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Українська](README.uk.md)

[DeepSeek Harness Ultimate: guía para principiantes](TUTORIAL.es.md) · [Windows](windows/README.md) · [COMPONENTS](COMPONENTS.md) · [EXCLUDED_COMPONENTS](EXCLUDED_COMPONENTS.md)

## Por qué existe Ultimate

El ecosistema DSH crece rápido. Comparar funciones, licencias, versiones, permisos y solapamientos de decenas de repositorios es un trabajo en sí mismo. Ultimate registra una selección auditable en un manifest público.

- Una implementación sólida por función solapada.
- Commits ascendentes exactos de 40 caracteres.
- Solo licencias MIT, Apache-2.0 o BSD-3-Clause registradas.
- Comprobación antes de instalar y auditoría del árbol real después.
- Integraciones con cuentas, credenciales o permisos separadas como opcionales.

«Casi todas las categorías prácticas» no significa todos los plugins publicados. Ultimate es comunitario, no una versión oficial de DeepSeek AI; cada autor conserva la propiedad y licencia de su proyecto.

## Qué se ha elegido

- Código a gran escala: equipos Agent, oleadas de dependencias, aislamiento Git worktree, planificación y verificación.
- Flujos y fiabilidad: workflows reutilizables, horarios, activación condicional, copias de seguridad, memoria y reglas.
- Productividad: marcadores, continuación automática, habilidades de diseño y Spotlight.
- Notificaciones, IM, llamadas y seguridad autorizada solo se instalan por decisión explícita.

TaskSwarm ya cubre las oleadas de dependencias y el aislamiento Git worktree, por lo que Captain queda como alternativa y no como valor predeterminado duplicado. La misma regla se aplica en EXCLUDED_COMPONENTS.md.

## Inicio en cinco minutos

Necesitas Windows 10/11 x64, macOS o Linux, Node.js 22 o superior y acceso de red a los repositorios públicos del manifest. Git no es obligatorio si descargas el ZIP.

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

### Iniciar el profile local

```text
npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate
```

Tras el primer inicio, abre Settings → Models, añade tu propio proveedor y clave API, y elige un workspace. Ultimate nunca incluye ni copia claves.

## Qué cambia el instalador

El instalador crea un profile del usuario, coloca primero las capas oficiales base y web-app y luego los bundles seleccionados. Audita dependencias antes y después sin borrar credenciales, sesiones ni un cordis.patch.yml existente.

## Privacidad, licencias y límites

El repositorio contiene el manifest, el instalador, las reglas de auditoría y la documentación. No redistribuye código de terceros, node_modules, claves, teléfonos, correos, sesiones del navegador ni configuración privada.

El código del repositorio usa MIT. Los componentes descargados conservan sus licencias y avisos MIT, Apache-2.0 o BSD-3-Clause. DSH sigue en vista previa y puede introducir cambios incompatibles.

## Verificación y desarrollo

```bash
npm ci --ignore-scripts
npm test
npm run audit
git diff --check
```
