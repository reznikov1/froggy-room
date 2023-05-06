varying vec3 vColor;
varying vec3 vPosition;

uniform float uTime;
uniform float uSize;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float t = uTime * 0.001;
    modelPosition.x += sin(t * color.x) * 0.1;
    modelPosition.y += cos(t * color.x) * 0.1;
    modelPosition.z += sin(t * color.x) * 0.1;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;
    
    gl_PointSize = uSize;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vPosition = position;
    vColor = color;
}