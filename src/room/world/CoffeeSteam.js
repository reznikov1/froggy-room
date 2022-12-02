import Experience from '../Experience.js'
import * as THREE from 'three'
import vertexShader from '../shaders/coffeeSteam/vertex.glsl'
import fragmentShader from '../shaders/coffeeSteam/fragment.glsl'

export default class CoffeeSteam {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.model = this.resources.items.steam.scene.children[1]

        // if (this.debug) {
        //     this.debugFolder = this.debug.addFolder({
        //         title: 'coffeeSteam',
        //         expanded: false
        //     })
        // }

        this.setModel()
    }

    setModel() {
        this.scene.add(this.model)
  


        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uUvFrequency: { value: new THREE.Vector2(6, 2.5) }
            }
        })
        if (this.debug) {
            // this.debugFolder.addInput(
            //     this.model.material.uniforms.uUvFrequency.value,
            //     'x',
            //     {
            //         min: 0.001,
            //         max: 20,
            //         step: 0.001,
            //     }
            // )

            // this.debugFolder.addInput(
            //     this.model.material.uniforms.uUvFrequency.value,
            //     'y',
            //     {
            //         min: 0.001,
            //         max: 20,
            //         step: 0.001,
            //     }
            // )
        }
    }

    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed
    }
}