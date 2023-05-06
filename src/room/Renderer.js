
import Experience from './Experience.js'
import * as THREE from 'three'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
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
        this.instance.toneMappingExposure = 1.5
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#000000')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }


    update() {
        this.instance.render(this.scene,this.camera)
    }
}
