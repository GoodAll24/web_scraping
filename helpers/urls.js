// url
const mexico = [
  "https://www.excelsior.com.mx/musica", // done
  "https://radiobox.com.mx/category/espectaculos/", //  error de carga (posible necesidad de vpn)
  "https://es.rollingstone.com/categoria/musica/", // error de carga (posible necesidad de vpn)
  "https://www.sdpnoticias.com/espectaculos/musica/", // done
  "https://www.milenio.com/espectaculos/musica", // done
  "https://www.elimparcial.com/tags/musica/", // done
  "https://www.informador.mx/musica-t32", // done
  "https://www.cronica.com.mx/escenario", // done
  "https://desdepuebla.com/noticias/desde-el-show/", // done
  "https://www.elsiglodetorreon.com.mx/seccion/espectaculos", // done
];
const usa = [
  'https://www.billboard.com/c/espanol/noticias/', // problemas de carga (revisar en server)
  'https://www.billboard.com/c/espanol/musica/', // problemas de carga (revisar en server)
  'https://musicaislife.com/musica-news/', // done (tema imagen)
  'https://prensadehouston.com/category/entretenimiento/', // done (imagen en source ("srcset"))
  'https://wowlarevista.com/category/musica/', // security issues
  'https://www.telemundo.com/entretenimiento', // done * (aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista) 
  'https://cnnespanol.cnn.com/category/musica/', // done *(aquí hay que revisar si las noticias con video se pueden integrar directamente a la Tele Revista)
  'https://www.latimes.com/espanol/etiqueta/musica', // done
  'https://www.hispanicpost.com/category/entretenimiento/musica-tv-y-cine/', // error 404
  'https://somoslarevistausa.com/category/musica/', // done
  'https://lakw.us/category/musica/', // done
  'https://www.telemundoamarillo.com/entretenimiento/', // done
  'https://www.mundodeportivo.com/us/estrellas-latinas', // done
  'https://www.noticiany.com/category/entretenimiento/', // done
  'https://es.rollingstone.com/categoria/musica/noticias-musica/',
  'https://www.notistarz.com/categorias/musica/', // tema imagen
  'https://efe.com/noticias/musica/', // done
  'https://ellatinodigital.com/categoria/secciones/farandula/', // done
  'https://www.latingrammy.com/noticias', // error de carga
];
const españa = [
  'https://www.epe.es/es/temas/musica-5359', // Error 404
  'https://www.diariodecadiz.es/mapademusicas/', // Error 404
  'https://es.rollingstone.com/esp/', // VPN
  'http://noticiasclave.net', // done
  'https://www.elconfidencial.com/tags/temas/musica-5272/', // done, con falta de datos
  'https://www.larazon.es/cultura/musica/', // done
  'https://www.elespanol.com/el-cultural/escenarios/musica/', // done
  'https://www.elperiodico.com/es/temas/musica-6584', // done
  'https://www.europapress.es/cultura/musica-00129/', // done
  'https://www.lavozdealmeria.com/temas/conciertos/1', // done 
  'https://www.laopiniondemalaga.es/tags/musica/', // done
  'https://www.diariosur.es/culturas/musica/', // done
  'https://www.lasprovincias.es/culturas/musica/', // done
  'https://los40.com/musica', // done
  'https://los40.com/los40_urban/',
  'https://www.efeeme.com/agenda/conciertos-agenda/', // done
  'https://www.cadena100.es/musica', // done
  'https://masterfm.es/category/musica/', // done
  'https://as.com/tikitakas/noticias/musica/', // done
  'https://gladyspalmera.com/actualidad/', // done // tema con la imagen "header > div > a"
  'https://elpais.com/noticias/musica/', // done
  'https://www.lasexta.com/temas/musica-1', // done
  'https://www.telecinco.es/tags/musica', // done
  'https://www.cosmopolitan.com/es/musica-novedades/',  // done OJO con el link
  'https://www.esquire.com/es/actualidad/musica/',   // done OJO con el link
  'https://www.20minutos.es/minuteca/musica-trap/', // done
  'https://www.laverdad.es/culturas/musica/', // done
  'https://cadenaser.com/tag/musica/a/', // done
  'https://www.eldia.es/tags/musica/', // done
  'https://www.cancioneros.com/in/12/0/actualidad', // revisar estructura
  'https://elgeneracionalpost.com/noticias/cultura/musica', // done (tema imagen)
];
const colombia = [
  'https://www.eltiempo.com/cultura/musica-y-libros',  // 
  'https://www.elcolombiano.com/cultura/musica', // Se repite
  'https://www.decibeles.net/noticias', // OJO con el link
  'https://www.semana.com/cultura/musica/', // done
  'https://www.elespectador.com/entretenimiento/musica/', // done
  'https://www.eluniversal.com.co/farandula', // done
  'https://occidente.co/secciones/espectaculo/', // done
  'https://www.elpais.com.co/entretenimiento/', // done
  'https://colombia.as.com/tikitakas/noticias/musica/', // done
  'https://intervallenato.com/inicio/category/noticias/', // done
  'https://www.midiario.co/category/farandula-2/', // done
  'https://elpilon.com.co/Noticias/el-vallenato/', // done
  'https://www.elcolombiano.com/cultura/musica', // done
  'https://www.estiloplay.com.co/category/musica/', // done
  'https://www.estiloplay.com.co/category/sony-music', // done
  'https://www.estiloplay.com.co/category/universal-music/', // done
  'https://www.estiloplay.com.co/category/warner-music/', // done
  'https://www.estiloplay.com.co/category/onerpm/', // done
  'https://es.rollingstone.com/col/', // VPN
  'https://revistadiners.com.co/category/cultura/musica/', // done
  'https://caracol.com.co/tendencias/entretenimiento/', // done
  'https://www.shock.co/musica', // done
  'https://www.shock.co/eventos', // done
  'https://www.wradio.com.co/tag/musica/a/', // done
];
const chile = [
  'https://www.emol.com/espectaculos/musica/', // error de carga
  'https://www.latercera.com/etiqueta/musica-culto/', // done
  'https://www.biobiochile.cl/lista/categorias/musica', // done
  'https://www.lacuarta.com/musica/', // done
  'https://www.lacuarta.com/urbana/', // done
  'https://los40.cl/actualidad/', // done
  'https://www.musicachilena.cl/v2/noticias/', // done
];
const rd = [
  'https://www.diariolibre.com/revista/musica', // done
  'https://listindiario.com/entretenimiento/musica', // done falta el logo(problemas de internet)
  'https://eldia.com.do/secciones/espectaculos/',
  'https://www.elcaribe.com.do/seccion/gente/a-y-e/',
  'https://eldia.com.do/secciones/espectaculos/',
  'https://notidigitalrd.com.do/category/entretenimiento/', // done
  'https://www.elperiodico.com.do/secciones/entretenimiento/',
  'https://eltestigo.do/entretenimiento',
  'https://diariosocialrd.com/categoria/musica/',
];
const venezuela = [
  "https://www.elnacional.com/musica/", // done
  "https://eldiario.com/seccion/cultura/", // done
  "https://2001online.com/seccion/farandula/", // done
  "https://dentrodelgenero.com/", // error de carga
  "https://www.noticierovenevision.net/entretenimiento", // done
  "https://diariodelosandes.com/secciones/entretenimiento/", // done
  "https://acn.com.ve/espectaculos/", // done
];
const paraguay = [
  'https://independiente.com.py/show/' // error de carga
];
const cr = [
  'https://www.larepublica.net/seccion/magazine', // done
  'https://www.crhoy.com/noticias/musica' // done
];
const uruguay = [
  'https://www.elpais.com.uy/tvshow', // error de carga
  'https://www.elobservador.com.uy/tag/musica', // done
];
const cuba = [
  'https://oncubanews.com/category/cultura/musica/', // done
  'https://magazineampm.com/newness-cuba/', // done
];
const bolivia = [
  'https://www.bolivia.com/entretenimiento/', // vpn
  'https://www.opinion.com.bo/tags/musica/', // done
];
const nicaragua = [
  'https://www.tn8.tv/category/musica/', // done
];
const extra = [
  'https://www.cronica.com.ar/elcanaldelamusica', // (Argentina)  done
  'https://www.lanacion.com.ar/espectaculos/musica/' // (Argentina)
];

const masNoticias = [
  "https://www.estilosblog.com/category/estilos-blog/entretenimiento/", // done tema imagen
  "https://blog.joinnus.com/entretenimiento/", // done
  "https://blog.joinnus.com/nueva-musica/", // done
  "https://www.lainformacion.com.do/mirador/musica-y-literatura", // problemas de espera
  "https://infoelnuevonorte.com/?cat=12 ", // done tema imagen
  "https://infoelnuevonorte.com/?cat=11 ", // done tema imagen
  "https://miamipocket.us/entretenimiento/", // done tema imagen
  "https://entretenimientotolima.com/category/agenda/musica/", // done
  "https://codigotv.net/category/entretenimiento/ ", // done
  "https://azuaalinstante.com/category/arte-y-espectaculo/ ", // done tema imagen
  "https://www.disco89fm.com/noticias", // done
  "https://precision.com.do/category/revista/espectaculos/", // done tema imagen
  "https://www.elfarandi.com/musica/", // done tema imagen parte1
  "https://intervez.com/category/culturaentretenimiento/musica/", // done
  "https://www.ntn24.com/noticias-entretenimiento", // done
  "https://deultimominuto.net/category/entretenimiento/", // done tema imagen
  "https://www.enlacedigital.com.do/categoria/entretenimiento/", // done tema imagen
  "https://diarioroatan.com/category/sociales/", // done  tema imagen ++
  "https://www.yucatan.com.mx/seccion/espectaculos", // done
  "https://amariemagazine.com/category/musica/", // done
  "https://amariemagazine.com/category/entretenimiento/conciertos/", // done
  "https://www.panasenutah.com/category/entretenimiento/musica/",
  "https://panoramaeconomicopma.com/categorias/farandula/",
  "https://impactolatino.com/entretenimiento/",
  "https://dominicanaaldia.do/Secciones/estilo-de-vida/",
  "https://elperiodiquito.com/category/mas/escenario/",
  "https://sglaradio.com/category/noticias/",
  "https://sglaradio.com/category/lanzamientos/",
  "https://ultimasnoticia.com/category/entretenimiento/",
];


const onCheck = [
  "https://www.elpais.com.co/entretenimiento/", // done
  "https://www.kq105.com/noticias/eventos/", // 
  "https://2001online.com/seccion/farandula/",
  "https://www.elnuevodia.com/entretenimiento/musica/",
  "https://caracol.com.co/tendencias/entretenimiento/",
  "https://www.cronica.com.ar/elcanaldelamusica",
  "https://www.elvocero.com/escenario/espectaculos/",
  "https://acn.com.ve/espectaculos/",
];

const tester = "https://bot.sannysoft.com";


module.exports = { onCheck };