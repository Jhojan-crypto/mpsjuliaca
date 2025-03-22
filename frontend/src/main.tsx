// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
//import "./app.css"; // Importa los estilos de Tailwind
import App from "./App";
import "./estilo.css"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
