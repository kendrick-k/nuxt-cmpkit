<script setup lang="ts">
// Footer link for CMPKit's "footer link" mode: the widget binds to any element with data-cmpkit="settings".
// Renders nothing without a key, so a dead button is never shown. Unstyled: pass `class`, or use the slot.
import { useCmpkit } from '#imports'

withDefaults(defineProps<{ label?: string }>(), { label: 'Cookie settings' })
const { enabled } = useCmpkit()
</script>

<template>
  <button v-if="enabled" type="button" data-cmpkit="settings">
    <slot>{{ label }}</slot>
  </button>
</template>
