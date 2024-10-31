import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { a as $$Layout } from './chunk.158f11b8.js';
/* empty css                */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "MIS Sport \u7C73\u8A69\u570B\u969B", "showMap": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="banner"> <div class="filter: contrast(10%);"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-homepage-summer-2024.mp4" type="video/mp4"> </video> </div> <div class="inner"> <h1>2024 \u590F\u5B63\u65B0\u54C1\u5230\u8CA8<br></h1> <div class="content"> <p> <br>Bicycle-Line \u5C07\u985B\u8986\u60A8\u5C0D\u9802\u7D1A\u7684\u5B9A\u7FA9\u3002\n<br>\u6E96\u5099\u597D\u8457\u88DD\u51FA\u9580\u63A2\u96AA\u4E86\u55CE\uFF01\uFF1F\n</p> <ul class="actions special"> <li><a href="bicycle-line.html" class="button large next">\u77AD\u89E3\u66F4\u591A</a></li> </ul> </div> </div> </section> <script defer src="/assets/js/home-banner.js"><\/script> '])), maybeRenderHead()) })}`;
}, "/Users/printfxd/git/mis-sport-next/src/pages/index.astro", void 0);

const $$file = "/Users/printfxd/git/mis-sport-next/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
