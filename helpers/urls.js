// const tester = "https://bot.sannysoft.com";
const lastNews = require('./links');


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
  // cssImage: true,
  // cssImageAttr: "data-src",
  // cssImageExtraText: true,
};
