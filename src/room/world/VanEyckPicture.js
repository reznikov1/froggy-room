import Experience from '../Experience.js'
import * as THREE from 'three'
import vertexShader from '../shaders/vanEyck/vertex.glsl'
import fragmentShader from '../shaders/vanEyck/fragment.glsl'
import fragmentShader2 from '../shaders/vanEyck/fragment2.glsl'

export default class VanEyckPicture {
    constructor(bigModel, smallModels, furnitureTexture) {
        this.experience = new Experience()
        this.bigModel = bigModel;
        this.furnitureTexture = furnitureTexture;
        this.smallModels = smallModels;
        this.time = this.experience.time;

        this.customUniforms = {
            uTime: { value: 0 },
            textrue: { type: "t", value: furnitureTexture },
        }

        this.setMaterials()
    }

    setMaterials() {
        this.bigModel.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: this.customUniforms,
        })

        for (let i = 0; i < this.smallModels.length; i++) {

            this.smallModels[i].material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader: fragmentShader2,
                uniforms: {
                    uTime: { value: 0 },
                    textrue: { type: "t", value: this.furnitureTexture },
                },
            })
            this.smallModels[i].material.uniforms.uIndex = { value: i + 1 }
        }
    }

    update() {
        this.bigModel.material.uniforms.uTime.value = this.time.elapsed
        this.smallModels.forEach((element) => {
            element.material.uniforms.uTime.value = this.time.elapsed
        });

    }
}