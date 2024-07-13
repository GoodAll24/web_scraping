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
const cronica = () => {
  const art1 = 'div > div > div > div > div > div > div > div > div > ul > li';
  try {
    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > div > h2 > a').text();
        datos[long].link = `${'https://www.cronica.com.mx'}${data(element).find('article > div > a').attr("href")}`;
        datos[long].image = `${data(element).find('article > div > a > img').attr("src")}`;
        datos[long].time = null;// data(element).find('div > p > time').attr("datetime");
      });
  } catch (error) {
    console.log(error);
  }
};
const desdepuebla = async () => {
  const art1 = 'div > div > div > main > article';
  try {
    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        //console.log(i, data(element).html());
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > header > div > div > h2 > a').text();
        datos[long].link = `${data(element).find('div > header > div > div > h2 > a').attr("href")}`;
        datos[long].description = data(element).find('div > header > div > div > div > p').text();
        datos[long].image = `${data(element).find('div > header > div > a > img').attr("src")}`;
        datos[long].time = null;// data(element).find('div > p > time').attr("datetime");
      });
  } catch (error) {
    console.log(error);
  }
};
const latimes = () => {
  const art1 = 'div > main > div > div > div > ps-list-loadmore > ul > li';
  try {
    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('ps-promo > div > div > div > h2 > a').text();
        datos[long].link = `${data(element).find('ps-promo > div > div > div > h2 > a').attr("href")}`;
        datos[long].description = null;//data(element).find('p').text();
        datos[long].image = `${data(element).find('ps-promo > div > div > a > picture > img').attr("src")}`;
        datos[long].time = null;// data(element).find('div > p > time').attr("datetime");
      });
  } catch (error) {

  }
};
const somoslarevistausa = () => {
  const art1 = 'div > div > div > div > div > div > article';
  try {
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > header > h2 > a').text();
        datos[long].link = `${data(element).find('div > a').attr("href")}`;
        datos[long].description = data(element).find('div > div > p').text();
        datos[long].image = `${data(element).find('div > a > img').attr("src")}`;
      });
  } catch (error) {
    console.log(error);
  }
};
const lakw = () => {
  const art1 = 'div > div > div > div > div > div > div > div > div > div > ul > li';
  const url = 'https://lakw.us/category/musica/';
  try {
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('a > div > div > div > h2').text();
        datos[long].link = `${data(element).find('a').attr("href")}`;
        datos[long].description = data(element).find('a > div > div > div > p').text();
        datos[long].image = `${data(element).find('a > div > div > img').attr("data-src")}`;
      });
  } catch (error) {
    console.log(error);
  }
};
const telemundoamarillo = () => {
  const url = 'https://www.telemundoamarillo.com/entretenimiento/';
  const art1 = 'div > div > div > div > div > section > div > div > div';
  try {
    data(expresion2)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > div > h4 > a > span').text();
        datos[long].link = `${"https://www.telemundoamarillo.com"}${data(element).find('div > div > h4 > a').attr("href")}`;
        datos[long].content = data(element).find('div > div > div').text();
        datos[long].image = `${data(element).find('div > div > figure > div > a > img').attr("src")}`;
        datos[long].publishedAt = new Date();
      });
  } catch (error) {
    console.log(error);
  }
};

const mundodeportivo = () => {
  const url = 'https://www.mundodeportivo.com/us/estrellas-latinas';
  const art1 = 'main > div > div > div > div > div > div > div > div > div > ul > li';
  try {

    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > div > div > h2 > a').text();
        datos[long].link = `${"https://www.mundodeportivo.com"}${data(element).find('article > div > div > h2 > a').attr("href")}`;
        datos[long].content = data(element).find('div > div > div').text();
        datos[long].image = `${data(element).find('div > div > a > picture > img').attr("src")}`;
        datos[long].publishedAt = new Date();
      });

  } catch (error) {
    console.log(error);
  }
};

//-----15 de junio----// (no están en altavoz)
const noticiany = () => {
  const url = 'https://www.noticiany.com/category/entretenimiento/';
  const art1 = 'div > div > div > div > div > div > div > main > article';

  try {

    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());
        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > a').attr("title");
        datos[long].link = `${data(element).find('div > a').attr("href")}`;
        datos[long].content = data(element).find('div > div > div').text();
        datos[long].image = `${data(element).find('div > a > img').attr("src")}`;
        datos[long].publishedAt = new Date();
      });
  } catch (error) {
    console.log(error);
  }
};

const musicaislife = () => {
  const url = 'https://musicaislife.com/musica-news/';
  const art1 = 'div > div > div > div > div > div > div > div > div > div > div > div > div > article';
  try {
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > h3 > a').text();
        datos[long].link = `${data(element).find('div > h3 > a').attr("href")}`;
        datos[long].content = data(element).find('div > div > p').text();
        datos[long].image = `${data(element).find('div > a > div > img').attr("src")}`;
        datos[long].publishedAt = new Date();
      });

  } catch (error) {
    console.log(error);
  }
};
// España

const noticiasclave = async (browser, datos) => {
  const url = 'http://noticiasclave.net';
  const art1 = 'div > section > div > div > section';
  try {
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });
    const content = await page.evaluate(() => document.body.innerHTML);
    const data = $.load(content);
    // -----Artículos pequeños----- //

    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('div > ul > li > h4 > a').text();
        datos[long].link = `${url}${data(element).find('div > ul > li > h4 > a').attr("href")}`;
        datos[long].content = data(element).find('div > ul > li > p').text();
        datos[long].image = `${url}${data(element).find('div > a > span > img').attr("src")}`;
        datos[long].publishedAt = new Date();
        datos[long].scrape = searchData(url);
        datos[long].likes = 0;
        datos[long].dislikes = 0;
        datos[long].state = "pendiente";
      });

    await page.close();
  } catch (error) {
    console.log(error);
  }
};

const elconfidencial = async (browser, datos) => {
  const url = 'https://www.elconfidencial.com/tags/temas/musica-5272/';
  const art1 = 'div > div > div > div';
  try {
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });
    const content = await page.evaluate(() => document.body.innerHTML);
    const data = $.load(content);
    // -----Artículos pequeños----- //

    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > div > a > h3').text();
        datos[long].link = `${data(element).find('article > div > a').attr("href")}`;
        datos[long].content = data(element).find('article > p').text();
        datos[long].image = `${data(element).find('article > figure > img.bigPhoto__img').attr("src")}`; // da problemas
        datos[long].publishedAt = new Date();
        datos[long].scrape = searchData(url);
        datos[long].likes = 0;
        datos[long].dislikes = 0;
        datos[long].state = "pendiente";
      });

    await page.close();
  } catch (error) {
    console.log(error);
  }
};

const larazon = async (browser, datos) => {
  const url = 'https://www.larazon.es/cultura/musica/';
  const art1 = 'div > main > div > div > section';
  const mayn = 'div > main > div > div > section > div > article';
  try {
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });
    const content = await page.evaluate(() => document.body.innerHTML);
    const data = $.load(content);


    // -----Artículo principal----- //
    datos.push({});
    let long = datos.length - 1;
    datos[long].title = data(`${mayn} > div > div > header > h2 > a`).text();
    datos[long].link = `${data(`${mayn} > a`).attr("href")}`;
    datos[long].content = data(`${mayn} > div > div > p`).text();
    datos[long].image = `${data(`${mayn} > a > picture > img`).attr("srcset")}`; // da problemas
    datos[long].publishedAt = new Date();
    datos[long].scrape = searchData(url);
    datos[long].likes = 0;
    datos[long].dislikes = 0;
    datos[long].state = "pendiente";


    // -----Artículos pequeños----- //
    data(art1)
      .each((i, element) => {
        // console.log(i, data(element).html());

        datos.push({});
        let long = datos.length - 1;
        datos[long].title = data(element).find('article > div > div > header > h2 > a').text();
        datos[long].link = `${data(element).find('article > a').attr("href")}`;
        datos[long].content = data(element).find('article > div > div > div > p').text();
        datos[long].image = `${data(element).find('article > a > picture > img').attr("src")}`;
        datos[long].publishedAt = new Date();
        datos[long].scrape = searchData(url);
        datos[long].likes = 0;
        datos[long].dislikes = 0;
        datos[long].state = "pendiente";
      });

    await page.close();
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  sdpnoticias,
  milenio,
  imparcial,
  informador,
  cronica,
  lakw,
};

/*
[
  {
    "main":"",
    "title":"",
    "content":"",
    "link":"",
    "image":"",
    "ext":false,
    "extImg":false
  }
]
*/



