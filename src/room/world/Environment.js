
import Experience from "../Experience";
import * as THREE from 'three'

export default class Enviroment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setSunLight()
    }

    setSunLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff,1)
        this.scene.add(ambientLight)
   
        
        
    }
}