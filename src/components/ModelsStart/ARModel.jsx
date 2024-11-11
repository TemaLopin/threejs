import React, { useEffect, useState } from "react";


const ARScene = () => {
    useEffect(() => {
        // Проверяем, что A-Frame загружен
        if (window.AFRAME) {
            // Регистрация компонента для обработки кликов
            window.AFRAME.registerComponent('cursor-listener', {
                init: function () {
                    this.el.addEventListener('click', (evt) => {
                        const intersectedPoint = evt.detail.intersection.point;
                        const newElement = document.createElement('a-entity');
                        newElement.setAttribute('position', intersectedPoint);
                        newElement.setAttribute('gltf-model', '#model');
                        newElement.setAttribute('scale', '0.5 0.5 0.5');
                        this.el.sceneEl.appendChild(newElement);
                    });
                },
            });
        }
    }, []);

    return (
        <a-scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
        >
            {/* Загрузка ресурсов */}
            <a-assets>
                {/* Поместите файл модели в папку public и замените 'model.gltf' на путь к вашей модели */}
                <a-asset-item id="model" src="/chair/Antique_chair_2.gltf"></a-asset-item>
            </a-assets>

            {/* Камера с перекрестием */}
            <a-camera
                position="0 0 0"
                look-controls
                wasd-controls-enabled="false"
                cursor="fuse: false; rayOrigin: mouse;"
            ></a-camera>

            {/* Плоскость для перехвата кликов */}
            <a-entity
                id="clickable-plane"
                geometry="primitive: plane; width: 100; height: 100;"
                material="opacity: 0; transparent: true;"
                position="0 0 0"
                rotation="-90 0 0"
                cursor-listener
            ></a-entity>
        </a-scene>
    );
};

export default ARScene;
