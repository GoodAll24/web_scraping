// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const { intern } = require('./helpers/intern.js');
const { add_media, add_media_data } = require('./helpers/urls');



// puppeteer.use(StealthPlugin());


const main = async () => {

  const art1 = {
    "ext": false,
    "link": "div > a",
    "main": "article.jeg_post.jeg_pl_md_1.format-standard",
    "image": "div > a > div > img",
    "title": "div > h3",
    "content": "",
    "extImg": false,
    "cssImage": true,
    "cssImageAttr": "data-src",
    "cssImageExtraText": false
  };
  // const pos = 5;
  // const art1 = add_media_data[pos];
  // const url = add_media[pos];
  const url = "https://hoydia.com.ar/espectaculos/";
  const datos = [];
  console.log("Getting page...");
  await axios.get(url)
    .then(response => {
      console.log("Page loaded!");
      const $ = cheerio.load(response.data);

      // -----Getting articles----- //
      // console.log($(art1["main"]).html());

      $(art1["main"])
        .each((i, element) => {
          // console.log($(element).html());
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = art1["title"] ? `${$(element).find(art1["title"]).text()}`.trim() : null;
          datos[long].link = art1["link"] ? art1["ext"] ? `${url}${$(element).find(art1["link"]).attr("href")}` : $(element).find(art1["link"]).attr("href") : null;
          datos[long].content = art1["content"] ? $(element).find(art1["content"]).text() : null;
          datos[long].image = art1["image"]
            ? art1["cssImage"]
              ? art1["cssImageExtraText"]
                ? art1["cssImageAttr"] === "style"
                  ? `${$(element).find(art1["image"]).attr(art1["cssImageAttr"])}`.slice(23, -3)
                  : `${$(element).find(art1["image"]).attr(art1["cssImageAttr"])}`.slice(5, -2)
                : $(element).find(art1["image"]).attr(art1["cssImageAttr"])
              : art1["extImg"]
                ? `${art1["media"]}/${$(element).find(art1["image"]).attr("src")}`
                : $(element).find(art1["image"]).attr("src") : null;
          datos[long].publishedAt = new Date();
          datos[long].pubDate = new Date();
          datos[long].likes = 0;
          datos[long].dislikes = 0;
          datos[long].state = "pendiente";
        });
      console.log(datos);
    })
    .catch(error => console.log("Error with page --> ", url, "\n >>>", error.code || error))
    .finally(() => console.log("Done! \n\n\n"));

  // -----Getting metadata----- //
  const parsedEnlace = new URL(url);
  console.log("Getting metadata from: ", parsedEnlace.hostname, "...");
  await axios.get(`${parsedEnlace.protocol}//${parsedEnlace.hostname}`)
    .then(response => {
      console.log("Metadata obtained!");
      const metaPage = cheerio.load(response.data);
      console.log(metaPage("title").text());
      const pageIcon = metaPage('link[rel="icon"]').attr("href")
        || metaPage('link[rel="shortcut icon"]').attr("href")
        || "No hay ícono para este sitio";

      console.log(art1.ext === true
        ? pageIcon
        : `${parsedEnlace}${pageIcon}`);
    })
    .catch(error => console.log("Error with metadata --> ", url, "\n >>>", error.code || error))
    .finally(() => console.log("Meta proccess Done!"));


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