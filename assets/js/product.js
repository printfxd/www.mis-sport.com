const AllSizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
const onClickProductColor = (colorEl) => {
    if (!colorEl.target) return
    const list = colorEl.target.dataset.sizes.split(',')
    document.querySelectorAll('.mine-circle-fill').forEach(e => {
        if (e === colorEl.target) e.classList.add('active')
        else e.classList.remove('active')
    })
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
    if (!config || !config.hashPrefix) throw new Error('config.hashPrefix not found')
    const prefix = '#' + config.hashPrefix
    const hash = document.location.hash
    if (!hash || !hash.startsWith(prefix)) throw new Error('not found product info')
    const info = hash.substring(prefix.length).split('|')
    config.brandName = decodeURIComponent(info[0])
    config.topicName = decodeURIComponent(info[1])
    config.seriresName = decodeURIComponent(info[2])
    config.productName = decodeURIComponent(info[3])
    return config;
}
const setupProduct = async (rootNode, config) => {
    const ATTR_NAME_FOR_ORDER = '_order'
    const ATTR_NAME_FOR_TOPIC = '_topic'
    const DATA_RANGE = 'A1:BZ50'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')
    if (typeof config.queryPrefix !== 'string' || config.queryPrefix) config.queryPrefix = 'product-'

    const BrandName = config.brandName
    const TopicName = config.topicName
    const SeriesName = config.seriresName
    const ProductName = config.productName
    const NodePrefix = config.queryPrefix

    const builtinAttr = (n) => n.startsWith('_')

    const fetchFromSheet = async (config) => {
        const bookID = config.bookID, sheetName = config.sheetName, dataRange = config.dataRange
        const accessKey = await fetch(config.keyUrl)
            .then((response) => response.text())
            .then((base64) => atob(base64))
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${bookID}/values/${sheetName}!${dataRange}?key=${accessKey}`
        return fetch(url)
    }

    const fetchWithBrand = async () => {
        return await fetchFromSheet({
            bookID: config.bookID,
            sheetName: config.brandName,
            dataRange: DATA_RANGE,
            keyUrl: config.keyUrl,
        })
            .then((response) => response.json())
            .then((json) => json.values)
    }

    const row2seriesList = (seriesMap, cols) => {
        let series
        const seriesName = cols[1], itemName = cols[2]
        const restCols = cols.slice(3) // 取之後的所有元素
        if (seriesName) {
            if (builtinAttr(seriesName))
                throw new Error('invalid seriesName')
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
                attrs: restCols,
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

    const data = await fetchWithBrand(config.brandName)

    const aname2idx = attr2obj(data.shift())

    const concernedTopic = transform(data).find(t => t[ATTR_NAME_FOR_TOPIC] === TopicName)
    if (!concernedTopic) {
        console.error('not found concerned topic:', TopicName)
        return
    }
    const concernedSerires = concernedTopic[SeriesName];
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
        e.innerHTML = `<li class="breadcrumb-item"><a href="/">Home</a></li>
                       <li class="breadcrumb-item"><a href="#" onclick="history.back();">${config.brandName}</a></li>
                       <li class="breadcrumb-item active" aria-current="page">${ProductName}</li>`
    })
    if (aname2idx['ImgList'] != null || aname2idx['Img'] != null) {
        const dataStr = concerned.attrs[aname2idx['ImgList']] || concerned.attrs[aname2idx['Img']];
        if (dataStr) {
            const list = dataStr.split(';')
            const setupImgSlider = (list) => (n) => {
                n.innerHTML += list
                    .map(v => `<div class="mySlides product-fade"><div class="numbertext"></div>
                                <div class="text-center"><img class="zoom-in" src="${v}" style="width:80%;"></div>
                                <div class="text"></div></div>`)
                    .join('')

            }
            const setupImgDots = (list) => (n) => {
                n.innerHTML += list
                    .map((_, i) => '<span class="dot" onclick="currentSlide(' + (i + 1) + ')"></span>')
                    .join('')
            }
            rootNode.querySelectorAll('.' + NodePrefix + 'img-slider').forEach(setupImgSlider(list))
            rootNode.querySelectorAll('.' + NodePrefix + 'img-dots').forEach(setupImgDots(list))
        }
    }
    rootNode.querySelectorAll('.' + NodePrefix + 'name').forEach(n => n.textContent = concerned.name)
    if (aname2idx['Logo'] != null) {
        const url = concerned.attrs[aname2idx['Logo']]
        if (url) {
            const html = `<img src="${url}" alt="${BrandName}" width="40" height="40" class="rounded-circle border border-white">`
            rootNode.querySelectorAll('.' + NodePrefix + 'logo').forEach(n => n.innerHTML = html)
        }
    }
    const setupProductPrices = (v1, v2) => {
        const withComma = (v) => {
            let num = NaN
            if (typeof v == 'number') num = v
            else if (typeof v == 'string') num = parseInt(v)
            return !isNaN(num) && num.toLocaleString() || ''
        }
        const setupPrice = (v) => {
            const html = `<h5 class="text-end" style="color:black;">NT$ ${withComma(v)}</h5>`
            rootNode.querySelectorAll('.' + NodePrefix + 'price').forEach(n => n.innerHTML = html)
        }
        const priceAndDiscounted = (p, d) => {
            const html = `<h5 class="text-end" style="color:IndianRed;"><sup class="text-decoration-line-through" style="color:Silver;">NT$${withComma(p)} </sup>NT$${withComma(d)}</h5>`
            rootNode.querySelectorAll('.' + NodePrefix + 'price').forEach(n => n.innerHTML = html)
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
    }
    setupProductPrices(concerned.attrs[aname2idx['Price']], concerned.attrs[aname2idx['Price2']])
    if (aname2idx['Description'] != null) {
        const dataStr = concerned.attrs[aname2idx['Description']]
        if (dataStr) {
            const html = dataStr.replaceAll('\n', '<br />')
            rootNode.querySelectorAll('.' + NodePrefix + 'desc').forEach(n => n.innerHTML = html)
        }
    }
    if (aname2idx['Style'] != null) {
        const dataStr = concerned.attrs[aname2idx['Style']]
        if (dataStr) {
            rootNode.querySelectorAll('.' + NodePrefix + 'style').forEach(n => n.textContent = dataStr)
        }
    }
    if (aname2idx['Temperature'] != null) {
        const dataStr = concerned.attrs[aname2idx['Temperature']]
        if (dataStr) {
            const html = dataStr.replaceAll('ºC', '<sup>ºC</sup>')
            rootNode.querySelectorAll('.' + NodePrefix + 'temp').forEach(n => n.innerHTML = html)
        }
    }
    if (aname2idx['SunProtect'] != null) {
        const dataStr = concerned.attrs[aname2idx['SunProtect']]
        if (dataStr) {
            const html = dataStr.replaceAll('+', '<sup>+</sup>')
            rootNode.querySelectorAll('.' + NodePrefix + 'spf').forEach(n => n.innerHTML = html)
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
                rootNode.querySelectorAll('.' + NodePrefix + 'waterproof').forEach(n => n.innerHTML = html)
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
        // support rules:s-l, s-, m
        const txt2sizes = (t) => {
            if (t && typeof t === 'string') {
                let r = t.toUpperCase().split('-')
                let b = AllSizes.indexOf(r[0])
                if (b != -1) {
                    if (r.length == 1) return [r];
                    let e = AllSizes.indexOf(r[1])
                    if (e >= 0) e += 1
                    else if (r.length > 1) e = AllSizes.length
                    return AllSizes.slice(b, e)
                }
            }
            return [];
        }
        const transform = (cs) => {
            let d = cs.replaceAll(')', '').split('(')
            return { color: d[0], sizes: txt2sizes(d[1]) }
        }
        const dataStr = concerned.attrs[aname2idx['ColorWithSizes']]
        if (dataStr) {
            let html = '<div class="row"><div class="col-12">' +
                AllSizes.map(s => `<span class="badge text-bg-dark mine-size-button" data-product-size="${s}">${s}</span>`).join('') +
                '</div></div>'
            rootNode.querySelectorAll('.' + NodePrefix + 'sizes').forEach(n => n.innerHTML = html)
            const list = dataStr.split(',').map(transform)
            html = '<div class="row">' +
                list.map(o => `<div class="col-1"><div class="mine-circle-fill" onclick="onClickProductColor(event);" data-sizes="${o.sizes.join(',')}" style="background-color:${o.color};"></div></div>`).join('') +
                '</div>'
            rootNode.querySelectorAll('.' + NodePrefix + 'colors').forEach(n => n.innerHTML = html)
        }
    }
    if (aname2idx['PurchaseUrl'] != null) {
        const url = concerned.attrs[aname2idx['PurchaseUrl']]
        if (url) {
            const html = `<a class="button primary fit" href=${url} target="_blank">蝦皮下單</a>`
            rootNode.querySelectorAll('.' + NodePrefix + 'purchase').forEach(n => n.innerHTML = html)
        }
    }
}