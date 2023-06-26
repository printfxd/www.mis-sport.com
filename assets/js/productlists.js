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
    const ATTR_NAME_FOR_ORDER = '_order'
    const ATTR_NAME_FOR_TOPIC = '_topic'
    const DATA_RANGE = 'A1:AZ200'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')

    const numDef = (v, def) => {
        let num = NaN
        if (typeof v === 'string') num = parseInt(v)
        else if (typeof v === 'number') num = v
        return isNaN(num) ? def : n
    }

    // default values
    const LIMIT_ALL_ITEMS = numDef(config.limit_for_show_all_items, 0)
    const SELECT_NODE = config.querySelectNode || '.select-tabs'

    const builtinAttr = (n) => n.startsWith('_')
    const embedUrl = (s) => typeof s === 'string' && s.trim().replaceAll('\'', '%27').replaceAll('"', '%22') || ''
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

    const itemObject2html = (itemObj, attr2idx, itemLoc) => {
        let dataStr
        const brandName = itemLoc.brandName
        const itemName = itemObj.name
        const urlParams = new URLSearchParams('show=1');
        urlParams.append('brand', brandName)
        urlParams.append('topic', itemLoc.topicName)
        urlParams.append('series', itemLoc.seriesName)
        urlParams.append('product', itemName)
        const productUrl = "product.html?" + urlParams.toString()
        dataStr = itemObj.attrs[attr2idx['Img']] || ''
        const imgList = dataStr.split(';').map(embedUrl).filter(Boolean)
        const imgUrl = imgList[0] || ''
        const hoverImgAttr = imgList[1] && `data-hover-src="${imgList[1]}"` || ''
        const logoUrl = embedUrl(itemObj.attrs[attr2idx['Logo']])
        const labelPrice = price4label(itemObj.attrs[attr2idx['Price']], itemObj.attrs[attr2idx['Price2']], itemObj.attrs[attr2idx['New']])

        let colorList = '';
        if (dataStr = itemObj.attrs[attr2idx['ColorWithSizes']]) {
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

    const seriesTemplate = (seriesName, itemsHtml) => {
        return `<li>
            <h3>${seriesName}</h3>
            <div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
                ${itemsHtml}
            </div>
        </li>`
    }

    const node4list = rootNode.querySelectorAll(config.queryTopicNode)
    if (node4list.length < 1) return console.debug('not found topic node(s)')

    const data = await fetchWithBrand(config.brandName)
    const aname2idx = attr2obj(data.shift())
    const listByTopic = transform(data)
    node4list.forEach((node, idx) => {
        const tab = node.querySelector(config.queryTabNode)
        if (!tab) return console.error('not found tabs for items')
        const sel = node.querySelector(SELECT_NODE)
        const topicObj = listByTopic[idx]
        if (!topicObj) return
        const seriesNameList = topicObj[ATTR_NAME_FOR_ORDER]
        let allItemsHtml = ''
        let countItems = 0
        const seriesHtml = seriesNameList.map((seriesName) => {
            const seriesObj = topicObj[seriesName]
            if (!seriesObj) return ''
            const itemsHtml = topicObj[seriesName].items
                .map(item => itemObject2html(item, aname2idx, {
                    brandName: config.brandName,
                    topicName: topicObj[ATTR_NAME_FOR_TOPIC],
                    seriesName: seriesName,
                }))
                .join('\n')
            if (countItems <= LIMIT_ALL_ITEMS) {
                allItemsHtml += itemsHtml
                countItems += topicObj[seriesName].items.length
            }
            return seriesTemplate(seriesName, itemsHtml)
        })
        if (countItems <= LIMIT_ALL_ITEMS) {
            tab.innerHTML = seriesTemplate('ALL', allItemsHtml) + seriesHtml.join('\n')
            if (sel) sel.innerHTML = '<option>ALL</option>' + seriesNameList.map((n) => `<option>${n}</option>`).join('\n')
        } else {
            tab.innerHTML = seriesHtml.join('\n')
            if (sel) sel.innerHTML = seriesNameList.map((n) => `<option>${n}</option>`).join('\n')
        }
    })
}
