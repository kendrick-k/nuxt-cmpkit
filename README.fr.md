# nuxt-cmpkit

[![npm version](https://img.shields.io/npm/v/nuxt-cmpkit?color=2f6f3e&label=npm)](https://www.npmjs.com/package/nuxt-cmpkit)
[![CI](https://img.shields.io/github/actions/workflow/status/kendrick-k/nuxt-cmpkit/ci.yml?branch=main&label=CI)](https://github.com/kendrick-k/nuxt-cmpkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/nuxt-cmpkit?color=2f6f3e)](https://github.com/kendrick-k/nuxt-cmpkit/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3%20%7C%204-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com)

[English](README.md) · **Français** · [Español](README.es.md) · [Italiano](README.it.md)

Module Nuxt pour [CMPKit](https://cmpkit.com), une **plateforme de gestion du consentement (CMP)** : ajoutez un **bandeau cookies** conforme RGPD / ePrivacy et la gestion du consentement à votre site Nuxt 3 ou Nuxt 4 avec une seule clé publique, plus un lien « Paramètres des cookies » pour votre pied de page.

- Bandeau cookies et gestion du consentement : les catégories, les fournisseurs et les textes se configurent dans le tableau de bord CMPKit, pas dans le code.
- Ajoute le `<script>` du widget dans le `<head>` côté serveur : il est dans le premier HTML et chargé une seule fois.
- Ne fait rien sans clé (ni script, ni bouton inactif) : les builds de développement et de prévisualisation restent propres.
- `<CmpkitSettingsLink />` affiche le bouton de pied de page auquel CMPKit se rattache (`data-cmpkit="settings"`).
- Langue, thème et mode strict en option, transmis au widget par des attributs `data-*`.
- Aucune dépendance en dehors de Nuxt. Aucune télémétrie.

## Installation

```bash
npx nuxt module add nuxt-cmpkit
```

## Configuration

La clé du site est **publique** : elle est faite pour être servie au navigateur, ce n'est pas un secret. Deux façons équivalentes :

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-cmpkit'],
  cmpkit: { apiKey: 'votre-cle-publique' },
})
```

```bash
# .env (ou les variables d'environnement de votre hébergeur)
NUXT_PUBLIC_CMPKIT_API_KEY=votre-cle-publique
```

Préférez la variable d'environnement si vous avez un site CMPKit par environnement (production, préproduction) ou si vous voulez garder la clé hors du dépôt. Elle remplace `cmpkit.apiKey` à l'exécution. Laissez les deux vides pour désactiver le widget. Autorisez vos domaines dans le tableau de bord CMPKit.

| Option | Défaut | Description |
| --- | --- | --- |
| `apiKey` | `''` | Clé publique du site. Vide : widget non chargé. |
| `scriptUrl` | `https://cmpkit.com/widget.js` | URL du script du widget. |
| `loadStrategy` | `'idle'` | `'idle'` attend que le navigateur soit inactif, `'auto'` laisse le widget décider. |
| `locale` | `''` | Force la langue (par exemple `fr`). Vide : détectée par le widget. |
| `theme` | `''` | Force le thème du widget. Vide : réglage du tableau de bord. |
| `strictMode` | `false` | Ajoute `data-strict-mode` au script. |

## Lien « Paramètres des cookies »

```vue
<footer>
  <CmpkitSettingsLink />
  <CmpkitSettingsLink label="Gérer les cookies" class="underline" />
</footer>
```

Il affiche un `<button data-cmpkit="settings">` seulement si une clé est définie. Il n'a aucun style : passez une `class` ou utilisez le slot par défaut pour votre propre contenu. `useCmpkit().enabled` indique si le widget est configuré.

## Limites

- Le module charge le widget ; ce que le bandeau affiche (catégories, fournisseurs, textes) se configure dans le tableau de bord CMPKit.
- La clé est lue à la compilation pour le premier HTML et à l'exécution depuis `NUXT_PUBLIC_CMPKIT_API_KEY` ; si vous changez la variable d'environnement, redémarrez le serveur.

## Développement

```bash
npm install
npm run dev:prepare
npm run dev        # playground
npm test
npm run prepack
```

## Licence

MIT

## Du même auteur

- [CMPKit](https://cmpkit.com) : gestion du consentement pour les sites que vous publiez.
- [nuxt-vitals-panel](https://github.com/kendrick-k/nuxt-vitals-panel) : panneau Core Web Vitals en direct pour Nuxt.
