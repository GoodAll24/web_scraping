# web_scraping

Herramientas locales para descubrir selectores CSS y exportar configuración de scraping de noticias para Alta Voz.

## Commands

```bash
npm run install-chrome   # una vez — Chrome para Puppeteer
npm run scrape           # pendientes sin access, o probar: node scrape.js <id>
npm run fetch-html       # HTML del report → html/<id>.html
npm run fetch-html:browser
npm run export-migration # para-migracion.json + checks.json
```

## Guidelines

- [Workflow de revisión](docs/agent/workflow.md)
- [Archivos de datos](docs/agent/data-files.md)
- [Scraping y selectores](docs/agent/scraping.md)
