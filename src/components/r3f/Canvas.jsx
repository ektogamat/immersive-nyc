import { Canvas } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";

import City from "./Objects/City"
import Camera from "./Scene/Camera";
import Controls from "./Scene/Controls";

function CanvasWrapper() {
    return (
        <Canvas
            mode="concurrent"
            style={{
                position: "absolute",
                top: 0
            }}
            gl={{
                // antialias: false,
            }}
        >
            <City />
            <>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" color="#000000" near={100} far={3700} />
            <ambientLight
                color={0xa0a0fc}
                intensity={4}
            />
            <directionalLight
                color={0x3a6dc0}
                intensity={3}
                position={[100, 44, 100]}
            />
            </>
            <Camera />
            <Controls />
            <Stats />
            <Preload all />
        </Canvas >
    );
}

export default CanvasWrapper;
