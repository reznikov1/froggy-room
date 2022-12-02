
import Experience from './Experience.js'
import * as THREE from 'three'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.stats = this.experience.stats
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.toneMapping = THREE.ReinhardToneMapping
        this.instance.toneMappingExposure = 1.5
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#000000')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        if (this.stats) {
            this.stats.setRenderPanel(this.canvas)
        }
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.setPixelRatio, 2))
    }


    update() {
        if (this.stats) {
            this.stats.beforeRender()
        }

        this.instance.render(this.scene,this.camera)

        if (this.stats) {
            this.stats.afterRender()
        }
    }
}
