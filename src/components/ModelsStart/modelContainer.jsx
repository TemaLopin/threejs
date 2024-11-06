import {Canvas} from "@react-three/fiber";
import {ARButton, XR} from "@react-three/xr";
import ModelsStart from "./index";
import CustomARButton from "../buttons/AR";
import { Suspense } from "react";


const ModelContainer = () => {
    return <>
        <ARButton 
        sessionInit={{
            optionalFeatures: ["hit-test", "dom-overlay"],
        }}
        />
        <Canvas shadows camera={{position: [-1, 1, 1], zoom: 1.8}}>

            {/* <CustomARButton/> */}
            <color attach={"background"} args={["lightgreen"]}/>
            <spotLight
                position={[8, 11, 3]}
                angel={0.3}
                penunbra={1}
                intensity={2}
                castShow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
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