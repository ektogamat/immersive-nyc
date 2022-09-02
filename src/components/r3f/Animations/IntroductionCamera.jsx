import React from 'react'
import { animated, useSpring } from '@react-spring/three'

// TODO redo animation

/*
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

*/



const IntroductionCamera = ({ from, to, onRest, children }) => {
  const { position } = useSpring({
    position: [0, 0, -to],
    from: { position: [0, 0, -from] },
    onRest
  })

  return (
    <animated.group position={(position)}>{children}</animated.group>
  )
}

export default IntroductionCamera