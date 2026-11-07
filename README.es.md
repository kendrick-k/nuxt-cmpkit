# nuxt-cmpkit

[![npm version](https://img.shields.io/npm/v/nuxt-cmpkit?color=2f6f3e&label=npm)](https://www.npmjs.com/package/nuxt-cmpkit)
[![CI](https://img.shields.io/github/actions/workflow/status/kendrick-k/nuxt-cmpkit/ci.yml?branch=main&label=CI)](https://github.com/kendrick-k/nuxt-cmpkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/nuxt-cmpkit?color=2f6f3e)](https://github.com/kendrick-k/nuxt-cmpkit/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3%20%7C%204-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com)

[English](README.md) · [Français](README.fr.md) · **Español** · [Italiano](README.it.md)

Módulo de Nuxt para [CMPKit](https://cmpkit.com), una **plataforma de gestión del consentimiento (CMP)**: añade un **banner de cookies** conforme al RGPD / ePrivacy y la gestión del consentimiento a tu sitio Nuxt 3 o Nuxt 4 con una sola clave pública, además de un enlace «Configuración de cookies» para el pie de página.

- Banner de cookies y gestión del consentimiento: las categorías, los proveedores y los textos se configuran en el panel de CMPKit, no en el código.
- Añade el `<script>` del widget en el `<head>` desde el servidor: aparece en el primer HTML y se carga una sola vez.
- No hace nada sin clave (ni script, ni botón inactivo): las compilaciones de desarrollo y de vista previa quedan limpias.
- `<CmpkitSettingsLink />` muestra el botón de pie de página al que se enlaza CMPKit (`data-cmpkit="settings"`).
- Idioma, tema y modo estricto opcionales, pasados al widget con atributos `data-*`.
- Sin dependencias aparte de Nuxt. Sin telemetría.

## Instalación

```bash
npx nuxt module add nuxt-cmpkit
```

## Configuración

La clave del sitio es **pública**: está pensada para llegar al navegador, no es un secreto. Dos formas equivalentes:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-cmpkit'],
  cmpkit: { apiKey: 'tu-clave-publica' },
})
```

```bash
# .env (o las variables de entorno de tu proveedor de hosting)
NUXT_PUBLIC_CMPKIT_API_KEY=tu-clave-publica
```

Prefiere la variable de entorno si usas un sitio de CMPKit por entorno (producción, preproducción) o si quieres mantener la clave fuera del repositorio. Sustituye a `cmpkit.apiKey` en tiempo de ejecución. Deja ambas vacías para desactivar el widget. Autoriza tus dominios en el panel de CMPKit.

| Opción | Por defecto | Descripción |
| --- | --- | --- |
| `apiKey` | `''` | Clave pública del sitio. Vacía: el widget no se carga. |
| `scriptUrl` | `https://cmpkit.com/widget.js` | URL del script del widget. |
| `loadStrategy` | `'idle'` | `'idle'` espera a que el navegador esté inactivo, `'auto'` deja decidir al widget. |
| `locale` | `''` | Fuerza el idioma (por ejemplo `es`). Vacío: lo detecta el widget. |
| `theme` | `''` | Fuerza el tema del widget. Vacío: ajuste del panel. |
| `strictMode` | `false` | Añade `data-strict-mode` al script. |

## Enlace «Configuración de cookies»

```vue
<footer>
  <CmpkitSettingsLink />
  <CmpkitSettingsLink label="Gestionar cookies" class="underline" />
</footer>
```

Muestra un `<button data-cmpkit="settings">` solo si hay una clave definida. No tiene estilos: pasa una `class` o usa el slot por defecto para tu propio contenido. `useCmpkit().enabled` indica si el widget está configurado.

## Límites

- El módulo carga el widget; lo que muestra el banner (categorías, proveedores, textos) se configura en el panel de CMPKit.
- La clave se lee en la compilación para el primer HTML y en tiempo de ejecución desde `NUXT_PUBLIC_CMPKIT_API_KEY`; si cambias la variable de entorno, reinicia el servidor.

## Desarrollo

```bash
npm install
npm run dev:prepare
npm run dev        # playground
npm test
npm run prepack
```

## Licencia

MIT

## Del mismo autor

- [CMPKit](https://cmpkit.com): gestión del consentimiento para los sitios que publicas.
- [nuxt-vitals-panel](https://github.com/kendrick-k/nuxt-vitals-panel): panel de Core Web Vitals en vivo para Nuxt.
