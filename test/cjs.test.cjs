const {
  getDateLocalePattern, getTimeLocalePattern, getDateTimeLocalePattern
} = require('datetime-locale-patterns')
const { setLocalePatterns } = require('datetime-locale-patterns/code')

getDateLocalePattern('cs', 'short')
getTimeLocalePattern('cs', 'short')
getDateTimeLocalePattern('cs', 'short', 'short')
setLocalePatterns({ formats: [], styles: [], patterns: {} })
