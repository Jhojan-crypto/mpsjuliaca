# Usa una imagen base de Node.js
FROM node:18-slim

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Instala `serve` globalmente para servir los archivos estáticos
RUN npm install -g serve

# Expone el puerto 3000 para servir la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "dist", "-l", "0.0.0.0:3000"]