import React from 'react'

// /////////////////////////////////////////////////////////////////////////
// //// POST PROCESSING

// const params2 = {
// 	...defaultSSROptions,
// 	...{
// 		enabled: true,
// 		resolutionScale: 0.7,
// 		velocityResolutionScale: 0.1,
// 		CLAMP_RADIUS: 1,
// 		temporalResolve: true,
// 		temporalResolveMix: 1,
// 		temporalResolveCorrection: 0.10,
// 		blurMix: 0,
// 		blurSharpness: 0,
// 		blurKernelSize: 0,
// 		rayDistance: 2.0,
// 		intensity: 2.0,
// 		colorExponent: 1,
// 		maxRoughness: 1,
// 		jitter: 0,
// 		jitterRough: 0.04,
// 		jitterSpread: 0.45,
// 		roughnessFadeOut: 0.13,
// 		rayFadeOut: 3.6,
// 		thickness: 1.7,
// 		ior: 1.8,
// 		MAX_STEPS: 10,
// 		NUM_BINARY_SEARCH_STEPS: 6,
// 		maxDepthDifference: 55,
// 		ALLOW_MISSED_RAYS: false,
// 		USE_MRT: true,
// 		USE_NORMALMAP: false,
// 		USE_ROUGHNESSMAP: true,
// 	}
// }
// const composer = new POSTPROCESSING.EffectComposer(renderer)
// const renderPass = new POSTPROCESSING.RenderPass(scene, camera)

// const ssrEffect = new SSREffect(scene, camera, params2)
// let gui2 = new SSRDebugGUI(ssrEffect, params2)

// const ssrPass = new POSTPROCESSING.EffectPass(camera, ssrEffect)

// composer.addPass(renderPass)
// composer.addPass(ssrPass)


const PostProcessing = () => {
  return (
    <div>PostProcessing</div>
  )
}

export default PostProcessing