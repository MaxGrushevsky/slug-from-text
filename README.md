# slug-from-text

> Generate URL-friendly slugs from any text. Zero dependencies. TypeScript-first.

[![npm](https://img.shields.io/npm/v/slug-from-text)](https://www.npmjs.com/package/slug-from-text)
[![license](https://img.shields.io/npm/l/slug-from-text)](./LICENSE)

## Features

- Converts any text to a clean, URL-safe slug
- Normalizes **accented Latin letters** to ASCII (`é` → `e`, `ß` → `ss`, `æ` → `ae`, etc.)
- Configurable **separator** (`-`, `_`, or none), **max length**, **locale-aware lowercase**
- Written in **TypeScript** — ships with full type declarations
- **Zero runtime dependencies**
- Works in Node.js, Deno, Bun, and modern browsers
- ESM + CommonJS dual build

## Install

```bash
npm install slug-from-text
# or
pnpm add slug-from-text
# or
yarn add slug-from-text
```

## Usage

```ts
import { slug } from 'slug-from-text'

slug('Hello World!')                              // 'hello-world'
slug('Café & Bar')                                // 'cafe-bar'
slug('Über groß')                                 // 'uber-gross'
slug('Hello World!', { separator: '_' })          // 'hello_world'
slug('Hello World!', { separator: '' })           // 'helloworld'
slug('Hello World!', { lowercase: false })        // 'Hello-World'
slug('Very long title here', { maxLength: 10 })   // 'very-long'
slug('Istanbul', { locale: 'tr' })                // locale-aware lowercase
```

CommonJS (require) is also supported:

```js
const { slug } = require('slug-from-text')

slug('Hello World!') // 'hello-world'
```

## API

### `slug(text: string, options?: SlugOptions): string`

Converts text to a URL-friendly slug.

Returns `''` for empty strings, whitespace-only strings, and non-string values.

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `separator` | `'-' \| '_' \| ''` | `'-'` | Character used to replace spaces and other separators |
| `lowercase` | `boolean` | `true` | Convert to lowercase before processing |
| `removeSpecialChars` | `boolean` | `true` | Remove non-word characters (punctuation, symbols) |
| `maxLength` | `number` | — | Trim result to this length; trailing separators are removed |
| `locale` | `string \| false` | — | Locale for `toLocaleLowerCase()` (e.g. `'tr'` for Turkish) |

### TypeScript types

The package exports the following types:

```ts
import { slug, type SlugOptions, type SlugSeparator } from 'slug-from-text'
```

- `SlugOptions` — options object for the `slug` function
- `SlugSeparator` — union type `'-' | '_' | ''`

## Normalization details

**Accented Latin characters** are normalized via Unicode NFD decomposition + diacritic strip, with additional manual mappings:

| Input | Output | | Input | Output |
|---|---|---|---|---|
| `é ö ñ` | `e o n` | | `ß` | `ss` |
| `æ` / `Æ` | `ae` / `AE` | | `œ` / `Œ` | `oe` / `OE` |
| `ı` | `i` | | `İ` | `I` |

**Separators and whitespace:**
- Consecutive whitespace is collapsed and replaced by `separator`
- Leading and trailing separators are always trimmed

## Development

```bash
git clone https://github.com/MaxGrushevsky/slug.git
cd slug
npm install

npm run build         # compile to dist/
npm test              # run tests once
npm run test:watch    # run tests in watch mode
npm run typecheck     # TypeScript type-check only
```

## License

[MIT](./LICENSE)
