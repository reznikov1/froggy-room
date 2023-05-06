varying vec3 vColor;
varying vec3 vPosition;

uniform float uTime;

float remap01(float a, float b, float t) {
    return clamp(((t - a) / (b - a)), 0.0, 1.0);
}

void main()
{
    float str = distance(gl_PointCoord, vec2(0.5));
    str = 1.0 - step(0.5, str);
    
    vec3 col = mix(vec3(0), vColor, str);
    
    float fading = 1.0 - remap01(-4.0, 2.5, vPosition.x) - remap01(1.7, 6.7, vPosition.y) - remap01(-1.5, 3.5, vPosition.z);
    
    gl_FragColor = vec4(vec3(0.9608, 0.8157, 0.5725), fading);
}