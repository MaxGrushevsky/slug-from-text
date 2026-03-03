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

  let result = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

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
    result = result.replace(/[^\w\s-]/g, '')
  }

  if (opts.separator === '-') {
    result = result.replace(/[\s_]+/g, '-')
  } else if (opts.separator === '_') {
    result = result.replace(/[\s-]+/g, '_')
  } else {
    result = result.replace(/[\s_-]+/g, '')
  }

  if (opts.separator) {
    result = result.replace(new RegExp(`^${opts.separator}+|${opts.separator}+$`, 'g'), '')
  }

  if (opts.maxLength != null && opts.maxLength > 0 && result.length > opts.maxLength) {
    result = result.slice(0, opts.maxLength)
    if (opts.separator) {
      result = result.replace(new RegExp(`${opts.separator}+$`, 'g'), '')
    }
  }

  return result
}
