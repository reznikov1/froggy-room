import Experience from '../Experience.js'
import * as THREE from 'three'
import landscapeVertexShader from '../shaders/landscape/vertex.glsl'
import landscapeFragmentShader from '../shaders/landscape/fragment.glsl'

import cloudVertexShader from '../shaders/cloud/vertex.glsl'
import cloudFragmentShader from '../shaders/cloud/fragment.glsl'

export default class WindowContent {

    constructor() {
        this.experience = new Experience()
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.monkeys = this.resources.items.monkeys.scene
        this.blackwall = this.resources.items.blackwall.scene.children[1]
        this.landscape = this.resources.items.landscape.scene.children[1]
        this.reflector = this.resources.items.reflector.scene.children[1]

        this.customUniforms = {
            color0: { value: new THREE.Vector3(0.918, 0.824, 0.573) },
            color1: { value: new THREE.Vector3(0.494, 0.694, 0.659) },
            color3: { value: new THREE.Vector3(0.992, 0.671, 0.537) },
            color2: { value: new THREE.Vector3(0.859, 0.047, 0.212) },
            P0: { value: new THREE.Vector2(0.44 , 0.34) },
            P1: { value: new THREE.Vector2(0.79, 0.84) },
            P2: { value: new THREE.Vector2(0.28, 0.43) },
            P3: { value: new THREE.Vector2(0.72, 1.0) },
        }

        this.params = {
            color0: {r: 0.21, g: 0.04, b: 0.34},
            color1: {r: 0.86, g: 0.42, b: 0.57},
            color2: {r: 0.94, g: 0.08, b: 0.09},
            color3: {r: 0.99, g: 0.75, b: 0.10},
        }

       
        if (false) {
            this.debugFolder = this.debug.addFolder({
                title: 'sunset',
                expanded: true
            })

            this.debugFolder.addInput(
                this.params,
                'color0',{
                    color: {type: 'float'},
                  }
            )

            this.debugFolder.addInput(
                this.params,
                'color1',{
                    color: {type: 'float'},
                  }
            )

            this.debugFolder.addInput(
                this.params,
                'color2',{
                    color: {type: 'float'},
                  }
            )

            this.debugFolder.addInput(
                this.params,
                'color3',{
                    color: {type: 'float'},
                  }
            )

            this.debugFolder.addInput(
                this.customUniforms.P0,
                'value', {
                title: 'P0',
                picker: 'inline',
                expanded: true,
                x: { step: 0.01, min: -1, max: 1 },
                y: { step: 0.01, min: -1, max: 1 },
            }
            )

            this.debugFolder.addInput(
                this.customUniforms.P1,
                'value', {
                title: 'P1',
                picker: 'inline',
                expanded: true,
                x: { step: 0.01, min: -1, max: 1 },
                y: { step: 0.01, min: -1, max: 1 },
            }
            )

            this.debugFolder.addInput(
                this.customUniforms.P2,
                'value', {
                title: 'P2',
                picker: 'inline',
                expanded: true,
                x: { step: 0.01, min: -1, max: 1 },
                y: { step: 0.01, min: -1, max: 1 },
            }
            )

            this.debugFolder.addInput(
                this.customUniforms.P3,
                'value', {
                title: 'P3',
                picker: 'inline',
                expanded: true,
                x: { step: 0.01, min: -1, max: 1 },
                y: { step: 0.01, min: -1, max: 1 },
            }
            )
        }

        this.setModel()
    }
    setModel() {
        this.scene.add(this.monkeys)
        this.scene.add(this.blackwall)
        this.scene.add(this.landscape)
        this.scene.add(this.reflector)


        this.blackwall.material = new THREE.MeshBasicMaterial({
            color: '#000000',
        })

        this.reflector.material = new THREE.MeshBasicMaterial({
            color: '#FCBF19',
        })

        this.landscape.material = new THREE.ShaderMaterial({
            uniforms: this.customUniforms,
            vertexShader: landscapeVertexShader,
            fragmentShader: landscapeFragmentShader
        });

        this.cloudMaterial = new THREE.ShaderMaterial({
            uniforms: this.customUniforms,
            vertexShader: cloudVertexShader,
            fragmentShader: cloudFragmentShader
        });


        this.monkeys.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material = this.cloudMaterial;
                child.geometry.computeVertexNormals()
            }
        })
    }

    update() {
        this.customUniforms.color0.value.x = this.params.color0.r; 
        this.customUniforms.color0.value.y = this.params.color0.g; 
        this.customUniforms.color0.value.z = this.params.color0.b; 
        this.customUniforms.color1.value.x = this.params.color1.r; 
        this.customUniforms.color1.value.y = this.params.color1.g; 
        this.customUniforms.color1.value.z = this.params.color1.b; 
        this.customUniforms.color2.value.x = this.params.color2.r; 
        this.customUniforms.color2.value.y = this.params.color2.g; 
        this.customUniforms.color2.value.z = this.params.color2.b; 
        this.customUniforms.color3.value.x = this.params.color3.r; 
        this.customUniforms.color3.value.y = this.params.color3.g; 
        this.customUniforms.color3.value.z = this.params.color3.b; 

        this.landscape.material.uniforms = this.customUniforms

     
    }
}