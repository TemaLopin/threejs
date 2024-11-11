import React from 'react';
import 'aframe';
import 'aframe-ar';
import { Entity, Scene } from 'aframe-react';

const ARModel = () => {
    return (
        <Scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
        >
            <a-marker preset="hiro">
                <a-entity
                    gltf-model="url(/chair/Antique_chair_2.gltf)"
                    scale="0.5 0.5 0.5"
                    position="0 0 0"
                ></a-entity>
            </a-marker>
            <Entity primitive="a-camera"></Entity>
        </Scene>
    );
};

export default ARModel
