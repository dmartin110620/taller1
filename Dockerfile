#  Usa una imagen de Node.js como base
FROM node:20-bullseye
#  Establece el directorio de trabajo dentro del contenedor
WORKDIR /frontend
# Copia los archivos de dependencias primero (para aprovechar la caché)
COPY package.json package-lock.json ./
#  Instala las dependencias
RUN npm install
#  Copia todo el código fuente de la app
COPY . .
#  Expone el puerto 5173 (donde corre Vite por defecto)
EXPOSE 5173
# Inicia Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]