varying vec2 vUv;
uniform float uTime;

#pragma glslify: perlin2d = require('../partials/perlin2d.glsl')

void main(){

    vec3 newPosition = position;
    vec2 displacedUv = uv;
    displacedUv *= 5.0;
    displacedUv.x += uTime*0.0002;
    float perlin = perlin2d(displacedUv) * (1.0-uv.x)*10.;

    newPosition.y += perlin*0.1;

    vec4 modelPosition=modelMatrix*vec4(newPosition,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    gl_Position=projectionPosition;

    vUv = uv;
}