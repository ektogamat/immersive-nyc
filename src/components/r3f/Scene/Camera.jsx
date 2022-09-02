import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import TWEEN from 'tween.js'


const Camera = () => {
  // const camera = useThree(state => state.camera)
  // useEffect(() => {
  //   new TWEEN.Tween(camera.position.set(26, 4, -35)).to({ // from camera position
  //     x: 1692, //desired x position to go
  //     y: 355, //desired y position to go
  //     z: -372 //desired z position to go
  //   }, 6500) // time take to animate
  //     .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
  //     .onComplete(function () { //on finish animation
  //       // setOrbitControlsLimits() //enable controls limits
  //       TWEEN.remove(this) // remove the animation from memory
  //     })
  // }, [camera])

  return (
    <PerspectiveCamera
      makeDefault
      manual
      fov={65}
      far={6000}
      near={5}
      position={[1692, 355, -372]}
    />

  )
}

export default Camera