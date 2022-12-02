import Renderer from "./Renderer.js"
import Navigation from "./Navigation.js"
import Camera from "./Camera.js"
import Time from "./utils/Time.js"
import Resources from "./utils/Resources.js"
import Sizes from "./utils/Sizes.js"
import Stats from "./utils/Stats.js"
import World from "./world/World.js"
import * as THREE from 'three'
import sources from './sources.js'

import { Pane } from 'tweakpane'

let instance = null

export default class Experience {
    constructor(_canvas) {
        if (instance) {
            return instance
        }
        instance = this

        window.experience = this

        this.canvas = _canvas

        this.targetElement = _canvas
        // this.setDebug()

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.resources = new Resources(sources)
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.navigation = new Navigation();
        this.world = new World();


        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })

     
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        this.navigation.update()

        if(this.stats)
        this.stats.update()
    }


    setDebug() {
        if (window.location.hash = '#debug') {
            this.debug = new Pane()
            this.debug.containerElem_.style.width = '320px'
            this.stats = new Stats(true)
        }
    }

    destroy() {
        this.sizes.off('resize')
        this.sizes.off('tick')

        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {

                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
