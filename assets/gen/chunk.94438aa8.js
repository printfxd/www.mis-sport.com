import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.9b7fd63e.js';
/* empty css                *//* empty css                */import { f as json } from './chunk.276468ee.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Nalini = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nalini;
  const BRAND_NAME = "NALINI";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(rows, header);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ARCHIVE SALE | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="naliniBanner1"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(80%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-nalini01.mp4" type="video/mp4"> </video> <div class="inner"> <h1>NALINI SUMMER<br><br><br></h1> <h6> <br>\u300E\u4EE5\u4E16\u754C\u4E00\u6D41\u7522\u54C1\u5728\u82DB\u523B\u7684\u74B0\u5883\u4E0B\u6EFF\u8DB3\u512A\u79C0\u9078\u624B\u7684\u9700\u6C42\u300F\n<br>\u4E00\u76F4\u90FD\u662F NALINI \u5C55\u73FE\u5C0D\u81EA\u884C\u8ECA\u904B\u52D5\u7684\u71B1\u60C5\u548C\u9A45\u52D5\u529B\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/nalini-banner-1.js"><\/script> <script defer src="/assets/js/jquery.selectorr.min.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "naliniSummer", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/nalini.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/nalini.astro";
const $$url = "/nalini";

export { $$Nalini as default, $$file as file, $$url as url };
