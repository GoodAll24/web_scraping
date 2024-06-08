const sdpnoticias = async (page) => {
  const url = "https://www.sdpnoticias.com/espectaculos/musica/"
  const art1 = 'div#fusion-app > div.content-main > div.hl-triple > div.hl-triple__item';
  try {
    // go to url using the page
    console.log(`iendo a la pagina \n ${url}`);
    await page.goto(url);

    // Set screen size
    await page.setViewport({ width: 1920, height: 6000 });

    // Cargando texto de la page
    const data = $.load(content);

    // -----Tres artículos principales----- //
    const datos = [];
    data(art1)
      .each((i, element) => {
        datos.push({});
        let long = datos.length - 1;
        datos[long + i].title = data(element).find('article > a > h2 > span').text();
        datos[long + i].link = `${url}${data(element).find('article > a').attr("href")}`;
        datos[long + i].description = data(element).find('article > span').text();
        datos[long + i].image = null;
        //  console.log(i + 1, data(element).html());
      });

    // ----Más artículos----- //
    data(expresion2)
    .each((i, element) => {
      data(element).find('div.feed-thirds').each((j, maas) => {
        datos.push({});
        datos[i + j].title = data(maas).find('article > a > h2').text();
        datos[i + j].link = `${url[1]}${data(maas).find('article > a').attr("href")}`;
        datos[i + j].description = data(maas).find('article > a > span').text();
        datos[i + j].image = data(maas).find('article > a > img').attr("src");
        // console.log(i + 1, data(maas).html());
      });
      // console.log(i + 1, data(element).html());
    });


  } catch (error) {
    console.log(error);
  }
};