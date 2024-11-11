import './App.css';
import {Route, Routes} from "react-router-dom";
import ModelContainer from "././components/ModelsStart/modelContainer";
import ARModel from "./components/ModelsStart/ARModel";
import {Canvas} from "@react-three/fiber";

function App() {
    return (
        <Canvas
            camera={{position: [0, 0, 0], fov: 70}}
            onCreated={({gl}) => {
                gl.setSize(window.innerWidth, window.innerHeight);
            }}
            style={{position: 'absolute', top: 0, left: 0}}
        >
            <ARModel/>
        </Canvas>
    );
}

export default App;
