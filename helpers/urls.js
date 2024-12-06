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
  "link": "div.blog-post-category-link-hashtag-hover-color > a",
  "main": "div.gallery-item-container",
  "image": "img.gallery-item",
  "title": "div.post-title > p",
  "url": "https://www.conopinion.cl/noticias/categories/m%C3%BAsica",
  "content": "div.blog-post-description-style-font > div > div",
  // cssImage: true,
  // cssImageAttr: "data-src",
  // cssImageExtraText: true,
};