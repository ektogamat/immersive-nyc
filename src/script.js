/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { defaultSSROptions, SSREffect } from "screen-space-reflections"
import * as POSTPROCESSING from "postprocessing"
import { SSRDebugGUI } from "./SSRDebugGUI"

/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement('div')
document.body.appendChild(container)

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')
scene.fog = new THREE.Fog('#000000', 100, 3700)

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true,
	// premultipliedAlpha: false,
	// depth: false,
	// stencil: false,
	// antialias: false,
	// preserveDrawingBuffer: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)) //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 5, 6000)
camera.position.set(34,16,-20)
scene.add(camera)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(1)
})

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 4)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0x3a6dc0, 3)
sunLight.position.set(-100,44,100)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
loader.load('models/gltf/starter-scene.glb', function (gltf) {

    scene.add(gltf.scene)
})

/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position.set(26,4,-35 )).to({ // from camera position
        x: 1692, //desired x position to go
        y: 355, //desired y position to go
        z: -372 //desired z position to go
    }, 6500) // time take to animate
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })

    new TWEEN.Tween(controls.target).to({ // from camera position
        x: 411, //desired x position to go
        y: 2.2, //desired y position to go
        z: -2785 //desired z position to go
    }, 6500) // time take to animate
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        TWEEN.remove(this) // remove the animation from memory
    })
}

introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits(){
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    // controls.minDistance = 35
    // controls.maxDistance = 10000
    controls.enableRotate = true
    controls.enableZoom = true
    controls.zoomSpeed = 0.02
    controls.maxPolarAngle = Math.PI/2.2
    controls.screenSpacePanning = false
}

/////////////////////////////////////////////////////////////////////////
//// POST PROCESSING

const params2 = {
	...defaultSSROptions,
	...{
		enabled: true,
		resolutionScale: 0.7,
		velocityResolutionScale: 0.1,
		CLAMP_RADIUS: 1,
		temporalResolve: true,
		temporalResolveMix: 1,
		temporalResolveCorrection: 0.10,
		blurMix: 0,
		blurSharpness: 0,
		blurKernelSize: 0,
		rayDistance: 2.0,
		intensity: 2.0,
		colorExponent: 1,
		maxRoughness: 1,
		jitter: 0,
		jitterRough: 0.04,
		jitterSpread: 0.45,
		roughnessFadeOut: 0.13,
		rayFadeOut: 3.6,
		thickness: 1.7,
		ior: 1.8,
		MAX_STEPS: 10,
		NUM_BINARY_SEARCH_STEPS: 6,
		maxDepthDifference: 55,
		ALLOW_MISSED_RAYS: false,
		USE_MRT: true,
		USE_NORMALMAP: false,
		USE_ROUGHNESSMAP: true,
	}
}
const composer = new POSTPROCESSING.EffectComposer(renderer)
const renderPass = new POSTPROCESSING.RenderPass(scene, camera)

const ssrEffect = new SSREffect(scene, camera, params2)
let gui2 = new SSRDebugGUI(ssrEffect, params2)

const ssrPass = new POSTPROCESSING.EffectPass(camera, ssrEffect)

composer.addPass(renderPass)
composer.addPass(ssrPass)

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function rendeLoop() {

    TWEEN.update()
    controls.update()
    // composer.render()
    renderer.render(scene, camera)
    requestAnimationFrame(rendeLoop)
}

rendeLoop()