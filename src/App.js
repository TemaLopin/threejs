import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, Lightformer, useGLTF } from '@react-three/drei'
import CameraModel from './Camera'
import { easing } from 'maath'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [4, 2.5, 8], fov: 35 }}>
      <CameraRig>
        <group position={[2, -1, 0]}>
          <Center top>
            <CameraModel />
          </Center>
          <directionalLight position={[-50, 1, 80]} intensity={2} />
          <directionalLight position={[25, 1, 30]} intensity={2} />
          <ambientLight intensity={0.5} />
          <AccumulativeShadows temporal frames={100} color="black" colorBlend={1} toneMapped={true} alphaTest={0.45} opacity={2} scale={12}>
            <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
          </AccumulativeShadows>
        </group>
      </CameraRig>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Environment>
        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      </Environment>
    </Canvas>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  useFrame((state, delta) => {
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 3, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}
