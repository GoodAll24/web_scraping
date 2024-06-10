// ------web scraping pages------ //
const sdpnoticias = async (data, url, datos) => {
  // const url = "https://www.sdpnoticias.com/espectaculos/musica/"
  const art1 = 'div#fusion-app > div.content-main > div.hl-triple > div.hl-triple__item';
  const art2 = 'div#fusion-app > div.content-main > div.feed-thirds-container';
  const art3 = 'div#fusion-app > div.content-main > div.feed-thirds-container > div.feed-thirds';
  try {

    // -----Tres artículos principales----- //
    data(art1)
      .each((i, element) => {
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > a > h2 > span').text();
        datos[long].link = `${url}${data(element).find('article > a').attr("href")}`;
        datos[long].description = data(element).find('article > span').text();
        datos[long].image = null;
        datos[long].time = new Date();
        datos[long].publishedAt = new Date();
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
          datos[long].time = new Date();
          datos[long].publishedAt = new Date();
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
          data[long].time = new Date();
          datos[long].publishedAt = new Date();
        });
      });
    return datos;
  } catch (error) {
    console.log(error);
  }
};


const milenio = async (data, url, datos) => {
  const art1 = 'main > div.content > div.content-board-wrapper > section > div > section > div > section > ul > li';
  try {

    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('h2').attr("title");
        datos[long].link = `${url[4]}${data(element).find('a').attr("href")}`;
        datos[long].description = null;
        datos[long].image = data(element).find('img').attr("src");
        datos[long].time = data(element).find('time').attr("datetime");
        datos[long].publishedAt = new Date();
        // console.log(i, data(element).html());
      });

    return datos;
  } catch (error) {
    console.log(error);
  }
};

const imparcial = async (data, url, datos) => {
  const art1 = 'div#fusion-app > div > section > article > div[class="ei-resultList__ResultsContainer-sc-m02efj-0 jHxxOn ei-results-container"] > div';
  try {

    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div[class="ei-resultList__ResultItemDetailsWrapper-sc-m02efj-5 hTIlQR ei-result-item-details-wrapper"] > h2').text();
        datos[long].link = `${url}${data(element).find('div[class="ei-resultList__ResultItemDetailsWrapper-sc-m02efj-5 hTIlQR ei-result-item-details-wrapper"] > h2 > a').attr("href")}`;
        datos[long].description = data(element).find('div[class="ei-resultList__ResultItemDetailsWrapper-sc-m02efj-5 hTIlQR ei-result-item-details-wrapper"] > div').text();
        datos[long].image = data(element).find('img').attr("src");
        datos[long].time = data(element).find('div[class="ei-resultList__ResultItemDetailsWrapper-sc-m02efj-5 hTIlQR ei-result-item-details-wrapper"] > div > div > time').attr("datetime");
        datos[long].publishedAt = new Date();
      });


    return datos;
  } catch (error) {
    console.log(error);
  }
};

const informador = async (data, url, datos) => {
  const art1 = 'section > div.section-content > div.row > div > div[class="mod-content clearfix"] > div.col-main > article';
  try {
    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        console.log(data(element).html());
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > h2').text();
        datos[long].link = `${url}${data(element).find('figure > a').attr("href")}`;
        datos[long].image = `${url}${data(element).find('figure > a > img').attr("src")}`;
        datos[long].time = data(element).find('div > p > time').attr("datetime");
        datos[long].publishedAt = new Date();
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sdpnoticias,
  milenio,
  imparcial,
  informador,
};