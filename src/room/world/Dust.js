import Experience from "../Experience";
import * as THREE from 'three'
import vertexShader from '../shaders/dust/vertex.glsl'
import fragmentShader from '../shaders/dust/fragment.glsl'


export default class Dust {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.time = this.experience.time

        this.geo = null;
        this.material = null;
        this.points = null;
        this.params = {}
        this.params.count = 1000;
        this.params.xsize = 7.663;
        this.params.xoffset = -4.109;
        this.params.ysize = 4.130;
        this.params.yoffset = 2.772;
        this.params.zsize = 5.489;
        this.params.zoffset = -1.570;


        this.generateCompany()
    }

    generateCompany() {

        if (this.points !== null) {
            this.geo.dispose();
            this.material.dispose();
            this.scene.remove(this.points);
        }

        this.geo = new THREE.BufferGeometry();

        const positions = new Float32Array(this.params.count * 3);
        const colors = new Float32Array(this.params.count * 3);

        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;

            const x = Math.random() * this.params.xsize;
            const y = (Math.random() * this.params.ysize) - 0.3 * x;
            const z = -(Math.random() * this.params.zsize) * Math.abs((x - this.params.xoffset)) * 0.1;

            positions[i3] = x + this.params.xoffset
            positions[i3 + 1] = y + this.params.yoffset
            positions[i3 + 2] = z - this.params.zoffset

            colors[i3] = Math.random()
        }

        this.geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 60 * this.renderer.getPixelRatio() },
            },
        })
        this.points = new THREE.Points(this.geo, this.material)
        this.scene.add(this.points);

    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}