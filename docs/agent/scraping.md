# Scraping y selectores

## `scrape.js`

- Sin args: lista pendientes (`selectors` sin `access` o sin `main`).
- Con `<id>`: fetch con Puppeteer (Chrome de `~/.cache/puppeteer` o `npm run install-chrome`), aplica selectores de `access.json`, imprime items JSON.

Campos de access:

| Campo | Descripción |
|-------|-------------|
| `main` | Contenedor de cada noticia (requerido) |
| `title` | Texto del título |
| `link` | `href` del enlace (fallback: `a` del propio `main`) |
| `image` | `src` / `data-src` / `data-lazy-src` |
| `content` | Resumen opcional; `null` si no aplica |
| `ext` | Absolutizar links relativos |
| `extImg` | Absolutizar URLs de imagen |

## `fetch-html.js`

- Default: axios; si HTML &lt; 8KB o detecta Cloudflare/challenge → Puppeteer stealth automático.
- `--browser`: forzar Puppeteer para todos.
- `<id>`: solo ese medio.

## Convenciones

- Preferir selectores estables (clases de bloques de noticias, no ids dinámicos).
- Probar con al menos 3–5 items antes de marcar `notes: ya esta arreglado`.
- No commitear `html/` ni credenciales.

## Dependencias

- **cheerio** — parseo en `scrape.js`
- **puppeteer** 22.x — páginas JS-rendered y anti-bot
- **axios** — fetch rápido en `fetch-html.js`
