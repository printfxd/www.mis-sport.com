import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { S as SheetToProduct, $ as $$ProductList, a as $$Layout } from './chunk.f15e67aa.js';
/* empty css                *//* empty css                */import { f as json } from './chunk.815cbea1.js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$MisSport = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MisSport;
  const BRAND_NAME = "MIS-SPORT";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(
    rows,
    header
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "BICYCLE LINE | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="misBanner1"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-missport.mp4" type="video/mp4"> </video> <div class="inner"> <h1><br><br>MIS SPORT<br><br><br></h1> <h6>\n\u56E0\u61C9\u56DB\u5B63\u6C23\u5019\u8B8A\u5316\u8207\u8077\u696D\u9078\u624B\u7684\u8CFD\u4E8B\u9700\u6C42\uFF0C\u4E0D\u65B7\u63D0\u5347\u6211\u5011\u7684\u54C1\u8CEA\uFF0E<br>\n\u9019\u5C31\u662F MIS SPORT \u6210\u7ACB\u7684\u521D\u8877\n</h6> </div> </section> ', '  <script defer src="/assets/js/mis-banner-1.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "misCustom", "brandName": BRAND_NAME, "products": productlistByTopic[0] })) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/mis-sport.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/mis-sport.astro";
const $$url = "/mis-sport";

export { $$MisSport as default, $$file as file, $$url as url };
