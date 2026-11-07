import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildScript, isEnabled, type CmpkitOptions } from '../src/runtime/utils.ts'

const base: CmpkitOptions = {
  apiKey: 'ck_pub_123',
  scriptUrl: 'https://cmpkit.com/widget.js',
  loadStrategy: 'idle',
  locale: '',
  theme: '',
  strictMode: false,
}

test('isEnabled needs a non-blank key', () => {
  assert.equal(isEnabled({ apiKey: '' }), false)
  assert.equal(isEnabled({ apiKey: '   ' }), false)
  assert.equal(isEnabled({ apiKey: 'ck_pub_123' }), true)
})

test('buildScript returns null without a key', () => {
  assert.equal(buildScript({ ...base, apiKey: '' }), null)
})

test('buildScript sets the required attributes', () => {
  assert.deepEqual(buildScript(base), {
    src: 'https://cmpkit.com/widget.js',
    defer: true,
    'data-api-key': 'ck_pub_123',
    'data-load-strategy': 'idle',
  })
})

test('buildScript trims the key and adds only the optional attributes that are set', () => {
  const script = buildScript({ ...base, apiKey: '  ck_pub_123 ', locale: 'fr', theme: 'dark', strictMode: true })
  assert.equal(script?.['data-api-key'], 'ck_pub_123')
  assert.equal(script?.['data-locale'], 'fr')
  assert.equal(script?.['data-theme'], 'dark')
  assert.equal(script?.['data-strict-mode'], 'true')
  assert.equal('data-locale' in (buildScript(base) ?? {}), false)
})
