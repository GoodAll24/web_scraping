module.exports = (codigo, elemento, imageTag, cssImageAttr, cssImage = false, cssImageExtraText = false) => {
  // jason = {
  //   "media": "https://www.notistarz.com/categorias/musica/",
  //   "main": "div > div > div > div > div > main > div > div",
  //   "image": "div > figure > a",
  //   "extImg": false,
  //   "cssImage": true,
  //   "cssImageAttr": "data-bg-image",
  //   "cssImageExtraText": true
  // };
  if (cssImage) {
    return cssImageExtraText ? `${codigo(elemento).find(imageTag).attr(cssImageAttr)}`.slice(5, -2) : codigo(elemento).find(imageTag).attr(cssImageAttr);
  } else {
    return codigo(elemento).find(imageTag).attr("src");
  }
};