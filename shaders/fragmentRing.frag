uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926;
void main() {
   
 
	vec2 center = vec2(0.5, 0.5); // Центр окружности (может потребоваться настройка)
	float radius = .0001; // Радиус окружности (может потребоваться настройка)

	// vec2 animatedUV = vUv + vec2(sin(time * 0.5), cos(time * 0.7)) * 0.05;
	float distanceToCenter = length(vUv - center);

	float animationProgress = clamp(distanceToCenter / radius, 1.0, 0.0 ) + time ;

	// Move the UV coordinates towards the edges based on the animation progress
	vec2 animatedUV = mix(vUv, center, animationProgress);


	float distance = length(animatedUV - center);
	float brightness =  1.25 - radius /  1. - distance; // Затемнение от центра к краям

	// Расчет полосы зебры на основе радиуса и расстояния
	float stripeWidth = 0.0035; // Ширина полосы зебры (может потребоваться настройка)
	float stripeCount = 3.0; // Количество полос (может потребоваться настройка)
	float stripeIndex = floor(distance / stripeWidth);
	float stripe = mod(stripeIndex, stripeCount);

	vec4 colorOne = vec4(vec3(0.0), 1.);
	vec4 colorTwo = vec4(0., 0.21, .4, 1.);
	vec4 colorFinal = mix( colorOne,colorTwo, brightness);


	if (stripe < stripeCount / 2. && brightness > 0.) {
		discard;
	}


		gl_FragColor = colorFinal;

 	 gl_FragColor.a *= smoothstep(.75, 1., brightness);



 
//   gl_FragColor.a *= smoothstep(.9, .7, brightness);
 



}