const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const REPORT_PATH = path.join(ROOT, "docs/news-aggregator-bad-medios.json");
const ACCESS_PATH = path.join(ROOT, "access.json");

// ponytail: solo pending explícitos; cualquier otra note → revisado y se elimina
const PENDING_NOTES = new Set(["", "noticia nueva"]);

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

function recomputeSummary(medios) {
  const sum = (fn) =>
    medios.reduce((a, m) => {
      const k = fn(m);
      a[k] = (a[k] || 0) + 1;
      return a;
    }, {});
  return {
    totalBad: medios.length,
    byKind: sum((m) => m.kind),
    byCategory: sum((m) => m.category),
    byStatus: sum((m) => m.status),
  };
}

function removeReviewedMedios(report) {
  const removed = report.medios.filter((m) => {
    const notes = String(m.notes || "").trim();
    return notes && !PENDING_NOTES.has(notes);
  });
  report.medios = report.medios.filter((m) => {
    const notes = String(m.notes || "").trim();
    return !notes || PENDING_NOTES.has(notes);
  });
  report.summary = recomputeSummary(report.medios);
  return removed;
}

const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
const accessMap = JSON.parse(fs.readFileSync(ACCESS_PATH, "utf8"));

const checks = report.medios
  .filter((m) => m.kind === "scrape" && String(m.notes || "").trim())
  .map((m) => ({
    id: m.id,
    name: m.name,
    url: String(m.url || "").trim(),
    result: String(m.notes).trim(),
  }));

// ponytail: news antes de borrar access, si no los revisados no llegan a para-migracion
const news = Object.entries(accessMap)
  .filter(([, cfg]) => cfg && String(cfg.title || "").trim())
  .map(([id, cfg]) => ({
    id: Number(id),
    access: [toAccess(cfg)],
  }))
  .sort((a, b) => a.id - b.id);

const removed = removeReviewedMedios(report);
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");

let accessRemoved = 0;
for (const m of removed) {
  if (delete accessMap[String(m.id)]) accessRemoved++;
}
if (accessRemoved) {
  fs.writeFileSync(ACCESS_PATH, JSON.stringify(accessMap, null, 2) + "\n");
}

const migrationPath = path.join(ROOT, "para-migracion.json");
const checksPath = path.join(ROOT, "checks.json");

fs.writeFileSync(migrationPath, JSON.stringify({ news }, null, 2) + "\n");
fs.writeFileSync(
  checksPath,
  JSON.stringify({ at: new Date().toISOString(), checks }, null, 2) + "\n",
);

console.error(
  `bad-medios: −${removed.length} revisados → ${report.medios.length} pendientes\n` +
    `access.json: −${accessRemoved} entradas\n` +
    `para-migracion.json: ${news.length} news\nchecks.json: ${checks.length} checks`,
);
