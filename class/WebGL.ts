	
	import * as THREE from 'three'
	import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
	import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader' 
	// import GUI from 'lil-gui'
	import gsap from 'gsap'
	//@ts-ignore
	import fragmentShader from '../shaders/fragment.frag';
 	//@ts-ignore
	import vertexShader from '../shaders/vertex.vert'

	//@ts-ignore
	import fragmentShaderMirr from '../shaders/fragmentmirr.frag';
 	//@ts-ignore
	import vertexShaderMirr from '../shaders/vertexmirr.vert'

	//@ts-ignore
	import fragmentShaderRing from '../shaders/fragmentRing.frag';
	//@ts-ignore
	import vertexShaderRing from '../shaders/vertexRing.vert'

	//@ts-ignore
	// import env from '../assets/empty_warehouse_01_4k.exr'

	import grain from '../assets/download.jpg'
	import modelTexture from '../assets/water.png'

	//@ts-ignore
	import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from "three-msdf-text-utils";

	import atlasURL from '../3d-font/FontsFree-Net-SF-Pro-Rounded-Regular.png'
	import fnt from '../3d-font/FontsFree-Net-SF-Pro-Rounded-Regular-msdf.json'
	
	//@ts-ignore
import model from '../public/iphone_14_pro.glb'


	// import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
	// import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
	// import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
	// import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'


 	export class WebGLScene {
		scene: any
		sceneMain: any
		container: any
		width: any
		height: any
		renderer: any
		renderTarget: any
		camera: any
		controls: any
		time: number
		dracoLoader: any
		gltf: any
		isPlaying: boolean
		//@ts-ignore
		gui: GUI 
		imageAspect!: number
		material: any
		geometry: any
		plane: any
		aspect: any
		text1: any
		materialText:any
		mesh: any
		materialMirr:any
		smallSphere:any
		cubeRenderTarget:any
		cubeCamera:any
		textRenderTarget:any
		model:any
		modelPhone:any
		speed:any
		rounded:any
		position: any
		textGroup: any
		diff:any
		catalogHTML: any
		line: any
		materialRing: any
		ringOut: any
		ringIn:any
		ringInClone:any
		ringOutClone:any
		timeAnimation:any
		thmeAnimationBack: any
		materialRingWhtie:any
		meshTextOne: any
		atlas:any
		  meshTextSec: any
		  meshTextTr: any
		  meshTextFr: any
		  meshTextFv: any
		  meshTextSx: any
		  deltaY: any
		  meshTextSv: any
		  meshTextEi: any
		  meshTextTitleTw:any
		  meshTextTitleOne:any
		  meshTextTitleTr:any
		  meshTextTitleFr:any
		  load:any
		  isTouching:any
		  startY: any

		constructor(options: any) {
			
			this.scene = new THREE.Scene()
			this.sceneMain = new THREE.Scene()

			this.speed = 0
			this.position = 0
			this.rounded = 0

			this.textGroup = new THREE.Group()
			this.catalogHTML = document.getElementById('catalog')


			this.textRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height);

			// что если можно отдельно в другую сцену фигачить кольцо а в другую текст а потом их соеденить
			
			this.container = options.dom
			
			this.width = this.container.offsetWidth
			this.height = this.container.offsetHeight
			this.aspect = this.width / this.height
			
			// // for renderer { antialias: true }
			this.renderer = new THREE.WebGLRenderer({ antialias: true })
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
			this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height )
			this.renderTarget.scissor.set(0, 0, this.width, this.height / 2)
			this.renderTarget.scissorTest = true;




			this.renderer.setSize(this.width ,this.height )
			this.renderer.setClearColor(0xeeeeee, 1)
			this.renderer.useLegacyLights = true
			this.renderer.outputEncoding = THREE.sRGBEncoding
	

			
			this.renderer.setSize( window.innerWidth, window.innerHeight )

			this.container.appendChild(this.renderer.domElement)
			

			this.load = true
			this.camera = new THREE.PerspectiveCamera( 70,
				this.width / this.height,
				0.01,
				10
			)
	
			this.camera.position.set(0, 0, 2) 
			// this.controls = new OrbitControls(this.camera, this.renderer.domElement)
			this.time = 0
			this.timeAnimation = 0
			this.thmeAnimationBack = false

			this.dracoLoader = new DRACOLoader()
			this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
			this.gltf = new GLTFLoader()
			this.gltf.setDRACOLoader(this.dracoLoader)

			this.isPlaying = true

			this.gltf.load(model, (gltf:any) => {
				this.model = gltf.scene
				this.model.scale.set(6,4,6)
				this.model.rotateX(1.4)
				this.model.rotateY(.3)

				this.model.rotateZ(2.9)
				this.model.position.set(1.2,-.05,.5)

				this.modelPhone = this.model.clone()
				this.modelPhone.scale.set(7,4.2,7)
				if(this.width <= 550) {

					this.model.scale.set(4,2,4)
				 
					// this.model.position.set(1000,-0.05,.5)

					this.modelPhone.scale.set(5,2.2,5)

				}
				this.modelPhone.rotateZ(3.2)
				this.modelPhone.position.set(1.,-.08,.5)


				this.scene.add(this.modelPhone)
				this.scene.add(this.model)
			})
			this.scrollEvent()
			this.addObjects()		 
			// this.addMirrow()
			// this.resize()
			this.addMirrow()
			this.render()
			this.setupResize()
			this.createText()
 
			this.addLights()
			this.mobileEvent()
			this.touchEvent()		
		}
		touchEvent() {
			window.addEventListener('touchstart', (event) => {
				this.isTouching = true; // Устанавливаем флаг, что происходит касание
				this.startY = event.touches[0].clientY
			});
			 
			 // Обработчик события touchend (окончание касания)
			 window.addEventListener('touchend', (event) => {
				this.isTouching = false; // Сбрасываем флаг, что происходит касание
			 });
		}
		mobileEvent() {
			window.addEventListener('touchmove', (event) => {
				event.preventDefault(); // Отменяем стандартное поведение браузера при касании и перемещении пальца
				const currentY = event.touches[0].clientY

				if (this.isTouching) {
				  // Получаем координаты касания пальца на экране
				  const touchX = event.touches[0].clientX;
				  const touchY = event.touches[0].clientY;
					console.log(event)
				//   if(e.deltaY / 100 < 0 && this.position <= 0 || e.deltaY / 100 > 0 && this.position >= 4. ) return 

					 

				  if (currentY < this.startY ) { 
					// console.log( , this.position >= 4)
					// if() return 
					if(  this.position >= 4. ) return 

						this.speed += touchY * 0.00001
						 
				  } else  {
					if( this.position < 0 ) return 


						this.speed -= touchY * 0.00001
						// if(this.position <= 0 || this.position >= 4.) return 
				  }

				  this.startY = currentY
			 
				  // Выполняем необходимые действия при перемещении пальца, например, изменяем положение сцены
				  // В этом месте вы можете добавить код, который будет прокручивать сцену на телефоне
				  // Например, изменять положение камеры или объектов сцены в зависимости от движения пальца
				}
			 });
		}

		scrollEvent() {
			window.addEventListener('wheel', (e:any) => {
				if(this.load) return  
				// console.log( e.deltaY / 100 > 0 && this.position >= 4.)
				this.deltaY =  e.deltaY / 100
				if(e.deltaY / 100 < 0 && this.position <= 0 || e.deltaY / 100 > 0 && this.position >= 4. ) return 
				this.speed += e.deltaY * 0.0003
 
			})
		}




	settings() {
			let that = this
		 
			this.settings = {
					//@ts-ignore
				progress: 0
			}
			//@ts-ignore
			this.gui = new GUI()
			this.gui.add(this.settings, 'progress', 0, 1, 0.01)
	}
	setupResize() {
		window.addEventListener('resize', this.resize.bind(this))
	}

	resize() {
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight
		this.renderer.setSize(this.width, this.height)
		
		this.camera.aspect = this.height / this.width



		this.imageAspect = 853/1280
		let a1, a2
		if(this.height / this.width > this.imageAspect) {
			a1 = (this.width / this.height) * this.imageAspect
			console.log(a1)
			a2 = 1
		} else {
			a1 = 1
			a2 = (this.height / this.width) / this.imageAspect
			console.log(a2)
			
		} 


		this.material.uniforms.resolution.value.x = this.width
		this.material.uniforms.resolution.value.y = this.height
		this.material.uniforms.resolution.value.z = a1
		this.material.uniforms.resolution.value.w = a2

		this.camera.updateProjectionMatrix()



	}

	createTextGeometry(text: string, lineHeight: number, centerText?: boolean) {
		const geometry = new MSDFTextGeometry({
			text: text.toUpperCase(),
			font: fnt,
			lineHeight
		})
		geometry.computeBoundingBox()

		return geometry
	}
	addObjects() {
		let that = this
 
		this.material = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: {value: 0},
				uLight: {value: new THREE.Vector3(0,0,0)},
				resolution: {value: new THREE.Vector4()}
			},
			vertexShader,
			fragmentShader
		})
		// console.log(this.width, this.height)
		this.geometry = new THREE.PlaneGeometry(3 * this.aspect, 3)
		this.plane = new THREE.Mesh(this.geometry, this.material)


		const ring = new THREE.RingGeometry(1.42, 2.5, 100)
		this.materialRing = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: {value: 0},
				resolution: {value: new THREE.Vector4()}
			},
			fragmentShader: fragmentShaderRing,
			vertexShader: vertexShaderRing
		})
		this.materialRing.blending = THREE.NormalBlending;
		this.materialRing.transparent = true;
		this.materialRing.opacity = 1.0;
		this.materialRing.alphaTest = 0.

		this.ringOut = new THREE.Mesh( ring, this.materialRing )
		this.ringOut.scale.set(.55,.55,.55)

 

		this.ringOut.position.set(1.35,0,0)
	

		const ring1 = new THREE.RingGeometry(1.7, 2.4, 100)

		
		this.materialRingWhtie = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: {value: 0},
				resolution: {value: new THREE.Vector4()}
			},
			fragmentShader: `
			uniform float time;
			uniform float progress;
			uniform sampler2D texture1;
			uniform vec4 resolution;
			varying vec2 vUv;
			varying vec3 vPosition;
			uniform vec3 uLight;
			varying vec3 v_wordPosition;
			varying vec3 vNormal;



			float PI = 3.1415926;



			vec4 permute(vec4 x) {
			return mod(((x * 34.0) + 1.0) * x, 289.0);
			}

			vec2 fade(vec2 t) {
			return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
			}

			float cnoise(vec2 P){
			vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
			vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
			Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
			vec4 ix = Pi.xzxz;
			vec4 iy = Pi.yyww;
			vec4 fx = Pf.xzxz;
			vec4 fy = Pf.yyww;
			vec4 i = permute(permute(ix) + iy);
			vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
			vec4 gy = abs(gx) - 0.5;
			vec4 tx = floor(gx + 0.5);
			gx = gx - tx;
			vec2 g00 = vec2(gx.x,gy.x);
			vec2 g10 = vec2(gx.y,gy.y);
			vec2 g01 = vec2(gx.z,gy.z);
			vec2 g11 = vec2(gx.w,gy.w);
			vec4 norm = 1.79284291400159 - 0.85373472095314 * 
				vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
			g00 *= norm.x;
			g01 *= norm.y;
			g10 *= norm.z;
			g11 *= norm.w;
			float n00 = dot(g00, vec2(fx.x, fy.x));
			float n10 = dot(g10, vec2(fx.y, fy.y));
			float n01 = dot(g01, vec2(fx.z, fy.z));
			float n11 = dot(g11, vec2(fx.w, fy.w));
			vec2 fade_xy = fade(Pf.xy);
			vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
			float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
			return 2.3 * n_xy;
			}


			float getScatter(vec3 cameraPos, vec3 dir, vec3 lightPos, float d) {
				vec3 q = cameraPos - lightPos;


				float b = dot(dir, q);
				float c = dot(q, q);

				float t = c - b * b;
				float s = 1.0 / sqrt(max(0.001, t));
				float l = s * (atan((d + b) * s) - atan(b * s));
				return pow(max(0.0, l / 150.0), 0.4);

			}


			void main() {
			
				vec2 uv = gl_FragCoord.xy / resolution.xy;
				float myNoise = cnoise(vUv + 7. + time / 10.);

				vec3 purleColor = vec3(0.0, 0.21, .4);
				vec3 lightPurpleColor = vec3(0.0, 0.21, .4);
				
				vec3 mixPurple = mix( purleColor,lightPurpleColor, vUv.x);

				vec3 backgroundColor = vec3(.7, .8, .9);
				vec3 gradientColor = mix( backgroundColor,mixPurple, myNoise );

				gl_FragColor = vec4(gradientColor, 1.);








				vec3 cameraToWorld = v_wordPosition - cameraPosition;
				vec3 cameraToWorldDir = normalize(cameraToWorld);

				float cameraToWorldDistance = length(cameraToWorld);



				vec3 lightToWorld = normalize(uLight - v_wordPosition);


				float diffusion = max(1.,dot(vNormal, lightToWorld));
				float dist = length(uLight - vPosition);

				float scatter = getScatter(cameraPosition, cameraToWorldDir,uLight, cameraToWorldDistance);


				float final = diffusion * scatter;
 
				gl_FragColor = vec4( gradientColor, 1.);

			}
			`,
			vertexShader: `
				uniform float time;
				varying vec2 vUv;
				varying vec3 vPosition;
				uniform vec2 pixels;
				uniform vec3 uMin;
				varying vec3 vNormal;
				varying vec3 v_wordPosition;
				float PI = 3.1415926;
				void main () {
					vUv = uv;
					vPosition = position;
					vNormal = normal;
					v_wordPosition = (modelMatrix * vec4(position, 1.0)).xyz;

					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`
		})
		
		this.ringIn = new THREE.Mesh( ring1, this.materialRingWhtie )
		this.ringIn.scale.set(.323,.323,.323)

		if(this.width <= 550) {
			this.ringOut.scale.set(.4,.4,.4)
			this.ringIn.scale.set(.235,.235,.235)

		}


		this.ringIn.position.set(1.35,0,0)


		this.scene.add(this.ringIn)
		this.ringInClone = this.ringIn.clone()
		this.sceneMain.add(this.ringInClone)

		this.scene.add( this.ringOut )
		this.ringOutClone = this.ringOut.clone() 
		this.sceneMain.add(this.ringOutClone)
 
		this.scene.add(this.plane)
		this.sceneMain.add(this.plane.clone())
		this.createLine()
	}
	createLine() {
		// Создание точек начала и конца отрезка
		const startPoint = new THREE.Vector3(-2 * this.aspect, 0, 0.1);
		const endPoint = new THREE.Vector3(2 * this.aspect, 0, 0.1);

		// Создание геометрии отрезка
		const geometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

		// Создание материала для отрезка
 
		const materialGlow = new THREE.ShaderMaterial({
			vertexShader: `

				varying vec3 vPosition;
				void main() {
					vPosition = position;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				varying vec3 vPosition;
				void main() {
					float intensity = 1.0 / length(vPosition) * 100000.0;
					gl_FragColor = vec4(0.0, 0.0, 1.0, intensity);
				}
				
			`,
			transparent: true
		})
		const material = new THREE.LineBasicMaterial({
			color: 0x475E7F,
			linewidth: .1
		 });
	 
		 const glowGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
		
		const glowLine = new THREE.Line(glowGeometry, materialGlow);
		// Создание объекта Line
		this.line = new THREE.Line(geometry, material);




		// Добавление отрезка на сцену
		this.scene.add(this.line);
		// this.scene.add(glowLine)


	}

	createText() {
		 
	  Promise.all([
		loadFontAtlas(atlasURL),
	 
  ]).then(([atlas, font]:any) => {
		this.atlas = atlas
		 
		// высота от 700 до 0 вся вроде выглядиь норм на мобилку

		this.meshTextTitleOne = createText('Electronics', 0.0038, 37, -2, .12)
		if(this.width <= 1250) {
			this.meshTextTitleOne = createText('Electronics', 0.0038, 37, -1.8, .12)

		}
		if(this.width <= 900) {
			this.meshTextTitleOne = createText('Electronics', 0.0038, 37, -1.4, .12)

		}
		if(this.width <= 720) {
			this.meshTextTitleOne = createText('Electronics', 0.0038, 37,  - this.height / 1000, .12)
		}
		if(this.width <= 550) {
			this.meshTextTitleOne = createText('Electronics', 0.0032, 37,  -.6, .85)
		}


		this.eraseOrAddText(4, 1.8, this.meshTextTitleOne)
		this.meshTextTitleTw = createText('Workshop', 0.0038, 37, -1.4, -.21)

		if(this.width <= 1250) {
			this.meshTextTitleTw = createText('Workshop', 0.0038, 37, -1.2, -.21)
		}
		if(this.width <= 900) {
			this.meshTextTitleTw = createText('Workshop', 0.0038, 37, -.8, -.21)


		}

		if(this.width <= 720) {
			this.meshTextTitleTw = createText('Workshop', 0.0038, 37, -.4, -.21)
		}
		if(this.width <= 550) {
			this.meshTextTitleTw = createText('Workshop', 0.0032, 37, -.16, .66)

		}

		this.eraseOrAddText(4, 1.8, this.meshTextTitleTw)

		this.meshTextTitleTr = createText(`Welcome to ALMA. We are a leading provider of computers and computer services with over
		five years experience in the market. Our company offers a wide range of high quality products
		and services related to computer technology.`, 0.0009, 75, -1.4, -.86)

		if(this.width <= 1250) {
			this.meshTextTitleTr = createText(`Welcome to ALMA. We are a leading provider of computers
			 and computer services with over five years experience in the market. 
			 Our company offers a wide range of high quality products
			and services related to computer technology.`, 0.0009, 75, -1.2, -.86)
		
		}
		if(this.width <= 900) {
			this.meshTextTitleTr = createText(`Welcome to ALMA. We are a leading provider of computers
			 and computer services with over five years experience in the market. 
			 Our company offers a wide range of high quality products
			and services related to computer technology.`, 0.0009, 75, -.8, -.86)
		
		}

		if(this.width <= 720) {
			this.meshTextTitleTr = createText(`Welcome to ALMA. We are a leading provider of computers
			 and computer services with over five years experience in the market. 
			 Our company offers a wide range of high quality products
			and services related to computer technology.`, 0.0009, 75, -.3, -1.2)
		
		}
		if(this.width <= 550) {
			this.meshTextTitleTr = createText(`Welcome to ALMA. We are a leading provider of
			computers and computer services with over five
			 years experience in the market. 
			`, 0.0009, 75, -.45, -1.3)
		
		}


		this.eraseOrAddText(4, 1.8, this.meshTextTitleTr)

		this.meshTextTitleFr = createText('Welcome', 0.0008, 37, -1.99, -.8)

		if(this.width <= 1250) { 
			this.meshTextTitleFr = createText('Welcome', 0.0008, 37, -1.77, -.76)

		}
		if(this.width <= 900) { 
			this.meshTextTitleFr = createText('Welcome', 0.0008, 37, -1.38, -.76)

		}
		if(this.width <= 720) { 
			this.meshTextTitleFr = createText('Welcome', 0.0008, 37, -.77 , -1.1)

		}

		if(this.width <= 550) { 
			this.meshTextTitleFr = createText('Welcome', 0.0008, 37, -.062 , -.96)

		}

		//@ts-ignore
		this.eraseOrAddText(4, 1.8, this.meshTextTitleFr)

		this.meshTextOne = createText('Advantages of buying from us', 0.0017, 37, 1.3, -2)
		
		if(this.width <= 1550) {
			this.meshTextOne = createText('Advantages of buying from us', 0.0017, 37, 1., -2)

		}
		if(this.width <= 1250) {
			this.meshTextOne = createText('Advantages of buying from us', 0.0017, 37, .65, -2)

		}
		if(this.width <= 900) {
			this.meshTextOne = createText('Advantages of buying from us', 0.0017, 37, .15, -2)

		}

		if(this.width <= 720) {
			this.meshTextOne = createText('Advantages of buying from us', 0.0017, 37, -0.5, -2)

		}
		if(this.width <= 550) { 
			this.meshTextOne = createText('Advantages of buying from us', 0.0014, 37, -0.44, -2)


		}
		
		this.meshTextSec = createText(`Quality and reliability We carefully select our computers and offering only the most reliable and high-performance models`, 0.001, 37, -.325, -2.2)

		if(this.width <= 1550) {
			this.meshTextSec = createText(`Quality and reliability We carefully select our computers and offering only the most reliable and high-performance models`, 0.001, 37, -.625, -2.2)


		}
		if(this.width <= 1250) {
			this.meshTextSec = createText(`Quality and reliability We carefully select our computers and offering 
			only the most reliable and high-performance models`, 0.001, 70, 0.2, -2.2)
		}

		if(this.width <= 900) {
			this.meshTextSec = createText(`Quality and reliability We carefully select our computers and offering 
			only the most reliable and high-performance models`, 0.001, 70, -0.1, -2.2)
		}

		if(this.width <= 720) {
			this.meshTextSec = createText(`Quality and reliability We carefully select our computers and offering 
			only the most reliable and high-performance models`, 0.001, 70, -0.75, -2.2)
		}

		if(this.width <= 550) { 
			this.meshTextSec = createText(`Quality and reliability We carefully select our computers and
			 offering only the most reliable and high-performance models`, 0.0009, 70, -0.6, -2.2)
		}


	 
		this.meshTextTr = createText(`Wide selection We have a wide selection of computers of different makes and models and configurations`, 0.001, 37, .11, -2.35)

		
		if(this.width <= 1550) {
			this.meshTextTr = createText(`Wide selection We have a wide selection of computers of different makes and models and configurations`, 0.001, 37, -.19, -2.35)


		}
		if(this.width <= 1250) {
			this.meshTextTr = createText(`Wide selection We have a wide selection of computers of different makes
			 and models and configurations`, 0.001, 70, .176, -2.38)


		}
		if(this.width <= 900) {
			this.meshTextTr = createText(`Wide selection We have a wide selection of computers of different makes
			 and models and configurations`, 0.001, 70, -.118, -2.38)


		}

		if(this.width <= 720) {
			this.meshTextTr = createText(`Wide selection We have a wide selection of computers of different makes
			 and models and configurations`, 0.001, 70, -.75, -2.38)


		}

		if(this.width <= 550) {
			this.meshTextTr = createText(`Wide selection We have a wide selection of computers of 
			different makes and models and configurations`, 0.0009, 70, -.55, -2.38)


		}

		this.meshTextFr = createText(
			`Personalized service Our experienced sales team is always ready to help you choose the most 
			suitable computer for your needs and budget and preferences`, 0.001, 70, .36, -2.57)


		if(this.width <= 1550) {
			this.meshTextFr = createText(
				`Personalized service Our experienced sales team is always ready to help you choose the most 
				suitable computer for your needs and budget and preferences`, 0.001, 70, .06, -2.57)
	
		}	

		if(this.width <= 1250) {
			this.meshTextFr = createText(
				`Personalized service Our experienced sales team is always ready to help 
				you choose the most suitable computer for your needs and budget and preferences`, 0.001, 70, -.09, -2.57)
	
		}	
		if(this.width <= 900) {
			this.meshTextFr = createText(
				`Personalized service Our experienced sales team is always ready to help 
				you choose the most suitable computer for your needs
				 and budget and preferences`, 0.001, 70, -.11, -2.64)
	
		}	
		if(this.width <= 720) {
			this.meshTextFr = createText(
				`Personalized service Our experienced sales team is always ready to help 
				you choose the most suitable computer for your needs
				 and budget and preferences`, 0.001, 70, -.75, -2.64)
	
		}	
		if(this.width <= 550) {
			this.meshTextFr = createText(
				`Personalized service Our experienced sales team is always 
				ready to help you choose the most suitable computer
				for your needs and budget and preferences`, 0.0009, 70, -.58, -2.62)
		}


		this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance and repair services for all
		 makes and models of computers.`	
			, 0.001, 70, .53, -2.74)

		if(this.width <= 1550) {
			this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance and repair services for all
		 makes and models of computers.`	
			, 0.001, 70, .23, -2.74)

		}	
		if(this.width <= 1250) {
			this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance and repair 
			services for all makes and models of computers.`	
			, 0.001, 70, .23, -2.765)

		}	
		if(this.width <= 900) {
			this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance 
			and repair services for all makes and models of computers.`	
			, 0.001, 70, .176, -2.84)

		}	
		if(this.width <= 720) {
			this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance 
			and repair services for all makes and models of computers.`	
			, 0.001, 70, -.75, -2.84)
		}	
		if(this.width <= 550) {
			this.meshTextFv = createText(`Professional maintenance and repair: We offer maintenance 
			and repair services for all makes and models of computers.`	
			, 0.0009, 70, -.58, -2.81)
		}	

		this.meshTextSx = createText(`Customer support: Our customer support team is always ready to answer your questions,
		 help with installation and configuration of computers.`
			  , 0.001, 70, .44, -2.92)

		if(this.width <= 1550) {
			this.meshTextSx = createText(`Customer support: Our customer support team is always ready to answer your questions,
			help with installation and configuration of computers.`
				 , 0.001, 70, .14, -2.92)
	
		}	
		if(this.width <= 1250) {
			this.meshTextSx = createText(`Customer support: Our customer support team is always ready to answer your questions,
			help with installation and configuration of computers.`
				 , 0.001, 70, -.22, -2.96)
	
		}	

		if(this.width <= 900) {
			this.meshTextSx = createText(`Customer support: Our customer support team is
			 always ready to answer your questions, 
			 help with installation and configuration of computers.`
				 , 0.001, 70, -.01, -3.13)
	
		}	
		if(this.width <= 720) {
			this.meshTextSx = createText(`Customer support: Our customer support team is
			 always ready to answer your questions, 
			 help with installation and configuration of computers.`
				 , 0.001, 70, -.75, -3.13)
	
		}	
		if(this.width <= 550) {
			this.meshTextSx = createText(`Customer support: Our customer support team is
			 always ready to answer your questions, 
			 help with installation and configuration of computers.`
				 , 0.0009, 70, -.56, -3.06)
		
		}



		this.meshTextSv = createText('catalog', 0.002, 37, -.18, -4)


		this.meshTextEi = createText(`This section contains all our works including services`, 0.001, 37, -.58, -4.15)

		
 
 

		this.scene.add(this.textGroup)
 
		// this.eraseOrAddText(4, 1.8)

  })
  const that = this
  function createText (text: string, size: number, lineHeight:number, x: number, y: number) {
		that.materialText = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			transparent: true,
			defines: {
				IS_SMALL: false,
			},
			extensions: {
				derivatives: true,
			},
			uniforms: {
				// Common
				...uniforms.common,
				
				// Rendering
				...uniforms.rendering,
				
				// Strokes
				...uniforms.strokes,
				...{
					uStrokeColor: {value: new THREE.Color(0x00ff00)},
					uProgress1: {value: 0},
					time: {value: 0},
					
				}
			},
			vertexShader: `
				// Attribute
				attribute vec2 layoutUv;
	
				attribute float lineIndex;
	
				attribute float lineLettersTotal;
				attribute float lineLetterIndex;
	
				attribute float lineWordsTotal;
				attribute float lineWordIndex;
	
				attribute float wordIndex;
	
				attribute float letterIndex;
	
				// Varyings
				varying vec2 vUv;
				varying vec2 vLayoutUv;
				varying vec3 vViewPosition;
				varying vec3 vNormal;
	
				varying float vLineIndex;
	
				varying float vLineLettersTotal;
				varying float vLineLetterIndex;
	
				varying float vLineWordsTotal;
				varying float vLineWordIndex;
	
				varying float vWordIndex;
	
				varying float vLetterIndex;
	
				void main() {
					// Output
					vec4 mvPosition = vec4(position, 1.0);
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;
	
					// Varyings
					vUv = uv;
					vLayoutUv = layoutUv;
					vViewPosition = -mvPosition.xyz;
					vNormal = normal;
	
					vLineIndex = lineIndex;
	
					vLineLettersTotal = lineLettersTotal;
					vLineLetterIndex = lineLetterIndex;
	
					vLineWordsTotal = lineWordsTotal;
					vLineWordIndex = lineWordIndex;
	
					vWordIndex = wordIndex;
	
					vLetterIndex = letterIndex;
				}
			`,
			fragmentShader: `
				// Varyings
				varying vec2 vUv;
				varying vec2 vLayoutUv;
				// Uniforms: Common
				uniform float uProgress1;
				uniform float uProgress2;
				uniform float uProgress3;
				uniform float uProgress4;

				uniform float time;
				uniform float uOpacity;
				uniform float uThreshold;
				uniform float uAlphaTest;
				uniform vec3 uColor;
				uniform sampler2D uMap;
	
				// Uniforms: Strokes
				uniform vec3 uStrokeColor;
				uniform float uStrokeOutsetWidth;
				uniform float uStrokeInsetWidth;
	
				// Utils: Median
				float median(float r, float g, float b) {
					return max(min(r, g), min(max(r, g), b));
				}

				
				float rand(vec2 n) { 
					return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
				}


				float rand(float n){return fract(sin(n) * 43758.5453123);}

				float noise(float p){
					float fl = floor(p);
				float fc = fract(p);
					return mix(rand(fl), rand(fl + 1.0), fc);
				}
					
				float noise(vec2 n) {
					const vec2 d = vec2(0.0, 1.0);
				vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
					return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
				}
				float map(float value, float min1, float max1, float min2, float max2) {
				return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
				}

	
				void main() {
					// Common
					// Texture sample
					vec3 s = texture2D(uMap, vUv).rgb;
	
					// Signed distance
					float sigDist = median(s.r, s.g, s.b) - 0.5;
	
					float afwidth = 1.4142135623730951 / 2.0;
	
					#ifdef IS_SMALL
							float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
					#else
							float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
					#endif
	
					// Strokes
					// Outset
					float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;
	
					// Inset
					float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;
	
					#ifdef IS_SMALL
							float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
							float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
					#else
							float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
							float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
					#endif
	
					// Border
					float border = outset * inset;
	
					// Alpha Test
					if (alpha < uAlphaTest) discard;
	
					// Some animation
					//alpha *= sin(uTime);
	
					// Output: Common
	
					vec4 filledFragColor = vec4(uColor, uOpacity * alpha);
				
					//i might use border for border text => vec4 l1 = vec4(0., 0., 0., border);

					vec3 pink = vec3(.0, 0.22, .4);
				
					vec4 l1 = vec4(1., 1., 1., border );
					vec4 l2 = vec4(pink, border);
					vec4 l3 = vec4(pink, outset);
					vec4 l4 = vec4(vec3(1.), outset);


					float x = floor(vLayoutUv.x * 10. * 3.8);
					float y = floor(vLayoutUv.y * 10.);

					float pattern = noise(vec2(x,y));

					float w = 1.;
					

					float p1 = uProgress1;
					p1 = map(p1, 0., 1., -w, 1.);
					p1 = smoothstep(p1, p1 + w, vLayoutUv.x);
				
					float mix1 =2. * p1 -pattern;

					mix1 = clamp(mix1, 0., 1.);





					float p2 = uProgress1 - 0.4 ;
					p2 = map(p2, 0., 1., -w, 1.);
					p2 = smoothstep(p2, p2 + w, vLayoutUv.x);
				
					float mix2 =2. * p2 -pattern;

					mix2 = clamp(mix2, 0., 1.);



					float p3 = uProgress1 - 0.6;
					p3 = map(p3, 0., 1., -w, 1.);
					p3 = smoothstep(p3, p3 + w, vLayoutUv.x);
				
					float mix3 =2. * p3 -pattern;

					mix3 = clamp(mix3, 0., 1.);




					float p4 = uProgress1 - .8;
					p4 = map(p4, 0., 1., -w, 1.);
					p4 = smoothstep(p4, p4 + w, vLayoutUv.x);
				
					float mix4 =2. * p4 -pattern;

					mix4 = clamp(mix4, 0., 1.);



					vec4 layer0 = mix(vec4(0.), l1, 1. - mix1);
					vec4 layer1 = mix(layer0, l2, 1. - mix2);
					vec4 layer2 = mix(layer1, l3, 1. - mix3);
					vec4 layer3 = mix(layer2, l4, 1. - mix4);

			

					//   gl_FragColor = filledFragColor;
					//   gl_FragColor = vec4(uProgress1 * 1.0, 0., 0., 1.0);
					//   gl_FragColor = l1;
					//   gl_FragColor = vec4(vec3(pattern), 1.);
					//   /gl_FragColor = vec4(vec3(p0_), 1.);
					gl_FragColor = layer3;

					// gl_FragColor = vec4(vLayoutUv, 0., 1.);
			

				}
			`,
	});

		that.materialText.uniforms.uMap.value = that.atlas;
		const geometry = that.createTextGeometry(text, lineHeight)	
		that.mesh = new THREE.Mesh(geometry, that.materialText);
		that.mesh.scale.set(size,-size,size)
		that.mesh.position.x = x
		that.mesh.position.y = y

		that.textGroup.add(that.mesh)
		return that.mesh
	}



		function loadFontAtlas(path:any) {
				const promise = new Promise((resolve, reject) => {
					const loader = new THREE.TextureLoader();
					loader.load(path, resolve);
				});
		
				return promise;
		}

	}
	addMirrow() {
		let geo = new THREE.PlaneGeometry(3 * this.aspect, 3 , )
		this.materialMirr = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: {value: 0},
				tDiffuse: {value: this.renderTarget.texture},
				uMouse: { value: new THREE.Vector2(.8, 0.2) },
				uAmplitudeCtrl: { value: 1 },
				resolution: {value: new THREE.Vector4()},
				uTexture: {value: new THREE.TextureLoader().load(modelTexture)},
				uGrain: {value: new THREE.TextureLoader().load(grain)}
			},
			vertexShader: vertexShaderMirr,
			fragmentShader: fragmentShaderMirr,
			opacity: 0.8,
			transparent: true,
		 
		})
		// if(this.width <=550) this.materialMirr.uniforms.uMouse.value = new THREE.Vector2(.4, .1)
		// this.smallSphere = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({
		// 	roughness: 0.2,  
		// 	transmission: 1., // Add transparency
		// 	thickness: .05,
		// 	// refractionRatio: 20000,
		// 	// envMap: hdrEquirect
		// 	// envMap: hdrEquirect
		// }))
		this.smallSphere = new THREE.Mesh(geo, this.materialMirr)
		this.smallSphere.position.set(-0, 0,0)
		// this.smallSphere.position.set(0,0,1)
		this.scene.add(this.smallSphere)
	}


	eraseOrAddText(duration: number, value: number, target:any) {
		gsap.to(target.material.uniforms.uProgress1, {
			duration,
			value,
		}).then(() => {
			this.load = false
		})
	}


	addLights() {

		const light1 = new THREE.DirectionalLight(0x3F6C90, 1.)
			light1.position.set(0.4,.15,0.14)

		if(this.width <= 1250) {
			light1.position.set(0.3,.15,0.14)

		}
		if(this.width <= 900) {
			light1.position.set(0.27,.15,0.14)

		}
		if(this.width <= 550) {
			light1.position.set(0.12,.11,0.14)

		}


		const light2 = new THREE.DirectionalLight(0x3F6C90, 1)
			light2.position.set(-.8,-.24,-.59)
		if(this.width <= 1250) {
			light2.position.set(-.65,-.24,-.59)
		}
		if(this.width <= 900) {
			light2.position.set(-.5,-.24,-.59)
		}
		if(this.width <= 550) {
			light2.position.set(-.4,-.24,-.59)
		}

		const light3 = new THREE.DirectionalLight(0x3F6C90, 1)
			light3.position.set(-.8,-.28,-.32)
		if(this.width <= 1250) {
			light3.position.set(-.65,-.28,-.32)

		}
		if(this.width <= 900) {
			light3.position.set(-.5,-.28,-.32)

		}
		if(this.width <= 550) {
			light3.position.set(.2,-.7,-.3)
		}


		const light4 = new THREE.DirectionalLight(0x3F6C90, 1.)
			light4.position.set(0.1,-1., .4)
		if(this.width <= 1250) {
			light4.position.set(-0.15,-1., .4)
		}



		const light5 = new THREE.DirectionalLight(0x3F6C90, 1.)
			light5.position.set(-.2,.4, 0)
		if(this.width <= 1250) {
			light5.position.set(-.45,.4, 0)

		}
		const light6 = new THREE.DirectionalLight(0x3F6C90, 1.)
			light6.position.set(0,0.4, .2)
			if(this.width <= 1250) {
				light6.position.set(-.25,0.4, .2)

	
			}
		const light7 = new THREE.DirectionalLight(0x3F6C90, 1.)
			light7.position.set(-0.2,-0.8, .3)

			if(this.width <= 1250) {
				light7.position.set(-0.45,-0.8, .3)


	
			}


		this.scene.add(light1)
		this.scene.add(light2)
		this.scene.add(light3)
		this.scene.add(light4)
		this.scene.add(light5)
		this.scene.add(light6)
		this.scene.add(light7)



	}

	stop() {
		this.isPlaying = false
	}

	play() {
		if(!this.isPlaying) {
			this.isPlaying = true
			this.render()
		}
	}

	render() {
			if(!this.isPlaying) return
			// this.smallSphere.visible = false
			// this.cubeCamera.update(this.renderer, this.scene)
			// this.smallSphere.visible = true

			this.time += 0.05
			this.position += this.speed
			this.speed *= 0.8
			this.rounded = Math.round(this.position)
			// console.log(this.catalogHTML)
			this.catalogHTML.style.bottom = `${this.position * 1000 - 3800 }px`

			if(this.height < 930) 
				this.catalogHTML.style.bottom = `${this.position * 1000 - 3900 }px`

			if(this.height < 720) 
				this.catalogHTML.style.bottom = `${this.position * 1000 - 3940 }px`


			this.textGroup.position.y = this.position * 1.2

			this.diff = (this.rounded - this.position)
	
			this.material.uniforms.time.value = this.time
			this.materialRingWhtie.uniforms.time.value = this.time
			this.materialMirr.uniforms.time.value = this.time / 10


			if(this.meshTextOne) {
				if(this.position >= 0.1) {
					this.meshTextTitleOne.material.uniforms.uProgress1.value = -this.position * 2 + 1.9
					this.meshTextTitleTw.material.uniforms.uProgress1.value = -this.position * 1.5 + 1.9
					
					this.meshTextTitleTr.material.uniforms.uProgress1.value = -this.position * 1.2 + 1.9
					
					this.meshTextTitleFr.material.uniforms.uProgress1.value = -this.position * 1.2 + 1.9
					
				}
			 

				if(this.position >= 2.2) {
					this.meshTextOne.material.uniforms.uProgress1.value = -this.position * 2  + 6.
					this.meshTextSec.material.uniforms.uProgress1.value = -this.position * 2  + 6.
					this.meshTextTr.material.uniforms.uProgress1.value = -this.position * 2  + 6
					this.meshTextFr.material.uniforms.uProgress1.value = -this.position * 2 + 6.
					this.meshTextFv.material.uniforms.uProgress1.value = -this.position * 2 + 6.
					this.meshTextSx.material.uniforms.uProgress1.value = -this.position * 2 + 6.
				} else {
					this.meshTextOne.material.uniforms.uProgress1.value = this.position
					this.meshTextSec.material.uniforms.uProgress1.value = this.position - .2
					this.meshTextTr.material.uniforms.uProgress1.value = this.position - .3
					this.meshTextFr.material.uniforms.uProgress1.value = this.position - .4
					this.meshTextFv.material.uniforms.uProgress1.value = this.position - .5
					this.meshTextSx.material.uniforms.uProgress1.value = this.position - .6
				}
				if(this.position >= 4.5) {
					this.meshTextEi.material.uniforms.uProgress1.value = -this.position * 2  + 6.
					this.meshTextSv.material.uniforms.uProgress1.value = -this.position * 2  + 6.
				} else {
					this.meshTextEi.material.uniforms.uProgress1.value = this.position - 2
					this.meshTextSv.material.uniforms.uProgress1.value = this.position - 2
			 
				}
 
				
			} 

			
			if (!this.thmeAnimationBack) this.timeAnimation += 0.001

			this.materialRing.uniforms.time.value = this.timeAnimation
			if(this.timeAnimation >= .025 && !this.thmeAnimationBack) {
				this.thmeAnimationBack = true
				
				
			} 
			if(this.thmeAnimationBack) {
				this.timeAnimation -= 0.0002
				if(this.timeAnimation <= 0) this.thmeAnimationBack = false
			}
			// this.materialMirr.uniforms.tCube.value = this.cubeRenderTarget.texture



			//main scene render 
			this.renderer.setRenderTarget(this.renderTarget)
			this.renderer.setScissor(0, 0, this.width, this.height / 2   );
			this.renderer.render(this.sceneMain, this.camera)

			this.renderer.setRenderTarget(null)
	
		
			if(this.modelPhone && this.model) {
				this.modelPhone.position.y = -.1 + Math.sin(Date.now() * 0.0005 ) * 0.07
 
				this.modelPhone.rotation.x = 1.4 + Math.sin(Date.now() * 0.0005 ) * 0.1 + this.position 
				//static float and move 
				this.modelPhone.rotation.y = .3 + Math.sin(Date.now() * 0.0005 ) * 0.05 + this.position * .9 

				this.model.position.y = -.1 + Math.sin(Date.now() * 0.0005 ) * 0.05 - (this.position / 10)
				this.model.rotation.x = 1.4 + Math.sin(Date.now() * 0.0005 ) * 0.12 + (this.position   ) 
				this.model.rotation.y = .3 + Math.sin(Date.now() * 0.0005 ) * 0.07 + (this.position / 2 )

			

				if(this.position >= 2) {
					this.modelPhone.position.x = -3. + this.position 
					this.modelPhone.position.y = -1.05 + this.position * .5
					
					if(this.width <= 1250) {
						this.modelPhone.position.x = -2.6 + this.position 
						this.modelPhone.position.y = -1.1 + this.position * .5
					}
					if(this.width <= 550) {
						this.modelPhone.position.x = -2.7 + this.position 
						this.modelPhone.position.y = -1.105 + this.position * .5
					}

				
				} else {
					//move left
					this.modelPhone.position.x = 1. - this.position 
					this.model.position.x = .7 - (this.position - 0.5)

					if(this.width <= 1250) {
						this.modelPhone.position.x = 1. - this.position / 1.5 - .27
						this.model.position.x = .7 - (this.position / 1.5 - 0.5 + .27)
					}
					if(this.width <= 900) {
						this.modelPhone.position.x = 1. - this.position / 1.5  - .37
						this.model.position.x = .7 - (this.position / 1.5 - 0.5 + .37)
					}

					this.materialMirr.uniforms.uMouse.value = new THREE.Vector2(-this.position / 5 + 0.8, 0.2 )

					if(this.width <= 550) {
						this.modelPhone.position.x = .35 - this.position / 2.5  - .37
						this.model.position.x = -0.01 - (this.position / 2.5 - 0.5 + .37)
						this.materialMirr.uniforms.uMouse.value = new THREE.Vector2(this.position / 5 + 0.55, 0.3 )

					}

					//uMouse: { value: new THREE.Vector2(.8, 0.2) },
					if(this.width > 1250) {
						this.ringIn.position.x = 0.85 - (this.position - 0.5)
						this.ringInClone.position.x = 0.85 - (this.position - 0.5)
						this.ringOut.position.x = 0.85 - (this.position - 0.5)
						this.ringOutClone.position.x = 0.85 - (this.position - 0.5)
					}
 
				 
				  
					// if(this.width <= 1250) {



					// 	/// #!@#@#!@#@!#
					// 	this.ringIn.position.x = .85 + (this.position / 2 - 0.5)
					// 	this.ringInClone.position.x = .85 + (this.position / 2 - 0.5)
					// 	this.ringOut.position.x = .85 + (this.position / 2 - 0.5)
					// 	this.ringOutClone.position.x = .85 + (this.position / 2 - 0.5)
					// }

					this.ringIn.position.y =  (-this.position / 4 )
					this.ringInClone.position.y = (-this.position / 4 )
					this.ringOut.position.y =  (-this.position /4)
					this.ringOutClone.position.y = (-this.position /4)

					// this.ringIn.position.y =  (-this.position / 4 )
				 
					 
					
					// this.ringIn.rotation.x = (- this.position / 2 + 0.)

				 

			
					// this.ringOutClone.position.x = 0.85 - (this.position - 0.5)



					// this.ringIn.rotation.x =  (this.position / 10 )
					// this.ringInClone.position.x = 0.85 - (this.position - 0.5)
					// this.ringOut.position.x = 0.85 - (this.position - 0.5)
					// this.ringOutClone.position.x = 0.85 - (this.position - 0.5)


				}
				if(this.position >= 1.) {
					this.smallSphere.position.y = this.position / 2 -1
					this.line.position.y = this.position / 2.05 -.98
			 
					// this.smallSphere.scale.set(this.position,this.position,this.position)

				} else {
					this.smallSphere.position.y = -this.position / 2
					this.line.position.y = -this.position / 2.1

					if(this.width > 550) {
						this.ringIn.scale.set( - this.position / 1.7 + 0.32, - this.position / 1.7 + 0.32, -this.position / 1.7 + 0.32 )
						this.ringInClone.scale.set( - this.position / 1.7 + 0.32, - this.position / 1.7 + 0.32, -this.position / 1.7 + 0.32 )
						this.ringOut.scale.set( - this.position / 9.6 + .55 , - this.position / 9.6 + .55, -this.position / 9.6 + .55 )
						this.ringOutClone.scale.set( - this.position / 9.6 + .55 , - this.position / 9.6 + .55, -this.position / 9.6 + .55 )
						
					} //else {
					// 	this.ringIn.scale.set( - this.position / 2 + 0.32, - this.position / 1.7 + 0.32, -this.position / 1.7 + 0.32 )
					// 	this.ringInClone.scale.set( - this.position / 2 + 0.32, - this.position / 1.7 + 0.32, -this.position / 1.7 + 0.32 )
					// 	this.ringOut.scale.set( - this.position / 9.6 + .55 , - this.position / 9.6 + .55, -this.position / 9.6 + .55 )
					// 	this.ringOutClone.scale.set( - this.position / 9.6 + .55 , - this.position / 9.6 + .55, -this.position / 9.6 + .55 )
					// }
					
				}
	 
				if(this.position >= 1.98) {
					// this.line.position.y = -.001

				

				} else {
					this.ringIn.position.x = 0.85 - (this.position - 0.5)
					this.ringInClone.position.x = 0.85 - (this.position - 0.5)
					this.ringOut.position.x = 0.85 - (this.position - 0.5)
					this.ringOutClone.position.x = 0.85 - (this.position - 0.5)
					if(this.width < 1250) {
						this.ringIn.position.x = 0.5 - (this.position / 1.3 - 0.5)
						this.ringInClone.position.x = 0.5 - (this.position / 1.3 - 0.5)
						this.ringOut.position.x = 0.5 - (this.position / 1.3 - 0.5)
						this.ringOutClone.position.x = 0.5 - (this.position / 1.3 - 0.5)
					} 
					if(this.width < 900) {
						this.ringIn.position.x = 0.35 - (this.position / 1.3  - 0.5)
						this.ringInClone.position.x = 0.35 - (this.position / 1.3  - 0.5)
						this.ringOut.position.x = 0.35 - (this.position / 1.3  - 0.5)
						this.ringOutClone.position.x = 0.35 - (this.position / 1.3  - 0.5)
					} 
					if(this.width <= 550) {
						this.ringIn.position.x = 0.515 + (this.position / 1.3  - 0.5)
						this.ringInClone.position.x = .515 + (this.position / 1.3  - 0.5)
						this.ringOut.position.x = .515 + (this.position / 1.3  - 0.5)
						this.ringOutClone.position.x = .515 + (this.position / 1.3  - 0.5)
					}
				}
				if(this.position >= 2.4) {
					this.smallSphere.position.y = -this.position / 1.6 + 1.6 
					this.line.position.y = -this.position / 1.6 + 1.62
					
					this.ringIn.position.x = (this.position - 2.935)
					this.ringInClone.position.x = (this.position - 2.935)
					this.ringOut.position.x = (this.position - 2.935)
					this.ringOutClone.position.x = (this.position - 2.935)
					
					if(this.width <= 550) {
						this.ringIn.position.x = 3.9 + (-this.position / 1.3  - 0.5)
						this.ringInClone.position.x = 3.9 + (-this.position / 1.3  - 0.5)
						this.ringOut.position.x = 3.9 + (-this.position / 1.3  - 0.5)
						this.ringOutClone.position.x = 3.9 + (-this.position / 1.3  - 0.5)
					}
				}
		 


			}
			// this.materialMirr.uniforms.tDiffuse.value = this.renderTargetTexture.texture;
			this.position += Math.sign(this.diff) * Math.pow(Math.abs(this.diff), 0.9) * 0.035
			// this.modelPhone.position.y = this.position
	

			requestAnimationFrame(this.render.bind(this))
  

			this.renderer.render(this.scene, this.camera)

		}
 
	}
 
 