# slug-from-text

Generate small, dependency-free, URL‑friendly slugs from text.

Works in Node.js and modern bundlers (ESM and CommonJS) and ships TypeScript types out of the box.

## Install

```bash
npm install slug-from-text
```

## Quick start

```ts
import { slug } from 'slug-from-text'

slug('Hello World!')                       // 'hello-world'
slug('Hello World!', { separator: '_' })   // 'hello_world'
slug('Hello World!', { lowercase: false }) // 'Hello-World'
slug('Café & Bar', { removeSpecialChars: true }) // 'cafe-bar'
slug('Very long title here', { maxLength: 12 })  // 'very-long-ti'
slug('TITLE', { locale: 'tr' })            // locale-aware lowercase
```

### CommonJS usage

```js
const { slug } = require('slug-from-text')

slug('Hello World!') // 'hello-world'
```

## API

### `slug(text: string, options?: SlugOptions): string`

- **text** — input string
- **options** — optional configuration:
  - `separator` — `'-'` | `'_'` | `''` (default: `'-'`).
    - Replaces whitespace and the other two separators with this character (or removes them if `''`).
  - `lowercase` — `boolean` (default: `true`).
    - When `true`, converts the string to lowercase before further processing.
  - `removeSpecialChars` — `boolean` (default: `true`).
    - When `true`, removes non‑word characters (punctuation, symbols, etc.).
  - `maxLength` — `number` (optional).
    - If provided and greater than 0, the resulting slug is cut to this length and trailing separators are trimmed.
  - `locale` — `string | false` (optional).
    - When set (for example, `'tr'`), uses `toLocaleLowerCase(locale)` for lowercasing instead of `toLowerCase()`.
    - When `false` or `undefined`, default lowercasing is used.

### TypeScript types

This package ships TypeScript declarations and exports the following types:

- `SlugOptions` — options object type for the `slug` function.
- `SlugSeparator` — allowed separators: `'-' | '_' | ''`.

You can import them if needed:

```ts
import { slug, type SlugOptions, type SlugSeparator } from 'slug-from-text'
```

## Normalization details

- **Accented Latin letters and special symbols**
  - Latin letters with diacritics and some special symbols (for example, `é`, `ö`, `ñ`, `ß`, `æ`, `œ`, `İ`, `ı`) are normalized to their closest ASCII equivalents (`e`, `o`, `n`, `ss`, `ae`, `oe`, `i`, `i`).
  - The normalization happens before special characters are removed and separators are applied.

- **Whitespace and separators**
  - All consecutive whitespace characters are collapsed and turned into the chosen `separator` (or removed when `separator` is `''`).
  - Leading and trailing separators are always trimmed.

- **Empty and non‑string values**
  - If `text` is empty, consists only of whitespace, or is not a string, `slug` returns an empty string.

## License

MIT
