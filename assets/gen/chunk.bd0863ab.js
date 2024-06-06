import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.9b7fd63e.js';
/* empty css                *//* empty css                */import { h as json } from './chunk.276468ee.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Sale = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sale;
  const BRAND_NAME = "SALE";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(rows, header);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ARCHIVE SALE | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="saleBanner1"> <div class="inner"> <h1>\u51FA\u6E05\u7279\u8CE3 SALE<br></h1> <h6> <br>\u5C0D\uFF0C\u9650\u91CF\u7E3D\u662F\u6B98\u9177\u7684\n<br>\u628A\u63E1\u6211\u5011\u6700\u5F8C\u7684\u9019\u4E9B\u5C3A\u78BC\uFF0C\u4E0D\u8981\u932F\u904E\n</h6> </div> </section> ', '  <script defer src="/assets/js/sale-banner-1.js"><\/script> <script defer src="/assets/js/jquery.selectorr.min.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "sale", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/sale.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/sale.astro";
const $$url = "/sale";

export { $$Sale as default, $$file as file, $$url as url };
