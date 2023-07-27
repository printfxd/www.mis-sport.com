const ZoomImgClass = {
    SACLE: 2,
    debug: true,
    setScale(s) {
        this.SACLE = s
        return this
    },
    setImg(imgEl) {
        if (!imgEl) throw new Error('should give imgEl')
        this.detach()
        this.imgEl = imgEl
        this.parent = imgEl.parentNode
        const set = {
            onMove: ({ clientX, clientY }) => {
                const imgPosX = clientX - this.parent.offsetLeft
                const imgPosY = clientY - this.parent.offsetTop
        
                if (imgPosX < 0 || imgPosX < 0) return
                if (imgPosX >= this.w || imgPosY >= this.h) return
        
                const left = Math.ceil(imgPosX * (1 - this.SACLE))
                const top = Math.ceil(imgPosY * (1 - this.SACLE))
        
                this.imgEl.style.transform = `scale(${this.SACLE})`
                this.imgEl.style.left = `${left}px`
                this.imgEl.style.top = `${top}px`
            },
            onEnd: () => {
                this.imgEl.style.transform = 'scale(1)'
                this.imgEl.style.left = '0px'
                this.imgEl.style.top = '0px'
            },
        }
        const createHandler = ({ onStart, onMove, onEnd }) => {
            const beg = (e) => {
                if (onStart) onStart()
                if (e instanceof TouchEvent && onMove) onMove(e.touches[0])
            }
            const mov = (e) => {
                if (onMove) onMove(e instanceof TouchEvent ? e.touches[0] : e)
            }
            const end = () => {
                if (onEnd) onEnd()
            }
            return {
                touch(e) {
                    this.detach()
                    this.el = e
                    e.addEventListener('touchstart', beg, { passive: true })
                    e.addEventListener('touchmove', mov, { passive: true })
                    e.addEventListener('touchend', end, { passive: true })
                    return this
                },
                mouse(e) {
                    this.detach()
                    this.el = e
                    e.addEventListener('mouseenter', beg)
                    e.addEventListener('mousemove', mov)
                    e.addEventListener('mouseleave', end)
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