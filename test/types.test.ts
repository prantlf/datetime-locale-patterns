import {
  getDateLocalePattern, getTimeLocalePattern, getDateTimeLocalePattern, PatternStyle
} from '../lib/index.js'
import { setLocalePatterns } from '../lib/code.js'

declare type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  const patternStyle: PatternStyle = 'short'
  let _pattern: string
  _pattern = getDateLocalePattern('cs', patternStyle)
  _pattern = getDateLocalePattern('cs', { dateStyle: patternStyle })
  _pattern = getTimeLocalePattern('cs', patternStyle)
  _pattern = getTimeLocalePattern('cs', { timeStyle: patternStyle })
  _pattern = getDateTimeLocalePattern('cs', patternStyle, patternStyle)
  _pattern = getDateTimeLocalePattern('cs', { dateStyle: patternStyle, timeStyle: patternStyle })
  setLocalePatterns({ formats: [], styles: [], patterns: {} })
  const formatter = new Intl.DateTimeFormat('cs')
  _pattern = getDateLocalePattern(formatter)
  _pattern = getTimeLocalePattern(formatter)
  _pattern = getDateTimeLocalePattern(formatter)
})
