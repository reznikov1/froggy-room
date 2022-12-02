varying vec2 vUv;
varying vec2 vUv2;

attribute vec2 uv2;

void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    gl_Position=projectionPosition;

    vUv = uv;
    vUv2 = uv2;
}