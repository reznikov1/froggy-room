
varying vec2 vUv;
varying vec2 vUv2;
uniform float uTime;

uniform sampler2D textrue;

float makeSun(vec2 uv, float time) {
    float r = length(uv) - 0.07;
    
    float a = atan(uv.y, uv.x) - sin(r * 15.0) * (2.0 - r*r) * 0.05 - time;
    
    float f = cos(a * 25.0) * 0.3;
    
    float strength = clamp(smoothstep(f + 0.1, f, r) + smoothstep(0.25, 0.15, r + 0.1), 0.0, 1.0 - smoothstep(0.15, 0.13, r + 0.1));
    return strength;
}

void main() {
    vec2 uv = vUv2 - 0.5;
    
    float time = uTime * 0.0008;
    
    vec3 strength = vec3(makeSun(uv, time - 0.02), makeSun(uv, time), makeSun(uv, time + 0.02));
    
    vec4 text = texture2D(textrue, vUv);
    vec3 color = mix(text.rgb * 5.0, strength, 0.6);
    
    gl_FragColor = vec4(color, 1.0);
}