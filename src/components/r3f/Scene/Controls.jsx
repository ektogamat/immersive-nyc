import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import TWEEN from 'tween.js'

const Controls = () => {
    // const controls = useThree(state => state.controls)
    // useEffect(() => {
    //     controls.enabled = false //disable orbit controls to animate the camera
    //     new TWEEN.Tween(controls.target).to({ // from camera position
    //         x: 411, //desired x position to go
    //         y: 2.2, //desired y position to go
    //         z: -2785 //desired z position to go
    //     }, 6500) // time take to animate
    //         .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    //         .onComplete(function () { //on finish animation
    //             controls.enabled = true //enable orbit controls
    //             TWEEN.remove(this) // remove the animation from memory

    //         })
    // }, [controls])
    return (
        <OrbitControls
            enableDamping={true}
            dampingFactor={0.04}
            enableRotate
            enableZoom
            zoomSpeed={0.02}
            maxPolarAngle={Math.PI / 2.2}
            screenSpacePanning={false}
        // minDistance={35}
        // maxDistance={10000}
        />
    )
}

export default Controls