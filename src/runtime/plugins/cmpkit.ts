import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#imports'
import { buildScript, type CmpkitOptions } from '../utils'

// Adds the widget script to <head>: rendered on the server, so it is in the first HTML and loaded once.
export default defineNuxtPlugin(() => {
  const script = buildScript(useRuntimeConfig().public.cmpkit as CmpkitOptions)
  if (script) useHead({ script: [script] })
})
