const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn))
const onHoverProductCard = (e) => {
    const cardEl = closest(e.target, (p) => p.classList.contains('card'))
    if (!cardEl) return
    const img = cardEl.querySelector('img')
    if (!img) return
    if (e.type === 'mouseenter') {
        cardEl.classList.add('zoom-in')
        if (img.dataset.hoverSrc) img.src = img.dataset.hoverSrc
    } else if (e.type === 'mouseout') {
        cardEl.classList.remove('zoom-in')
        if (img.dataset.src) img.src = img.dataset.src
    }
}
const onClickProductCard = (e) => {
    const cardEl = closest(e.target, (p) => p.classList.contains('card'))
    if (!cardEl) return
    const img = cardEl.querySelector('img')
    if (!img) return
    cardEl.classList.remove('zoom-in')
    if (img.dataset.src) img.src = img.dataset.src
}
const onTabSelected = (e) => {
    const selEl = e && e.target
    if (!selEl) return;
    const idx = selEl.selectedIndex == null ? -1 : selEl.selectedIndex
    let sectionEl = selEl.parentNode;
    while (sectionEl != null && sectionEl.tagName !== 'SECTION') {
        sectionEl = sectionEl == sectionEl.parentNode ? null : sectionEl.parentNode
    }
    if (!sectionEl) return
    const titleEl = sectionEl.querySelectorAll('li.title')[idx]
    if (titleEl) titleEl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
}
const setupProductLists = async (rootNode, config) => {
    const DATA_RANGE = 'A1:AZ400'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')

    // default values
    const SELECT_NODE = config.querySelectNode || '.select-tabs'

    const embedUrl = (s) => typeof s === 'string' && s.trim().replaceAll('\'', '%27').replaceAll('"', '%22') || ''
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

    const splitByAttr = (list, attr = 0) => {
        let last
        const idxes = [];
        list.forEach((o, i) => {
            if (last === o[attr]) return
            last = o[attr]
            idxes.push(i)
        });
        return idxes.map((e, i, a) => list.slice(e, a[i + 1]))
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
        return splitByAttr(objList, 'Topic')
    }

    const fetchWithBrand = async () => {
        return await fetchFromSheet({
            sheetName: config.brandName,
            dataRange: DATA_RANGE,
            bookUrl: config.bookUrl,
            keyUrl: config.keyUrl,
        }).then(chkrsp).then((r) => r.json()).then((j) => j.values)
    }

    const NEW_LABEL = `<img src="https://storage.googleapis.com/mis-sport/logo/new-item.png" alt="${config.brandName}" width="42" height="42" class="rounded-circle"></img>`
    const SALE_LABEL = `<img src="https://storage.googleapis.com/mis-sport/logo/sale-item.png" alt="${config.brandName}" width="42" height="42" class="rounded-circle"></img>`
    const NO_LABEL = `<div width="42" height="42"></div>`

    const price4label = (v1, v2, newItem) => {
        const withComma = (v) => {
            let num = NaN
            if (typeof v === 'number') num = v
            else if (typeof v === 'string') num = parseInt(v)
            return !isNaN(num) && num.toLocaleString() || ''
        }
        const setupPrice = (v, newItem) => {
            return {
                label: newItem && NEW_LABEL || NO_LABEL,
                price: `<p class="text-end stretched-link text-dark" style="word-wrap:break-word;">NT$${withComma(v)}</p>`,
            }
        }
        const priceAndDiscounted = (p, d) => {
            return {
                label: SALE_LABEL,
                price: `<p class="text-end stretched-link" style="color:IndianRed;word-wrap:break-word;"><sup class="text-decoration-line-through" style="color:Silver;">NT$${withComma(p)} </sup>NT$${withComma(d)}</p>`,
            }
        }
        const i1 = parseInt(v1), i2 = parseInt(v2)
        if (isNaN(i1)) {
            if (isNaN(i2)) {
                console.error('invalid prices:', v1, v2)
                return { label: NO_LABEL, price: '' }
            }
            return setupPrice(i2, newItem)
        } else if (isNaN(i2)) {
            return setupPrice(i1, newItem)
        } else if (i1 == i2) {
            return setupPrice(i1, newItem)
        } else {
            return (i1 > i2) ? priceAndDiscounted(i1, i2) : priceAndDiscounted(i2, i1)
        }
    }

    const itemO2html = (itemObj) => {
        let dataStr
        const brandName = config.brandName
        const itemName = itemObj.ProductName
        const urlParams = new URLSearchParams('s=1')
        urlParams.append('b', brandName)
        if (itemObj.EnglishTopic)
            urlParams.append('et', itemObj.EnglishTopic.replaceAll(' ', '_'))
        else
            urlParams.append('t', itemObj.Topic.replaceAll(' ', '_'))
        if (itemObj.EnglishSeries)
            urlParams.append('es', itemObj.EnglishSeries.replaceAll(' ', '_'))
        else
            urlParams.append('ss', itemObj.Series.replaceAll(' ', '_'))
        if (itemObj.EnglishName)
            urlParams.append('ep', itemObj.EnglishName.replaceAll(' ', '_'))
        else
            urlParams.append('p', itemName.replaceAll(' ', '_'))
        const productUrl = 'product.html?' + urlParams.toString()
        const imgList = (itemObj.Img || '').split(';').map(embedUrl).filter(Boolean)
        const imgUrl = imgList[0] || ''
        const hoverImgAttr = imgList[1] && `data-hover-src="${imgList[1]}"` || ''
        const logoUrl = embedUrl(itemObj.Logo)
        const labelPrice = price4label(itemObj.Price, itemObj.Price2, itemObj.New)

        let colorList = '';
        if (dataStr = itemObj.ColorWithSizes) {
            // input string format:'color' or '[label]color' or '[label]color(x-y)'
            // output color button(html)
            const str2color = (s) => {
                if (s && typeof s !== 'string') return null
                let t = s.trim()
                if (t.startsWith('[')) t = t.substring(t.indexOf(']') + 1)
                const p = t.indexOf('(')
                const c = (p === -1 ? t : t.substring(0, p)).trim()
                if (!c) return null
                return '<div class="mine-circle-fill" style="background-color:' + c + ';"></div>';
            }
            colorList = dataStr.split(';').map(str2color).filter(Boolean).join('')
        }
        return `<div class="col"><div class="card card-cover h-100% overflow-hidden text-bg-white rounded-4 shadow-lg"
        onmouseenter="onHoverProductCard(event);" onmouseout="onHoverProductCard(event);">
        <img src="${imgUrl}" data-src="${imgUrl}" ${hoverImgAttr} class="card-img-top" alt="${itemName}">
        <div class="card-img-overlay">
            <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">${labelPrice.label}</li>
            </ul>
        </div>
        <div class="d-flex justify-content-center p-2 pb-0">${colorList}</div>
        <div class="card-body">
            <h6 class="card-title text-center">${brandName}<br>${itemName}</h6>
            <br>
            <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                    <img src="${logoUrl}" alt="${brandName}" width="36" height="36" class="rounded-circle border border-white">
                </li>
                <li class="me-auto"></li>
                <li class="me-auto"></li>
                <li class="me-auto">
                    <a class="product-link" href="${productUrl}" onclick="onClickProductCard(event);">${labelPrice.price}</a>
                </li>
            </ul>
        </div></div></div>`
    }

    const node4list = rootNode.querySelectorAll(config.queryTopicNode)
    if (node4list.length < 1) return console.debug('not found topic node(s)')

    const data = await fetchWithBrand(config.brandName)
    const listByTopic = transform(data)

    node4list.forEach((node, idx) => {
        const tabNode = node.querySelector(config.queryTabNode)
        if (!tabNode) return console.error('not found tabs for items')
        const selNode = node.querySelector(SELECT_NODE)
        const itemList = listByTopic[idx]
        if (!itemList) return
        const seriesNameList = []
        let seriesNode = null
        itemList.forEach((item) => {
            const { Topic, Series } = item
            if (!seriesNameList.includes(Series)) {
                seriesNameList.push(Series)
                tabNode.innerHTML += `<li>
                    <h3>${Series}</h3>
                    <div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5"
                        data-topic="${Topic}" data-series="${Series}" />
                </li>\n`
                seriesNode = tabNode.querySelector(`[data-series="${Series}"]`)
            }
            if (seriesNode) seriesNode.innerHTML += itemO2html(item) + '\n'
        })
        if (selNode) selNode.innerHTML = seriesNameList.map((n) => `<option>${n}</option>`).join('\n')
    })
}
