import Experience from '../Experience.js'
import * as THREE from 'three'

import vertexShader from '../shaders/computerScreen/vertex.glsl'
import fragmentShader from '../shaders/computerScreen/fragment.glsl'

export default class ComputerScreen {

    constructor() {
        this.experience = new Experience()
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.model = this.resources.items.computerScreen.scene.children[1]

        if (this.debug) {
            this.debugFolder = this.debug.addFolder({
                title: 'ComputerScreen',
                expanded: false
            })
        }

        this.setModel()
    }
    setModel() {
        this.scene.add(this.model)

        this.model.material = new THREE.ShaderMaterial({
            transparent: false,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 }
            }
        })
     
    }

    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed
    }
}