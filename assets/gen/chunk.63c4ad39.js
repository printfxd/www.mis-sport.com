import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.9b7fd63e.js';
/* empty css                *//* empty css                */import { d as json } from './chunk.276468ee.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Met = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Met;
  const BRAND_NAME = "MET";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(
    rows,
    header
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "MET HELMETS | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="metBanner1"> <div class="inner"> <h1>MET ROAD<br></h1> <h6> <br>\u5F9E WorldTour \u5230 Cafe Shop\uFF0CMET\n                \u901A\u904E\u4E00\u7CFB\u5217\u53EF\u4EE5\u5168\u5929\u4F69\u6234\u7684\u9AD8\u6027\u80FD\u901A\u98A8\u5B89\u5168\u5E3D\u4F86\u4EAB\u53D7\u516C\u8DEF\u81EA\u884C\u8ECA\u7684\u9B45\u529B\u3002\n<br>MET\n                \u7684\u516C\u8DEF\u5B89\u5168\u5E3D\u56E0\u5176\u8A2D\u8A08\u64C1\u6709\u8207\u4E9E\u6D32\u4EBA\u982D\u578B\u7684\u543B\u5408\u5EA6\u800C\u9A5A\u8C54\u65BC\u53F0\u7063\u5E02\u5834\uFF0C\u5C08\u70BA\u60A8\u7684\u516C\u8DEF\u8ECA\u6D3B\u52D5\u800C\u8A2D\u8A08\uFF0C\u4E26\u966A\u4F34\u60A8\u524D\u5F80\u4EFB\u4F55\u53BB\u8655\u3002\n</h6> </div> </section> ', '  <section id="metBanner2"> <div class="inner"> <h1>MET MTB<br></h1> <h6> <br>MET\u5C07\u9078\u624B\u5011\u7F6E\u65BC\u8A2D\u8A08\u7684\u4E2D\u5FC3\uFF0C\u8B93\u60A8\u7684\u904B\u52D5\u66F4\u8F15\u9B06\uFF0C\u9A0E\u4E58\u9AD4\u9A57\u66F4\u597D\u3002\n<br>\u4ED4\u7D30\u89C0\u5BDF\u6703\u767C\u73FE\u5728\u6211\u5011\u7684 MTB\n                \u7CFB\u5217\u4E2D\uFF0C\u5F9E\u900F\u6C23\u5B89\u5168\u7684\u7D50\u69CB\u4E26\u8207\u5927\u98A8\u93E1\u767E\u642D\u7684\u5168\u7F69\u5B89\u5168\u5E3D\uFF0C\u518D\u5230\u8F15\u4FBF\u537B\u4ECD\u6709\u8D85\u5F37\u4FDD\u8B77\u7684\u534A\u7F69\u5B89\u5168\u5E3D\u3002\u7686\u9069\u5408\u8207\u60A8\u4E00\u8D77\u9032\u884C\u8F15\u5EA6\u8D8A\u91CE\u3001\u5168\u5730\u5F62\u63A2\u7D22\u3001\u53C3\u52A0\u8010\u529B\u8CFD\u548C\u9AD8\u901F\u4E0B\u5761\u7684\u6311\u6230\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/met-banner-1.js"><\/script> <script defer src="/assets/js/met-banner-2.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "metRoad", "brandName": BRAND_NAME, "products": productlistByTopic[0] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "metMTB", "brandName": BRAND_NAME, "products": productlistByTopic[1] })) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/met.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/met.astro";
const $$url = "/met";

export { $$Met as default, $$file as file, $$url as url };
