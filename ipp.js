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
    "media": "https://www.notistarz.com/categorias/musica/",
    "ext": false,
    "link": "div > header > h2 > a",
    "main": "div > div > div > div > div > main > div > div",
    "image": "div > figure > a",
    "title": "div > header > h2 > a",
    "extImg": false,
    "content": "div > div > p",
    "details": "div.entry-content",
    "cssImage": true,
    "cssImageAttr": "data-bg-image",
    "cssImageExtraText": true
  };

  const datos = [];
  const url = "https://www.notistarz.com/categorias/musica/";

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

  // console.log($("figure.post-featured-image.post-img-wrap").html());


  // $(art1["main"])
  //   .each((i, element) => {
  //     // console.log($(element).html());
  //     datos.push({});
  //     let long = datos.length - 1;
  //     datos[long].title = art1["title"] ? `${$(element).find(art1["title"]).text()}`.trim() : null;
  //     datos[long].link = art1["link"] ? art1["ext"] ? `${url}${$(element).find(art1["link"]).attr("href")}` : $(element).find(art1["link"]).attr("href") : null;
  //     datos[long].content = art1["content"] ? $(element).find(art1["content"]).text() : null;
  //     datos[long].image = art1["image"] ? art1["cssImage"] ? $(element).find(art1["image"]).attr(art1["cssImageAttr"]) : art1["extImg"] ? `${url}${$(element).find(art1["image"]).attr("src")}` : $(element).find(art1["image"]).attr("src") : null;
  //   });

  // console.log(datos);
};

main();
