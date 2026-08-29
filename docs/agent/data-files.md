# Archivos de datos

## `docs/news-aggregator-bad-medios.json`

Reporte de medios fallidos o vacíos (generado desde logs del aggregator).

| Campo | Uso |
|-------|-----|
| `id` | Clave compartida con `access.json` y Strapi |
| `kind` | `scrape` o `rss` — scripts filtran `scrape` |
| `url` | Página listado a scrapear (puede tener espacios al final; scripts hacen `.trim()`) |
| `category` | `selectors`, `http_4xx`, `timeout`, etc. |
| `status` | `empty` (0 items) o `fail` (error de red) |
| `notes` | Resultado de revisión humana; no vacío → entra en `checks.json` al exportar |
| `logo` | Opcional — favicon del medio (solo entradas nuevas por ahora) |
| `reviewed` | Flag manual de revisión |

## `access.json`

Mapa `{ "<id>": { ext, extImg, main, title, link, image, content } }`.

- Solo entradas con `title` no vacío se exportan a `para-migracion.json`.
- `ext` / `extImg`: resolver URLs relativas contra el origin de la página.

## Salidas de export

- **`para-migracion.json`** — `{ news: [{ id, access: [...] }] }` para migrar a la API.
- **`checks.json`** — medios con `notes` no vacías y su `result`.

## `html/`

Cache de HTML por id (`fetch-html.js`). `_summary.json` resume la última corrida.
