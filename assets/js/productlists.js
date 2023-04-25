const onHoverProductCard = (e) => {
    let cardEl = e && e.target;
    while (cardEl != null && !cardEl.classList.contains('card')) {
        if (cardEl == cardEl.parentNode) break
        cardEl = cardEl.parentNode
    }
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
const setupProductLists = async (rootNode, config) => {
    const ATTR_NAME_FOR_ORDER = '_order'
    const ATTR_NAME_FOR_TOPIC = '_topic'

    if (!config) throw new Error('config not found')
    if (typeof config.brandName !== 'string' || !config.brandName) throw new Error('invalid brand')

    const builtinAttr = (n) => n.startsWith('_')

    const fetchFromSheet = async (config) => {
        const bookID = config.bookID, sheetName = config.sheetName, dataRange = config.dataRange
        const accessKey = await fetch(config.keyUrl)
            .then((response) => response.text())
            .then((base64) => atob(base64))
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${bookID}/values/${sheetName}!${dataRange}?key=${accessKey}`
        return fetch(url)
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

    const fetchWithBrand = async () => {
        return await fetchFromSheet({
            bookID: config.bookID,
            sheetName: config.brandName,
            dataRange: 'A1:Z50',
            keyUrl: config.keyUrl,
        })
            .then((response) => response.json())
            .then((json) => json.values)
    }

    const withComma = (v) => {
        let num = NaN
        if (typeof v == 'number') num = v
        else if (typeof v == 'string') num = parseInt(v)
        return !isNaN(num) && num.toLocaleString() || ''
    }

    const NEW_LABEL = `<img src="images/logo/new-item.png" alt="${config.brandName}" width="42" height="42" class="rounded-circle border border-white"></img>`
    const SALE_LABEL = `<img src="images/logo/sale-item.png" alt="${config.brandName}" width="42" height="42" class="rounded-circle border border-white"></img>`

    const price4label = (v1, v2, newItem) => {
        const setupPrice = (v, newItem) => {
            return {
                label: newItem && NEW_LABEL,
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
            if (isNaN(i2)) return console.error('invalid prices:', v1, v2)
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
        const brandName = itemLoc.brandName
        const itemName = itemObj.name
        const productUrl = `product.html#show-${brandName}|${itemLoc.topicName}|${itemLoc.seriesName}|${itemName}`
        const imgs = itemObj.attrs[attr2idx['Img']].split(';')
        const imgUrl = imgs[0]
        const hoverImgAttr = imgs[1] && `data-hover-src="${imgs[1]}"` || ''
        const logoUrl = itemObj.attrs[attr2idx['Logo']]
        const labelPrice = price4label(itemObj.attrs[attr2idx['Price']], itemObj.attrs[attr2idx['Price2']], itemObj.attrs[attr2idx['New']])

        let dataStr;
        let colorList = '';
        if (dataStr = itemObj.attrs[attr2idx['ColorWithSizes']]) {
            const list = dataStr.split(',').map((p) => p.replaceAll(')', '').split('(')[0])
            colorList = list.map(c => `<div class="mine-circle-fill" style="background-color:${c};"></div>`).join('')
        }
        return `<div class="col"><div class="card card-cover h-100% overflow-hidden text-bg-white rounded-4 shadow-lg"
        onmouseenter="onHoverProductCard(event);" onmouseout="onHoverProductCard(event);">
        <img src="${imgUrl}" data-src="${imgUrl}" ${hoverImgAttr} class="card-img-top" alt="${itemName}">
        <div class="card-img-overlay">
            <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">${labelPrice.label}</li>
            </ul>
        </div>
        <div class="d-flex justify-content-end p-2 pb-0">${colorList}</div>
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
                    <a class="product-link" href="${productUrl}">${labelPrice.price}</a>
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
        const topicObj = listByTopic[idx]
        if (!topicObj) return
        const seriesNameList = topicObj[ATTR_NAME_FOR_ORDER]
        let allItemsHtml = ''
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
            allItemsHtml += itemsHtml
            return seriesTemplate(seriesName, itemsHtml)
        })
        tab.innerHTML = seriesTemplate('ALL', allItemsHtml) + seriesHtml.join('\n')
    })
}
