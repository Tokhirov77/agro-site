// Скрипт для генерации sitemap.xml из данных каталога Agrius/Veles Agro.
// Логика slug-ов скопирована один в один из App.jsx (slugify, getCropSlug, getProductSlug),
// чтобы URL-адреса в sitemap точно совпадали с реальными адресами страниц сайта.

import fs from "fs";

const SITE_URL = "https://www.agrius.uz";

function slugify(str) {
  const map = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",ў:"o",қ:"q",ғ:"g",ҳ:"h" };
  return (str || "")
    .toLowerCase()
    .trim()
    .split("")
    .map((ch) => (map[ch] !== undefined ? map[ch] : ch))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CROP_SLUGS = {
  "Томаты": "tomaty",
  "Огурцы": "ogurtsy",
  "Сладкий перец": "sladkiy-perets",
  "Цветная капуста": "tsvetnaya-kapusta",
  "Капуста": "kapusta",
  "Сладкая кукуруза (SH2)": "sladkaya-kukuruza",
  "Бахчевые культуры": "bakhchevye-kultury",
  "Зелени": "zeleni",
  "Кормовая кукуруза": "kormovaya-kukuruza",
};
const getCropSlug = (cropId) => CROP_SLUGS[(cropId || "").trim()] || slugify(cropId);
const getProductSlug = (p) => p.slug || slugify(p.name);

const crops = [
  { id: "Томаты" }, { id: "Огурцы" }, { id: "Сладкий перец" },
  { id: "Цветная капуста" }, { id: "Капуста" }, { id: "Сладкая кукуруза (SH2)" },
  { id: "Бахчевые культуры" }, { id: "Зелени" }, { id: "Кормовая кукуруза" },
];

// Только поля, нужные для sitemap: id, crop, name, slug (если задан явно в App.jsx)
const products = [
  {id:1,crop:"Томаты",name:"CANOVA F1",slug:"canova-f1"},
  {id:2,crop:"Томаты",name:"ARIRANG F1",slug:"arirang-f1"},
  {id:3,crop:"Томаты",name:"DEBUT F1",slug:"debut-f1"},
  {id:4,crop:"Томаты",name:"TOMARIS F1",slug:"tomaris-f1"},
  {id:5,crop:"Томаты",name:"PINKBALL F1",slug:"pinkball-f1"},
  {id:6,crop:"Томаты",name:"PINKSWEET F1",slug:"pinksweet-f1"},
  {id:7,crop:"Томаты",name:"CHEREZA F1",slug:"chereza-f1"},
  {id:8,crop:"Томаты",name:"TORNADO F1",slug:"tornado-f1"},
  {id:9,crop:"Томаты",name:"AURORA F1",slug:"aurora-f1"},
  {id:10,crop:"Томаты",name:"PINK FLASH F1",slug:"pink-flash-f1"},
  {id:11,crop:"Томаты",name:"DYNO F1",slug:"dyno-f1"},
  {id:12,crop:"Томаты",name:"VEGA F1",slug:"vega-f1"},
  {id:13,crop:"Томаты",name:"NOVA F1",slug:"nova-f1"},
  {id:14,crop:"Томаты",name:"STROMBOLINO F1",slug:"strombolino-f1"},
  {id:15,crop:"Томаты",name:"DATERINO F1",slug:"daterino-f1"},
  {id:16,crop:"Томаты",name:"BRISCOLINO F1",slug:"briscolino-f1"},
  {id:17,crop:"Томаты",name:"UG 6101 F1",slug:"ug-6101-f1"},
  {id:18,crop:"Томаты",name:"MADERA",slug:"madera"},
  {id:19,crop:"Томаты",name:"KING ROCK",slug:"king-rock"},
  {id:20,crop:"Томаты",name:"KINGSTON",slug:"kingston"},
  {id:21,crop:"Томаты",name:"H2274",slug:"h2274"},
  {id:22,crop:"Томаты",name:"RIO GRANDE",slug:"rio-grande"},
  {id:23,crop:"Томаты",name:"MAXI RIO",slug:"maxi-rio"},
  {id:24,crop:"Огурцы",name:"FONTINA F1",slug:"fontina-f1"},
  {id:25,crop:"Огурцы",name:"AVANTE F1",slug:"avante-f1"},
  {id:27,crop:"Огурцы",name:"ESPERO F1",slug:"espero-f1"},
  {id:26,crop:"Огурцы",name:"COLLINS F1",slug:"collins-f1"},
  {id:28,crop:"Огурцы",name:"BALLISTIC F1",slug:"ballistic-f1"},
  {id:29,crop:"Огурцы",name:"BAZOOKA F1",slug:"bazooka-f1"},
  {id:30,crop:"Огурцы",name:"NW6063 F1",slug:"nw6063-f1"},
  {id:31,crop:"Огурцы",name:"OLIVER F1",slug:"oliver-f1"},
  {id:32,crop:"Огурцы",name:"OFFICER F1",slug:"officer-f1"},
  {id:33,crop:"Огурцы",name:"APOLO F1",slug:"apolo-f1"},
  {id:34,crop:"Огурцы",name:"ZICO F1",slug:"zico-f1"},
  {id:35,crop:"Огурцы",name:"CU35641 F1",slug:"cu35641-f1"},
  {id:36,crop:"Сладкий перец",name:"KARISMA F1",slug:"karisma-f1"},
  {id:67,crop:"Сладкий перец",name:"AMAROK F1",slug:"amarok-f1"},
  {id:37,crop:"Сладкий перец",name:"VANGUARD F1",slug:"vanguard-f1"},
  {id:38,crop:"Сладкий перец",name:"HERCULES F1",slug:"hercules-f1"},
  {id:39,crop:"Сладкий перец",name:"OIDA F1",slug:"oida-f1"},
  {id:41,crop:"Цветная капуста",name:"GALIOTE F1"},
  {id:42,crop:"Цветная капуста",name:"OBITO F1"},
  {id:43,crop:"Цветная капуста",name:"ARDENT F1"},
  {id:44,crop:"Цветная капуста",name:"THALASSA F1"},
  {id:45,crop:"Цветная капуста",name:"MIGNON F1"},
  {id:46,crop:"Цветная капуста",name:"CLIPPER F1"},
  {id:47,crop:"Капуста",name:"FORA F1"},
  {id:48,crop:"Капуста",name:"SURKHAN F1"},
  {id:49,crop:"Капуста",name:"BINGO F1"},
  {id:50,crop:"Капуста",name:"CENTURION F1"},
  {id:51,crop:"Капуста",name:"RED SKY F1"},
  {id:52,crop:"Сладкая кукуруза (SH2)",name:"832 F1"},
  {id:53,crop:"Сладкая кукуруза (SH2)",name:"DRIVER F1"},
  {id:54,crop:"Сладкая кукуруза (SH2)",name:"TURBINE F1"},
  {id:55,crop:"Сладкая кукуруза (SH2)",name:"HIGLOW 52 F1"},
  {id:56,crop:"Сладкая кукуруза (SH2)",name:"TYSON F1"},
  {id:57,crop:"Бахчевые культуры",name:"IMPRESA F1"},
  {id:58,crop:"Бахчевые культуры",name:"MARADONA F1"},
  {id:59,crop:"Бахчевые культуры",name:"SUPER CRIMSON"},
  {id:60,crop:"Бахчевые культуры",name:"AU PRODUCER"},
  {id:61,crop:"Зелени",name:"PRIMARIS"},
  {id:62,crop:"Зелени",name:"NOVAS"},
  {id:63,crop:"Зелени",name:"ROBUST"},
  {id:64,crop:"Кормовая кукуруза",name:"DMS 3111"},
  {id:65,crop:"Кормовая кукуруза",name:"DMS 3477"},
  {id:66,crop:"Кормовая кукуруза",name:"AGM 1403"},
];

const urls = [];
urls.push({ loc: `${SITE_URL}/`, priority: "1.0" });
urls.push({ loc: `${SITE_URL}/agrotehnika`, priority: "0.5" });
urls.push({ loc: `${SITE_URL}/poleznaya-informatsiya`, priority: "0.5" });

for (const c of crops) {
  urls.push({ loc: `${SITE_URL}/catalog/${getCropSlug(c.id)}`, priority: "0.8" });
}
for (const p of products) {
  urls.push({ loc: `${SITE_URL}/catalog/${getCropSlug(p.crop)}/${getProductSlug(p)}`, priority: "0.7" });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync("sitemap.xml", xml);
console.log(`Готово: ${urls.length} URL записано в sitemap.xml`);
