# nuxt-cmpkit

[![npm version](https://img.shields.io/npm/v/nuxt-cmpkit?color=2f6f3e&label=npm)](https://www.npmjs.com/package/nuxt-cmpkit)
[![CI](https://img.shields.io/github/actions/workflow/status/kendrick-k/nuxt-cmpkit/ci.yml?branch=main&label=CI)](https://github.com/kendrick-k/nuxt-cmpkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/nuxt-cmpkit?color=2f6f3e)](https://github.com/kendrick-k/nuxt-cmpkit/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3%20%7C%204-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · **Italiano**

Modulo Nuxt per [CMPKit](https://cmpkit.com), una **piattaforma di gestione del consenso (CMP)**: aggiungi un **banner dei cookie** conforme a GDPR / ePrivacy e la gestione del consenso al tuo sito Nuxt 3 o Nuxt 4 con una sola chiave pubblica, più un link «Impostazioni dei cookie» per il footer.

- Banner dei cookie e gestione del consenso: categorie, fornitori e testi si configurano nella dashboard di CMPKit, non nel codice.
- Aggiunge lo `<script>` del widget nel `<head>` lato server: è nel primo HTML e viene caricato una sola volta.
- Non fa nulla senza chiave (nessuno script, nessun pulsante inattivo): le build di sviluppo e di anteprima restano pulite.
- `<CmpkitSettingsLink />` mostra il pulsante del footer a cui si aggancia CMPKit (`data-cmpkit="settings"`).
- Lingua, tema e modalità rigorosa facoltativi, passati al widget con attributi `data-*`.
- Nessuna dipendenza oltre a Nuxt. Nessuna telemetria.

## Installazione

```bash
npx nuxt module add nuxt-cmpkit
```

## Configurazione

La chiave del sito è **pubblica**: è pensata per arrivare al browser, non è un segreto. Due modi equivalenti:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-cmpkit'],
  cmpkit: { apiKey: 'la-tua-chiave-pubblica' },
})
```

```bash
# .env (o le variabili d'ambiente del tuo hosting)
NUXT_PUBLIC_CMPKIT_API_KEY=la-tua-chiave-pubblica
```

Preferisci la variabile d'ambiente se usi un sito CMPKit per ambiente (produzione, anteprima) o se vuoi tenere la chiave fuori dal repository. Sostituisce `cmpkit.apiKey` a runtime. Lascia entrambe vuote per disattivare il widget. Autorizza i tuoi domini nella dashboard di CMPKit.

| Opzione | Predefinito | Descrizione |
| --- | --- | --- |
| `apiKey` | `''` | Chiave pubblica del sito. Vuota: il widget non viene caricato. |
| `scriptUrl` | `https://cmpkit.com/widget.js` | URL dello script del widget. |
| `loadStrategy` | `'idle'` | `'idle'` attende che il browser sia inattivo, `'auto'` lascia decidere al widget. |
| `locale` | `''` | Forza la lingua (ad esempio `it`). Vuoto: rilevata dal widget. |
| `theme` | `''` | Forza il tema del widget. Vuoto: impostazione della dashboard. |
| `strictMode` | `false` | Aggiunge `data-strict-mode` allo script. |

## Link «Impostazioni dei cookie»

```vue
<footer>
  <CmpkitSettingsLink />
  <CmpkitSettingsLink label="Gestisci i cookie" class="underline" />
</footer>
```

Mostra un `<button data-cmpkit="settings">` solo se è definita una chiave. Non ha stili: passa una `class` o usa lo slot predefinito per il tuo contenuto. `useCmpkit().enabled` indica se il widget è configurato.

## Limiti

- Il modulo carica il widget; ciò che il banner mostra (categorie, fornitori, testi) si configura nella dashboard di CMPKit.
- La chiave viene letta in fase di build per il primo HTML e a runtime da `NUXT_PUBLIC_CMPKIT_API_KEY`; se cambi la variabile d'ambiente, riavvia il server.

## Sviluppo

```bash
npm install
npm run dev:prepare
npm run dev        # playground
npm test
npm run prepack
```

## Licenza

MIT

## Dello stesso autore

- [CMPKit](https://cmpkit.com): gestione del consenso per i siti che pubblichi.
- [nuxt-vitals-panel](https://github.com/kendrick-k/nuxt-vitals-panel): pannello Core Web Vitals in tempo reale per Nuxt.
