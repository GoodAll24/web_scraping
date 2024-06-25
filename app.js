// const { puppeteer } = require("puppeteer");
// "type": "module",
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");

const { sdpnoticias } = require("./helpers/scrapers");
const { timeout } = require("puppeteer");

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
  'https://lakw.us/category/musica/', // done
  'https://www.telemundoamarillo.com/entretenimiento/', // done
  'https://www.mundodeportivo.com/us/estrellas-latinas', // done
  'https://www.noticiany.com/category/entretenimiento/', // done
  'https://musicaislife.com/musica-news/', // tiempo de carga
  'https://wowlarevista.com/category/musica/', // security issues
  'https://www.notistarz.com/categorias/musica/',
  'https://efe.com/noticias/musica/',
];
const españa = [
  'http://noticiasclave.net', // done
  'https://www.elconfidencial.com/tags/temas/musica-5272/',
  'https://www.larazon.es/cultura/musica/',
  'https://www.elespanol.com/el-cultural/escenarios/musica/',
  'https://www.elperiodico.com/es/temas/musica-6584',
  'https://www.europapress.es/cultura/musica-00129/',
  'https://www.lavozdealmeria.com/temas/conciertos/1',
  'https://www.diariodecadiz.es/mapademusicas/',
  'https://www.laopiniondemalaga.es/tags/musica/',
  'https://www.diariosur.es/culturas/musica/',
  'https://www.lasprovincias.es/culturas/musica/',
  'https://www.epe.es/es/temas/musica-5359',
  'https://es.rollingstone.com/esp/',
  'https://los40.com/musica',
  'https://los40.com/los40_urban/',
  'https://www.efeeme.com/agenda/conciertos-agenda/',
  'https://www.cadena100.es/musica',
  'https://masterfm.es/category/musica/',
  'https://as.com/tikitakas/noticias/musica/',
  'https://gladyspalmera.com/actualidad/',
  'https://elpais.com/noticias/musica/',
  'https://www.europapress.es/cultura/musica-00129/',
  'https://www.lasexta.com/temas/musica-1',
  'https://www.telecinco.es/tags/musica',
  'https://www.cosmopolitan.com/es/musica-novedades/',
  'https://www.esquire.com/es/actualidad/musica/',
  'https://www.20minutos.es/minuteca/musica-trap/',
  'https://www.laverdad.es/culturas/musica/',
  'https://cadenaser.com/tag/musica/a/',
];
const tester = "https://bot.sannysoft.com";
puppeteer.use(StealthPlugin());


const main = async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch({ headless: true, executablePath: executablePath(), });
  const page1 = await browser.newPage();
  console.log("pagina abierta");
  // const html = '<h1 class="titulo">Hola Mundo</h1>';

  const url = 'http://noticiasclave.net';
  const art1 = 'div > section > div > div > section';


  // go to url using the page
  console.log(`iendo a la pagina \n ${url}`);
  await page1.goto(url, { timeout: 60000 });

  // Set screen size
  await page1.setViewport({ width: 1920, height: 6000 });



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


  data(art1)
    .each((i, element) => {
      // console.log(i, data(element).html());

      datos.push({});
      let long = datos.length - 1;
      datos[long].title = data(element).find('div > ul > li > h4 > a').text();
      datos[long].link = `${url}${data(element).find('div > ul > li > h4 > a').attr("href")}`;
      datos[long].content = data(element).find('div > ul > li > p').text();
      datos[long].image = `${url}${data(element).find('div > a > span > img').attr("src")}`;
      datos[long].publishedAt = new Date();
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