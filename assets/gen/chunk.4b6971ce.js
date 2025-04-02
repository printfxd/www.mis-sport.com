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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TEOSPORT CYCLING | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="teosportBanner1"> <!--\n        <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(80%);">\n            <source src="https://storage.googleapis.com/mis-sport/video/video-teosport01.mp4" type="video/mp4">\n        </video>\n        --> <div class="inner"> <h1>TEOSPORT<br>\u56DB\u5341\u5E74\u7D93\u9A57\u7684\u9802\u5C16\u81EA\u884C\u8ECA\u54C1\u724C<br><br></h1> <h6> <br>\u6191\u85C9\u8C50\u5BCC\u7684\u7D93\u9A57\u548C\u4E86\u89E3\u5BA2\u6236\u9700\u6C42\u7684\u80FD\u529B\uFF0CTEOSPORT\u6210\u70BA\u4E86\u696D\u754C\u9802\u5C16\u54C1\u724C\u4E26\u6210\u70BA\u8A31\u591A\u4E16\u754C\u5927\u5EE0\u7684\u5408\u4F5C\u5925\u4F34\u3002\n<br>\u6211\u5011\u7684\u9858\u666F\u662F\u900F\u904E\u6280\u8853\u5275\u65B0\u548C\u672A\u4F86\u767C\u5C55\u5C07\u8207\u4E16\u754C\u5404\u5730\u7684\u904B\u52D5\u54E1\u5206\u4EAB\uFF0C\u4EE5\u78BA\u4FDD\u6BCF\u500B\u9A0E\u81EA\u884C\u8ECA\u7684\u4EBA\u7684\u8212\u9069\u5EA6\u4E26\u63D0\u9AD8\u4ED6\u5011\u7684\u904B\u52D5\u8868\u73FE\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/teosport-banner-1.js"><\/script> <script defer src="/assets/js/jquery.selectorr.min.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "teosportAccessories", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/teosport.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/teosport.astro";
const $$url = "/teosport";

export { $$Teosport as default, $$file as file, $$url as url };
