import Experience from '../Experience.js'
import TopChair from './TopChair.js'
import VanEyckPicture from './VanEyckPicture.js'
import * as THREE from 'three'
import vertexShader from '../shaders/wallpaper/vertex.glsl'
import fragmentShader from '../shaders/wallpaper/fragment.glsl'
import fragmentShader2 from '../shaders/wallpaper/fragment2.glsl'

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.time = this.experience.time



        this.wallsTexture = this.resources.items.wallsTexture
        this.wallsTexture.encoding = THREE.sRGBEncoding;
        this.wallsTexture.flipY = false;
        this.furnitureTexture = this.resources.items.furnitureTexture
        this.furnitureTexture.encoding = THREE.sRGBEncoding;
        this.furnitureTexture.flipY = false;

        this.wallsModel = this.resources.items.wallsModel.scene
        this.furnitureModel = this.resources.items.furnitureModel.scene

        this.wallsMaterial = new THREE.MeshBasicMaterial({ map: this.wallsTexture })
        this.wallsMaterial.color.convertSRGBToLinear();
        this.furnitureMaterial = new THREE.MeshBasicMaterial({ map: this.furnitureTexture })

        this.customUniforms = {
            uTime: { value: 0 },
            textrue: { type: "t", value: this.wallsTexture },
        }

        this.wallpaperMaterial = new THREE.ShaderMaterial({
            uniforms: this.customUniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        this.wallpaperMaterial2 = new THREE.ShaderMaterial({
            uniforms: this.customUniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader2
        });


        this.setModel(this.wallsModel, this.wallsMaterial)
        this.setModel(this.furnitureModel, this.furnitureMaterial)
    }

    setModel(model, material) {
        this.scene.add(model)

        let chairModel = null;
        let vanEyckPictureBig = null;
        let vanEyckPictureSmall = [];

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material
                if (child.name === 'BezierCurve006' || child.name === 'BezierCurve005' || child.name === 'lightspheres') {
                    child.material.side = THREE.DoubleSide;
                }
                if (child.name === 'greenwall') {
                    child.material = this.wallpaperMaterial
                }

                if (child.name === 'redwall') {
                    child.material = this.wallpaperMaterial2
                }

                if (child.name === 'chair') {
                    chairModel = child
                }
                
                if (child.name === 'froggy' || child.name === 'froggy_hat') {
                    child.frustumCulled = false
                
                }

                if (child.name === 'VanEyekPictureCenter') {
                    vanEyckPictureBig = child
                   
                }

                if (child.name.indexOf('VanEyekPicture0') === 0) {
                    vanEyckPictureSmall.push(child)
                }
            }
        })
        if (chairModel) {
            this.topChair = new TopChair(chairModel);
        }

        if (vanEyckPictureBig && vanEyckPictureSmall.length) {
            this.vanEyckPicture = new VanEyckPicture(vanEyckPictureBig, vanEyckPictureSmall,this.furnitureTexture);
        }
    }


    update() {
        if (this.topChair){
            this.topChair.update();
        }
       
        if (this.vanEyckPicture){
            this.vanEyckPicture.update();
        }
        
        this.wallpaperMaterial.uniforms.uTime.value = this.time.elapsed
        this.wallpaperMaterial2.uniforms.uTime.value = this.time.elapsed
    }
}