// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
const $ = require("cheerio");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const { timeout } = require("puppeteer");

const main = async () => {
  // axiosRetry(axios, { retries: 3 });
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


  const urls = [
    // "https://www.lavozdealmeria.com/noticia/5/vivir/278360/tom-jones-star-forever-en-almeria",
    // "https://www.lanacion.com.ar/espectaculos/personajes/el-triste-momento-de-slash-murio-su-hijastra-de-25-anos-nid22072024/",
    // "https://www.diariolibre.com/revista/cine/2024/08/08/trap-el-thriller-que-encabeza-los-estrenos-de-la-semana/2813117",
    // "https://elpilon.com.co/no-queremos-que-sea-una-sombra-de-nuestro-exito-anterior-los-de-juancho-lanzan-no-tengo-cuando/",
    // "https://www.perfil.com/noticias/espectaculos/me-fascina-lo-que-pasa-con-la-memoria-familiar.phtml",
    // "https://www.lavozdealmeria.com/noticia/5/vivir/278519/el-festival-de-rock-alternativo-que-pone-el-toque-underground-a-la-feria",
    // "https://cnnespanol.cnn.com/video/christian-nodal-estrena-no-me-100to-bien-showbiz/",
    // "https://cnnespanol.cnn.com/video/katy-perry-womans-world-nueva-cancion-album-showbiz-orix/",
    // "https://elpilon.com.co/regalo-del-cielo-empoderarte-iv-la-exposicion-fotografica-que-rinde-tributo-a-la-hermana-celina-quintero/",
    // "https://elpilon.com.co/todos-venimos-a-trabajar-hijo-de-kaleth-morales-molesto-por-cambio-de-turno-de-presentacion/",
    // "https://elpilon.com.co/no-hay-necesidad-vocalista-de-la-zona-8-sobre-las-artistas-vallenatas-que-usan-poca-ropa-en-redes/",
    // "https://www.americateve.com/cuba/muere-joven-cubano-mientras-cumplia-el-servicio-militar-una-carcel-cuba-n5387428",
    // "https://www.ole.com.ar/boca-juniors/plazos-diego-martinez-boca-cruzeiro-obligacion-ganar_0_tojQtsUgAG.html",
    "https://www.youtube.com/watch?v=67adlKoDrCY",
  ];

  // const extractionData = ['property="og:description"', 'property="og:image"', 'property="og:title"'];
  // const extractionData2 = ['name="twitter:description"', 'name="twitter:image"', 'name="twitter:title"'];
  const finalArray = [];
  for (let url of urls) {
    await axios.get(url, { timeout: 20000 })
      .then(async res => {
        const pageData = $.load(res.data);

        const scrapeLink = new URL(url);

        const newData = {
          title: pageData(`meta[property="og:title"]`).attr("content"),
          content: pageData(`meta[property="og:description"]`).attr("content"),
          image: pageData(`meta[property="og:image"]`).attr("content"),
          pubDate: pageData('meta[property="article:published_time"]').attr("content") || new Date(),
          scrape: {
            channel: pageData(`meta[property="og:site_name"]`).attr("content") || `${scrapeLink.hostname}`,
            url: `${scrapeLink.protocol}//${scrapeLink.hostname}`,
            link_logo: pageData('link[rel="icon"]').attr("href") || pageData('link[rel="shortcut-icon"]').attr("href") || `${scrapeLink.protocol}//${scrapeLink.hostname}/favicon.ico`,
            active: false,
            publishedAt: new Date(),
          },
        };

        if (!newData.scrape.channel || !newData.scrape.link_logo) {
          await axios.get(newData.scrape.url)
            .then(response => {
              const channelData = response.data;
              const channelPage = $.load(channelData);

              newData.scrape.channel = newData.scrape.channel || channelPage("title").text() || null;
              newData.scrape.link_logo = newData.scrape.link_logo || `${newData.scrape.url}/favicon.ico`;

            });
        }

        finalArray.push(newData);
      })
      .catch(error => {
        if (error.response) {
          console.log('Server responded with status:', error.response.status);
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error setting up request:', error.message);
        }
      });

    // console.log(pageData(`meta[${prop}]`).attr("content"));
  }

  // const arrey = [];

  // arrey.length ? console.log("si existe") : console.log("no existe");


  console.log(finalArray);

};




main();