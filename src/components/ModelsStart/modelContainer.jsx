import {Canvas} from "@react-three/fiber";
import {ARButton, XR} from "@react-three/xr";
import ModelsStart from "./index";
import CustomARButton from "../buttons/AR";


const ModelContainer = () => {
    return <>
        <ARButton 
        sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
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
                <ModelsStart/>
            </XR>
        </Canvas>
    </>
}

export default ModelContainer;