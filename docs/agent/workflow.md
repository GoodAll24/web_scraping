# Workflow de revisión

## Objetivo

Recorrer medios con error o sin selectores, definir `access.json`, validar con `scrape.js`, y exportar a Alta Voz.

## Orden sugerido

1. **Pendientes** — `node scrape.js` lista medios `scrape` + `category: selectors` sin entrada en `access.json` (o con `main` vacío).
2. **HTML local** — `npm run fetch-html` o `npm run fetch-html -- <id>`. Si axios devuelve challenge/incompleto, usar `--browser`.
3. **Selectores** — inspeccionar `html/<id>.html`, completar `access.json[id]`.
4. **Probar** — `node scrape.js <id>` debe devolver items con title/link.
5. **Notas** — actualizar `notes` en `docs/news-aggregator-bad-medios.json` (`ya esta arreglado`, `no se puede scrapear`, etc.).
6. **Exportar** — `npm run export-migration` genera `para-migracion.json` y `checks.json`.

## Medios nuevos

Agregar al report con `kind: scrape`, `category: selectors`, `status: empty`, `reviewed: false`. Opcional: campo `logo` (URL del favicon). Actualizar contadores en `summary`.

## Legacy (`app.js`)

`helpers/urls.js` exporta un objeto `onCheck` para pruebas interactivas con `processLinkBeta`. El flujo principal usa `scrape.js` + `access.json`, no `app.js`.
