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
  "link": "a",
  "main": "div.grid.grid-cols-12.gap-x-5.gap-y-10 > div.col-span-full",
  "image": "a > img",
  "title": "div > h2 > a",
  "url": "https://www.lamega.com.co/tendencias/musica",
  "extImg": true,
  // "content": "div.blog-post-description-style-font > div > div",
  // cssImage: true,
  // cssImageAttr: "data-src",
  // cssImageExtraText: true,
};