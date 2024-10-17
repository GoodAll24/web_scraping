const lastNews = require("./links");

const onCheck = {
  url: lastNews[0],
  ext: true,
  link: "h3.ld-card__title > a",
  main: "article.ld-grid-simple__area",
  image: "img.ld-card__img",
  title: "h3.ld-card__title > a",
  extImg: true,
  content: "div.ld-card__intro",
  // cssImage: true,
  // cssImageAttr: "data-src",
  // cssImageExtraText: true,
};

const tester = "https://bot.sannysoft.com";

module.exports = { onCheck };

// background-image: url('https://gladyspalmera.com/wp-content/uploads/2024/07/Dayme-Visita-984x620.jpg')

const doneWithErrs = [
  {
    url: "https://elvanguardistaonline.com/category/farandula/",
    // ext: true,
    link: "div.post-img-wrapper > a",
    main: "div.post-block-wrapper",
    image: "img.wp-post-image",
    title: "h2.post-title > a",
    // extImg: true,
    content: "div.post-excerpt",
    // cssImage: true,
    // cssImageAttr: "style",
    // cssImageExtraText: true,
  },
];
