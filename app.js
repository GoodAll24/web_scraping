// const { puppeteer } = require("puppeteer");
// "type": "module",
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
// const { add_media, add_media_data } = require('./helpers/urls');
const { onCheck } = require("./helpers/urls");
const { processMetadata, processLink2 } = require("./helpers/processLink");

// puppeteer.use(StealthPlugin());

const main = async () => {
  // const page = "https://2001online.com/";
  processLink2(onCheck)
    .then((metadata) => console.log(metadata))
    .catch((e) => console.log(e));
  // await processMetadata(page)
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
};
main();

/*
Revision de iconos con problemas
-El Universo // done 
-NTN24 // done (good but it takes time to load)
-La Cuarta // done
-El Universal // done
-La Noticia // done
-El Nuevo Día // done
-Impacto Latino // done
-elpais.com.co // done 
-Amexi // done
-sdpnoticias // done
 */