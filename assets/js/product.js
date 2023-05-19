const AllSizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
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
        if (list.length <= 2) {
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
    if (!urlParams || !urlParams.has('show')) throw new Error('not found product info')
    config.brandName = decodeURIComponent(urlParams.get('brand')).trim()
    config.topicName = decodeURIComponent(urlParams.get('topic')).trim()
    config.seriresName = decodeURIComponent(urlParams.get('series')).trim()
    config.productName = decodeURIComponent(urlParams.get('product')).trim()
    return config
}
const setupProduct = async (rootNode, config) => {
    const ATTR_NAME_FOR_ORDER = '_order'
    const ATTR_NAME_FOR_TOPIC = '_topic'
    const DATA_RANGE = 'A1:AZ200'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')
    if (typeof config.queryPrefix !== 'string' || config.queryPrefix) config.queryPrefix = 'product-'

    const BrandName = config.brandName
    const TopicName = config.topicName
    const SeriesName = config.seriresName
    const ProductName = config.productName
    const NodePrefix = config.queryPrefix

    const builtinAttr = (n) => n.startsWith('_')
    const embedUrl = (s) => typeof s === 'string' && s.trim().replaceAll('\'', '%27').replaceAll('"', '%22') || ''
    const innerHtml = (html) => (e) => e.innerHTML = html
    const chkrsp = (r) => {
        if (!r) return undefined
        if (r.ok) return r
        throw new Error(`error code:${failure.status} msg:${failure.statusText}`)
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
            sheetName: BrandName,
            dataRange: DATA_RANGE,
            bookUrl: config.bookUrl,
            keyUrl: config.keyUrl,
        }).then(chkrsp).then((r) => r.json()).then((j) => j.values)
    }

    const row2seriesList = (seriesMap, cols) => {
        let series
        const seriesName = (cols[1] || '').trim()
        const itemName = (cols[2] || '').trim()
        const restCols = cols.slice(3) // 取之後的所有元素
        if (builtinAttr(seriesName))
            throw new Error('invalid seriesName')
        if (seriesName && !seriesMap[seriesName]) {
            series = {
                seriesName: seriesName,
                items: [],
            }
            seriesMap[seriesName] = series
            seriesMap[ATTR_NAME_FOR_ORDER].push(seriesName)
        } else {
            const series_order = seriesMap[ATTR_NAME_FOR_ORDER]
            // 如果連一個series都還沒定義就寫item,則忽略該行資料
            if (!series_order.length) return seriesMap
            series = seriesMap[series_order[series_order.length - 1]]
        }
        if (itemName) {
            series.items.push({
                name: itemName,
                attrs: restCols || [],
            })
        }
        return seriesMap
    }

    const splitRows = (rows) => {
        const indexes = rows.reduce((last, row, idx) => {
            if (row[0]) last.push(idx)
            return last
        }, [])
        return indexes.map((e, i, a) => rows.slice(e, a[i + 1]))
    }

    const attr2obj = (row) => {
        let obj = {}
        if (!Array.isArray(row)) return obj
        row.forEach((n, i) => { if (i - 3 >= 0) obj[n] = i - 3 })
        return obj
    }

    const transform = (rows) => {
        const cleared = rows.filter((c) => c && c.length)
        const lists = splitRows(cleared)
        return lists.map(rows => rows.reduce(row2seriesList, {
            [ATTR_NAME_FOR_ORDER]: [],
            [ATTR_NAME_FOR_TOPIC]: rows.length > 0 && rows[0].length > 0 && rows[0][0],
        }))
    }

    document.title = BrandName + " " + ProductName + " | MIS Sport 米詩國際"

    const data = await fetchWithBrand(BrandName)

    const aname2idx = attr2obj(data.shift())

    const concernedTopic = transform(data).find(t => t[ATTR_NAME_FOR_TOPIC] === TopicName)
    if (!concernedTopic) {
        console.error('not found concerned topic:', TopicName)
        return
    }
    const concernedSerires = concernedTopic[SeriesName]
    if (!concernedSerires) {
        console.error(`not found concerned series:${TopicName}\\${SeriesName}`)
        return
    }
    const concerned = concernedSerires.items.find(it => it.name === ProductName)
    if (!concerned) {
        console.error(`not found concerned product:${TopicName}\\${SeriesName}\\${ProductName}`)
        return
    }

    rootNode.querySelectorAll('.' + NodePrefix + 'path-list').forEach(e => {
        e.innerHTML = `<li class="breadcrumb-item"><a class="link-dark" href="/">HOME</a></li>
                       <li class="breadcrumb-item"><a class="link-dark" href="${BrandName.toLowerCase()}.html">${BrandName}</a></li>
                       <li class="breadcrumb-item active" aria-current="page">${ProductName}</li>`
    })
    if (aname2idx['ImgList'] != null || aname2idx['Img'] != null) {
        const dataStr = concerned.attrs[aname2idx['ImgList']] || concerned.attrs[aname2idx['Img']]
        if (dataStr) {
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
            const list = dataStr.split(';').map(str2obj).filter(Boolean)
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
                if (list.length <= 2) {
                    document.querySelectorAll('.gallery').forEach((e) => e.style.columns = 1)
                } else {
                    document.querySelectorAll('.gallery').forEach((e) => e.style.removeProperty('columns'))
                }
            }
        }
    }
    rootNode.querySelectorAll('.' + NodePrefix + 'name').forEach(n => n.textContent = concerned.name)
    if (aname2idx['Logo'] != null) {
        const url = embedUrl(concerned.attrs[aname2idx['Logo']])
        if (url) {
            const html = `<img src="${url}" alt="${BrandName}" width="40" height="40" class="rounded-circle border border-white">`
            rootNode.querySelectorAll('.' + NodePrefix + 'logo').forEach(innerHtml(html))
        }
    }
    ((v1, v2) => {
        const withComma = (v) => {
            let num = NaN
            if (typeof v === 'number') num = v
            else if (typeof v === 'string') num = parseInt(v)
            return !isNaN(num) && num.toLocaleString() || ''
        }
        const setupPrice = (v) => {
            const html = `<h5 class="text-end" style="color:black;">NT$ ${withComma(v)}</h5>`
            rootNode.querySelectorAll('.' + NodePrefix + 'price').forEach(innerHtml(html))
        }
        const priceAndDiscounted = (p, d) => {
            const html = `<h5 class="text-end" style="color:IndianRed;"><sup class="text-decoration-line-through" style="color:Silver;">NT$${withComma(p)} </sup>NT$${withComma(d)}</h5>`
            rootNode.querySelectorAll('.' + NodePrefix + 'price').forEach(innerHtml(html))
        }
        let i1 = parseInt(v1), i2 = parseInt(v2)
        if (isNaN(i1)) {
            if (isNaN(i2)) return console.error('invalid prices:', v1, v2)
            setupPrice(i2)
        } else if (isNaN(i2)) {
            setupPrice(i1)
        } else if (i1 == i2) {
            setupPrice(i1)
        } else {
            (i1 > i2) ? priceAndDiscounted(i1, i2) : priceAndDiscounted(i2, i1)
        }
    })(concerned.attrs[aname2idx['Price']], concerned.attrs[aname2idx['Price2']])
    if (aname2idx['Description'] != null) {
        const dataStr = concerned.attrs[aname2idx['Description']]
        if (dataStr) {
            const html = dataStr.replaceAll('\n', '<br />')
            rootNode.querySelectorAll('.' + NodePrefix + 'desc').forEach(innerHtml(html))
        }
    }
    const ATTR_HIDE_CLS = 'product-attr-hide-in-default'
    const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn))
    const assignHtmlAndShow = (html) => (n) => {
        n.innerHTML = html
        const parent = closest(n, (p) => p.classList.contains(ATTR_HIDE_CLS))
        if (parent) parent.classList.remove(ATTR_HIDE_CLS)
    }
    const assignTextAndShow = (txt) => (n) => {
        n.textContent = txt
        const parent = closest(n, (p) => p.classList.contains(ATTR_HIDE_CLS))
        if (parent) parent.classList.remove(ATTR_HIDE_CLS)
    }
    const removeParentWithClass = (cls) => (n) => {
        const parent = closest(n, (p) => p.classList.contains(cls))
        if (parent) parent.parentNode.removeChild(parent)
    }
    if (aname2idx['Style'] != null) {
        const dataStr = concerned.attrs[aname2idx['Style']]
        const list = rootNode.querySelectorAll('.' + NodePrefix + 'style')
        if (dataStr) list.forEach(assignTextAndShow(dataStr))
        else list.forEach(removeParentWithClass(ATTR_HIDE_CLS))
    }
    if (aname2idx['BikingStyle'] != null) {
        const dataStr = concerned.attrs[aname2idx['BikingStyle']]
        const list = rootNode.querySelectorAll('.' + NodePrefix + 'biking-style')
        if (dataStr) list.forEach(assignTextAndShow(dataStr))
        else list.forEach(removeParentWithClass(ATTR_HIDE_CLS))
    }
    if (aname2idx['Temperature'] != null) {
        const dataStr = concerned.attrs[aname2idx['Temperature']]
        if (dataStr) {
            const html = dataStr.replaceAll('ºC', '<sup>ºC</sup>')
            rootNode.querySelectorAll('.' + NodePrefix + 'temp').forEach(assignHtmlAndShow(html))
        }
    }
    if (aname2idx['SunProtect'] != null) {
        const dataStr = concerned.attrs[aname2idx['SunProtect']]
        if (dataStr) {
            const html = dataStr.replaceAll('+', '<sup>+</sup>')
            rootNode.querySelectorAll('.' + NodePrefix + 'spf').forEach(assignHtmlAndShow(html))
        }
    }
    if (aname2idx['Water'] != null) {
        const STAR_ICON = '<i class="bi bi-star-fill text-muted"></i>'
        const UNSTAR_ICON = '<i class="bi bi-star"></i>'
        const dataStr = concerned.attrs[aname2idx['Water']]
        if (dataStr) {
            const stars = parseInt(dataStr)
            if (!isNaN(stars)) {
                const html = [1, 2, 3, 4, 5].map(v => (stars >= v ? STAR_ICON : UNSTAR_ICON)).join('')
                rootNode.querySelectorAll('.' + NodePrefix + 'waterproof').forEach(assignHtmlAndShow(html))
            }
        }
    }
    if (aname2idx['Weight'] != null) {
        const dataStr = concerned.attrs[aname2idx['Weight']]
        if (dataStr) {
            rootNode.querySelectorAll('.' + NodePrefix + 'weight').forEach(n => n.textContent = dataStr)
        }
    }
    if (aname2idx['ColorWithSizes'] != null) {
        const dataStr = concerned.attrs[aname2idx['ColorWithSizes']]
        if (dataStr) {
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
            const list = dataStr.split(';').map(str2obj).filter(Boolean)
            html = '<div class="row"><div class="col-12">' +
                list.map(o =>
                    `<div class="mine-circle-fill" onclick="onClickProductColor(event);" ${o.labelHtml} data-sizes="${o.sizes.join(',')}" data-color="${o.color}" style="background-color:${o.color};"></div>`
                ).join('') + '</div></div></div>'
            rootNode.querySelectorAll('.' + NodePrefix + 'colors').forEach(innerHtml(html))
            const first = rootNode.querySelector('.mine-circle-fill')
            if (first) first.click()
        }
    }

    const Dobj = {
        SizeGuide: concerned.attrs[aname2idx['SizeGuide']],
        PurchaseUrl: concerned.attrs[aname2idx['PurchaseUrl']],
    }

    const getValueThenRemove = (attr) => {
        if (!attr) return
        return (el) => {
            if (!el) return false
            const key = el.getAttribute(attr)
            if (Dobj[key] != null) {
                el.removeAttribute(attr)
                return key
            }
            return false
        }
    }

    rootNode.querySelectorAll('[j-set]').forEach(el => {
        const pair = el.getAttribute('j-set').split('=')
        if (pair.length === 2) {
            const val = Dobj[pair[1]]
            if (val != null) {
                el.setAttribute(pair[0], val)
            }
        }
    })

    rootNode.querySelectorAll('[j-set-url]').forEach(el => {
        const pair = el.getAttribute('j-set-url').split('=')
        if (pair.length === 2) {
            const val = Dobj[pair[1]]
            if (val != null) {
                el.setAttribute(pair[0], embedUrl(val))
            }
        }
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

    const fnIf = getValueThenRemove('j-if')
    const fnElif = getValueThenRemove('j-else-if')

    rootNode.querySelectorAll('[j-if]').forEach(el => {
        if (fnIf(el)) return
        const list = getSiblings(el)
        let found = false
        list.filter(e => e.hasAttribute('j-else-if'))
            .forEach(sb => {
                if (fnElif(sb) !== false) {
                    found = true
                }
            })
        if (found) return
        const els = list.find(e => e.hasAttribute('j-else'))
        if (els) els.removeAttribute('j-else')
    })
}