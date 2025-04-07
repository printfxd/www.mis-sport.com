import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.63d71275.js';
/* empty css                *//* empty css                */import { i as json } from './chunk.3e923921.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Teosport = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Teosport;
  const BRAND_NAME = "TEOSPORT";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(rows, header);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TEOSPORT CYCLING | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="teosportBanner1"> <!--\n        <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(80%);">\n            <source src="https://storage.googleapis.com/mis-sport/video/video-teosport01.mp4" type="video/mp4">\n        </video>\n        --> <div class="inner"> <h1>\u7576\u7528\u5FC3\u7684\u4F5C\u54C1\u5B8C\u6210\u6642<br>\u5B8C\u7F8E\u8207\u5353\u8D8A\u5C31\u6703\u88AB\u770B\u898B<br></h1> <h6> <br>TEOSPORT \u6BCF\u4E00\u4EF6\u7522\u54C1\u90FD\u662F\u5C07\u5DE5\u85DD\u7CBE\u795E\u90FD\u767C\u63EE\u81F3\u6700\u5C0F\u7684\u7D30\u7BC0\uFF0C\u5805\u6301\u5320\u5FC3\u624B\u4F5C\u7684\u6210\u679C\u3002\n<br>\u5728\u591A\u5E74\u7D93\u9A57\u7D2F\u7A4D\u4E0B\uFF0C\u7CBE\u6E96\u7684\u6280\u85DD\u548C\u5C0D\u54C1\u8CEA\u7684\u6CE8\u91CD\uFF0C\u5275\u9020\u51FA\u4E86\u7B26\u5408\u9078\u624B\u8207\u5927\u773E\u9700\u6C42\uFF0C\u771F\u6B63\u7368\u7279\u7684\u7522\u54C1\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/teosport-banner-1.js"><\/script> <script defer src="/assets/js/jquery.selectorr.min.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "teosportAccessories", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/teosport.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/teosport.astro";
const $$url = "/teosport";

export { $$Teosport as default, $$file as file, $$url as url };
