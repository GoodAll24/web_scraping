// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
// const { add_media, add_media_data } = require('./helpers/urls');
const onCheck = require("./helpers/urls");
const { processMetadata, processLink2 } = require("./helpers/processLink");
const { processLinkBeta } = require("./helpers/processImage");
const readline = require("readline");
const { default: axios } = require("axios");
// puppeteer.use(StealthPlugin());

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  // --------------- beta tester ---------------  //
  processLinkBeta(onCheck)
    .then((metadata) => console.log(metadata))
    .catch((e) => console.log(e));

  return;
};
main();

