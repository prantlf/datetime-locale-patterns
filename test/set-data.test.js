import tehanu from 'tehanu'
import { strictEqual, throws } from 'assert'
import { getDateTimeLocalePattern, setLocalePatterns } from 'datetime-locale-patterns/code'
import { format } from 'date-fns'
import shortPatterns from 'datetime-locale-patterns/data/short' assert { type: 'json' }
import allPatterns from 'datetime-locale-patterns/data/all' assert { type: 'json' }

const test = tehanu(import.meta.url)
const date = new Date(1, 1, 3, 4, 5, 6) // 1901-02-03 04:05:06

test.before(() => setLocalePatterns(shortPatterns))
test.after(() => setLocalePatterns(allPatterns))

test('supports short format pattern', () => {
  const pattern = getDateTimeLocalePattern('cs', 'short', 'short')
  strictEqual(pattern, 'dd.MM.yy H:mm')
  strictEqual(format(date, pattern), '03.02.01 4:05')
})

test('does not support long format pattern', () => {
  throws(() => getDateTimeLocalePattern('cs', 'long', 'long'))
})
