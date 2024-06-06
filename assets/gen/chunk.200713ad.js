import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './chunk.b0db1f2f.js';
import 'clsx';
import { a as $$Layout } from './chunk.9b7fd63e.js';
/* empty css                */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "MIS Sport \u7C73\u8A69\u570B\u969B", "showMap": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="banner"> <div class="inner"> <h1>\u6FC0\u52F5\u4EBA\u5FC3\u7684\u65B0\u7BC7\u7AE0<br></h1> <div class="content"> <p> <br>\n"<b>KEEP CHALLENGING</b>"\uFF0C\n					\u5169\u689D\u9192\u76EE\u7684\u689D\u7D0B\u8CAB\u7A7F\u4E86\u85CD\u8207\u767D\u7D44\u6210\u7684\u5C71\u5CF0\uFF0C\u5C55\u73FE\u812B\u7A4E\u800C\u51FA\u7684\u6A59\u8272\u529B\u91CF\u3002<br><br>\n\u5168\u65B0\u7684 DSM-\u8377\u862D\u7687\u5BB6\u90F5\u653F\u8ECA\u968A\uFF0C\u73FE\u6B63\u63A8\u51FA\u4E2D\u3002\n</p> <ul class="actions special"> <li> <a href="/proteams" class="button large next">\u77AD\u89E3\u66F4\u591A</a> </li> </ul> </div> </div> </section> <script defer src="/assets/js/home-banner.js"><\/script> '])), maybeRenderHead()) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/index.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
