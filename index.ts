/**
 * Generate URL-friendly slug from text.
 * Zero dependencies.
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

  if (opts.lowercase) {
    result = opts.locale !== undefined && opts.locale !== false
      ? result.toLocaleLowerCase(opts.locale)
      : result.toLowerCase()
  }

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
