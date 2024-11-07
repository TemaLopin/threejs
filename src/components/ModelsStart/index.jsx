import { useXR, useHitTest, Interactive } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import Model from './model';
import {useThree} from "@react-three/fiber";

const ModelsStart = () => {
    const reticleRef = useRef();
    const [models, setModels] = useState([]);
    const { isPresenting } = useXR();

    useThree(({camera}) => {
        if (!isPresenting) {
            camera.position.z = 3;
        }
    });

    useHitTest((hitMatrix) => {
        if (reticleRef.current) {
            hitMatrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
            );
        }
    });

    const placeModel = () => {
        if (reticleRef.current) {
            const position = reticleRef.current.position.clone();
            const id = Date.now();
            setModels((prevModels) => [...prevModels, { position, id }]);
        }
    };

    return (
        <>
            {!isPresenting && <OrbitControls />}
            {isPresenting &&
                models.map(({ position, id }) => (
                    <Model key={id} position={position} />
                ))}
            {isPresenting && (
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef}>
                        <ringGeometry args={[0.1, 0.11, 32]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                </Interactive>
            )}
            {!isPresenting && <Model />}
        </>
    );
};

export default ModelsStart;
