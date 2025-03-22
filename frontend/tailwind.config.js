// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos relevantes en `src`
  ],
  theme: {
    extend: {}, // Extensiones de estilos personalizados
  },
  plugins: [], // Plugins opcionales de Tailwind
};
