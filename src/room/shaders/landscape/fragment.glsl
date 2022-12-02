varying vec2 vUv;

uniform vec3 color0;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform lowp vec2 P0;
uniform lowp vec2 P1;
uniform lowp vec2 P2;
uniform lowp vec2 P3;

void main(void){

    vec2 uv = vUv;
  

    vec3 color = mix(color0, color2, smoothstep(P0.y, P1.y, vUv.y));
    // color = mix(color, color2, smoothstep(P1.y, P2.y, vUv.y));
    color = mix(color, color3, smoothstep(P2.y, P3.y,vUv.y));


    gl_FragColor = vec4(color, 1.0);
}