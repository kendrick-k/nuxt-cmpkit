<template>
  <main style="font-family: system-ui; max-width: 40rem; margin: 3rem auto; padding: 0 1rem">
    <h1>nuxt-cmpkit playground</h1>
    <p>Widget loaded: <strong>{{ enabled ? 'yes' : 'no (no API key set)' }}</strong></p>
    <CmpkitSettingsLink />
  </main>
</template>

<script setup lang="ts">
const { enabled } = useCmpkit()
</script>
