import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { GeoJsonProvider } from "../src/context/GeoJsonContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <GeoJsonProvider>
    <App />
  </GeoJsonProvider>
);
