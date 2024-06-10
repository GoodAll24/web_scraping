// const { puppeteer } = require("puppeteer");
// "type": "module",
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");

const { sdpnoticias } = require("./helpers/scrapers");

// url
const url = [
  "https://www.excelsior.com.mx/musica", // error de caarga
  "https://www.sdpnoticias.com/espectaculos/musica/", // done
  "https://www.milenio.com/espectaculos/musica", // done
  "https://www.elimparcial.com/tags/musica/", // done
  "https://www.informador.mx/musica-t32",
  "https://es.rollingstone.com/mex/",
  "https://www.cronica.com.mx/escenario",
  "https://radiobox.com.mx/category/espectaculos/",
  "https://desdepuebla.com/noticias/desde-el-show/",
  "https://www.elsiglodetorreon.com.mx/seccion/espectaculos",
];
const tester = "https://bot.sannysoft.com";
puppeteer.use(StealthPlugin());


const main = async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch({ headless: true, executablePath: executablePath(), });
  const page1 = await browser.newPage();
  console.log("pagina abierta");
  // const html = '<h1 class="titulo">Hola Mundo</h1>';
  // go to url using the page
  console.log(`iendo a la pagina \n ${url[4]}`);
  await page1.goto(url[4]);

  // Set screen size
  await page1.setViewport({ width: 1920, height: 6000 });


  const expresion2 = 'section > div.section-content > div.row > div > div[class="mod-content clearfix"] > div.col-main > article';
  const datos = [];

  // para que cargue completa
  // await page1.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });

  // Para esperar un elemento específico
  // await page1.waitForSelector(expresion, { visible: true });

  // Screenshot
  await page1.screenshot({ path: 'test.jpg' })

  // expresion



  const content = await page1.evaluate(() => document.body.innerHTML);

  // console.log(content);
  // Cargando texto de la page
  const data = $.load(content);


  // -----Artículos pequeños----- //
  data(expresion2)
    .each((i, element) => {
      console.log(data(element).html());
      datos.push({});
      let long = datos.length - 1;
      datos[long].title = data(element).find('div > h2').text();
      datos[long].link = `${url[4]}${data(element).find('figure > a').attr("href")}`;
      datos[long].image = `${url}${data(element).find('figure > a > img').attr("src")}`;
      datos[long].time = data(element).find('div > p > time').attr("datetime");
    });

  // const cont = data(expresion2).html();

  // datos.push({});
  // let long = datos.length - 1;
  // datos[long].title = data(element).find('h2').attr("title");
  // datos[long].link = `${url[4]}${data(element).find('a').attr("href")}`;
  // datos[long].description = data(element).find('div > article > a > span').text();
  // datos[long].image = data(element).find('img').attr("src");
  // datos[long].time = data(element).find('time').attr("datetime");

  // const datosFinales = sdpnoticias(data, url[1], datos);
  // console.log(datosFinales);

  console.log(datos);

  // console.log("contenido --> ", cont);

  await browser.close();
};




main();