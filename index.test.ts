import { describe, it, expect } from 'vitest'
import { slug } from './index'

describe('slug', () => {
  it('returns empty string for empty or non-string', () => {
    expect(slug('')).toBe('')
    expect(slug('   ')).toBe('')
    expect(slug(null as any)).toBe('')
    expect(slug(undefined as any)).toBe('')
  })

  it('converts to lowercase with default options', () => {
    expect(slug('Hello World')).toBe('hello-world')
    expect(slug('HELLO')).toBe('hello')
  })

  it('uses separator option', () => {
    expect(slug('a b c', { separator: '-' })).toBe('a-b-c')
    expect(slug('a b c', { separator: '_' })).toBe('a_b_c')
    expect(slug('a b c', { separator: '' })).toBe('abc')
  })

  it('removes special characters', () => {
    expect(slug('Café & Bar')).toBe('caf-bar') // é removed by removeSpecialChars
    expect(slug('Hello! World?')).toBe('hello-world')
  })

  it('respects lowercase: false', () => {
    expect(slug('Hello World', { lowercase: false })).toBe('Hello-World')
  })

  it('respects maxLength', () => {
    expect(slug('one two three', { maxLength: 7 })).toBe('one-two')
    expect(slug('ab cd ef', { maxLength: 5 })).toBe('ab-cd')
  })

  it('trims leading and trailing separators', () => {
    expect(slug('  hello world  ')).toBe('hello-world')
    expect(slug('---hello---')).toBe('hello')
  })
})
