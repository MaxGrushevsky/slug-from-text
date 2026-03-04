/**
 * Generate URL-friendly slug from text.
 */

export type SlugSeparator = '-' | '_' | ''

export interface SlugOptions {
  /** Character to replace spaces. Default: '-' */
  separator?: SlugSeparator
  /** Convert to lowercase. Default: true */
  lowercase?: boolean
  /** Remove special characters. Default: true */
  removeSpecialChars?: boolean
  /** Max length of the result (trims from end). Default: no limit */
  maxLength?: number
  /** Locale for lowercase (e.g. 'tr' for Turkish). Uses toLocaleLowerCase when set. */
  locale?: string | false
}

const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g
const SPECIAL_CHARS_REGEX = /[^\w\s-]/g
const SPACE_UNDERSCORE_REGEX = /[\s_]+/g
const SPACE_DASH_REGEX = /[\s-]+/g
const SPACE_DASH_UNDERSCORE_REGEX = /[\s_-]+/g
const TRIM_DASHES_REGEX = /^-+|-+$/g
const TRIM_UNDERSCORES_REGEX = /^_+|_+$/g

const defaultOptions: Required<Omit<SlugOptions, 'maxLength' | 'locale'>> & {
  maxLength?: number
  locale?: string | false
} = {
  separator: '-',
  lowercase: true,
  removeSpecialChars: true,
}

function normalizeToAscii(input: string): string {
  if (!input) return ''

  let result = input.normalize('NFD').replace(COMBINING_MARKS_REGEX, '')

  result = result
    .replace(/ß/g, 'ss')
    .replace(/ẞ/g, 'SS')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')

  return result
}

/**
 * Converts text to a URL-friendly slug.
 * @param text - Input text (e.g. "Hello World!")
 * @param options - Optional settings
 * @returns Slug string (e.g. "hello-world")
 */
export function slug(text: string, options: SlugOptions = {}): string {
  if (!text || typeof text !== 'string') return ''

  const opts = { ...defaultOptions, ...options }
  let result = text.trim()

   if (!result) return ''

  if (opts.lowercase) {
    result = opts.locale !== undefined && opts.locale !== false
      ? result.toLocaleLowerCase(opts.locale)
      : result.toLowerCase()
  }

  result = normalizeToAscii(result)

  if (opts.removeSpecialChars) {
    result = result.replace(SPECIAL_CHARS_REGEX, '')
  }

  if (opts.separator === '-') {
    result = result.replace(SPACE_UNDERSCORE_REGEX, '-')
  } else if (opts.separator === '_') {
    result = result.replace(SPACE_DASH_REGEX, '_')
  } else {
    result = result.replace(SPACE_DASH_UNDERSCORE_REGEX, '')
  }

  if (opts.separator) {
    if (opts.separator === '-') {
      result = result.replace(TRIM_DASHES_REGEX, '')
    } else if (opts.separator === '_') {
      result = result.replace(TRIM_UNDERSCORES_REGEX, '')
    }
  }

  if (opts.maxLength != null && opts.maxLength > 0 && result.length > opts.maxLength) {
    result = result.slice(0, opts.maxLength)
    if (opts.separator) {
      if (opts.separator === '-') {
        result = result.replace(TRIM_DASHES_REGEX, '')
      } else if (opts.separator === '_') {
        result = result.replace(TRIM_UNDERSCORES_REGEX, '')
      }
    }
  }

  return result
}
