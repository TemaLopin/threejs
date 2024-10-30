
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function  CameraModel(props) {
  const { nodes, materials } = useGLTF('/camera.glb')
  // const { nodes, materials } = useGLTF('/lounge.glb')
  // console.log(nodes)
  // console.log(materials)
  return (
    // <></>
  //  <group {...props} dispose={null}>
  //     <group rotation={[-Math.PI / 1, 0, 0]} scale={5.349}>
  //       <mesh castShadow receiveShadow geometry={nodes['Object_2'].geometry} material={materials.k3_Model_7} />
  //     </group>
  //   </group>
  <group {...props} dispose={null}>
  <group rotation={[-Math.PI / 2, 0, 0]} scale={25.349}>
    <mesh castShadow receiveShadow geometry={nodes['#CAM0001_Body_#CAM0001_Textures_0'].geometry} material={materials.CAM0001_Textures} />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['#CAM0001_Battery_Check_#CAM0001_Textures_0'].geometry}
      material={materials.CAM0001_Textures}
      position={[0.05, 0.001, 0.072]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['#CAM0001_Film_Advance_#CAM0001_Textures_0'].geometry}
      material={materials.CAM0001_Textures}
      position={[-0.057, 0.001, 0.077]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['#CAM0001_Shutter_#CAM0001_Textures_0'].geometry}
      material={materials.CAM0001_Textures}
      position={[-0.035, -0.006, 0.076]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['#CAM0001_Shutter_Speed_#CAM0001_Textures_0'].geometry}
      material={materials.CAM0001_Textures}
      position={[-0.057, 0.001, 0.073]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['#CAM0001_Spool_#CAM0001_Textures_0'].geometry}
      material={materials.CAM0001_Textures}
      position={[0.05, 0.001, 0.075]}
    />
  </group>
</group>
  )
}

useGLTF.preload('/camera.glb')
// useGLTF.preload('/lounge.glb')