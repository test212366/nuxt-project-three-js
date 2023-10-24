uniform float time;
uniform float progress;
uniform sampler2D uTexture;
uniform sampler2D uGrain;

uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926;



uniform sampler2D tDiffuse;

// frontend uniforms
uniform vec2 uMouse;
uniform float uAmplitudeCtrl;

void main() {
	float dist = distance(vUv, uMouse);
  float interpolation = smoothstep(0.32, 0.1, dist);
  
  // Distortion values
  float frequency = 160.0;
  float amplitude = 0.07 * uAmplitudeCtrl;
  float speed = 10.0;
  float distortion = cos(vUv.y * frequency + time * speed) * amplitude;
  
  // Textures
  vec4 texel = texture2D(
    tDiffuse , 
    vec2(
      vUv.x + distortion * interpolation , 
      vUv.y + distortion * interpolation 
    )
  );

  // Output to screen
  gl_FragColor = texel;


	// gl_FragColor = vec4(0., 1., 1., 1.);
}