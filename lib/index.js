import patterns from './all.json' assert { type: 'json' }
import {
  getDateLocalePattern, getTimeLocalePattern, getDateTimeLocalePattern,
  setLocalePatterns
} from './code.js'

setLocalePatterns(patterns)

export {
  getDateLocalePattern, getTimeLocalePattern, getDateTimeLocalePattern
}
