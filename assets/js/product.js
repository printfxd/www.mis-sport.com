const AllSizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn))
const onClickProductColor = (e) => {
    const colorEl = e.target
    if (!colorEl) return
    const list = colorEl.dataset.sizes.split(',')
    document.querySelectorAll('.mine-circle-fill').forEach(e => {
        if (e === colorEl) {
            e.classList.add('active')
            document.querySelectorAll('.product-color-name').forEach(e2 => {
                e2.textContent = '#' + colorEl.dataset.color
            })
        } else e.classList.remove('active')
    })
    const label = colorEl.dataset.productImgLabel
    if (label) {
        const jumpTo = document.querySelector('.dot[data-product-img-label="' + label + '"]')
        if (jumpTo) jumpTo.click()
        const pshow = (e) => e.parentNode.style.display = 'block'
        const phide = (e) => e.parentNode.style.display = 'none'
        const list = document.querySelectorAll('img[data-product-img-label="' + label + '"]')
        if (list.length == 0) {
            document.querySelectorAll('img[data-product-img-label]').forEach(pshow)
        } else {
            document.querySelectorAll('img[data-product-img-label]').forEach(phide)
            list.forEach(pshow)
        }
        if (list.length <= 10) {
            document.querySelectorAll('.gallery').forEach(e => e.style.columns = 1)
        } else {
            document.querySelectorAll('.gallery').forEach(e => e.style.removeProperty('columns'))
        }
    }
    document.querySelectorAll('[data-product-size]').forEach(e => {
        let size = e.dataset.productSize
        if (list.includes(size)) {
            e.classList.remove('text-bg-light', 'deactive')
            e.classList.add('text-bg-dark')
        } else {
            e.classList.add('text-bg-light', 'deactive')
            e.classList.remove('text-bg-dark')
        }
    })
}
const initProductConfig = (config) => {
    const urlParams = new URLSearchParams(window.location && window.location.search)
    if (!urlParams || !urlParams.has('s')) throw new Error('not found product info')
    // must given
    config.brandName = decodeURIComponent(urlParams.get('b')).trim()
    // product info
    config.enTopic = decodeURIComponent(urlParams.get('et')).trim()
    config.enSerires = decodeURIComponent(urlParams.get('es')).trim()
    config.enProduct = decodeURIComponent(urlParams.get('ep')).trim()
    // or
    config.topicName = decodeURIComponent(urlParams.get('t')).trim()
    config.seriresName = decodeURIComponent(urlParams.get('ss')).trim()
    config.productName = decodeURIComponent(urlParams.get('p')).trim()
    return config
}
const setupProduct = async (rootNode, config) => {
    const DATA_RANGE = 'A1:AZ200'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')
    if (typeof config.queryPrefix !== 'string' || config.queryPrefix) config.queryPrefix = 'product-'

    const NodePrefix = config.queryPrefix

    const embedUrl = (s) => typeof s === 'string' && s.trim().replaceAll('\'', '%27').replaceAll('"', '%22') || ''
    const innerHtml = (html) => (e) => e.innerHTML = html
    const chkrsp = (r) => {
        if (!r) return undefined
        if (r.ok) return r
        throw new Error(`error code:${r.status} msg:${r.statusText}`)
    }

    const fetchFromSheet = async (config) => {
        const sheetName = config.sheetName, dataRange = config.dataRange
        const rspList = await Promise.all([fetch(config.bookUrl), fetch(config.keyUrl)])
        chkrsp(rspList.find(r => !r.ok))
        const decoded = (await Promise.all(rspList.map((r) => r.text()))).map(atob)
        return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${decoded[0]}/values/${sheetName}!${dataRange}?key=${decoded[1]}`)
    }

    const fetchWithBrand = async () => {
        return await fetchFromSheet({
            sheetName: config.brandName,
            dataRange: DATA_RANGE,
            bookUrl: config.bookUrl,
            keyUrl: config.keyUrl,
        }).then(chkrsp).then((r) => r.json()).then((j) => j.values)
    }

    const trimStr = (s) => typeof s === 'string' ? s.trim() : s

    const getReducerForRow2obj = (header) => (prev, val, idx) => {
        let attr = trimStr(header[idx])
        if (attr) prev[attr] = trimStr(val)
        return prev
    }

    const transform = (rows, headerRow) => {
        const row2obj = getReducerForRow2obj((headerRow === undefined) ? rows.shift() : headerRow)
        const couldBeLast = ['Topic', 'Series', 'EnglishSeries']
        const nonEmptyAttrs = ['ProductName']
        let last = {}
        const objList = []
        rows.forEach(row => {
            if (!row || !row.length) return
            const obj = row.reduce(row2obj, {})
            couldBeLast.forEach((attr) => {
                if (obj[attr]) last[attr] = obj[attr]
                else obj[attr] = last[attr]
            })
            if (nonEmptyAttrs.find((attr) => !obj[attr])) return
            objList.push(obj)
        }, [])
        return objList
    }

    const cmp = (s, p) => {
        if (!s || !p) return false
        if (typeof s === 'string')
            return (s.replaceAll(' ', '_') === p)
        return s == p
    }

    const isConcerneded = it =>
        (cmp(it.Topic, config.topicName) || cmp(it.EnglishTopic, config.enTopic)) &&
        (cmp(it.Series, config.seriresName) || cmp(it.EnglishSeries, config.enSerires)) &&
        (cmp(it.ProductName, config.productName) || cmp(it.EnglishName, config.enProduct));

    const data = await fetchWithBrand(config.brandName)
    const concerned = transform(data).find(isConcerneded)
    if (!concerned) {
        console.error(`not found
            ${config.topicName}/${config.seriresName}/${config.productName}
            ${config.enTopic}/${config.enSerires}/${config.enProduct}`)
        return
    }

    document.title = config.brandName + " " + concerned.ProductName + " | MIS Sport 米詩國際"

    if (concerned.ImgList || concerned.Img) {
        // input string format:'[label]url'
        // output object: { label:string, url:string, labelHtml:string }
        let lastLabel = undefined
        const str2obj = (s) => {
            if (s && typeof s !== 'string') return null
            let o = {}, t = s.trim(), p
            if (t.startsWith('[')) {
                p = t.indexOf(']')
                if (p != -1) lastLabel = o.label = t.substring(1, p).trim()
                t = t.substring(p + 1)
            }
            o.url = embedUrl(t)
            if (!o.url) return null
            if (!o.label && lastLabel) o.label = lastLabel
            o.labelHtml = o.label && `data-product-img-label="${o.label}"` || ''
            return o
        }
        const list = (concerned.ImgList || concerned.Img || '').split(';').map(str2obj).filter(Boolean)
        const GRADCOLORS = '#f5f5f5 5px,transparent 15px'
        const gradientHtml = (navigator && navigator.userAgent || '').match(/iPad|iPhone/) ? '' :
            `linear-gradient(to top,${GRADCOLORS}),linear-gradient(to bottom,${GRADCOLORS}),linear-gradient(to left,${GRADCOLORS}),linear-gradient(to right,${GRADCOLORS}),`
        const obj2ImgSlider = (o) => `<div class="mySlides product-fade" style="overflow:hidden;">
            <div class="text-center product-img-mask zoom-in" ${o.labelHtml} style="background-image:${gradientHtml}url('${o.url}');">
            <img src="${o.url}" style="width:80%;visibility:hidden;" /></div></div>`
        const obj2ImgDots = (o, i) => `<span class="dot" onclick="currentSlide(${i + 1});" ${o.labelHtml}></span>`
        const obj2ImgWindow = (o) => `<a href="${o.url}"><img src="${o.url}" ${o.labelHtml} /></a>`
        const sliderHtml = list.map(obj2ImgSlider).join('') + '<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>'
        const dotsHtml = list.map(obj2ImgDots).join('')
        const windowHtml = list.map(obj2ImgWindow).join('')
        rootNode.querySelectorAll('.' + NodePrefix + 'img-slider').forEach(innerHtml(sliderHtml))
        rootNode.querySelectorAll('.' + NodePrefix + 'img-dots').forEach(innerHtml(dotsHtml))
        rootNode.querySelectorAll('.' + NodePrefix + 'img-window').forEach(innerHtml(windowHtml))
        if (list.filter((x) => x.labelHtml).length === 0) {
            if (list.length <= 10) {
                document.querySelectorAll('.gallery').forEach((e) => e.style.columns = 1)
            } else {
                document.querySelectorAll('.gallery').forEach((e) => e.style.removeProperty('columns'))
            }
        }
    }
    const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn))
    if (concerned.ColorWithSizes) {
        // input string format:'x-y'
        // support rules:s-l, s-, m
        // output array:[], [x], [x,y,z,...]
        const str2sizes = (s) => {
            if (s && typeof s === 'string') {
                const t = s.trim()
                const r = t.toUpperCase().split('-')
                if (r.length == 1) return [r]
                const b = AllSizes.indexOf(r[0])
                if (b != -1) {
                    let e = AllSizes.indexOf(r[1])
                    if (e >= 0) e += 1
                    else if (r.length > 1) e = AllSizes.length
                    return AllSizes.slice(b, e)
                }
            }
            return []
        }
        // input string format: 'color' or 'color(x-y)' or '[label]color(x-y)'
        // output object:{ label:string, color:string, sizes:array, labelHtml:string }
        const str2obj = (s) => {
            if (s && typeof s !== 'string') return null
            let o = {}, t = s.trim(), p
            if (t.startsWith('[')) {
                p = t.indexOf(']')
                if (p != -1) o.label = t.substring(1, p).trim()
                t = t.substring(p + 1)
            }
            p = t.indexOf('(')
            o.color = (p === -1 ? t : t.substring(0, p)).trim()
            if (!o.color) return null
            if (p === -1) {
                o.sizes = []
                o.labelHtml = o.label && `data-product-img-label="${o.label}"` || ''
                return o
            }
            t = t.substring(p + 1)
            p = t.lastIndexOf(')')
            if (p === -1) return null
            o.sizes = str2sizes(t.substring(0, p))
            o.labelHtml = o.label && `data-product-img-label="${o.label}"` || ''
            return o
        }
        let html
        html = '<div class="row"><div class="col-12">' +
            AllSizes.map(s => `<span class="badge text-bg-dark mine-size-button" data-product-size="${s}">${s}</span>`).join('') +
            '</div></div>'
        rootNode.querySelectorAll('.' + NodePrefix + 'sizes').forEach(innerHtml(html))
        const list = concerned.ColorWithSizes.split(';').map(str2obj).filter(Boolean)
        html = '<div class="row"><div class="col-12">' +
            list.map(o =>
                `<div class="mine-circle-fill" onclick="onClickProductColor(event);" ${o.labelHtml} data-sizes="${o.sizes.join(',')}" data-color="${o.color}" style="background-color:${o.color};"></div>`
            ).join('') + '</div></div></div>'
        rootNode.querySelectorAll('.' + NodePrefix + 'colors').forEach(innerHtml(html))

        list.forEach(o => {
            const l = o.labelHtml
            const c = o.color
            if (l) rootNode.querySelectorAll(`.dot[${l}]`).forEach(d => {
                d.style.backgroundColor = c
                d.style.opacity = 0.6
                d.style.border = 'solid 1px'
            })
        })

        const first = rootNode.querySelector('.mine-circle-fill')
        if (first) first.click()
    }

    concerned.BrandUrl = `${config.brandName.toLowerCase()}.html`
    concerned.BrandName = config.brandName
    concerned.ThisProductUrl = location.href
    concerned.IsMobile = navigator && navigator.userAgent && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    concerned.CanBack = window.history.length >= 2
    if (config.attrTransformer) {
        Object.keys(config.attrTransformer).forEach(key => concerned[key] = config.attrTransformer[key](concerned[key], concerned))
    }

    const Dobj = concerned

    const setupPrices = (v1, v2) => {
        const withComma = (v) => {
            let num = NaN
            if (typeof v === 'number') num = v
            else if (typeof v === 'string') num = parseInt(v)
            return !isNaN(num) && num.toLocaleString() || ''
        }
        let i1 = parseInt(v1), i2 = parseInt(v2)
        if (isNaN(i1)) {
            if (isNaN(i2)) return console.error('invalid prices:', v1, v2)
            Dobj.Price = withComma(i2)
        } else if (isNaN(i2)) {
            Dobj.Price = withComma(i1)
        } else if (i1 == i2) {
            Dobj.Price = withComma(i1)
        } else {
            Dobj.Price = undefined;
            if (i1 > i2) {
                Dobj.Original = withComma(i1)
                Dobj.Discounted = withComma(i2)
            } else {
                Dobj.Original = withComma(i2)
                Dobj.Discounted = withComma(i1)
            }
        }
    }
    setupPrices(concerned.Price, concerned.Price2)

    const qall = (s) => rootNode.querySelectorAll(s)
    const foreachq = (s, e) => qall(s).forEach(e)

    const getSetterThenRemove = (attr, setter) => {
        const s = typeof setter === 'function' ? setter : ((v) => v)
        return (e) => {
            const v = s(e, e.getAttribute(attr))
            e.removeAttribute(attr)
            return v
        }
    }

    foreachq('[j-set]', getSetterThenRemove('j-set', (e, a) => {
        const p = a.split('=')
        e.setAttribute(p[0], Dobj[p[1]])
    }))
    foreachq('[j-set-url]', getSetterThenRemove('j-set-url', (e, a) => {
        const p = a.split('=')
        const u = embedUrl(Dobj[p[1]])
        e.setAttribute(p[0], u)
    }))
    foreachq('[j-set-html]', getSetterThenRemove('j-set-html', (e, a) => e.innerHTML = Dobj[a] || ''))

    const applyTemplate = (data) => {
        const templateNodes = []
        foreachq(
            ':not(iframe):not(script):not(style):not(br):not(img):not(input)',
            el => el.childNodes.forEach(c => {
                if (c.nodeType !== Node.TEXT_NODE || !c.nodeValue.match(/{{\s*(.*?)\s*}}/)) return
                templateNodes.push(c)
            }))
        const cached = {}
        templateNodes.forEach(el => {
            const text = el.nodeValue
            let replaced = text
            for (const match of text.matchAll(/{{\s*(.*?)\s*}}/gm)) {
                const t = match[0]
                if (!cached[t]) {
                    const v = data[match[1]];
                    cached[t] = v == null ? '' : v
                }
                replaced = replaced.replace(t, cached[t])
            }
            el.nodeValue = replaced
        })
    }
    applyTemplate(Dobj)

    const removeSelf = (e) => e.parentNode.removeChild(e)

    const getValueOrRemove = (attr, data) =>
        getSetterThenRemove(attr, (e, a) => {
            if (data[a]) {
                e.removeAttribute(attr)
                return a
            }
            removeSelf(e)
            return false
        })

    const getSiblings = (e) => {
        const siblings = []
        if (!e.parentNode) return siblings
        let sibling = e.parentNode.firstChild
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling)
            }
            sibling = sibling.nextSibling
        }
        return siblings
    }

    const fnIf = getValueOrRemove('j-if', Dobj)
    const fnElif = getValueOrRemove('j-else-if', Dobj)

    foreachq('[j-if]', el => {
        const sbList = getSiblings(el)
        let evaluated = fnIf(el) !== false
        let theElse = null
        sbList.forEach(sb => {
            if (sb.hasAttribute('j-else')) {
                theElse = sb
                return
            }
            if (!sb.hasAttribute('j-else-if')) return
            if (evaluated) {
                removeSelf(sb)
            } else {
                evaluated = fnElif(sb) !== false
            }
        })
        if (!evaluated && theElse) theElse.removeAttribute('j-else')
    })
}