import './App.css';
import {Route, Routes} from "react-router-dom";
import ModelContainer from "././components/ModelsStart/modelContainer";
import ARModel from "./components/ModelsStart/ARModel";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<ARModel/>}/>
        </Routes>
    );
}

export default App;
