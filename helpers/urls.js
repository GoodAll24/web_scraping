/* // const tester = "https://bot.sannysoft.com";

// testear la pagina (antes de hacer cualquier cambio)
module.exports = {
  url: lastNews[0],
  ext: true,
  link: "h2 > a",
  main: "div.story-item",
  image: "img",
  title: "h2 > a",
  // extImg: true,
  content: "p.story-item__subtitle",
  cssImage: true,
  cssImageAttr: "srcset",
  cssImageExtraText: true,
};
 */

module.exports = {
  // "ext": true,
  "link": "div.small-news-thumb > a",
  "main": "div.col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-30".replaceAll(" ", "."),
  "image": "div.small-news-thumb > a > img",
  "title": "h4.title > a",
  "url": "https://movidamusical.com/",
  // "extImg": true,
  // "content": "p.c-article__subtitle",
  // cssImage: true,
  // cssImageAttr: "data-lazy-src",
  // cssImageExtraText: true,
};