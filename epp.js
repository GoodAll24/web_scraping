// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
const $ = require("cheerio");
const axios = require("axios");

const main = async () => {
  // // Launch browser and open a new page
  // const browser = await puppeteer.launch({
  //   args: [
  //     '--disable-gpu',
  //     '--disable-dev-shm-usage',
  //     '--disable-setuid-sandbox',
  //     '--no-first-run',
  //     '--no-sandbox',
  //     '--no-zygote',
  //     //'--single-process',
  //   ], headless: true, executablePath: executablePath(),
  // });

  // const page1 = await browser.newPage();
  // console.log("pagina abierta");


  const url = "https://www.notistarz.com/trueno-domina-lista-de-popularidad-con-su-real-gangsta-love/";


  // // go to url using the page
  // console.log(`iendo a la pagina \n ${url}`);
  // await page1.goto(url, { timeout: 90000, waitUntil: 'networkidle2' });

  // // const datos = [];

  // const content = await page1.evaluate(() => document.body.innerHTML);

  const { data } = await axios.get(url);

  const extractionData = ["og:description", "og:image", "og:title"];
  const extractionData2 = ["twitter:description", "twitter:image", "twitter:title"];


  const pageData = $.load(data);

  for (let prop of extractionData2) {
    pageData(`meta[name="${prop}"]`).each((i, el) => {
      // console.log(pageData(el).attr("property"), " >>>>>>>>>>>>> ", pageData(el).attr("content"));
      // console.log(i, " >>>> ", pageData(el).html());
      console.log(prop, " >>>>>>> ", pageData(el).attr("content"));
    });
  }


  // console.log(pageData("head").html());
  // console.log(pageData('title').text());



  // await page1.close();
  // await browser.close();



};




main();