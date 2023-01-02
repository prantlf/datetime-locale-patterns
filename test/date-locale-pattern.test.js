import tehanu from 'tehanu'
import { strictEqual, throws } from 'assert'
import { getDateLocalePattern } from 'datetime-locale-patterns'
import { format } from 'date-fns'

const test = tehanu(import.meta.url)
const date = new Date(1, 1, 3, 4, 5, 6) // 1901-02-03 04:05:06

test('returns a full pattern for a valid locale', () => {
  const pattern = getDateLocalePattern('cs', 'full')
  strictEqual(pattern, 'EEEE d. MMMM y')
  strictEqual(format(date, pattern), 'Sunday 3. February 1901')
})

test('returns a long pattern for a valid locale', () => {
  const pattern = getDateLocalePattern('cs', 'long')
  strictEqual(pattern, 'd. MMMM y')
  strictEqual(format(date, pattern), '3. February 1901')
})

test('returns a medium pattern for a valid locale', () => {
  const pattern = getDateLocalePattern('cs', 'medium')
  strictEqual(pattern, 'd. M. y')
  strictEqual(format(date, pattern), '3. 2. 1901')
})

test('returns a short pattern for a valid locale', () => {
  const pattern = getDateLocalePattern('cs', 'short')
  strictEqual(pattern, 'dd.MM.yy')
  strictEqual(format(date, pattern), '03.02.01')
})

test('returns a pattern for a language only', () => {
  const pattern = getDateLocalePattern('cs-dummy', 'short')
  strictEqual(pattern, 'dd.MM.yy')
  strictEqual(format(date, pattern), '03.02.01')
})

test('accepts Intl.DateTimeFormat options', () => {
  const pattern = getDateLocalePattern('cs', { dateStyle: 'short' })
  strictEqual(pattern, 'dd.MM.yy')
})

test('accepts Intl.DateTimeFormat object', () => {
  const pattern = getDateLocalePattern(new Intl.DateTimeFormat('cs', { dateStyle: 'short' }))
  strictEqual(pattern, 'dd.MM.yy')
})

test('fails with an invalid language', () => {
  throws(() => getDateLocalePattern('invalid', 'short'))
})

test('fails with an invalid locale', () => {
  throws(() => getDateLocalePattern('invalid-invalid', 'short'))
})

test('fails with an invalid pattern style', () => {
  throws(() => getDateLocalePattern('cs', 'invalid'))
})
