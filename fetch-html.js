const fs = require("fs");
const path = require("path");
const axios = require("axios");
const report = require("./docs/news-aggregator-bad-medios.json");

const OUT = path.join(__dirname, "html");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const useBrowser = process.argv.includes("--browser");
const onlyId = process.argv.find((a) => /^\d+$/.test(a));

fs.mkdirSync(OUT, { recursive: true });

// ponytail: bot/challenge shells — retry with --browser
function looksIncomplete(html) {
  if (!html || html.length < 8000) return true;
  if (/Un momento|verifica su solicitud|cf-browser-verification|challenge-platform/i.test(html))
    return true;
  if (!/<article[\s>]/i.test(html) && !/<a[^>]+href=/i.test(html)) return true;
  return false;
}

async function fetchAxios(url) {
  const res = await axios.get(url, {
    timeout: 20000,
    maxRedirects: 5,
    responseType: "text",
    validateStatus: () => true,
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });
  return { status: res.status, html: typeof res.data === "string" ? res.data : null };
}

async function fetchBrowser(url) {
  const puppeteer = require("puppeteer-extra");
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent(UA);
    await page.setViewport({ width: 1280, height: 900 });
    const res = await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    // ponytail: lazy lists — scroll once, short wait
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight;
          window.scrollTo(0, y);
          if (y >= document.body.scrollHeight) resolve();
          else setTimeout(step, 150);
        };
        step();
      });
    });
    await new Promise((r) => setTimeout(r, 1500));
    return { status: res?.status() ?? 200, html: await page.content() };
  } finally {
    await browser.close();
  }
}

async function fetchOne(medio) {
  const url = medio.url.trim();
  const row = {
    id: medio.id,
    name: medio.name,
    url,
    status: null,
    saved: false,
    method: useBrowser ? "browser" : "axios",
  };

  try {
    let { status, html } = useBrowser
      ? await fetchBrowser(url)
      : await fetchAxios(url);

    if (!useBrowser && status === 200 && html && looksIncomplete(html)) {
      row.incomplete = true;
      row.method = "axios→browser";
      ({ status, html } = await fetchBrowser(url));
    }

    row.status = status;

    if (status === 200 && html) {
      const file = path.join(OUT, `${medio.id}.html`);
      fs.writeFileSync(file, html, "utf8");
      row.saved = true;
      row.file = file;
      row.bytes = Buffer.byteLength(html, "utf8");
      row.incomplete = looksIncomplete(html);
    }

    return row;
  } catch (e) {
    row.error = e.code || e.message;
    return row;
  }
}

async function main() {
  let medios = report.medios.filter((m) => m.kind === "scrape");
  if (onlyId) medios = medios.filter((m) => String(m.id) === onlyId);

  const results = [];
  for (const medio of medios) {
    const row = await fetchOne(medio);
    results.push(row);
    const tag = row.incomplete ? " (incompleto/challenge?)" : "";
    console.log(
      row.saved
        ? `OK  ${row.id} ${row.status} [${row.method}] → html/${row.id}.html (${row.bytes} B)${tag}`
        : `SKIP ${row.id} ${row.status ?? row.error} ${row.name}`,
    );
  }

  const summary = {
    at: new Date().toISOString(),
    mode: useBrowser ? "browser" : "axios+auto-browser",
    total: results.length,
    saved: results.filter((r) => r.saved).length,
    incomplete: results.filter((r) => r.incomplete).length,
    failed: results.filter((r) => !r.saved).length,
    results,
  };
  fs.writeFileSync(
    path.join(OUT, "_summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.error(`\n${summary.saved}/${summary.total} HTML guardados en html/`);
}

main();
