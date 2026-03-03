# slug-from-text

Generate URL-friendly slugs from text.

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
slug('Very long title here', { maxLength: 12 }) // 'very-long-ti'
slug('TITLE', { locale: 'tr' })         // locale-aware lowercase
```

## API

### `slug(text: string, options?: SlugOptions): string`

- **text** — input string
- **options**
  - `separator` — `'-'` | `'_'` | `''` (default: `'-'`)
  - `lowercase` — boolean (default: `true`)
  - `removeSpecialChars` — boolean (default: `true`)
  - `maxLength` — number (optional). Max length; cuts and trims trailing separator
  - `locale` — string | false (optional). Locale for lowercase (e.g. `'tr'` for Turkish)

## License

MIT
