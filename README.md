# slug-from-text

Generate URL-friendly slugs from text. Zero dependencies.

## Install

```bash
npm install slug-from-text
```

## Usage

```ts
import { slug } from 'slug-from-text'

slug('Hello World!')                    // 'hello-world'
slug('Hello World!', { separator: '_' }) // 'hello_world'
slug('Hello World!', { lowercase: false }) // 'Hello-World'
slug('Café & Bar', { removeSpecialChars: true }) // 'cafe-bar'
```

## API

### `slug(text: string, options?: SlugOptions): string`

- **text** — input string
- **options**
  - `separator` — `'-'` | `'_'` | `''` (default: `'-'`)
  - `lowercase` — boolean (default: `true`)
  - `removeSpecialChars` — boolean (default: `true`)

## License

MIT
