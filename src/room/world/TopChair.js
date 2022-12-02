import Experience from '../Experience.js'
import * as THREE from 'three'

export default class TopChair {

    constructor(model) {
        this.experience = new Experience()
        this.model = model;
        this.time = this.experience.time;
    }

    update() {
        if (this.model) {
            this.model.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5 - 0.5
        }
    }
}