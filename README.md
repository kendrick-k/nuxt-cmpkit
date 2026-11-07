# nuxt-cmpkit

[![npm version](https://img.shields.io/npm/v/nuxt-cmpkit?color=2f6f3e&label=npm)](https://www.npmjs.com/package/nuxt-cmpkit)
[![CI](https://img.shields.io/github/actions/workflow/status/kendrick-k/nuxt-cmpkit/ci.yml?branch=main&label=CI)](https://github.com/kendrick-k/nuxt-cmpkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/nuxt-cmpkit?color=2f6f3e)](https://github.com/kendrick-k/nuxt-cmpkit/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3%20%7C%204-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com)

Install the [CMPKit](https://cmpkit.com) consent widget in a Nuxt app with one public key.

- Adds the widget `<script>` to `<head>` on the server, so it is in the first HTML and loaded once.
- Does nothing without a key (no script, no dead button), so dev and preview builds stay clean.
- `<CmpkitSettingsLink />` renders the footer button CMPKit binds to (`data-cmpkit="settings"`).
- Optional language, theme and strict mode, passed to the widget as `data-*` attributes.
- No dependency besides Nuxt. No telemetry.

## Install

```bash
npx nuxt module add nuxt-cmpkit
```

## Configure

The site key is **public**: it is meant to be served to the browser, so it is not a secret. Two equivalent ways:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-cmpkit'],
  cmpkit: { apiKey: 'your-public-site-key' },
})
```

```bash
# .env (or your host's environment variables)
NUXT_PUBLIC_CMPKIT_API_KEY=your-public-site-key
```

Prefer the environment variable when you use one CMPKit site per environment (production, preview), or when you want the key out of the repository. The variable overrides `cmpkit.apiKey` at runtime. Leave both empty to disable the widget. Allow your domains in the CMPKit dashboard.

| Option | Default | Description |
| --- | --- | --- |
| `apiKey` | `''` | Public site key. Empty: widget not loaded. |
| `scriptUrl` | `https://cmpkit.com/widget.js` | Widget script URL. |
| `loadStrategy` | `'idle'` | `'idle'` waits for the browser to be idle, `'auto'` lets the widget decide. |
| `locale` | `''` | Force the language (for example `fr`). Empty: detected by the widget. |
| `theme` | `''` | Force the widget theme. Empty: dashboard setting. |
| `strictMode` | `false` | Sets `data-strict-mode` on the script. |

## Cookie settings link

```vue
<footer>
  <CmpkitSettingsLink />
  <CmpkitSettingsLink label="Manage cookies" class="underline" />
</footer>
```

It renders a `<button data-cmpkit="settings">` only when a key is set. It is unstyled: pass `class`, or use the default slot for your own content. `useCmpkit().enabled` tells you whether the widget is configured.

## Limits

- The module loads the widget; what the banner shows (categories, vendors, texts) is configured in the CMPKit dashboard.
- The key is read at build time for the first HTML and at runtime from `NUXT_PUBLIC_CMPKIT_API_KEY`; change the environment variable and restart the server.

## Development

```bash
npm install
npm run dev:prepare
npm run dev        # playground
npm test
npm run prepack
```

## License

MIT

## More from the same maker

- [CMPKit](https://cmpkit.com): consent management for the sites you ship.
- [nuxt-vitals-panel](https://github.com/kendrick-k/nuxt-vitals-panel): live Core Web Vitals panel for Nuxt.
