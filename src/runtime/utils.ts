export interface CmpkitOptions {
  /** Public site key from the CMPKit dashboard. Empty means the widget is not loaded. */
  apiKey: string
  /** Widget script URL. */
  scriptUrl: string
  /** `idle` waits for the browser to be idle, `auto` lets the widget decide. */
  loadStrategy: 'auto' | 'idle'
  /** Force the banner language (for example `fr`). Empty lets the widget detect it. */
  locale: string
  /** Force the widget theme. Empty keeps the dashboard setting. */
  theme: string
  /** Pass `data-strict-mode` to the widget. */
  strictMode: boolean
}

/** Whether the widget should be loaded: only with a non-blank key. */
export function isEnabled(options: Pick<CmpkitOptions, 'apiKey'>): boolean {
  return typeof options.apiKey === 'string' && options.apiKey.trim().length > 0
}

/** Attributes of the widget `<script>` tag, or `null` when no key is set. */
export function buildScript(options: CmpkitOptions): Record<string, string | boolean> | null {
  if (!isEnabled(options)) return null
  const script: Record<string, string | boolean> = {
    src: options.scriptUrl,
    defer: true,
    'data-api-key': options.apiKey.trim(),
    'data-load-strategy': options.loadStrategy,
  }
  if (options.locale.trim()) script['data-locale'] = options.locale.trim()
  if (options.theme.trim()) script['data-theme'] = options.theme.trim()
  if (options.strictMode) script['data-strict-mode'] = 'true'
  return script
}
