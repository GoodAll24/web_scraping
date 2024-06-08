// const { puppeteer } = require("puppeteer");
// "type": "module",
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");
const { timeout } = require("puppeteer");

// url
const url = [
  "https://www.excelsior.com.mx/musica", // Esta pagina da problemas, (problemas de carga)
  "https://www.sdpnoticias.com/espectaculos/musica/",
  "https://heraldodemexico.com.mx/espectaculos/",
  "https://www.eluniversal.com.mx/espectaculos/",
  "https://www.milenio.com/espectaculos/musica ",
  "https://www.milenio.com/cultura",
  "https://www.cronica.com.mx/escenario",
  "https://www.proceso.com.mx/cultura/",
  "https://www.jornada.com.mx/categoria/espectaculos ",
  "https://www.jornada.com.mx/categoria/espectaculos",
  "https://www.capitalmexico.com.mx/category/show/",
  "https://www.publimetro.com.mx/entretenimiento/",
  "https://www.elpuntocritico.com/vida-y-estilo/8-cultura",
  "https://www.diariodemexico.com/escena",
  "https://lasillarota.com/gente-vida/",
  "https://www.infobae.com/tag/mexico-entretenimiento/",
  "https://www.publimetro.com.mx/entretenimiento/",
  "https://radiobox.com.mx/category/espectaculos/",
  "https://desdepuebla.com/noticias/desde-el-show/",
  "https://www.noroeste.com.mx/entretenimiento/espectaculos",
  "https://www.tvazteca.com/aztecanoticias/espectaculos",
  "https://www.aztecaqueretaro.com/espectaculos/",
  "https://www.elfinanciero.com.mx/tags/musica",
  "https://www.marca.com/mx/trending/musica.html",
  "https://www.elsiglodetorreon.com.mx/seccion/espectaculos/",
  "https://es.rollingstone.com/mex/ ",
  "https://www.elimparcial.com/tags/musica/",
  "https://www.fusionradio.mx/musica.cfm",
  "https://laoferta.com/category/entertainment/entertainment-news/",
  "https://www.diariodemexico.com/escena",
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
  console.log(`iendo a la pagina \n ${url[1]}`);
  await page1.goto(url[1]);

  // Set screen size
  await page1.setViewport({ width: 1920, height: 6000 });


  const expresion2 = 'div#fusion-app > div.content-main > div.feed-thirds-container';

  // para que cargue completa
  // await page1.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });

  // Para esperar un elemento específico
  // await page1.waitForSelector(expresion, { visible: true });

  // Screenshot
  // await page1.screenshot({ path: 'test.jpg' })

  // expresion



  const content = await page1.evaluate(() => document.body.innerHTML);

  // console.log(content);
  // Cargando texto de la page
  const data = $.load(content);


  // -----Esta es la parte de arriba----- //
  // data('li.small-card-media').each((i, bigNews) => {
  //   console.log(data(bigNews).html());
  //   let link = data(bigNews).find('a.media').attr("href");
  //   let title = data(bigNews).find('h2.card-title').text();
  //   let image = data(bigNews).find('img').attr("src");
  //   let description = data(bigNews).find('span.card-text').text();
  //   console.log(`Noticia ${i + 1} ...`);
  //   console.log("link --> ", link, "\n");
  //   console.log("title --> ", title, "\n");
  //   console.log("image --> ", image, "\n");
  //   console.log("description --> ", description, "\n");
  // });

  // -----Artículos pequeños----- //
  const datos = [];
  data(expresion2)
    .each((i, element) => {
      data(element).find('div.feed-thirds').each((j, maas) => {
        datos.push({});
        datos[i + j].pos = `i --> ${i}, j --> ${j}`;
        datos[i + j].title = data(maas).find('article > a > h2').text();
        datos[i + j].link = `${url[1]}${data(maas).find('article > a').attr("href")}`;
        datos[i + j].description = data(maas).find('article > a > span').text();
        datos[i + j].image = data(maas).find('article > a > img').attr("src");
        // console.log(i + 1, data(maas).html());
      });
      // console.log(i + 1, data(element).html());
    });


  // datos.push({});
  // datos[i].title = data(element).find('div > article > a > h2').text();
  // datos[i].link = `${url[1]}${data(element).find('div > article > a').attr("href")}`;
  // datos[i].description = data(element).find('div > article > a > span').text();
  // datos[i].image = data(element).find('div > article > a > img').attr("src");


  console.log(datos);



  // console.log("contenido --> ", cont);

  await browser.close();
};




main();