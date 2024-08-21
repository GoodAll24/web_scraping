const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (page) => {
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
        console.log($().html());

        $(page["main"]).each((i, element) => {
          // console.log($(element).html());
          datos.push({});
          let long = datos.length - 1;
          datos[long].title = page["title"]
            ? `${$(element).find(page["title"]).text()}`.trim()
            : null;
          datos[long].link = page["link"]
            ? page["ext"]
              ? `${page.url}${$(element).find(page["link"]).attr("href")}`
              : $(element).find(page["link"]).attr("href")
            : null;
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
          datos[long].publishedAt = new Date();
          datos[long].pubDate = new Date();
          datos[long].likes = 0;
          datos[long].dislikes = 0;
          datos[long].state = "pendiente";
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
        if (datos.length) resolve({ datos, ...data2Fill });
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
