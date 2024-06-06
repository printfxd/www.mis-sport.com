import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.9b7fd63e.js';
/* empty css                *//* empty css                */import { g as json } from './chunk.276468ee.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Proteams = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Proteams;
  const BRAND_NAME = "PROTEAMS";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(
    rows,
    header
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PRO TEAMS SERIES | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="proteamsBanner1"> <div class="filter: contrast(10%);"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteams-dsm-firmenich-PostNL.mp4" type="video/mp4"> </video> </div> <div class="inner"> <h1><br><br>DSM-FIRMENICH-POSTNL PROTEAM</h1> <h6>DSM-\u8377\u862D\u7687\u5BB6\u90F5\u653F\u8ECA\u968A</h6> </div> </section> ', '  <section id="proteamsBanner2"> <div class="filter: contrast(10%);"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteams-fdj.mp4" type="video/mp4"> </video> </div> <div class="inner"> <h1><br><br>Groupama-FDJ PROTEAM</h1> <h6>\u5B89\u76DF-FDJ\u8ECA\u968A</h6> </div> </section> ', '  <section id="proteamsBanner3"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteams-movistar.mp4" type="video/mp4"> </video> <div class="inner"> <h1><br><br>Movistar ProTeam</h1> <h6>\u79FB\u52D5\u4E4B\u661F\u8ECA\u968A</h6> </div> </section> ', '  <section id="proteamsBanner4"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteams-hagens.mp4" type="video/mp4"> </video> <div class="inner"> <h1><br><br>PRO CONTINENTAL TEAMS</h1> <h6>\u6D32\u969B\u8077\u696D\u8ECA\u968A</h6> </div> </section> ', '  <section id="proteamsBanner5"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteama-ale-btc-ljubljana.mp4" type="video/mp4"> </video> <div class="inner"> <h1><br><br>UCI WOMEN PROTEAMS</h1> <h6>\u5973\u5B50\u8077\u696D\u8ECA\u968A</h6> </div> </section> ', '  <script defer src="/assets/js/proteams-banner-1.js"><\/script> <script defer src="/assets/js/proteams-banner-2.js"><\/script> <script defer src="/assets/js/proteams-banner-3.js"><\/script> <script defer src="/assets/js/proteams-banner-4.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "dsmProteam", "brandName": BRAND_NAME, "products": productlistByTopic[0] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "fdjProteam", "brandName": BRAND_NAME, "products": productlistByTopic[1] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "movistarProteam", "brandName": BRAND_NAME, "products": productlistByTopic[2] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "proContinentalTeam", "brandName": BRAND_NAME, "products": productlistByTopic[3] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "uciWomenTeam", "brandName": BRAND_NAME, "products": productlistByTopic[4] })) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/proteams.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/proteams.astro";
const $$url = "/proteams";

export { $$Proteams as default, $$file as file, $$url as url };
