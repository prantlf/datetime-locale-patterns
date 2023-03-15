const test = require('tehanu')(__filename)
const { strictEqual } = require('assert')
const {
  getDateLocalePattern, getTimeLocalePattern, getDateTimeLocalePattern
} = require('datetime-locale-patterns')
const { setLocalePatterns } = require('datetime-locale-patterns/code')

test('exports named functions', () => {
  strictEqual(typeof getDateLocalePattern, 'function')
  strictEqual(typeof getTimeLocalePattern, 'function')
  strictEqual(typeof getDateTimeLocalePattern, 'function')
  getDateLocalePattern('cs', 'short')
  getTimeLocalePattern('cs', 'short')
  getDateTimeLocalePattern('cs', 'short', 'short')
  setLocalePatterns({ formats: [], styles: [], patterns: {} })
})
