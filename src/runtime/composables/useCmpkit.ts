import { useRuntimeConfig } from '#imports'
import { isEnabled, type CmpkitOptions } from '../utils'

/** `enabled` is true when a key is set, so the widget is (or will be) loaded. */
export function useCmpkit() {
  return { enabled: isEnabled(useRuntimeConfig().public.cmpkit as CmpkitOptions) }
}
