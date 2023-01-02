import tehanu from 'tehanu'
import { strictEqual } from 'assert'
import { getDateTimeLocalePattern } from 'datetime-locale-patterns'
import { format } from 'date-fns-tz'

const test = tehanu(import.meta.url)
const date = new Date(1, 1, 3, 4, 5, 6) // 1901-02-03 04:05:06

test('returns a full pattern for a valid locale', () => {
  const pattern = getDateTimeLocalePattern('cs', 'full', 'full')
  strictEqual(pattern, 'EEEE d. MMMM y H:mm:ss, zzzz')
  strictEqual(format(date, pattern, { timeZone: 'CET' }), 'Sunday 3. February 1901 4:05:06, GMT+01:00')
})

test('returns a long pattern for a valid locale', () => {
  const pattern = getDateTimeLocalePattern('cs', 'long', 'long')
  strictEqual(pattern, 'd. MMMM y H:mm:ss z')
  strictEqual(format(date, pattern, { timeZone: 'CET' }), '3. February 1901 4:05:06 GMT+1')
})

test('returns a medium pattern for a valid locale', () => {
  const pattern = getDateTimeLocalePattern('cs', 'medium', 'medium')
  strictEqual(pattern, 'd. M. y H:mm:ss')
  strictEqual(format(date, pattern), '3. 2. 1901 4:05:06')
})

test('returns a short pattern for a valid locale', () => {
  const pattern = getDateTimeLocalePattern('cs', 'short', 'short')
  strictEqual(pattern, 'dd.MM.yy H:mm')
  strictEqual(format(date, pattern), '03.02.01 4:05')
})

test('accepts Intl.DateTimeFormat options', () => {
  const pattern = getDateTimeLocalePattern('cs', { dateStyle: 'short', timeStyle: 'short' })
  strictEqual(pattern, 'dd.MM.yy H:mm')
})

test('accepts Intl.DateTimeFormat object', () => {
  const pattern = getDateTimeLocalePattern(new Intl.DateTimeFormat('cs', { dateStyle: 'short', timeStyle: 'short' }))
  strictEqual(pattern, 'dd.MM.yy H:mm')
})
