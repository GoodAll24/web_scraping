// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const { media_images } = require('./helpers/urls');

const main = async () => {

  const art1 = {
    "media": "https://precision.com.do/category/revista/espectaculos/",
    "ext": false,
    "link": "div > div > a",
    "main": "article.format-standard",
    "image": "div > div > a > div > div",
    "title": "div > div > div > h2 > a",
    "content": "",
    "extImg": false,
    "cssImage": true,
    "cssImageAttr": "data-src",
    "cssImageExtraText": false
  };
  // "details": "div.entry-content",

  const datos = [];
  // const url = "https://www.notistarz.com/categorias/musica/";

  const { data } = await axios.get(art1["media"]);

  // Cargando texto de la page
  const $ = cheerio.load(data);

  // -----Artículos pequeños----- //


  // console.log($(art1["main"]).html());

  // <<<<<<<<< Procesado de imagen en css >>>>>>>>>> //
  // const cssImage = $(`${art1["main"]} > ${art1["image"]}`).attr("style");

  // $("a.td-image-wrap > span").each((i, el) => {
  //   console.log($(el).attr("data-bg"));
  // });

  // console.log($("a.td-image-wrap").html());


  $(art1["main"])
    .each((i, element) => {
      // console.log($(element).html());
      const pseudoObject = {
        title: art1["title"] ? `${$(element).find(art1["title"]).text()}`.trim() : null,
        link: art1["link"] ? art1["ext"] ? `${url}${$(element).find(art1["link"]).attr("href")}` : $(element).find(art1["link"]).attr("href") : null,
        content: art1["content"] ? $(element).find(art1["content"]).text() : null,
        image: art1["image"] ? art1["cssImage"] ? art1["cssImageExtraText"] ? art1["cssImageAttr"] === "style" ? `${$(element).find(art1["image"]).attr(art1["cssImageAttr"])}`.slice(23, -3) : `${$(element).find(art1["image"]).attr(art1["cssImageAttr"])}`.slice(5, -2) : $(element).find(art1["image"]).attr(art1["cssImageAttr"]) : art1["extImg"] ? `${art1["media"]}/${$(element).find(art1["image"]).attr("src")}` : $(element).find(art1["image"]).attr("src") : null,
      };
      if (pseudoObject.title && pseudoObject.link) datos.push(pseudoObject);
    });

  console.log(datos);
};

main();
