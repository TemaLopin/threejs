import React, {useEffect} from 'react';
import 'aframe';
import 'aframe-ar';
import {Canvas} from "@react-three/fiber";
import Model from "./model";

const ARModel = () => {
    useEffect(() => {
        require("aframe");
        require("aframe-ar");
    }, []);

    return (
        <a-scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
            <a-marker preset="hiro">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 5, 5]} />
                    <Model scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
                </Canvas>
            </a-marker>
            <a-camera-static />
        </a-scene>
    );
};

export default ARModel
