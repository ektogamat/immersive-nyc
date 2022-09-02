import { AmbientLight, DirectionalLight } from "three"

const Lighting = () => {
  return (
    <>
      <AmbientLight
        color={0xa0a0fc}
        intensity={4}
      />
      <DirectionalLight
        color={0x3a6dc0}
        intensity={3}
        position={[100, 44, 100]}
      />
    </>
  )
}

export default Lighting