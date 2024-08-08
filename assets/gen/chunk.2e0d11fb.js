import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.861ff3b8.js';
/* empty css                *//* empty css                */import { c as json } from './chunk.717d1629.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$BicycleLine = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BicycleLine;
  const BRAND_NAME = "BICYCLE-LINE";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(
    rows,
    header
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "BICYCLE LINE | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="blBanner1"> <div class="inner"> <h1>BICYCLE-LINE SUMMER<br></h1> <h6> <br>\u7121\u8AD6\u4F60\u662F\u7D93\u9A57\u8C50\u5BCC\u7684\u9078\u624B\u9084\u662F\u525B\u52A0\u5165\u7684\u521D\u5B78\u8005\uFF0CBL\u5168\u65B0\u7CFB\u5217\u90FD\u5C07\u5E6B\u4F60\u5B8C\u6210\u4EAB\u53D7\u9A0E\u4E58\u611B\u8ECA\u7684\u6BCF\u4E00\u523B\u3002\n<br>\u7099\u71B1\u590F\u5929\uFF0C\u7A7F\u8457BL\u9802\u7D1A\u5C08\u696D\u65B0\u88DD\u51FA\u9580\u63A2\u7D22\u9A0E\u4E58\u6A02\u8DA3\u3002\n</h6> </div> </section> ', '  <section id="blBanner2"> <div class="inner"> <h1>BICYCLE-LINE WINTER<br></h1> <h6> <br>\u5C08\u70BA\u8FFD\u6C42\u529F\u80FD\u6027\u548C\u6642\u5C1A\u611F\u7684\u60A8\uFF0C\u9686\u91CD\u4ECB\u7D39\u6211\u5011\u6700\u65B0\u98A8\u683C\u8207\u6027\u80FD\u5B8C\u7F8E\u7D50\u5408\u7684\u79CB\u51AC\u7CFB\u5217\u3002\n<br>\u8B93\u7CBE\u5FC3\u6253\u9020\u7684\u4FDD\u6696\u5E03\u6599\u548C\u5927\u81BD\u7684\u526A\u88C1\u8A2D\u8A08\uFF0C\u8207\u60A8\u4E00\u8D77\u5145\u6EFF\u81EA\u4FE1\u548C\u71B1\u60C5\u5EA6\u904E\u6574\u500B\u8CFD\u5B63\u3002\n</h6> </div> </section> ', '  <section id="blBanner3"> <div class="inner"> <h1>BICYCLE-LINE CUSTOM<br></h1> <h6> <br>Bicycle Line \u5728\u4ECA\u5E74\u590F\u5B63\u70BA\u60A8\u737B\u4E0A\u7368\u4E00\u7121\u4E8C\u7684\u7279\u4ED5\u5316\u7522\u54C1\uFF0C\u9650\u91CF\u8CA9\u552E\u4E2D\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/bl-banner-1.js"><\/script> <script defer src="/assets/js/bl-banner-2.js"><\/script> <script defer src="/assets/js/bl-banner-3.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "bicycleLineSummer", "brandName": BRAND_NAME, "products": productlistByTopic[0] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "bicycleLineWinter", "brandName": BRAND_NAME, "products": productlistByTopic[1] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "bicycleLineCustom", "brandName": BRAND_NAME, "products": productlistByTopic[2] })) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/bicycle-line.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/bicycle-line.astro";
const $$url = "/bicycle-line";

export { $$BicycleLine as default, $$file as file, $$url as url };
