import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.smallestSize = Math.min(this.width, this.height)
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.smallestSize = Math.min(this.width, this.height)

            this.trigger('resize')
        })
    }
}