
varying vec2 vUv;

uniform sampler2D textrue;
uniform float uTime;

float random(float value) {
    return fract(sin(dot(value, 13.302)) * 44711.401);
}

void main(void) {
    vec2 uv = vUv;
    uv.x *= 40.0;
    
    float floorx = floor(uv.x);
    float r = random(floorx);
    
    float fractx = fract(uv.x + sin(uTime * 0.0002 * r) * sign(r - 0.5));
    
    float strength = smoothstep(1.0 * r+0.1, 1.0 * r+0.12, fractx) * smoothstep(0.98, 0.96, fractx) * smoothstep(0.0, 0.2, fractx);
    
    vec4 text = texture2D(textrue, vUv);
    vec3 color = mix(text.rgb * 5.0, vec3(strength) * vec3(0.9686, 0.8627, 0.1647), 0.1);
    
    gl_FragColor = vec4(color, 1.0);
}