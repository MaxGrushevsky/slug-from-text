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
}

const defaultOptions: Required<SlugOptions> = {
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
    result = result.toLowerCase()
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

  return result
}
