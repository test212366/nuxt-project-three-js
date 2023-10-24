uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
uniform vec3 uMin;
float PI = 3.1415926;

 

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;



void main () {
	vUv = uv;



	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

 
 
}