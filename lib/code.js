let formatIndexes, styleIndexes, patternsByLocale

// Convert an array of names to an object, where the names are used as keys
// pointing to values representing indexes of the names in the original array
function initializeIndexes(names) {
  const indexes = {}
  for (let i = 0, l = names.length; i < l; ++i) indexes[names[i]] = i
  return indexes
}

export function setLocalePatterns(data) {
  const { formats, styles, patterns } = data

  formatIndexes = initializeIndexes(formats)
  styleIndexes = initializeIndexes(styles)

  patternsByLocale = patterns
}

// Enforce lower-case and dash as a delimiter
function normalizeLocale(locale) {
  return locale.toLowerCase().replace('_', '-')
}

// Cut the first part of the locale before the first dash (language)
function getLanguage(locale) {
  const separator = locale.indexOf('-')
  return separator > 0 && locale.substring(0, separator)
}

function getPattern(locale, style, format) {
  locale = normalizeLocale(locale)

  // If language with country is not supported, try the language alone
  let patterns = patternsByLocale[locale]
  if (!patterns) {
    const language = getLanguage(locale)
    if (language) patterns = patternsByLocale[language]
    if (!patterns) throw new Error(`Invalid locale: "${locale}".`)
  }

  const formatIndex = formatIndexes[format]
  if (formatIndex === undefined) throw new Error(`Invalid format: "${format}".`)

  const styleIndex = styleIndexes[style]
  if (styleIndex === undefined) throw new Error(`Invalid style: "${style}".`)

  return patterns[formatIndex][styleIndex]
}

export function getDateLocalePattern(locale, style) {
  // Get locale and dateStyle from any argument combination
  if (typeof locale !== 'string') {
    ({ locale, dateStyle: style } = locale.resolvedOptions())
  } else if (typeof style !== 'string') {
    style = style.dateStyle
  }

  return getPattern(locale, style, 'date')
}

export function getTimeLocalePattern(locale, style) {
  // Get locale and timeStyle from any argument combination
  if (typeof locale !== 'string') {
    ({ locale, timeStyle: style } = locale.resolvedOptions())
  } else if (typeof style !== 'string') {
    style = style.timeStyle
  }

  return getPattern(locale, style, 'time')
}

export function getDateTimeLocalePattern(locale, dateStyle, timeStyle) {
  // Get locale, dateStyle and timeStyle from any argument combination
  if (typeof locale !== 'string') {
    ({ locale, dateStyle, timeStyle } = locale.resolvedOptions())
  } else if (typeof dateStyle !== 'string') {
    ({ dateStyle, timeStyle } = dateStyle)
  }

  const datePattern = getDateLocalePattern(locale, dateStyle)
  const timePattern = getTimeLocalePattern(locale, timeStyle)
  const dateTimePattern = getPattern(locale, dateStyle, 'dateTime')
  return dateTimePattern.replace('{1}', datePattern).replace('{0}', timePattern)
}
