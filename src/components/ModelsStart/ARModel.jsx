import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

const ARThreeModel = () => {
    useEffect(() => {
        let camera, scene, renderer;
        let controller;

        init();
        animate();

        function init() {
            // Сцена
            scene = new THREE.Scene();

            // Камера
            camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.01,
                20
            );

            // Освещение
            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            light.position.set(0.5, 1, 0.25);
            scene.add(light);

            // Рендерер
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.xr.enabled = true;
            document.body.appendChild(renderer.domElement);

            // Кнопка AR
            document.body.appendChild(
                ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
            );

            // Загрузчик модели
            const loader = new GLTFLoader();
            loader.load(
                '/chair/Antique_chair_2.gltf',
                (gltf) => {
                    scene.add(gltf.scene);
                },
                undefined,
                (error) => {
                    console.error(error);
                }
            );

            // Контроллер
            controller = renderer.xr.getController(0);
            scene.add(controller);

            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            renderer.setAnimationLoop(render);
        }

        function render() {
            renderer.render(scene, camera);
        }

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
};

export default ARThreeModel;
