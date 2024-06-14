// const { puppeteer } = require("puppeteer");
// "type": "module",
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");

const { sdpnoticias } = require("./helpers/scrapers");

// url
const mexico = [
  "https://www.excelsior.com.mx/musica", // error de caarga
  "https://www.sdpnoticias.com/espectaculos/musica/", // done
  "https://www.milenio.com/espectaculos/musica", // done
  "https://www.elimparcial.com/tags/musica/", // done
  "https://www.informador.mx/musica-t32", // done
  "https://es.rollingstone.com/categoria/musica/", // error de carga (posible necesidad de vpn)
  "https://www.cronica.com.mx/escenario", // done
  "https://radiobox.com.mx/category/espectaculos/", //  error de carga (posible necesidad de vpn)
  "https://desdepuebla.com/noticias/desde-el-show/",
  "https://www.elsiglodetorreon.com.mx/seccion/espectaculos",
];
const usa = [
  'https://www.billboard.com/c/espanol/noticias/', // problemas de carga
  'https://www.billboard.com/c/espanol/musica/', // problemas de carga
  'https://www.telemundo.com/entretenimiento', //* (aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista) '
  'https://www.latimes.com/espanol/etiqueta/musica', // done
  'https://cnnespanol.cnn.com/category/musica/', // *(aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista)
  'https://prensadehouston.com/category/entretenimiento/', // no me muestra el codigo
  'https://impactolatino.com/musica-entretenimiento/', // problemas de carga 
  'https://es.rollingstone.com/categoria/musica/noticias-musica/',
  'https://www.hispanicpost.com/category/entretenimiento/musica-tv-y-cine/', // error 404
  'https://somoslarevistausa.com/category/musica/',
  'https://lakw.us/category/musica/',
  'https://www.telemundoamarillo.com/entretenimiento/',
  'https://www.mundodeportivo.com/us/estrellas-latinas',
  'https://www.noticiany.com/category/entretenimiento/',
  'https://musicaislife.com/musica-news/',
  'https://wowlarevista.com/category/musica/',
  'https://www.notistarz.com/categorias/musica/',
  'https://efe.com/noticias/musica/',
];
const tester = "https://bot.sannysoft.com";
puppeteer.use(StealthPlugin());


const main = async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch({ headless: true, executablePath: executablePath(), });
  const page1 = await browser.newPage();
  console.log("pagina abierta");
  // const html = '<h1 class="titulo">Hola Mundo</h1>';

  const url = 'https://lakw.us/category/musica/';
  // go to url using the page
  console.log(`iendo a la pagina \n ${url}`);
  await page1.goto(url);

  // Set screen size
  await page1.setViewport({ width: 1920, height: 6000 });


  const expresion2 = 'div > div > div > div > div > div > div > div > div > div > ul > li';

  const datos = [];

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

  // console.log(data('div > div > div > div > div > div > article').html());
  // -----Artículos pequeños----- //


  data(expresion2)
    .each((i, element) => {
      // console.log(i, data(element).html());

      datos.push({});
      let long = datos.length - 1;
      datos[long].title = data(element).find('a > div > div > div > h2').text();
      datos[long].link = `${data(element).find('a').attr("href")}`;
      datos[long].description = data(element).find('a > div > div > div > p').text();
      datos[long].image = `${data(element).find('a > div > div > img').attr("data-src")}`;
      datos[long].time = null;// data(element).find('div > p > time').attr("datetime");
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
  await page1.close();
  await browser.close();
};




main();