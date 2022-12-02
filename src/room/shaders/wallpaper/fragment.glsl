
varying vec2 vUv;

uniform sampler2D textrue;
uniform float uTime;

float random(float value){
    return fract(sin(dot(value,13.302))*44711.401);
}

void main(void){
    vec2 uv=vUv;
    uv.x*=40.;
    
    float floorx=floor(uv.x);
    float r=random(floorx);
    
    float fractx=fract(uv.x+sin(uTime*.0002*r)*sign(r-.5));
    
    float strength=smoothstep(1.*r+.1,1.*r+.12,fractx)*smoothstep(.98,.96,fractx)*smoothstep(0.,.2,fractx);
    
    vec4 text=texture2D(textrue,vUv);
    vec3 color=mix(text.rgb*5.,vec3(strength)*vec3(.9686,.8627,.1647),.1);
    
    gl_FragColor=vec4(color,1.);
}