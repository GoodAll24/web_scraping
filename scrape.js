const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const report = require("./docs/news-aggregator-bad-medios.json");
const accessMap = require("./access.json");

function abs(base, href, join) {
  if (!href) return null;
  if (!join && /^https?:\/\//i.test(href)) return href;
  if (!join) return href;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function resolveChrome() {
  try {
    const { executablePath } = require("puppeteer");
    const expected = executablePath();
    if (fs.existsSync(expected)) return expected;
  } catch {
    // chrome del puppeteer aún no descargado
  }
  const cacheDir = path.join(process.env.HOME, ".cache/puppeteer/chrome");
  if (fs.existsSync(cacheDir)) {
    for (const dir of fs.readdirSync(cacheDir).sort().reverse()) {
      const bin = path.join(cacheDir, dir, "chrome-linux64", "chrome");
      if (fs.existsSync(bin)) return bin;
    }
  }
  throw new Error("Chrome no instalado. Corré: npm run install-chrome");
}

async function fetchHtml(url) {
  const puppeteer = require("puppeteer");
  const chrome = resolveChrome();
  const minBytes = 8000;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: chrome,
      args: ["--no-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 3000));
      const html = await page.content();
      if (html.length >= minBytes) return html;
    } catch (e) {
      if (attempt === 3) throw e;
    } finally {
      await browser.close();
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }

  throw new Error(`Página incompleta o bloqueada: ${url}`);
}

async function scrape(url, access) {
  const data = await fetchHtml(url);
  const $ = cheerio.load(data);
  const origin = new URL(url).origin;
  const items = [];

  $(access.main).each((_, el) => {
    const $el = $(el);
    const title = access.title
      ? $el.find(access.title).first().text().trim() || null
      : null;
    const href =
      (access.link ? $el.find(access.link).first().attr("href") : null) ||
      ($el.is("a") ? $el.attr("href") : null);
    const link = abs(origin, href, access.ext);
    const content = access.content
      ? $el.find(access.content).first().text().trim() || null
      : null;
    const $img = access.image ? $el.find(access.image).first() : null;
    const rawImg = $img
      ? $img.attr("src") || $img.attr("data-src") || $img.attr("data-lazy-src")
      : null;
    const image = abs(origin, rawImg, access.extImg);
    if (title || link) items.push({ title, content, link, image });
  });

  return items;
}

async function main() {
  const id = process.argv[2];
  const medios = report.medios.filter((m) => m.kind === "scrape");

  if (!id) {
    const pending = medios.filter(
      (m) => m.category === "selectors" && !accessMap[m.id] && !accessMap[String(m.id)],
    );
    console.log(
      JSON.stringify(
        pending.map((m) => ({ id: m.id, name: m.name, url: m.url.trim() })),
        null,
        2,
      ),
    );
    console.error(
      `\n${pending.length} scrape/selectors sin access. Uso: node scrape.js <id>`,
    );
    return;
  }

  const medio = medios.find((m) => String(m.id) === String(id));
  if (!medio) {
    console.error(`medio ${id} no está en scrape del report`);
    process.exit(1);
  }

  const access = accessMap[id] ?? accessMap[String(id)];
  if (!access || !access.main) {
    console.error(`Sin access para ${id}. Pegá en access.json:`);
    console.log(
      JSON.stringify(
        {
          [id]: {
            ext: false,
            extImg: false,
            main: "",
            title: "",
            link: "",
            image: "",
            content: null,
          },
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }

  const items = await scrape(medio.url.trim(), access);
  console.log(
    JSON.stringify(
      {
        medio: { id: medio.id, name: medio.name, url: medio.url.trim() },
        access,
        count: items.length,
        items,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
