#!/usr/bin/env node

import { createRequire } from 'module'
import { readdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const require = createRequire(import.meta.url)

// Creates patterns.json:
// {
//   formats: [...], // a subset of date, time, dateTime
//   styles: [...],  // a subset of full, long, medium, short
//   patterns: {
//     // locale to array of formats; a format is an array of styles
//     [locale]: [[date], [time], [date-time]],
//     ...
//   }
// }
//
// For example, for supporting only `en` and `cs` locales and `short` and `long`
// styles, the following command line will generate the following file content:
//
// create-datetime-locale-patterns -l en,cs -s short,long -p
//
// {
//   "formats": ["date", "time", "dateTime"],
//   "styles": ["short", "long"],
//   "patterns": {
//     "en": [["M/d/yy", "MMMM d, y"], ["h:mm a", "h:mm:ss a z"], ["{1}, {0}", "{1}, {0}"]],
//     "cs": [["dd.MM.yy", "d. MMMM y"], ["H:mm", "H:mm:ss z"], ["{1} {0}", "{1} {0}"]]
//   }
// }
//
// See http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.

function help() {
  console.log(`Creates a file with localized date/time format patterns for styles full, long,
medium and short, usable with Intl.DateTimeFormat, complies with Unicode LDML.

Usage: create-datetime-locale-patterns [options]

Options:
  -l|--locales <>    list of locales to include (default: all)
  -f|--formats <>    list of format patterns (default: date,time,dateTime)
  -s|--styles <>     list of format styles (default: full,long,medium,short)
  -o|--output <>     output file (default: console)
  -p|--pretty        prettify the JSON output (default: minified)
  -V|--version       print version number
  -h|--help          print usage instructions

Examples:
  $ create-datetime-locale-patterns -s short,long -o patterns.json
  $ create-datetime-locale-patterns -l en,en-GB,cs,de,de-AT -f date -p`)
  process.exit(0)
}

const allFormats = ['date', 'time', 'dateTime']
const allStyles = ['full', 'long', 'medium', 'short']
let locales, formats = allFormats, styles = allStyles, outputFile, pretty

const { argv } = process
for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(-|--)(no-)?([a-zA-Z][-a-zA-Z]*)(?:=(.*))?$/.exec(arg)
  if (match) {
    const parseArg = (arg, flag) => {
      switch (arg) {
        case 'l': case 'locales':
          locales = (match[4] || argv[++i]).split(',')
          return
        case 'f': case 'formats':
          formats = parseList(match[4] || argv[++i], allFormats, 'format')
          return
        case 's': case 'styles':
          styles = parseList(match[4] || argv[++i], allStyles, 'style')
          return
        case 'p': case 'pretty':
          pretty = flag
          return
        case 'o': case 'output':
          outputFile = match[4] || argv[++i]
          return
        case 'V': case 'version':
          console.log(require('../package.json').version)
          process.exit(0)
          break
        case 'h': case 'help':
          help()
      }
      console.error(`unknown option: "${arg}"`)
      process.exit(1)
    }
    if (match[1] === '-') {
      const flags = match[3].split('')
      for (const flag of flags) parseArg(flag, true)
    } else {
      parseArg(match[3], match[2] !== 'no-')
    }
    continue
  }
  console.error(`unexpected argument: "${arg}"`)
}

function parseList(list, valid, name) {
  const values = list.split(',')
  for (const value of values) {
    if (!valid.includes(value)) throw new Error(`Invalid ${name}: "${value}".`)
  }
  return values
}

function extractFormats(formatList) {
  const result = []
  for (const format of formats) {
    result.push(formatList[`${format}Formats`])
  }
  return result
}

function extractStyles(formats) {
  const result = []
  for (const style of styles) {
    result.push(formats[style])
  }
  return result
}

const patterns = {}
const localeDir  = join(dirname(require.resolve('cldr-dates-full/package.json')), 'main')
for (const locale of await readdir(localeDir)) {
  const calendarFile = join(localeDir, locale, 'ca-gregorian.json')
  if (locales && !locales.includes(locale.toLowerCase())) continue
  const calendarData = JSON.parse(await readFile(calendarFile, 'utf8'))
  const formatList = calendarData.main[locale].dates.calendars.gregorian
  patterns[locale.toLowerCase()] = extractFormats(formatList).map(formats => extractStyles(formats))
}

const output = JSON.stringify({ formats, styles, patterns }, undefined, pretty ? 2 : undefined)
if (outputFile) {
  await writeFile(outputFile, output)
  console.log(Object.keys(patterns).length, 'locales written.')
} else {
  console.log(output)
}
