import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Model from "./model";
import {OrbitControls} from "@react-three/drei";
import {useXR, useXRHitTest, useXREvent} from "@react-three/xr";
import { Matrix4 } from "three";

const ModelsStart = () => {
    const reticleRef = useRef();
    const [models, setModels] = useState([]);

    const xr = useXR();
    const { isPresenting } = xr;
    const { camera } = useThree();

    useEffect(() => {
        if (xr && !isPresenting) {
            camera.position.z = 3;
        }
    }, [xr, isPresenting, camera]);

    // Вызываем useXRHitTest безусловно
    const hitTestResults = useXRHitTest();

    useEffect(() => {
        if (
            xr &&
            isPresenting &&
            hitTestResults &&
            hitTestResults.length > 0 &&
            reticleRef.current
        ) {
            const hit = hitTestResults[0];
            const hitMatrix = new Matrix4().fromArray(hit.transform.matrix);

            hitMatrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
            );

            reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
        }
    }, [xr, isPresenting, hitTestResults]);

    const placeModel = () => {
        if (xr && isPresenting && reticleRef.current) {
            const position = reticleRef.current.position.clone();
            const id = Date.now();
            setModels([...models, { position, id }]);
        }
    };


    useXREvent('select', placeModel);

    return (
        <>
            {xr && !isPresenting && <OrbitControls />}
            {xr && isPresenting &&
                models.map(({ position, id }) => (
                    <Model key={id} position={position} />
                ))}
            {xr && isPresenting && (
                <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                    <ringGeometry args={[0.1, 0.25, 32]} />
                    <meshStandardMaterial color={"white"} />
                </mesh>
            )}
            {!isPresenting && <Model />}
        </>
    );
};

export default ModelsStart;
