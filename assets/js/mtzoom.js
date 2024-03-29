const ZoomImgClass = {
    setScale(s) {
        this.SACLE = s
        this.FACTOR = - 100 / s
        return this
    },
    setImg(imgEl) {
        if (!imgEl) throw new Error('should give imgEl')
        this.detach()
        this.imgEl = imgEl
        this.parent = imgEl.parentNode
        const set = {
            onMove: ({ clientX, clientY }) => {
                let percentX = (clientX - this.parent.offsetLeft) / this.parent.offsetWidth
                let percentY = (clientY - this.parent.offsetTop) / this.parent.offsetHeight

                this.imgEl.style.transform = `scale(${this.SACLE}) translate(${percentX * this.FACTOR}%,${percentY * this.FACTOR}%)`
            },
            onEnd: () => {
                this.imgEl.style.transform = 'scale(1) translate(0)'
            },
        }
        const createHandler = ({ onStart, onMove, onEnd }) => {
            const beg = (e) => {
                onStart()
                if (onMove && e instanceof TouchEvent) onMove(e)
            }
            const mov = (e) => {
                if (e instanceof TouchEvent) {
                    e.preventDefault();
                    const touches = e.changedTouches
                    if (touches.length) onMove(touches[0])
                } else {
                    onMove(e)
                }
            }
            const end = () => onEnd()
            return {
                touch(e) {
                    this.detach()
                    this.el = e
                    if (onStart) e.addEventListener('touchstart', beg, { passive: true })
                    if (onMove) e.addEventListener('touchmove', mov)
                    if (onEnd) e.addEventListener('touchend', end, { passive: true })
                    return this
                },
                mouse(e) {
                    this.detach()
                    this.el = e
                    if (onStart) e.addEventListener('mouseenter', beg)
                    if (onMove) e.addEventListener('mousemove', mov)
                    if (onEnd) e.addEventListener('mouseleave', end)
                    return this
                },
                detach() {
                    started = false
                    if (this.el) {
                        const e = this.el
                        e.removeEventListener('touchstart', beg)
                        e.removeEventListener('touchmove', mov)
                        e.removeEventListener('touchend', end)
                        e.removeEventListener('mouseenter', beg)
                        e.removeEventListener('mousemove', mov)
                        e.removeEventListener('mouseleave', end)
                        this.el = null
                    }
                    this.act = null
                    return this
                }
            }
        }
        this.handlers = {
            load: (e) => this.onImgLoad(e),
            touch: createHandler(set).touch(this.parent),
            mouse: createHandler(set).mouse(this.parent),
        }
        imgEl.style.transformOrigin = 'left top'
        imgEl.addEventListener('load', this.handlers.load)
        return this
    },
    onImgLoad(e) {
        const { clientWidth: w, clientHeight: h } = e.target
        this.w = w
        this.h = h
    },
    detach() {
        if (this.parent) {
            this.handlers.touch.detach()
            this.handlers.mouse.detach()
            this.parent = null
        }

        if (this.imgEl) {
            this.imgEl.removeEventListener('load', this.handlers.load)
            this.imgEl = null
        }

        this.handlers = null
        this.w = null
        this.h = null
        return this
    },
}