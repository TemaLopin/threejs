import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebXRPolyfill from 'webxr-polyfill';
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
// const polyfill = new WebXRPolyfill();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

