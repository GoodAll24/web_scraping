const axios = require("axios");
const cheerio = require("cheerio");

const processLink1 = async (page) => {
  return new Promise(async (resolve, reject) => {
    // const art1 = {
    //   "ext": false,
    //   "link": "a",
    //   "main": "article.standard-entry-box.category-yellow ",
    //   "title": "h2.entry-title",
    //   "image": "picture > img",
    //   "content": "",
    //   "extImg": false,
    //   // "cssImage": true,
    //   // "cssImageAttr": "data-img-url",
    //   // "cssImageExtraText": false,
    // };

    // const url = "https://www.lacapital.com.ar/secciones/zoom.html";
    const datos = [];
    // for (let page of onCheck){
    console.log("Getting page", page.url, "...");
    await axios
      .get(page.url)
      .then((response) => {
        console.log("Page loaded!");
        const $ = cheerio.load(response.data);

        // -----Getting articles----- //
        // console.log(
        //   $(
        //     "div.owl-carousel > div.owl-stage-outer > div.owl-stage > div.owl-item",
        //   ).each((i, el) => {
        //     console.log($(el).html());
        //   }),
        // );

        $(page["main"]).each((i, element) => {
          // console.log($(element).html());
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = page["title"]
            ? `${$(element).find(page["title"]).text()}`.trim()
            : null;
          datos[long].link = page["link"]
            ? page["ext"]
              ? `${page.url}${$(element).find(page["link"]).attr("href")}` ||
                `${page.url}${$(element).attr("href")}`
              : $(element).find(page["link"]).attr("href") ||
                $(element).attr("href")
            : "error trying to get link";
          datos[long].content = page["content"]
            ? `${$(element).find(page["content"]).text()}`.trim()
            : null;
          datos[long].image = page["image"]
            ? page["cssImage"]
              ? page["cssImageExtraText"]
                ? page["cssImageAttr"] === "style"
                  ? `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                      23,
                      -3,
                    )
                  : `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                      5,
                      -2,
                    )
                : $(element).find(page["image"]).attr(page["cssImageAttr"])
              : page["extImg"]
                ? `${page["media"]}/${$(element).find(page["image"]).attr("src")}`
                : $(element).find(page["image"]).attr("src")
            : null;
          // datos[long].publishedAt = new Date();
          // datos[long].pubDate = new Date();
          // datos[long].likes = 0;
          // datos[long].dislikes = 0;
          // datos[long].state = "pendiente";
        });
        console.log(datos);
      })
      .catch((error) =>
        console.log(
          "Error with page --> ",
          page.url,
          "\n >>>",
          error.code || error,
        ),
      )
      .finally(() => console.log("Done! \n\n\n"));

    // -----Getting metadata----- //
    const parsedEnlace = new URL(page.url);
    console.log("Getting metadata from: ", parsedEnlace.hostname, "...");
    await axios
      .get(`${parsedEnlace.protocol}//${parsedEnlace.hostname}`)
      .then((response) => {
        console.log("Metadata obtained!");
        const metaPage = cheerio.load(response.data);
        // console.log("Medio >>>>>> ", metaPage("title").text());
        const pageIcon =
          metaPage('link[rel="icon"]').attr("href") ||
          metaPage('link[rel="shortcut icon"]').attr("href") ||
          "No hay ícono para este sitio";

        const data2Fill = {
          url: page.url,
          channel: metaPage("title").text(),
          link_logo: pageIcon,
          access: JSON.stringify(page),
        };
        if (datos.length) resolve({ ...data2Fill });
        else reject("No hay datos para guardar \n\n--->", datos);
      })
      .catch((error) =>
        reject(
          "Error with metadata --> ",
          page.url,
          "\n >>>",
          error.code || error,
        ),
      );
    // }
  });
};

const processLink2 = async (page) => {
  return new Promise(async (resolve, reject) => {
    const datos = [];
    console.log("Getting page", page.url, "...");
    await axios
      .get(page.url)
      .then((response) => {
        console.log("Page loaded!");
        const $ = cheerio.load(response.data);
        const $2 = cheerio.load(response.data);

        // -----Getting articles----- //
        const test = "body > div.dialog-off-canvas-main-canvas";
        console.log($(test).html());

        $(page["main"]).each((i, element) => {
          // console.log($(element).html());
          // console.log($2(`${page.main}:nth-child(${i + 1})`).attr("href"));
          // console.log(i);
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = page["title"]
            ? `${$(element).find(page["title"]).text()}`.trim()
            : null;
          datos[long].link = page["ext"]
            ? `${page.url}${$(element).find(page["link"]).attr("href")}` ||
              `${page.url}${$2(`${page.main}:nth-child(${i + 1})`).attr("href")}` ||
              null
            : $(element).find(page["link"]).attr("href") ||
              $2(`${page.main}:nth-child(${i + 1})`).attr("href") ||
              null;
          datos[long].content = page["content"]
            ? $(element).find(page["content"]).text()
            : null;
          datos[long].image = page["image"]
            ? page["cssImage"]
              ? page["cssImageExtraText"]
                ? page["cssImageAttr"] === "style"
                  ? `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                      23,
                      -3,
                    )
                  : `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                      5,
                      -2,
                    )
                : $(element).find(page["image"]).attr(page["cssImageAttr"])
              : page["extImg"]
                ? `${page["media"]}/${$(element).find(page["image"]).attr("src")}`
                : $(element).find(page["image"]).attr("src")
            : null;
          // datos[long].publishedAt = new Date();
          // datos[long].pubDate = new Date();
          // datos[long].likes = 0;
          // datos[long].dislikes = 0;
          // datos[long].state = "pendiente";
        });
        console.log(datos);
      })
      .catch((error) =>
        console.log(
          "Error with page --> ",
          page.url,
          "\n >>>",
          error.code || error,
        ),
      )
      .finally(() => console.log("Done! \n\n\n"));

    // -----Getting metadata----- //
    const parsedEnlace = new URL(page.url);
    console.log("Getting metadata from: ", parsedEnlace.hostname, "...");
    originalUrl = `${parsedEnlace.protocol}//${parsedEnlace.hostname}`;
    await axios
      .get(originalUrl)
      .then((response) => {
        console.log("Metadata obtained!");
        const metaPage = cheerio.load(response.data);
        // console.log("Medio >>>>>> ", metaPage("title").text());
        const pageIcon =
          metaPage('link[rel="icon"]').attr("href") ||
          metaPage('link[rel="shortcut icon"]').attr("href") ||
          "No hay ícono para este sitio";

        const data2Fill = {
          url: page.url,
          original: originalUrl,
          channel: metaPage("title").text(),
          link_logo: pageIcon,
          access: JSON.stringify(page),
        };
        if (datos.length) resolve({ ...data2Fill });
        else reject("No hay datos para guardar \n\n--->", datos);
      })
      .catch((error) =>
        reject(
          "Error with metadata --> ",
          page.url,
          "\n >>>",
          error.code || error,
        ),
      );
    // }
  });
};

module.exports = { processLink1, processLink2 };
