import './App.css';
import {Route, Routes} from "react-router-dom";
import ModelContainer from "././components/ModelsStart/modelContainer";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<ModelContainer/>}/>
        </Routes>
    );
}

export default App;
