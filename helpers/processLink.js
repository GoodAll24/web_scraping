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
  const parsedEnlace = new URL(page.url);
  const originalUrl = `${parsedEnlace.protocol}//${parsedEnlace.hostname}`;
  const datos = [];
  return new Promise(async (resolve, reject) => {
    console.log("Getting page", page.url, "...");
    await axios
      .get(page.url)
      .then((response) => {
        console.log("Page loaded!");
        const $ = cheerio.load(response.data);
        const $2 = cheerio.load(response.data);

        // -----Getting articles----- //
        // const test = "div.owl-carousel > div.slider";
        // $(test).each((i, e) => {
        //   console.log(i, "\n\n\n", $(e).html());
        // });

        $(page["main"]).each((i, element) => {
          // console.log($(element).find(page.image).attr("src"));
          // console.log($(element).find(page.image).attr("data-src"));
          // console.log($(element).find(page.image).attr("srcset"));
          // console.log($(element).html());
          // console.log($(element).find(page.image).attr("class"));
          // console.log($2(`${page.main}:nth-child(${i + 1})`).attr("href"));
          // console.log(i);

          datos.push({
            title: page["title"]
              ? `${$(element).find(page["title"]).text()}`.trim()
              : null,
            link: page["ext"]
              ? `${originalUrl}${$(element).find(page["link"]).attr("href")}` ||
                `${originalUrl}${$2(`${page.main}:nth-child(${i + 1})`).attr("href")}` ||
                null
              : $(element).find(page["link"]).attr("href") ||
                $2(`${page.main}:nth-child(${i + 1})`).attr("href") ||
                null,
            content: page["content"]
              ? $(element).find(page["content"]).text()
              : null,
            image: page["image"]
              ? page["cssImage"]
                ? page["cssImageExtraText"]
                  ? page["cssImageAttr"] === "style"
                    ? `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.endsWith(
                        ";",
                      )
                      ? `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                          23,
                          -3,
                        )
                      : `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                          23,
                          -2,
                        )
                    : `${$(element).find(page["image"]).attr(page["cssImageAttr"])}`.slice(
                        5,
                        -2,
                      )
                  : page["extImg"]
                    ? `${originalUrl}/${$(element).find(page["image"]).attr(page["cssImageAttr"])}`
                    : $(element).find(page["image"]).attr(page["cssImageAttr"])
                : page["extImg"]
                  ? `${originalUrl}/${$(element).find(page["image"]).attr("src")}`
                  : $(element).find(page["image"]).attr("src")
              : null,
          });
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
    // const parsedEnlace = new URL(page.url);
    console.log("Getting metadata from: ", parsedEnlace.hostname, "...");
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
          link_logo: pageIcon.startsWith("/") ? `${originalUrl}${pageIcon}` : pageIcon,
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

const processMetadata = async (page) => {
  return new Promise(async (resolve, reject) => {
    // -----Getting metadata----- //
    const parsedEnlace = new URL(page);
    console.log("Getting metadata from: ", parsedEnlace.hostname, "...");
    originalUrl = `${parsedEnlace.protocol}//${parsedEnlace.hostname}`;
    await axios
      .get(originalUrl)
      .then(async (response) => {
        console.log("Metadata obtained!");
        const metaPage = cheerio.load(response.data);
        // console.log("Medio >>>>>> ", metaPage("title").text());
        const pageIcon =
          metaPage('link[rel="icon"]').attr("href") ||
          metaPage('link[rel="shortcut icon"]').attr("href") ||
          null;

        if (pageIcon)
          await axios
            .get(pageIcon)
            .then((response) => console.log("Icono obtenido"))
            .catch((error) =>
              console.log("Error con el icono --> ", error.code || error),
            );

        const data2Fill = {
          original: originalUrl,
          channel: metaPage("title").text(),
          link_logo: pageIcon.startsWith("http")
            ? pageIcon
            : `${originalUrl}${pageIcon}`,
          // access: JSON.stringify(page),
        };
        resolve({ ...data2Fill });
      })
      .catch((error) =>
        reject(
          "Error with metadata --> ",
          page.url,
          "\n >>>",
          error.code || error,
        ),
      );
  });
};

module.exports = { processMetadata, processLink2 };
