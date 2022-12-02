import Experience from '../Experience.js'
import * as THREE from 'three'
import MeshReflectorMaterial from '../utils/MeshReflectorMaterial.js';

export default class BathWater {

    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.params = {
            resolution: 512,
            blur: [32, 32],
            mixBlur: 0.1,
            mixContrast: 2.43,
            distortion: 1.5,
            mixStrength: 0.65,
            mirror: 0.61,
            color: 0x15151e
        }

        this.modelPosition = this.resources.items.waterPosition.scene.children[1]
        this.model = this.resources.items.water.scene.children[1]
        this.setModel()
    }

    setModel() {
        this.model.rotateX(-Math.PI * 0.5)
        this.model.position.copy(this.modelPosition.position)
        this.model.geometry.computeVertexNormals()
        this.material = new MeshReflectorMaterial(this.renderer, this.camera, this.scene, this.model, this.params);
        this.model.material = this.material;
    
        this.scene.add(this.model);
    }



    update() {
        this.model.material.update();
    }
}