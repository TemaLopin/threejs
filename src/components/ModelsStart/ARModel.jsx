import React, {useEffect, useRef, useState} from "react";
import {ARButton} from "three/examples/jsm/webxr/ARButton";
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const ARScene = () => {
    const { gl, scene, camera } = useThree();
    const reticleRef = useRef();
    const hitTestSourceRef = useRef(null);
    const localReferenceSpaceRef = useRef(null);

    useEffect(() => {
        // Включаем XR
        gl.xr.enabled = true;
        gl.xr.setReferenceSpaceType('local');

        // Добавляем ARButton в DOM
        document.body.appendChild(
            ARButton.createButton(gl, { requiredFeatures: ['hit-test'] })
        );

        // Создаем ретикул (прицел)
        const reticleGeometry = new THREE.RingGeometry(0.05, 0.06, 32).rotateX(
            -Math.PI / 2
        );
        const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x0fff00 });
        const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        scene.add(reticle);
        reticleRef.current = reticle;

        let session = null;

        function onSessionStart() {
            session = gl.xr.getSession();

            session.addEventListener('end', onSessionEnd);

            session.requestReferenceSpace('viewer').then((referenceSpace) => {
                session
                    .requestHitTestSource({ space: referenceSpace })
                    .then((source) => {
                        hitTestSourceRef.current = source;
                    });
            });

            session.requestReferenceSpace('local').then((referenceSpace) => {
                localReferenceSpaceRef.current = referenceSpace;
            });

            session.addEventListener('select', onSelect);
        }

        function onSessionEnd() {
            session.removeEventListener('end', onSessionEnd);
            session.removeEventListener('select', onSelect);

            if (hitTestSourceRef.current) {
                hitTestSourceRef.current = null;
            }
            if (localReferenceSpaceRef.current) {
                localReferenceSpaceRef.current = null;
            }

            if (reticleRef.current) {
                reticleRef.current.visible = false;
            }
        }

        function onSelect() {
            if (reticleRef.current.visible) {
                // Замените на загрузку вашей модели
                const loader = new GLTFLoader();
                loader.load(
                    '/chair/Antique_chair_2.gltf', // Замените на путь к вашей модели
                    (gltf) => {
                        const model = gltf.scene;
                        model.scale.set(0.2, 0.2, 0.2); // Настройте масштаб по необходимости

                        model.position.setFromMatrixPosition(reticleRef.current.matrix);
                        model.quaternion.setFromRotationMatrix(reticleRef.current.matrix);

                        scene.add(model);
                    },
                    undefined,
                    (error) => {
                        console.error('Ошибка при загрузке модели', error);
                    }
                );
            }
        }

        gl.xr.addEventListener('sessionstart', onSessionStart);

        return () => {
            gl.xr.removeEventListener('sessionstart', onSessionStart);
            if (session) {
                session.removeEventListener('end', onSessionEnd);
                session.removeEventListener('select', onSelect);
            }
            if (reticleRef.current) {
                scene.remove(reticleRef.current);
            }
        };
    }, [gl, scene]);

    useFrame(() => {
        const session = gl.xr.getSession();
        if (session && hitTestSourceRef.current && localReferenceSpaceRef.current) {
            const referenceSpace = gl.xr.getReferenceSpace();
            session.requestAnimationFrame((time, frame) => {
                const viewerPose = frame.getViewerPose(referenceSpace);
                if (viewerPose) {
                    const hitTestResults = frame.getHitTestResults(
                        hitTestSourceRef.current
                    );
                    if (hitTestResults.length > 0) {
                        const hit = hitTestResults[0];
                        const pose = hit.getPose(localReferenceSpaceRef.current);
                        reticleRef.current.visible = true;
                        reticleRef.current.matrix.fromArray(pose.transform.matrix);
                    } else {
                        reticleRef.current.visible = false;
                    }
                }
            });
        }
    });

    return null;
};

export default ARScene;
