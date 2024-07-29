// const { puppeteer } = require("puppeteer");
// "type": "module",
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const $ = require("cheerio");
const { executablePath } = require("puppeteer");

const { intern } = require('./helpers/intern.js');

const masNoticias = [
  "https://www.estilosblog.com/category/estilos-blog/entretenimiento/", // done tema imagen
  "https://blog.joinnus.com/entretenimiento/", // done
  "https://blog.joinnus.com/nueva-musica/", // done
  "https://www.lainformacion.com.do/mirador/musica-y-literatura", // problemas de espera
  "https://infoelnuevonorte.com/?cat=12 ", // done tema imagen
  "https://infoelnuevonorte.com/?cat=11 ", // done tema imagen
  "https://miamipocket.us/entretenimiento/", // done tema imagen
  "https://entretenimientotolima.com/category/agenda/musica/", // done
  "https://codigotv.net/category/entretenimiento/ ", // done
  "https://azuaalinstante.com/category/arte-y-espectaculo/ ", // done tema imagen
  "https://www.disco89fm.com/noticias", // done
  "https://precision.com.do/category/revista/espectaculos/",
  "https://www.elfarandi.com/musica/ https://intervez.com/category/culturaentretenimiento/musica/",
  "https://www.ntn24.com/noticias-entretenimiento",
  "https://deultimominuto.net/category/entretenimiento/",
  "https://www.enlacedigital.com.do/categoria/entretenimiento/",
  "https://diarioroatan.com/category/sociales/",
  "https://www.yucatan.com.mx/seccion/espectaculos",
  "https://amariemagazine.com/category/musica/",
  "https://amariemagazine.com/category/entretenimiento/conciertos/",
  "https://www.panasenutah.com/category/entretenimiento/musica/",
  "https://panoramaeconomicopma.com/categorias/farandula/",
  "https://impactolatino.com/entretenimiento/",
  "https://dominicanaaldia.do/Secciones/estilo-de-vida/",
  "https://elperiodiquito.com/category/mas/escenario/",
  "https://sglaradio.com/category/noticias/",
  "https://sglaradio.com/category/lanzamientos/",
  "https://ultimasnoticia.com/category/entretenimiento/",
];

const tester = "https://bot.sannysoft.com";
puppeteer.use(StealthPlugin());


const main = async () => {
  // Launch browser and open a new page
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

  const url = masNoticias[10];


  // go to url using the page
  console.log(`iendo a la pagina \n ${url}`);
  await page1.goto(url, { timeout: 90000, waitUntil: 'networkidle2' });

  // Set screen size
  // await page1.setViewport({ width: 1920, height: 6000 });


  // "image": null,
  // "content": "",
  // "main": "div > div > div > div > div > div > div > div > div > article",

  const art1 = {
    "main": "div > div > section > div > div > div > div > div.single-latest-post",
    "title": "div > div > a > h4",
    "link": "div > div > a > h4",
    "image": "div > div > img",
    "content": "",
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

  console.clear();
  console.log(datos);
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