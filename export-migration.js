const fs = require("fs");
const path = require("path");
const accessMap = require("./access.json");
const report = require("./docs/news-aggregator-bad-medios.json");

const ROOT = __dirname;

function toAccess(cfg) {
  return {
    main: cfg.main ?? "",
    title: cfg.title ?? "",
    link: cfg.link ?? "",
    ext: !!cfg.ext,
    extImg: !!cfg.extImg,
    content: cfg.content ?? null,
    image: cfg.image ?? "",
  };
}

const news = Object.entries(accessMap)
  .filter(([, cfg]) => cfg && String(cfg.title || "").trim())
  .map(([id, cfg]) => ({
    id: Number(id),
    access: [toAccess(cfg)],
  }))
  .sort((a, b) => a.id - b.id);

const checks = report.medios
  .filter((m) => m.kind === "scrape" && String(m.notes || "").trim())
  .map((m) => ({
    id: m.id,
    name: m.name,
    url: String(m.url || "").trim(),
    result: String(m.notes).trim(),
  }));

const migrationPath = path.join(ROOT, "para-migracion.json");
const checksPath = path.join(ROOT, "checks.json");

fs.writeFileSync(migrationPath, JSON.stringify({ news }, null, 2) + "\n");
fs.writeFileSync(
  checksPath,
  JSON.stringify({ at: new Date().toISOString(), checks }, null, 2) + "\n",
);

console.error(
  `para-migracion.json: ${news.length} news\nchecks.json: ${checks.length} checks`,
);
