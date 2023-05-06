varying vec2 vUv;
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vPosition;

void main(void) {
    
    vec3 color0 = vec3(0.7608, 0.2745, 0.3647);
    vec3 color1 = vec3(0.8863, 0.5412, 0.4745);
    
    float fresnelTerm = (3.0 + 0.5 * vPosition.y + 2.5 * min(dot(vPositionW, normalize(vNormalW)), 0.0));
    
    vec3 color = mix(color0, color1, fresnelTerm);
    gl_FragColor = vec4(color, 1.0);
}