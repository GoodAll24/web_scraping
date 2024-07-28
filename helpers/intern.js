const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");



const intern = async (url, art1) => {
  try {

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        //'--single-process',
      ], headless: true, executablePath: executablePath(),
    });

    const page1 = await browser.newPage();
    console.log("pagina abierta");
    // const html = '<h1 class="titulo">Hola Mundo</h1>';

    // go to url using the page
    console.log(`iendo a la pagina \n ${url}`);
    await page1.goto(url, { timeout: 60000, waitUntil: 'networkidle2' });



    const content = await page1.evaluate(() => document.body.innerHTML);

    const data = $.load(content);

    const datos = [];
    data(art1).children().each((i, el) => datos.push(data(el).html()));
    


    // console.log("contenido --> ", cont);
    await page1.close();
    await browser.close();

    return datos;
  } catch (error) {

  }
};

module.exports = { intern };