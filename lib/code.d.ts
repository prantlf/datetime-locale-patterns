export type PatternFormat = 'date' | 'time' | 'dateTime'

export type PatternStyle = 'full' | 'long' | 'medium' | 'short'

export interface PatternData {
  formats: PatternFormat[]
  styles: PatternStyle[]
  patterns: {
    [locale: string]: string[][]
  }
}

export interface DateOptions {
  dateStyle: PatternStyle
}

export interface TimeOptions {
  timeStyle: PatternStyle
}

export interface DateTimeOptions {
  dateStyle: PatternStyle
  timeStyle: PatternStyle
}

export interface IntlFormatter {
  resolvedOptions(): Record<string, unknown>
}

export function setLocalePatterns(data: PatternData): void
export function getDateLocalePattern(locale: IntlFormatter | string, style?: PatternStyle | DateOptions): string
export function getTimeLocalePattern(locale: IntlFormatter | string, style?: PatternStyle | TimeOptions): string
export function getDateTimeLocalePattern(locale: IntlFormatter | string, dateStyle?: PatternStyle | DateTimeOptions, timeStyle?: PatternStyle): string
