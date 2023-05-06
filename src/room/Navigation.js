
import Experience from './Experience.js'
import * as THREE from 'three'
import normalizeWheel from 'normalize-wheel'

export default class Navigation {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera
        this.targetElement = this.experience.targetElement
        this.sizes = this.experience.sizes
        this.time = this.experience.time

        this.setView()
    }

    setView() {
        this.view = {}
        this.view.spherical = this.createSpherical()
        this.view.target = this.createTarget()
        this.view.drag = this.createDrag()

        this.view.zoom = {}
        this.view.zoom.sensitivity = 0.01
        this.view.zoom.delta = 0

        this.view.down = (_x, _y) => {
            this.view.drag.previous.x = _x
            this.view.drag.previous.y = _y
        }

        this.view.zoomIn = (_delta) => {
            this.view.zoom.delta += _delta
        }

        this.view.move = (_x, _y) => {
            this.view.drag.delta.x += _x - this.view.drag.previous.x
            this.view.drag.delta.y += _y - this.view.drag.previous.y
            this.view.drag.previous.x = _x
            this.view.drag.previous.y = _y
        }
        /**
         * Mouse Events
         */

        this.view.onMouseDown = (_event) => {
            this.view.down(_event.clientX, _event.clientY)
            this.view.drag.alternative = _event.button === 2 || _event.ctrlKey || _event.shiftKey

            window.addEventListener('mouseup', this.view.onMouseUp)
            window.addEventListener('mousemove', this.view.onMouseMove)
        }

        this.view.onMouseMove = (_event) => {
            this.view.move(_event.clientX, _event.clientY)
        }

        this.view.onMouseUp = (_event) => {
            window.removeEventListener('mouseup', this.view.onMouseUp)
            window.removeEventListener('mousemove', this.view.onMouseMove)
        }

        /**
         * Touch Events
         */

        this.view.onTouchStart = (_event) => {
            _event.preventDefault()

            this.view.drag.alternative = _event.touches.length > 1

            this.view.down(_event.touches[0].clientX, _event.touches[0].clientY)

            window.addEventListener('touchend', this.view.onTouchEnd)
            window.addEventListener('touchmove', this.view.onTouchMove)
        }

        this.view.onTouchMove = (_event) => {
            _event.preventDefault()

            this.view.move(_event.touches[0].clientX, _event.touches[0].clientY)
        }

        this.view.onTouchEnd = (_event) => {
            _event.preventDefault()

            this.view.up()

            window.removeEventListener('touchend', this.view.onTouchEnd)
            window.removeEventListener('touchmove', this.view.onTouchMove)
        }

        window.addEventListener('touchstart', this.view.onTouchStart)
        /**
         * Context menu event
         */
        
        this.view.onContextMenu = (_event) => {
            _event.preventDefault()
        }

        /**
         * Wheel event
         */

        this.view.onWheel = (_event) => {
            _event.preventDefault()

            const normalized = normalizeWheel(_event)
            this.view.zoomIn(normalized.pixelY)
        }

        this.targetElement.addEventListener('mousedown', this.view.onMouseDown)
        window.addEventListener('contextmenu', this.view.onContextMenu)
        window.addEventListener('mousewheel', this.view.onWheel, { passive: false })
        window.addEventListener('wheel', this.view.onWheel, { passive: false })
    }

    createSpherical() {
        let spherical = {}
        spherical.value = new THREE.Spherical(60, Math.PI * 0.35, Math.PI * 0.25)
        spherical.smoothed = spherical.value.clone()
        spherical.smoothing = 0.005
        spherical.limits = {}
        spherical.limits.radius = { min: 10, max: 50 }
        spherical.limits.phi = { min: 0.01, max: Math.PI * 0.5 }
        spherical.limits.theta = { min: 0.01, max: Math.PI * 0.5 }
        return spherical;
    }

    createTarget() {
        let target = {}
        target.value = new THREE.Vector3(0, 2, 0)
        target.smoothed = target.value.clone()
        target.smoothing = 0.005
        target.limits = {}
        target.limits.x = { min: -4, max: 4 }
        target.limits.y = { min: 1, max: 4 }
        target.limits.z = { min: -4, max: 4 }
        return target;
    }

    createDrag() {
        let drag = {}
        drag.delta = {}
        drag.delta.x = 0
        drag.delta.y = 0
        drag.previous = {}
        drag.previous.x = 0
        drag.previous.y = 0
        drag.sensitivity = 1
        drag.alternative = false
        return drag;
    }

    update() {
        if (this.view.drag.alternative) {
            this.doDrag();
        } else {
            this.rotate();
        }

        this.view.spherical.value.radius += this.view.zoom.delta * this.view.zoom.sensitivity
        this.view.spherical.value.radius = Math.min(Math.max(this.view.spherical.value.radius, this.view.spherical.limits.radius.min), this.view.spherical.limits.radius.max)

        this.view.drag.delta.x = 0
        this.view.drag.delta.y = 0
        this.view.zoom.delta = 0

        this.view.spherical.smoothed.phi += this.getNewSphericalValue("phi")
        this.view.spherical.smoothed.theta += this.getNewSphericalValue("theta")
        this.view.spherical.smoothed.radius += this.getNewSphericalValue("radius")

        this.view.target.smoothed.x += this.getNewTargetValue("x")
        this.view.target.smoothed.y += this.getNewTargetValue("y")
        this.view.target.smoothed.z += this.getNewTargetValue("z")

        const viewPosition = new THREE.Vector3()
        viewPosition.setFromSpherical(this.view.spherical.smoothed)
        viewPosition.add(this.view.target.smoothed)

        this.camera.instance.position.copy(viewPosition)
        this.camera.instance.lookAt(this.view.target.smoothed)
    }

    doDrag() {
        const up = new THREE.Vector3(0, 1, 0)
        const right = new THREE.Vector3(-1, 0, 0)

        up.applyQuaternion(this.camera.instance.quaternion)
        right.applyQuaternion(this.camera.instance.quaternion)

        up.multiplyScalar(this.view.drag.delta.y * 0.01)
        right.multiplyScalar(this.view.drag.delta.x * 0.01)

        this.view.target.value.add(up)
        this.view.target.value.add(right)

        this.view.target.value.x = this.applyTargetLimits("x")
        this.view.target.value.y = this.applyTargetLimits("y")
        this.view.target.value.z = this.applyTargetLimits("z")
    }

    rotate() {
        this.view.spherical.value.theta -= this.view.drag.delta.x * this.view.drag.sensitivity / this.sizes.smallestSize
        this.view.spherical.value.phi -= this.view.drag.delta.y * this.view.drag.sensitivity / this.sizes.smallestSize

        this.view.spherical.value.phi = this.applySphericalLimits("phi")
        this.view.spherical.value.theta = this.applySphericalLimits("theta")
    }

    getNewTargetValue(axis) {
        return (this.view.target.value[axis] - this.view.target.smoothed[axis])
            * this.view.target.smoothing * this.time.delta
    }

    getNewSphericalValue(axis) {
        return (this.view.spherical.value[axis] - this.view.spherical.smoothed[axis])
            * this.view.spherical.smoothing * this.time.delta
    }

    applyTargetLimits(axis) {
        return Math.min(Math.max(this.view.target.value[axis], this.view.target.limits[axis].min), this.view.target.limits[axis].max)
    }

    applySphericalLimits(axis) {
        return Math.min(Math.max(this.view.spherical.value[axis], this.view.spherical.limits[axis].min), this.view.spherical.limits[axis].max)
    }
}