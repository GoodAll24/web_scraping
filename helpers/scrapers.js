const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");



module.export = async (url, art1) => {
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
  
    const url = "https://www.latingrammy.com/en/news";
  
  
    // go to url using the page
    console.log(`iendo a la pagina \n ${url}`);
    await page1.goto(url, { timeout: 60000, waitUntil: 'networkidle2' });
  
    // Set screen size
    // await page1.setViewport({ width: 1920, height: 6000 });
  
  
    // "image": null,
    // "content": "",
    // "main": "div > div > div > div > div > div > div > div > div > article",
  
    const art1 = {
      "main": "div > div > main > section > section > section",
      "title": "div > div > div > a.text-15.md-xl:text-22.md-xl:font-medium.leading-tight.mt-2",
      "content": null,
      "link": "div > div > div > a",
      "image": "div > div > div > a > img",
      "ext": true,
      "extImg": false
    };
  
    const datos = [];
  
    const content = await page1.evaluate(() => document.body.innerHTML);
  
    const data = $.load(content);
  
    // -----Artículos pequeños----- //
    data(art1["main"])
      .each((i, element) => {
        // console.log(i, data(element).html());
  
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = art1["title"] ? data(element).find(art1["title"]).text() : null;
        datos[long].link = art1["link"] ? art1["ext"] ? `${url}${data(element).find(art1["link"]).attr("href")}` : data(element).find(art1["link"]).attr("href") : null;
        datos[long].content = art1["content"] ? data(element).find(art1["content"]).text() : null;
        datos[long].image = art1["image"] ? art1["extImg"] ? `${url}${data(element).find(art1["image"]).attr("src")}` : data(element).find(art1["image"]).attr("src") : null;
        datos[long].publishedAt = new Date();
        datos[long].pubDate = new Date();
        // datos.scrape = fuente;
        datos[long].likes = 0;
        datos[long].dislikes = 0;
        datos[long].state = "pendiente";
        //datos.opinion = fuente.opinion;
      });
  
  
    // console.log("contenido --> ", cont);
    await page1.close();
    await browser.close();

    return datos;
  } catch (error) {

  }
};