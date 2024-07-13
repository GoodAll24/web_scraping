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
  "https://radiobox.com.mx/category/espectaculos/", //  error de carga (posible necesidad de vpn)
  "https://es.rollingstone.com/categoria/musica/", // error de carga (posible necesidad de vpn)
  "https://www.sdpnoticias.com/espectaculos/musica/", // done
  "https://www.milenio.com/espectaculos/musica", // done
  "https://www.elimparcial.com/tags/musica/", // done
  "https://www.informador.mx/musica-t32", // done
  "https://www.cronica.com.mx/escenario", // done
  "https://desdepuebla.com/noticias/desde-el-show/",
  "https://www.elsiglodetorreon.com.mx/seccion/espectaculos",
];
const usa = [
  'https://www.billboard.com/c/espanol/noticias/', // problemas de carga
  'https://www.billboard.com/c/espanol/musica/', // problemas de carga
  'https://impactolatino.com/musica-entretenimiento/', // problemas de carga 
  'https://musicaislife.com/musica-news/', // tiempo de carga
  'https://prensadehouston.com/category/entretenimiento/', // no me muestra el codigo
  'https://wowlarevista.com/category/musica/', // security issues
  'https://www.telemundo.com/entretenimiento', //* (aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista) '
  'https://cnnespanol.cnn.com/category/musica/', // *(aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista)
  'https://www.latimes.com/espanol/etiqueta/musica', // done
  'https://www.hispanicpost.com/category/entretenimiento/musica-tv-y-cine/', // error 404
  'https://somoslarevistausa.com/category/musica/', // done
  'https://lakw.us/category/musica/', // done
  'https://www.telemundoamarillo.com/entretenimiento/', // done
  'https://www.mundodeportivo.com/us/estrellas-latinas', // done
  'https://www.noticiany.com/category/entretenimiento/', // done
  'https://es.rollingstone.com/categoria/musica/noticias-musica/',
  'https://www.notistarz.com/categorias/musica/',
  'https://efe.com/noticias/musica/',
];
const españa = [
  'https://www.epe.es/es/temas/musica-5359', // Error 404
  'https://www.diariodecadiz.es/mapademusicas/', // Error 404
  'https://es.rollingstone.com/esp/', // VPN
  'http://noticiasclave.net', // done
  'https://www.elconfidencial.com/tags/temas/musica-5272/', // done, con falta de datos
  'https://www.larazon.es/cultura/musica/', // done
  'https://www.elespanol.com/el-cultural/escenarios/musica/', // done
  'https://www.elperiodico.com/es/temas/musica-6584', // done
  'https://www.europapress.es/cultura/musica-00129/', // done
  'https://www.lavozdealmeria.com/temas/conciertos/1', // done 
  'https://www.laopiniondemalaga.es/tags/musica/', // done
  'https://www.diariosur.es/culturas/musica/', // done
  'https://www.lasprovincias.es/culturas/musica/', // done
  'https://los40.com/musica', // done
  'https://los40.com/los40_urban/',
  'https://www.efeeme.com/agenda/conciertos-agenda/', // done
  'https://www.cadena100.es/musica', // done
  'https://masterfm.es/category/musica/', // done
  'https://as.com/tikitakas/noticias/musica/', // done
  'https://gladyspalmera.com/actualidad/', // done // tema con la imagen "header > div > a"
  'https://elpais.com/noticias/musica/', // done
  'https://www.lasexta.com/temas/musica-1', // done
  'https://www.telecinco.es/tags/musica', // done
  'https://www.cosmopolitan.com/es/musica-novedades/',  // done OJO con el link
  'https://www.esquire.com/es/actualidad/musica/',   // done OJO con el link
  'https://www.20minutos.es/minuteca/musica-trap/', // done
  'https://www.laverdad.es/culturas/musica/', // done
  'https://cadenaser.com/tag/musica/a/', // done
];
const colombia = [
  'https://www.eltiempo.com/cultura/musica-y-libros',  // Se repite
  'https://www.elcolombiano.com/cultura/musica', // Se repite
  'https://www.decibeles.net/noticias', // OJO con el link
  'https://www.semana.com/cultura/musica/', // done
  'https://www.elespectador.com/entretenimiento/musica/', // done
  'https://www.eluniversal.com.co/farandula', // done
  'https://occidente.co/secciones/espectaculo/', // done
  'https://www.elpais.com.co/entretenimiento/', // done
  'https://colombia.as.com/tikitakas/noticias/musica/', // done
  'https://intervallenato.com/inicio/category/noticias/', // done
  'https://www.midiario.co/category/farandula-2/', // done
  'https://elpilon.com.co/Noticias/el-vallenato/', // done
  'https://www.elcolombiano.com/cultura/musica', // done
  'https://www.estiloplay.com.co/category/musica/', // done
  'https://www.estiloplay.com.co/category/sony-music', // done
  'https://www.estiloplay.com.co/category/universal-music/', // done
  'https://www.estiloplay.com.co/category/warner-music/', // done
  'https://www.estiloplay.com.co/category/onerpm/', // done
  'https://es.rollingstone.com/col/', // VPN
  'https://revistadiners.com.co/category/cultura/musica/', // done
  'https://caracol.com.co/tendencias/entretenimiento/', // done
  'https://www.shock.co/musica', // done
  'https://www.shock.co/eventos', // done
  'https://www.wradio.com.co/tag/musica/a/', // done
];
const chile = [
  'https://www.emol.com/espectaculos/musica/', // error de carga
  'https://www.latercera.com/etiqueta/musica-culto/', // done
  'https://www.biobiochile.cl/lista/categorias/musica', // done
  'https://www.lacuarta.com/musica/', // done
  'https://www.lacuarta.com/urbana/', // done
  'https://los40.cl/actualidad/', // done
  'https://www.musicachilena.cl/v2/noticias/', // done
];
const rd = [
  'https://www.diariolibre.com/revista/music',
  'https://listindiario.com/entretenimiento/musica',
  'https://eldia.com.do/secciones/espectaculos/',
  'https://www.elcaribe.com.do/seccion/gente/a-y-e/',
  'https://eldia.com.do/secciones/espectaculos/',
  'https://notidigitalrd.com.do/category/entretenimiento/',
  'https://www.elperiodico.com.do/secciones/entretenimiento/',
  'https://eltestigo.do/entretenimiento',
  'https://diariosocialrd.com/categoria/musica/',
];
const tester = "https://bot.sannysoft.com";
puppeteer.use(StealthPlugin());


const main = async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch({ headless: true, executablePath: executablePath(), });
  const page1 = await browser.newPage();
  console.log("pagina abierta");
  // const html = '<h1 class="titulo">Hola Mundo</h1>';

  const url = chile[6];


  // go to url using the page
  console.log(`iendo a la pagina \n ${url}`);
  await page1.goto(url, { timeout: 60000, waitUntil: 'networkidle2' });

  // Set screen size
  await page1.setViewport({ width: 1920, height: 6000 });


  // "image": null,
  // "image": null,
  const art1 = {
    "main": "div > div > div > div > div",
    "title": "div > div > div > h3 > a",
    "content": "div > p",
    "link": "div > div > div > h3 > a",
    "image": "div > div > img",
    "ext": false,
    "extImg": false
  };

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


  console.log(datos);
};



main();


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