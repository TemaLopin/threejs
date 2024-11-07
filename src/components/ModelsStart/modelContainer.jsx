import {Canvas} from "@react-three/fiber";
import {ARButton, XR} from "@react-three/xr";
import ModelsStart from "./index";
import CustomARButton from "../buttons/AR";
import {Suspense} from "react";


const ModelContainer = () => {
    return <>
        <ARButton
            sessionInit={{
                optionalFeatures: ['hit-test', 'dom-overlay'],
                domOverlay: {root: document.body},
            }}
        />
        <Canvas shadows camera={{position: [1, 2, 3], zoom: 2}}>

            {/* <CustomARButton/> */}
            <color attach={"background"} args={["lightgreen"]}/>
            <spotLight
                position={[8, 11, 3]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize={{width: 1024, height: 1024}}
            />
            <XR>
                <Suspense fallback={null}>
                    <ModelsStart/>
                </Suspense>
            </XR>
        </Canvas>
    </>
}

export default ModelContainer;