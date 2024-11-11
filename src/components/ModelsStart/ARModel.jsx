import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model";

const ARScene = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        require("aframe");
        require("aframe-ar");
    }, []);


    const addModelAtCameraPosition = () => {

        const camera = document.querySelector("a-camera");
        const position = camera.getAttribute("position");
        const rotation = camera.getAttribute("rotation");

        setPositions([...positions, { position, rotation }]);
    };

    return (
        <a-scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
            <a-assets>
                <a-asset-item id="model" src="/chair/Antique_chair_2.gltf"></a-asset-item>
            </a-assets>

            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 5, 5]} />

                {positions.map((pos, index) => (
                    <Model
                        key={index}
                        position={[pos.position.x, pos.position.y, pos.position.z]}
                        rotation={[pos.rotation.x, pos.rotation.y, pos.rotation.z]}
                        scale={[0.5, 0.5, 0.5]}
                    />
                ))}
            </Canvas>


            <button
                onClick={addModelAtCameraPosition}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "10px 20px",
                    fontSize: "16px",
                }}
            >
                Добавить объект
            </button>

            <a-camera-static></a-camera-static>
        </a-scene>
    );
};

export default ARScene;
