
varying vec2 vUv;
varying vec2 vUv2;
uniform float uTime;
uniform float uIndex;

uniform sampler2D textrue;

float random(float value) {
  return fract(sin(dot(value, 13.302)) * 44711.401);
}

void main() {
  vec3 colors[5] = vec3[](
    vec3(0.3804, 0.6353, 0.8078),
    vec3(0.8039, 0.4157, 0.3804),
    vec3(0.5098, 0.6745, 0.3804),
    vec3(0.0),
    vec3(0.0));
    float time = floor(uTime * 0.0008);
    
    int c = int(floor(random(uIndex * time) * 5.0));
    
    vec2 uv = vUv2 - 0.5;
    
    float offset = 0.02;
    
    vec3 strength = vec3(smoothstep(0.4, 0.01, length(uv)) + 0.07 / length(uv),
    smoothstep(0.4, 0.01, length(uv + vec2(offset * 2.0))) + 0.07 / length(uv + vec2(offset)),
    smoothstep(0.4, 0.01, length(uv - vec2(offset * 2.0))) + 0.07 / length(uv - vec2(offset)));
    
    vec4 text = texture2D(textrue, vUv);
    vec3 color = mix(text.rgb * 5.0, strength * colors[c], 0.6);
    
    gl_FragColor = vec4(color, 1.0);
  }