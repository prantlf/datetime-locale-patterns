# DateTime Locale Patterns

[![Latest version](https://img.shields.io/npm/v/datetime-locale-patterns)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/datetime-locale-patterns)
](https://www.npmjs.com/package/datetime-locale-patterns)
[![Coverage](https://codecov.io/gh/prantlf/datetime-locale-patterns/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/datetime-locale-patterns)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f1034029c0747a980cd49f64f16338b)](https://www.codacy.com/app/prantlf/datetime-locale-patterns?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/datetime-locale-patterns&amp;utm_campaign=Badge_Grade)

Provides localized date/time format patterns for styles `full`, `long`, `medium` and `short`, usable with [`Intl.DateTimeFormat`], compliant with [Unicode LDML]. For example:

| Locale | Style | Pattern | Example |
|:-------|:------|:--------|:--------|
| en     | short | M/d/yy, h:mm a | 2/3/01, 4:05 AM |
| cs     | long  | d. MMMM y H:mm:ss z | 3. února 1901 4:05:06 GMT+1 |


```js
const formatter = new Intl.DateTimeFormat('cs', { dateStyle: 'short'})
const pattern = getDateTimeLocalePattern(formatter) // d.M.yy
```

* ES, CJS and UMD module exports.
* TypeScript type declarations (typings).
* No other dependencies.
* Tiny code base - 1.42 kB minified, 525 B gzipped, 439 B brotlied. Bundle with all data - 95.9 kB minified, 6.44 kB gzipped, 5.17 kB brotlied
* Generated from the official [CLDR data] version 42.0. 586 locales supported.
* Resolves four date/time-formatting pattern styles (lengths) - `full`, `long`, `medium`, `short`.

## Motivation

When do you need to know the date/time format pattern? When is just formatting a date or time values to a string not enough?

1. **Date/time pickers.** You format with [`Intl.DateTimeFormat`]. [`Intl.DateTimeFormat`] or [luxon] format using a localized pattern decided by a specified locale. No need to provide the format explicitly. But what if you need to display the format pattern, which is used for the formatting? For example, in a date picker field as a value placeholder.
2. **Raw date/time formatting.** You do not format with [`Intl.DateTimeFormat`]. Libraries like [date-and-time], [date-fns] and others format using patterns provided by the developer. But how to get a localized pattern for a particular language and country?

There is no built-in API in browsers or Node.js for getting localized date/time-formatting patterns.

## Synopsis

1. **Date/time pickers.** Get a pattern to see in an abstract way how a concrete date will be formatted:

```js
import { getDateTimeLocalePattern } from 'datetime-locale-patterns'

const date = new Date(1, 1, 3, 4, 5, 6)
const options = { dateStyle: 'short', timeStyle: 'short' }

const formatter = new Intl.DateTimeFormat('en', options)
const text = formatter.format(date)
console.log(text) // prints '2/3/01, 4:05 AM'

const pattern = getDateTimeLocalePattern('en', options)
console.log(pattern) // prints 'M/d/yy, h:mm a'
```

2. **Raw date/time formatting.** Get a pattern to format a concrete date with:

```js
import { getDateTimeLocalePattern } from 'datetime-locale-patterns'
import formatter from 'date-and-time'

const date = new Date(1, 1, 3, 4, 5, 6)

const pattern = getDateTimeLocalePattern('en', 'short', 'short')
console.log(pattern) // prints 'M/d/yy, h:mm a'

const text = formatter.format(date, pattern)
console.log(text) // prints '2/3/01, 4:05 AM'
```

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 16.14 or newer.

```sh
$ npm i datetime-locale-patterns
$ pnpm i datetime-locale-patterns
$ yarn add datetime-locale-patterns
```

Functions are exposed as named exports from ES and CJS modules, for example:

```js
import { getDateTimeLocalePattern } from 'datetime-locale-patterns'
```

```js
const { getDateTimeLocalePattern } = require('datetime-locale-patterns')
```

A UMD module can be loaded to the browser either directly:

```html
<script src="https://unpkg.com/datetime-locale-patterns@1.0.0/lib/index.min.js"></script>
<script>
  const { getDateTimeLocalePattern } = window.dateTimeLocalePatterns
</script>
```

Or using an AMD module loader:

```html
<script>
  require([
    'https://unpkg.com/datetime-locale-patterns@1.0.0/lib/index.min.js'
  ], ({ getDateTimeLocalePattern }) => {
    ...
  })
</script>
```

## API

This library works well with [`Intl.DateTimeFormat`] by using concepts from [Unicode CLDR] (Common Locale Data Repository):

* It expects [Unicode locales] (2-letter and 3-letter languages and countries from [ISO 639] and [ISO 3166], formatted according to [extended BCP 47]), which [`Intl` locales] is based on.
* It supports [Unicode calendar formats] - `date`, `time`, `dateTime`.
* It expects [Unicode pattern styles] (lengths) - `full`, `long`, `medium`, `short`, as `dateStyle` and `timeStyle` properties of [`Intl.DateTimeFomat` options] do, or an instance of `Intl.DateTimeFomat`.
* It supplies date/time-formatting patterns using [date fields] from [Unicode LDML] (Locale Data Markup Language) as tokens.

### getDateLocalePattern(locale, style)

Returns a pattern to format a date-only value for the specified locale with the specified style.

The **locale** argument can be either a locale or an instance of `Intl.DateTimeFomat`. The second argument won't be needed in the latter case.

The **style** argument can be either a string (`full`, `long`, `medium`, `short`) or an object with the `dateStyle` property from [`Intl.DateTimeFomat` options].

```js
import { getDateLocalePattern } from 'datetime-locale-patterns'

const pattern = getDateLocalePattern('en', 'short')
console.log(pattern) // prints 'M/d/yy'
```

### getTimeLocalePattern(locale, style)

Returns a pattern to format a time-only value for the specified locale with the specified style.

The **locale** argument can be either a locale or an instance of `Intl.DateTimeFomat`. The second argument won't be needed in the latter case.

The **style** argument can be either a string (`full`, `long`, `medium`, `short`) or an object with the `timeStyle` property from [`Intl.DateTimeFomat` options].

```js
import { getLocalePattern } from 'datetime-locale-patterns'

const pattern = getTimeLocalePattern('en', 'short')
console.log(pattern) // prints 'h:mm a'
```

### getDateTimeLocalePattern(locale, dateStyle, timeStyle)

Returns a pattern to format a date+time value for the specified locale with the specified style.

The **locale** argument can be either a locale or an instance of `Intl.DateTimeFomat`. The second and third arguments won't be needed in the latter case.

The **dateStyle** argument can be either a string (`full`, `long`, `medium`, `short`) or an object with `dateStyle` and `timeStyle` properties from [`Intl.DateTimeFomat` options]. If it is a string, the **timeStyle** argument will be required (as a string).

```js
import { getDateTimeLocalePattern } from 'datetime-locale-patterns'

const pattern = getDateTimeLocalePattern('en', 'short', 'short')
console.log(pattern) // prints 'M/d/yy, h:mm a'
```

### setLocalePatterns(data)

Initializes the data used by other functions to date/time-formatting patterns.

The default data including all locales, formats and pattern styles are exposed as the `datetime-locale-patterns/data/all` module. Smaller data including all locales and formats for the short pattern style are exposed as the `datetime-locale-patterns/data/short` module. [Custom data](#custom-patterns) can be generated using the `create-datetime-locale-patterns` script.

```js
import { setLocalePatterns } from 'datetime-locale-patterns/code'
import patterns from 'datetime-locale-patterns/data/short' assert { type: 'json' }

setLocalePatterns(patterns) // use only short date/time-formatting patterns
```

## Custom Patterns

Patterns may need to be customised, if you need them to differ from the CLDR standard, or if you need to support only a subset of locales, formats or styles to reduce the size of the data loaded by your application.

The default data including all locales, formats and pattern styles are exposed as the `datetime-locale-patterns/data/all` module. Smaller data including all locales and formats for the short pattern style are exposed as the `datetime-locale-patterns/data/short` module. Other data (list of localized date/time format patterns) can be generated using the `create-datetime-locale-patterns` script and enabled using the `setLocalePatterns` function.

### Creating Custom Data

Format of the data is JSON:

    {
      formats: [...], // a subset of date, time, dateTime
      styles: [...],  // a subset of full, long, medium, short
      patterns: {
        // locale to array of formats; a format is an array of styles
        [locale]: [[date], [time], [date-time]],
        ...
      }
    }

For example, for supporting only `en` and `cs` locales and `short` and `long` styles, the following command line will create the following file content:

    create-datetime-locale-patterns -l en,cs -s short,long

```json
{
  "formats": ["date", "time", "dateTime"],
  "styles": ["short", "long"],
  "patterns": {
    "en": [["M/d/yy", "MMMM d, y"], ["h:mm a", "h:mm:ss a z"], ["{1}, {0}", "{1}, {0}"]],
    "cs": [["dd.MM.yy", "d. MMMM y"], ["H:mm", "H:mm:ss z"], ["{1} {0}", "{1} {0}"]]
  }
}
```

The command-line script `create-datetime-locale-patterns` is installed to the `bin` directory in `node_modules`:

    Usage: create-datetime-locale-patterns [options]

    Options:
      -l|--locales <>  list of locales to include (default: all)
      -f|--formats <>  list of format patterns (default: date,time,dateTime)
      -s|--styles <>   list of format styles (default: short,medium,long,full)
      -o|--output <>   output file (default: console)
      -p|--pretty      prettify the JSON output (default: minified)
      -V|--version     print version number
      -h|--help        print usage instructions

    Examples:
      $ create-datetime-locale-patterns -s short,long -o patterns.json
      $ create-datetime-locale-patterns -l en,en-GB,cs,de,de-AT -f date -p

### Loading Custom Data

If you want to use the limited data from the `datetime-locale-patterns/data/short` module or your custom data, do not import functions from the default `datetime-locale-patterns` module, but from the `datetime-locale-patterns/code` module, which will not load the default data automatically. Once you do it, you will have to supply the custom data to the `setLocalePatterns` function before you call any other function from this library:

```js
import { setLocalePatterns, getDateTimeLocalePattern } from 'datetime-locale-patterns/code'
import patterns from './patterns.json' assert { type: 'json' }

setLocalePatterns(patterns)
const pattern = getDateTimeLocalePattern('cs', 'short', 'short')
```

## Problems

The assumption that [`Intl.DateTimeFormat`] uses patterns from [Unicode CLDR] may not be always true.

* If the date/time formatting provided by the underlying OS API is used, the actual pattern may differ, although the multi-platform [Unicode CLDR] is supposed to include the same localized patterns.
* If [ICU] (International Components for Unicode) library, which is supposed to be in sync with [Unicode CLDR], is used by a browser or Node.js, the version of that [ICU] may differ from the latest version of [Unicode CLDR]. This can be seen in `long` and `full` styles of the `en` locale, which include a different "glue pattern" for joining data and time patterns. [ICU] includes " at ", while [Unicode CLDR] includes ",".

JavaScript platforms using [ICU] will match the patterns returned by this library well. It means Node.js 13 and newer and browsers Chromium and Firefox. Safari doesn't use [ICU], AFAIK.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Copyright (c) 2023 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[date-and-time]: https://github.com/knowledgecode/date-and-time#compileformatstring
[date-fns]: https://github.com/date-fns/date-fns
[luxon]: https://moment.github.io/luxon/
[ICU]: https://icu.unicode.org/
[CLDR data]: https://www.npmjs.com/package/cldr-dates-full
[Unicode LDML]: https://unicode.org/reports/tr35/
[Unicode CLDR]: https://cldr.unicode.org/
[Unicode locales]: https://www.unicode.org/reports/tr35/#Language_and_Locale_IDs
[`Intl` locales]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation
[ISO 3166]: https://en.wikipedia.org/wiki/ISO_3166
[ISO 639]: https://en.wikipedia.org/wiki/ISO_639
[extended BCP 47]: https://cldr.unicode.org/index/bcp47-extension
[`Intl.DateTimeFormat`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
[Unicode pattern styles]: https://unicode.org/reports/tr35/tr35-dates.html#24-element-dateformats
[Unicode calendar formats]: https://unicode.org/reports/tr35/tr35-dates.html#2-calendar-elements
[date fields]: http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
[`Intl.DateTimeFomat` options]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
