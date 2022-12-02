
varying vec2 vUv;

uniform sampler2D textrue;
uniform float uTime;


mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(void){
    vec2 uv=vUv;
    uv*=30.;
    
    vec2 id=floor(uv);
    
    float time=uTime*.0003;
    
    if(mod(id.x,2.)>0.){
        uv.y+=1.5;
    }

    id=floor(uv);
    
    
    vec2 sv=fract(uv)-.5;

    bool isSmall = mod(id.y,3.) > 0.;

    if (!isSmall && fract(time) < 0.5){
        sv *= rotate2d(-fract(time)*3.14);
    }else if(isSmall && fract(time) > 0.5){
        sv *= rotate2d(+fract(time)*3.14);
    }

    float mult = (isSmall ? 1.2: 2.);
    

    float offset=.06*mult;

    float size = 0.04 * mult;
    float res = 0.03;
    
    float strength=smoothstep(size, size-res,length(sv-vec2(0.,offset)));
    strength+=smoothstep(size, size-res,length(sv+vec2(0.,offset)));
    strength+=smoothstep(size, size-res,length(sv+vec2(offset,0.)));
    strength+=smoothstep(size, size-res,length(sv-vec2(offset,0.)));
    
    strength=clamp(strength,0.,1.);
    vec4 text=texture2D(textrue,vUv);
    vec3 color=mix(text.rgb*5.,vec3(strength)*vec3(0.9137, 0.8431, 0.0588),.2);
    
    gl_FragColor=vec4(color,1.);
}