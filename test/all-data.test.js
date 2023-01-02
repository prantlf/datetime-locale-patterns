import tehanu from 'tehanu'
import { deepStrictEqual, fail } from 'assert'
import data from '../lib/all.json' assert { type: 'json' }
import availableLocales from 'cldr-core/availableLocales.json' assert { type: 'json' }

const test = tehanu(import.meta.url)
const locales = availableLocales.availableLocales.full.map(locale => locale.toLowerCase())
const { formats, styles, patterns } = data

test('provides patterns for all formats', () => {
  deepStrictEqual(formats, ['date', 'time', 'dateTime'])
})

test('provides patterns for all styles', () => {
  deepStrictEqual(styles, ['full', 'long', 'medium', 'short'])
})

test('provides patterns for all locales', () => {
  for (const locale of locales) {
    if (!patterns[locale]) fail(`missing locale "${locale}"`)
  }
})
