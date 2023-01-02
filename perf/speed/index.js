import createSuite from './createSuite.js'
import dateAndTime from 'date-and-time'
import { format as dateFnsFormat } from 'date-fns'
import { DateTime } from 'luxon'

const { format: dateAndTimeFormat, compile: dateAndTimeCompile } = dateAndTime
const { DATETIME_SHORT, DATETIME_MED, DATETIME_FULL, DATETIME_HUGE } = DateTime

const date = new Date(1, 1, 3, 16, 5, 6) // 1901-02-03 16:05:06
const luxonDate = DateTime.fromJSDate(date)

// ---------- short

const shortPattern = 'M/d/yy, h:mm a'

function dateAndTimeShort() {
  dateAndTimeFormat(date, shortPattern)
}

const shortCompiled = dateAndTimeCompile(shortPattern)

function dateAndTimeShortCompiled() {
  dateAndTimeFormat(date, shortCompiled)
}

function dateFnsShort() {
  dateFnsFormat(date, shortPattern)
}

function luxonShort() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_SHORT)
}

function luxonShortCreated() {
  luxonDate.toLocaleString(DATETIME_SHORT)
}

// ---------- medium

const mediumPattern = 'MMM d, y, h:mm:ss a'

function dateAndTimeMedium() {
  dateAndTimeFormat(date, mediumPattern)
}

const mediumCompiled = dateAndTimeCompile(mediumPattern)

function dateAndTimeMediumCompiled() {
  dateAndTimeFormat(date, mediumCompiled)
}

function dateFnsMedium() {
  dateFnsFormat(date, mediumPattern)
}

function luxonMedium() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_MED)
}

function luxonMediumCreated() {
  luxonDate.toLocaleString(DATETIME_MED)
}

// ---------- long

const longPattern = 'MMMM d, y, h:mm:ss a z'

function dateAndTimeLong() {
  dateAndTimeFormat(date, longPattern)
}

const longCompiled = dateAndTimeCompile(longPattern)

function dateAndTimeLongCompiled() {
  dateAndTimeFormat(date, longCompiled)
}

function dateFnsLong() {
  dateFnsFormat(date, longPattern)
}

function luxonLong() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_FULL)
}

function luxonLongCreated() {
  luxonDate.toLocaleString(DATETIME_FULL)
}

// ---------- full

const fullPattern = 'EEEE, MMMM d, y, h:mm:ss a zzzz'

function dateAndTimeFull() {
  dateAndTimeFormat(date, fullPattern)
}

const fullCompiled = dateAndTimeCompile(fullPattern)

function dateAndTimeFullCompiled() {
  dateAndTimeFormat(date, fullCompiled)
}

function dateFnsFull() {
  dateFnsFormat(date, fullPattern)
}

function luxonFull() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_HUGE)
}

function luxonFullCreated() {
  luxonDate.toLocaleString(DATETIME_HUGE)
}

// ---------- suites

createSuite('Formatting a short pattern with...')
  .add('date-and-time', dateAndTimeShort)
  .add('date-and-time compiled', dateAndTimeShortCompiled)
  .add('date-fns', dateFnsShort)
  .add('luxon', luxonShort)
  .add('luxon created', luxonShortCreated)
  .run()

console.log()

createSuite('Formatting a medium pattern with...')
  .add('date-and-time', dateAndTimeMedium)
  .add('date-and-time compiled', dateAndTimeMediumCompiled)
  .add('date-fns', dateFnsMedium)
  .add('luxon', luxonMedium)
  .add('luxon created', luxonMediumCreated)
  .run()

console.log()

createSuite('Formatting a long pattern with...')
  .add('date-and-time', dateAndTimeLong)
  .add('date-and-time compiled', dateAndTimeLongCompiled)
  .add('date-fns', dateFnsLong)
  .add('luxon', luxonLong)
  .add('luxon created', luxonLongCreated)
  .run()

console.log()

createSuite('Formatting a full pattern with...')
  .add('date-and-time', dateAndTimeFull)
  .add('date-and-time compiled', dateAndTimeFullCompiled)
  .add('date-fns', dateFnsFull)
  .add('luxon', luxonFull)
  .add('luxon created', luxonFullCreated)
  .run()
