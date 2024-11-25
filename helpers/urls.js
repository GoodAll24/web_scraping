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
  "link": "h2.news__title > a",
  "main": "article.news",
  "image": "figure.news__media > a > img",
  "title": "h2.news__title > a",
  "url": "https://lavibra.com/categoria/musica/",
  cssImage: true,
  cssImageAttr: "data-src",
  // cssImageExtraText: true,
};