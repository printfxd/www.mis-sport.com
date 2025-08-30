import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.0eab6b97.js';
/* empty css                *//* empty css                */import { g as json } from './chunk.1ec0e848.js';

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PRO TEAMS SERIES | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="proteamsBanner1"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-proteams-hagens.mp4" type="video/mp4"> </video> <div class="inner"> <h1><br><br>PRO CONTINENTAL TEAMS</h1> <h6>\u6D32\u969B\u8077\u696D\u8ECA\u968A</h6> </div> </section> ', '  <script defer src="/assets/js/proteams-banner-1.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "proContinentalTeam", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/proteams.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/proteams.astro";
const $$url = "/proteams";

export { $$Proteams as default, $$file as file, $$url as url };
