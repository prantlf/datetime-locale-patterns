import tehanu from 'tehanu'
import { strictEqual, throws } from 'assert'
import { getDateLocalePattern, getTimeLocalePattern, setLocalePatterns } from 'datetime-locale-patterns/code'
import { format } from 'date-fns'
import shortPatterns from './short-date.json' assert { type: 'json' }
import allPatterns from 'datetime-locale-patterns/data/all' assert { type: 'json' }

const test = tehanu(import.meta.url)
const date = new Date(1, 1, 3, 4, 5, 6) // 1901-02-03 04:05:06

test.before(() => setLocalePatterns(shortPatterns))
test.after(() => setLocalePatterns(allPatterns))

test('supports short date format patterns', () => {
  const pattern = getDateLocalePattern('cs', 'short', 'short')
  strictEqual(pattern, 'dd.MM.yy')
  strictEqual(format(date, pattern), '03.02.01')
})

test('does not support time format patterns', () => {
  throws(() => getTimeLocalePattern('cs', 'long', 'long'))
})
