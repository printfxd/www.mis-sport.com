import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, e as renderSlot, f as renderHead, b as addAttribute, u as unescapeHTML } from './chunk.b0db1f2f.js';
import 'clsx';
import { $ as $$Copyright, a as $$Navigator, b as $$Header, e as embedUrl, j as json } from './chunk.276468ee.js';
/* empty css                *//* empty css                */
const $$Astro$4 = createAstro("https://mis-sport.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const { showMap } = Astro2.props;
  return renderTemplate`<!-- Footer -->${maybeRenderHead()}<section id="footer" class="wrapper"> <div class="inner"> <div class="split"> <div class="content"> <header> <h2> <img src="https://storage.googleapis.com/mis-sport/logo/mis-logo.png" alt="logo" width="38" height="auto" class="rounded-circle"> 關於我們
</h2> </header> <p> <span class="image left"> <img src="https://storage.googleapis.com/mis-sport/home/mis-sport-shop.jpg" alt=""> </span>
MIS Sport於2016創立，成員皆是單車的愛好者，主因是對運動及單車的熱誠，進而成立公司，想把好的單車產品推廣給台灣喜愛單車活動的朋友．
<br>
如同我們的口號"you are not alone"一樣，我們的責任是建立一個友善的騎車環境與社群，透過騎乘單車，連結我們與社群之間的情誼．
</p> </div> <ul class="contact-icons"> <li> <a href="https://www.facebook.com/MISsports" class="icon brands alt fa-facebook-f"><span class="label">FB@MISsports</span></a> </li> <li> <a href="https://line.me/R/ti/p/@457xrpaj" class="icon brands alt fa-line"><span class="label">LINE@Mis Sport</span></a> </li> <li> <a href="mailto:official@mis-sport.com" class="icon solid alt fa-envelope"><span class="label">official@mis-sport.com</span></a> </li> <li> <a href="tel:+886-2-28853525" class="icon solid alt fa-phone"><span class="label">(02) 2885 3525</span></a> </li> </ul> </div> ${showMap ? renderTemplate`<div class="box"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1260.025102256792!2d121.52073561939807!3d25.080218765083487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aeb4a0898c2d%3A0x6a7b9201c0929beb!2zTUlTIFNQT1JUIOe-qeWkp-WIqeWwiOalreWWrui7iuacjQ!5e0!3m2!1szh-TW!2stw!4v1678721423838!5m2!1szh-TW!2stw" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </div>` : void 0} </div> </section>`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/components/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$3 = createAstro("https://mis-sport.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, darkText, showMap } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<html> <head><title>", '</title><meta charset="utf-8"><link rel="icon" type="images/x-icon" href="https://storage.googleapis.com/mis-sport/logo/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"><link rel="stylesheet" href="/assets/css/main.css"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"><script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"><\/script><script defer src="/assets/js/jquery.min.js"><\/script><script defer src="/assets/js/jquery.scrollex.min.js"><\/script><script defer src="/assets/js/jquery.scrolly.min.js"><\/script><script defer src="/assets/js/jquery.selectorr.min.js"><\/script><script defer src="/assets/js/browser.min.js"><\/script><script defer src="/assets/js/breakpoints.min.js"><\/script><script defer src="/assets/js/util.js"><\/script><script defer src="/assets/js/main.js"><\/script><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-FVNCV5VCTL"><\/script><script>\n			window.dataLayer = window.dataLayer || [];\n			function gtag() {\n				dataLayer.push(arguments);\n			}\n			gtag("js", new Date());\n\n			gtag("config", "G-FVNCV5VCTL");\n		<\/script>', '</head> <body class="is-preload"> <!-- Page wrapper --> <div id="page-wrapper"> ', " ", " ", " </div> ", " ", " </body></html>"])), title, renderHead(), renderComponent($$result, "Header", $$Header, { "darkText": darkText }), renderComponent($$result, "Navigator", $$Navigator, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "showMap": showMap }), renderComponent($$result, "Copyright", $$Copyright, {}));
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/layouts/Layout.astro", void 0);

const splitByAttr = (list, attr = 0) => {
    let last;
    const idxes = [];
    list.forEach((o, i) => {
        if (last === o[attr]) return
        last = o[attr];
        idxes.push(i);
    });
    return idxes.map((e, i, a) => list.slice(e, a[i + 1]))
};

const trimStr = (s) => typeof s === 'string' ? s.trim() : s;

const getReducerForRow2obj = (header) => (prev, val, idx) => {
    let attr = trimStr(header[idx]);
    if (attr) prev[attr] = trimStr(val);
    return prev
};

const SheetToProduct = (rows, header) => {
    const row2obj = getReducerForRow2obj(header);
    const couldBeLast = ['Topic', 'Series', 'EnglishSeries'];
    const nonEmptyAttrs = ['ProductName'];
    let last = {};
    const objList = [];
    rows.forEach((row,idx) => {
        if (!row || !row.length) return
        const obj = row.reduce(row2obj, {});
        couldBeLast.forEach((attr) => {
            if (obj[attr]) last[attr] = obj[attr];
            else obj[attr] = last[attr];
        });
        if (nonEmptyAttrs.find((attr) => !obj[attr])) return
        objList.push(obj);
    });
    return splitByAttr(objList, 'Topic')
};

const $$Astro$2 = createAstro("https://mis-sport.com");
const $$ProductCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { brandName, product } = Astro2.props;
  const NEW_LABEL = `<img src="https://storage.googleapis.com/mis-sport/logo/new-item.png" alt="New Product" width="42" height="42" class="rounded-circle"></img>`;
  const SALE_LABEL = `<img src="https://storage.googleapis.com/mis-sport/logo/sale-item.png" alt="Special Price" width="42" height="42" class="rounded-circle"></img>`;
  const NO_LABEL = `<div width="42" height="42"></div>`;
  const toStr = (v) => typeof v !== "string" ? "" : v;
  const price4label = (v1, v2, newItem) => {
    const withComma = (v) => {
      let num = NaN;
      if (typeof v === "number")
        num = v;
      else if (typeof v === "string")
        num = parseInt(v);
      return !isNaN(num) && num.toLocaleString() || "";
    };
    const setupPrice = (v, newItem2) => {
      return {
        label: newItem2 && NEW_LABEL || NO_LABEL,
        price: `<p class="text-end stretched-link text-dark" style="word-wrap:break-word;">NT$${withComma(
          v
        )}</p>`
      };
    };
    const priceAndDiscounted = (p, d) => {
      return {
        label: SALE_LABEL,
        price: `<p class="text-end stretched-link" style="color:IndianRed;word-wrap:break-word;"><sup class="text-decoration-line-through" style="color:Silver;">NT$${withComma(
          p
        )} </sup>NT$${withComma(d)}</p>`
      };
    };
    const i1 = parseInt(v1), i2 = parseInt(v2);
    if (isNaN(i1)) {
      if (isNaN(i2)) {
        console.error("invalid prices:", v1, v2);
        return { label: NO_LABEL, price: "" };
      }
      return setupPrice(i2, newItem);
    } else if (isNaN(i2)) {
      return setupPrice(i1, newItem);
    } else if (i1 == i2) {
      return setupPrice(i1, newItem);
    } else {
      return i1 > i2 ? priceAndDiscounted(i1, i2) : priceAndDiscounted(i2, i1);
    }
  };
  const t = product.Topic?.replaceAll(" ", "_") || "";
  const es = product.EnglishSeries?.replaceAll(" ", "_") || "";
  const ep = product.EnglishName?.replaceAll(" ", "_") || "";
  const productUrl = `/${[
    "product",
    encodeURIComponent(brandName),
    encodeURIComponent(t),
    encodeURIComponent(es),
    encodeURIComponent(ep)
  ].join("/")}/`;
  const imgList = (product.Img || "").split(";").map(embedUrl).filter(Boolean);
  const imgUrl = imgList[0] || "";
  const hoverImgAttr = imgList[1] || null;
  const logoUrl = embedUrl(product.Logo);
  const labelPrice = price4label(
    toStr(product.Price),
    toStr(product.Price2),
    toStr(product.New)
  );
  let colorList = "";
  if (product.ColorWithSizes) {
    const str2color = (s) => {
      if (s && typeof s !== "string")
        return null;
      let t2 = s.trim();
      if (t2.startsWith("["))
        t2 = t2.substring(t2.indexOf("]") + 1);
      const p = t2.indexOf("(");
      const c = (p === -1 ? t2 : t2.substring(0, p)).trim();
      if (!c)
        return null;
      return '<div class="mine-circle-fill" style="background-color:' + c + ';"></div>';
    };
    colorList = product.ColorWithSizes.split(";").map(str2color).filter(Boolean).join("");
  }
  return renderTemplate`${maybeRenderHead()}<div class="col"> <div class="card card-cover h-100% overflow-hidden text-bg-white rounded-4 shadow-lg" onmouseenter="onHoverProductCard(event);" onmouseout="onHoverProductCard(event);"> <img${addAttribute(imgUrl, "src")}${addAttribute(imgUrl, "data-src")}${addAttribute(hoverImgAttr, "data-hover-src")} class="card-img-top"${addAttribute(product.ProductName, "alt")}> <div class="card-img-overlay"> <ul class="d-flex list-unstyled mt-auto"> <li class="me-auto">${unescapeHTML(labelPrice.label)}</li> </ul> </div> <div class="d-flex justify-content-center p-2 pb-0">${unescapeHTML(colorList)}</div> <div class="card-body"> <h6 class="card-title text-center"> ${brandName}<br>${product.ProductName} </h6> <br> <ul class="d-flex list-unstyled mt-auto"> <li class="me-auto"> <img${addAttribute(logoUrl, "src")}${addAttribute(brandName, "alt")} width="36" height="36" class="rounded-circle border border-white"> </li> <li class="me-auto"></li> <li class="me-auto"></li> <li class="me-auto"> <a class="product-link"${addAttribute(productUrl, "href")} onclick="onClickProductCard(event);">${unescapeHTML(labelPrice.price)}</a> </li> </ul> </div> </div> </div>`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/components/ProductCard.astro", void 0);

const $$Astro$1 = createAstro("https://mis-sport.com");
const $$ProductList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductList;
  const { id, brandName, products } = Astro2.props;
  const topicName = products?.[0]?.Topic || "";
  const seriesNames = !products ? [] : products.reduce((list, product) => {
    if (product.Series && !list.includes(product.Series)) {
      return list.concat(product.Series);
    }
    return list;
  }, []);
  return renderTemplate`${products ? renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="wrapper style2 product-list"><div class="inner"><div class="d-block d-lg-none"><div class="col-12"><select class="select-tabs" style="border-color: #000000;box-shadow: 0 0 0 1px #000000;" onchange="onTabSelected(event);">${seriesNames.map((series) => {
    return renderTemplate`<option>${series}</option>`;
  })}</select></div></div><ul class="tabs">${seriesNames.map((series) => {
    return renderTemplate`<li><h3>${series}</h3><div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5"${addAttribute(topicName, "data-topic")}${addAttribute(series, "data-series")}>${products.filter(
      ({ Series }) => Series === series
    ).map((product) => {
      return renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "brandName": brandName, "product": product })}`;
    })}</div></li>`;
  })}</ul></div></section>` : null}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/components/ProductList.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://mis-sport.com");
const $$Ale = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ale;
  const BRAND_NAME = "ALE";
  const [header, ...rows] = json.values;
  const productlistByTopic = SheetToProduct(rows, header);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ALE CYCLING | MIS Sport \u7C73\u8A69\u570B\u969B", "darkText": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section id="aleBanner1"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-ale01.m4v" type="video/mp4"> </video> <div class="inner"> <h1>ALE SUMMER<br><br></h1> <h6> <br>\u5728\u6BCF\u4E00\u5929\uFF0C\u6BCF\u4E00\u6B21\u9A0E\u4E58\uFF0C\u4EAB\u53D7\u7576\u4E0B\u4E26\u76E1\u60C5\u4EAB\u53D7\u751F\u6D3B\u3002\n</h6> </div> </section> ', '  <section id="aleBanner2"> <video autoplay muted loop playsinline poster="" class="video-background" style="position:absolute; top:0; left:0; width:100%; height: 100%; object-fit: cover; filter: brightness(70%);"> <source src="https://storage.googleapis.com/mis-sport/video/video-ale02.mp4" type="video/mp4"> </video> <div class="inner"> <h1>ALE WINTER<br><br></h1> <h6> <br>\u7121\u61FC\u5BD2\u51B7\u7684\u6EAB\u5EA6\u3001\u98A8\u4EE5\u53CA\u96E8\u3002\n<br>\u7121\u8AD6\u5728\u4F55\u7A2E\u689D\u4EF6\u4E0B\u9A0E\u4E58\uFF0CAl\xE9\n                \u59CB\u7D42\u6703\u8B93\u60A8\u611F\u5230\u4FDD\u8B77\u3001\u4E7E\u723D\u3001\u900F\u6C23\uFF0C\u8B93\u60A8\u7684\u904B\u52D5\u8868\u73FE\u80FD\u5920\u767C\u63EE\u5230\u6975\u81F4\u3002\n</h6> </div> </section> ', '  <script defer src="/assets/js/ale-banner-1.js"><\/script> <script defer src="/assets/js/ale-banner-2.js"><\/script> <script defer src="/assets/js/jquery.selectorr.min.js"><\/script>  '])), maybeRenderHead(), renderComponent($$result2, "ProductList", $$ProductList, { "id": "aleSummer", "brandName": BRAND_NAME, "products": productlistByTopic[0] }), renderComponent($$result2, "ProductList", $$ProductList, { "id": "aleWinter", "brandName": BRAND_NAME, "products": productlistByTopic[1] })) })}`;
}, "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/ale.astro", void 0);

const $$file = "/mnt/hdd2/biz.repo/astro-mis-sport/src/pages/ale.astro";
const $$url = "/ale";

const ale = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ale,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProductList as $, SheetToProduct as S, $$Layout as a, ale as b };
