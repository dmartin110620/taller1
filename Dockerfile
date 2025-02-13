#  Usa una imagen de Node.js como base
FROM node:20-bullseye
#  Establece el directorio de trabajo dentro del contenedor
WORKDIR /frontend
# Copia los archivos de dependencias primero (para aprovechar la caché)
COPY package.json package-lock.json ./
#  Instala las dependencias
RUN npm ci --legacy-peer-deps
#  Copia todo el código fuente de la app
COPY . .

RUN npm rebuild esbuild --force
# Construye los archivos estáticos con Vite
RUN npm run build

# Instala un servidor estático ligero
RUN npm install -g serve

# Expone el puerto donde correrá el servidor
EXPOSE 3000

# Usa "serve" para servir los archivos estáticos de la carpeta "dist"
CMD ["serve", "-s", "dist", "-l", "3000"]