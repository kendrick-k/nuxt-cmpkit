import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { CmpkitOptions } from './runtime/utils'

export type ModuleOptions = CmpkitOptions

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'nuxt-cmpkit', configKey: 'cmpkit', compatibility: { nuxt: '>=3.15.0' } },
  defaults: {
    apiKey: '',
    scriptUrl: 'https://cmpkit.com/widget.js',
    loadStrategy: 'idle',
    locale: '',
    theme: '',
    strictMode: false,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    // Public config on purpose: the site key is meant for the browser.
    // `NUXT_PUBLIC_CMPKIT_API_KEY` overrides `apiKey` at runtime.
    nuxt.options.runtimeConfig.public.cmpkit = { ...options }
    addPlugin(resolve('./runtime/plugins/cmpkit'))
    addComponent({ name: 'CmpkitSettingsLink', filePath: resolve('./runtime/components/CmpkitSettingsLink.vue') })
    addImports({ name: 'useCmpkit', from: resolve('./runtime/composables/useCmpkit') })
  },
})
