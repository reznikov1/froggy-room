
varying vec2 vUv;
varying vec2 vUv2;
uniform float uTime;
uniform float uIndex;

uniform sampler2D textrue;

float random(float value){
  return fract(sin(dot(value,13.302))*44711.401);
}

void main(){
  vec3 colors[5]=vec3[](
    vec3(0.3804, 0.6353, 0.8078),
    vec3(.8039,.4157,.3804),
    vec3(.5098,.6745,.3804),
    vec3(0.),
    vec3(0.));
    float time=floor(uTime*.0008);
    
    int c=int(floor(random(uIndex*time)*5.));
    
    vec2 uv=vUv2-.5;

    float offset = 0.02;
    
    vec3 strength=vec3(smoothstep(.4,.01,length(uv))+.07/length(uv),
    smoothstep(.4,.01,length(uv+vec2(offset*2.)))+.07/length(uv+vec2(offset)),
    smoothstep(.4,.01,length(uv-vec2(offset*2.)))+.07/length(uv-vec2(offset)));
    
    vec4 text=texture2D(textrue,vUv);
    vec3 color=mix(text.rgb*5.,strength*colors[c],.6);
    
    gl_FragColor=vec4(color,1.);
  }