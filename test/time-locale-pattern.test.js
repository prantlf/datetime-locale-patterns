import tehanu from 'tehanu'
import { strictEqual } from 'assert'
import { getTimeLocalePattern } from 'datetime-locale-patterns'
import { format } from 'date-fns'

const test = tehanu(import.meta.url)
const date = new Date(1, 1, 3, 4, 5, 6) // 1901-02-03 04:05:06

test('returns a full pattern for a valid locale', () => {
  const pattern = getTimeLocalePattern('cs', 'full')
  strictEqual(pattern, 'H:mm:ss, zzzz')
  strictEqual(format(date, pattern), '4:05:06, GMT+01:00')
})

test('returns a long pattern for a valid locale', () => {
  const pattern = getTimeLocalePattern('cs', 'long')
  strictEqual(pattern, 'H:mm:ss z')
  strictEqual(format(date, pattern), '4:05:06 GMT+1')
})

test('returns a medium pattern for a valid locale', () => {
  const pattern = getTimeLocalePattern('cs', 'medium')
  strictEqual(pattern, 'H:mm:ss')
  strictEqual(format(date, pattern), '4:05:06')
})

test('returns a short pattern for a valid locale', () => {
  const pattern = getTimeLocalePattern('cs', 'short')
  strictEqual(pattern, 'H:mm')
  strictEqual(format(date, pattern), '4:05')
})

test('accepts Intl.DateTimeFormat options', () => {
  const pattern = getTimeLocalePattern('cs', { timeStyle: 'short' })
  strictEqual(pattern, 'H:mm')
})

test('accepts Intl.DateTimeFormat object', () => {
  const pattern = getTimeLocalePattern(new Intl.DateTimeFormat('cs', { timeStyle: 'short' }))
  strictEqual(pattern, 'H:mm')
})
