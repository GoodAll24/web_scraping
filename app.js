// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const { intern } = require('./helpers/intern.js');
const { onCheck } = require('./helpers/urls');



// puppeteer.use(StealthPlugin());


const main = async () => {
  // // Launch browser and open a new page
  // const browser = await puppeteer.launch({
  //   args: [
  //     '--disable-gpu',
  //     '--disable-dev-shm-usage',
  //     '--disable-setuid-sandbox',
  //     '--no-first-run',
  //     '--no-sandbox',
  //     '--no-zygote',
  //     //'--single-process',
  //   ], headless: true, executablePath: executablePath(),
  // });

  // const page1 = await browser.newPage();
  // console.log("pagina abierta");
  // // const html = '<h1 class="titulo">Hola Mundo</h1>';

  // const url = masNoticias[1];


  // // go to url using the page
  // console.log(`iendo a la pagina \n ${url}`);
  // await page1.goto(url, { timeout: 90000, waitUntil: 'networkidle2' });

  // Set screen size
  // await page1.setViewport({ width: 1920, height: 6000 });


  // "image": null,
  // "content": "",
  // "main": "div > div > div > div > div > div > div > div > div > article",

  const art1 = {
    "ext": true,
    "link": "div > div > div > h3 > a",
    "main": "article.tnt-asset-type-article.clearfix",
    "image": "div > div > div > figure > div > div > img",
    "title": "div > div > div > h3 > a",
    "extImg": true,
    "content": null
  };

  const datos = [];

  // para que cargue completa
  // await page1.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });

  // Para esperar un elemento específico
  // await page1.waitForSelector(expresion, { visible: true });

  // Screenshot
  // await page1.screenshot({ path: 'test.jpg' })

  // expresion



  // const content = await page1.evaluate(() => document.body.innerHTML);
  // console.log(typeof content);
  // console.log(content);
  const url = onCheck[1];

  const { data } = await axios.get("https://www.notistarz.com/paola-jara-pipe-bueno-yeison-jimenez-y-luis-alfonso-en-semana-musical-de-billboard/");

  // Cargando texto de la page
  const $ = cheerio.load(data);

  // -----Artículos pequeños----- //


  // console.log($(art1["main"]).html());

  // $(art1["main"])
  //   .each((i, element) => {
  //     datos.push({});
  //     let long = datos.length - 1;
  //     datos[long].title = art1["title"] ? $(element).find(art1["title"]).text() : null;
  //     datos[long].link = art1["link"] ? art1["ext"] ? `${url}${$(element).find(art1["link"]).attr("href")}` : $(element).find(art1["link"]).attr("href") : null;
  //     datos[long].content = art1["content"] ? $(element).find(art1["content"]).text() : null;
  //     datos[long].image = art1["image"] ? art1["extImg"] ? `${url}${$(element).find(art1["image"]).attr("src")}` : $(element).find(art1["image"]).attr("src") : null;
  //     datos[long].publishedAt = new Date();
  //     datos[long].pubDate = new Date();
  //     // datos.scrape = fuente;
  //     datos[long].likes = 0;
  //     datos[long].dislikes = 0;
  //     datos[long].state = "pendiente";
  //     //datos.opinion = fuente.opinion;
  //   });

  $("div.entry-content").children().each((i, el) => {
    const ele = $(el).html();
    console.log("Elemento >>>> ", ele);
    // todaNoticia.push(ele);
  });

  // console.log("contenido --> ", cont);
  // await page1.close();
  // await browser.close();

  // console.clear();
  // console.log(datos);
};

const secondary = async () => {
  const access = "div.site > div > div.container > div > div > main.site-main > div > div.entry-content";
  const url = 'https://www.notistarz.com/trueno-domina-lista-de-popularidad-con-su-real-gangsta-love/';
  const url2 = 'https://www.notistarz.com/estrenos-musicales-de-la-semana-notistarz-56/';
  const datis = await intern(url2, access);

  console.log(datis);
};

main();

// secondary();


/*
[
  {
    "main":"",
    "title":"",
    "content":"",
    "link":"",
    "image":"",
    "ext":false,
    "extImg":false
  }
]
*/