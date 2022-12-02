
varying vec2 vUv;
uniform vec2 uUvFrequency;
uniform float uTime;

#pragma glslify: perlin2d = require('../partials/perlin2d.glsl')

void main(){
    vec2 uv = vUv * uUvFrequency;
    uv.x += uTime * 0.001; 

    float border = min(vUv.y*3.0, (1.0 - vUv.y)*3.0);
    border = border * min((vUv.x - 0.2), (1.0 - vUv.x)*3.0);
     
    float perlin = perlin2d(uv);

    float alpha = border * perlin;

    vec3 color = vec3(0.9451, 0.851, 0.5686);
    gl_FragColor=vec4(color.x,color.y,color.z,border);
  
}