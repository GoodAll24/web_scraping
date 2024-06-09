const sdpnoticias = async (data, url) => {
  // const url = "https://www.sdpnoticias.com/espectaculos/musica/"
  const art1 = 'div#fusion-app > div.content-main > div.hl-triple > div.hl-triple__item';
  const art2 = 'div#fusion-app > div.content-main > div.feed-thirds-container';
  const art3 = 'div#fusion-app > div.content-main > div.feed-thirds-container > div.feed-thirds';
  try {

    // -----Tres artículos principales----- //
    const datos = [];
    data(art1)
      .each((i, element) => {
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > a > h2 > span').text();
        datos[long].link = `${url}${data(element).find('article > a').attr("href")}`;
        datos[long].description = data(element).find('article > span').text();
        datos[long].image = null;
        //  console.log(i + 1, data(element).html());
      });

    // ----Más artículos----- //
    data(art2)
      .each((i, element) => {
        data(element).find('div.feed-thirds').each((j, maas) => {
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = data(maas).find('article > a > h2').text();
          datos[long].link = `${url[1]}${data(maas).find('article > a').attr("href")}`;
          datos[long].description = data(maas).find('article > a > span').text();
          datos[long].image = data(maas).find('article > a > img').attr("src");
          // console.log(i + 1, data(maas).html());
        });
        // console.log(i + 1, data(element).html());
      });

    // ----Más artículos----- //
    data(art3)
      .each((i, element) => {
        data(element).find('article').each((j, articulo) => {
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = data(articulo).find('a > h2').text();
          datos[long].link = `${url[1]}${data(articulo).find('a').attr("href")}`;
          datos[long].description = data(articulo).find('a > span').text();
          datos[long].image = data(articulo).find('a > img').attr("src");
        });
      });
    return datos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sdpnoticias };