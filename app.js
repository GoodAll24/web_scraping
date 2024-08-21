// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
// const { add_media, add_media_data } = require('./helpers/urls');
const { onCheck } = require("./helpers/urls");
const getUrlData = require("./helpers/processLink");

// puppeteer.use(StealthPlugin());

const main = async () => getUrlData(onCheck[1]).catch((e) => console.log(e));

main();
