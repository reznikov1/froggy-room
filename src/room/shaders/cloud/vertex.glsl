varying vec2 vUv;
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vPosition;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    
    vPositionW = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);
    vNormalW = normalize(normalMatrix * normal);
    
    vUv = uv;
    vPosition = position;
}