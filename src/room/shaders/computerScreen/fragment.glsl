
varying vec2 vUv;
uniform float uTime;

float random(float value){
    return fract(sin(dot(value, 13.302))* 44758.401);
}

float doStuff(vec2 st, float vel, float m){
    float p = floor(st.x+vel);
    return smoothstep(m,m+0.1, random(103.792+p*-200.960)+random(p)*0.804 );
}

void main(){
    vec2 st = vUv;
    
    st.x *=50.;
    st.y *=30.;
    
    
	vec2 fl = floor(st);
    vec2 fr = fract(st);
    
    
    float vel = uTime*.02;
    vel *= -1.*random(1.0+fl.y);
    
    
    vec3 color = vec3(doStuff(fl+0.1,vel,0.9),
                     doStuff(fl,vel,0.9),
                     doStuff(fl-0.1,vel,0.9));
    
    
 
   	color *= smoothstep(0.2, 0.22,fr.y);
    
    gl_FragColor = vec4(color*0.7,1.0);
    
}