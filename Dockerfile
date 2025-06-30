# Usa una imagen oficial de Node.js como base
FROM node:22-alpine

# Default directory.
ENV INSTALL_PATH=/app
RUN mkdir -p $INSTALL_PATH

# Create app directory.
WORKDIR $INSTALL_PATH

# Copia los archivos de dependencias primero para aprovechar el cache de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Copia la configuración necesaria para producción
RUN cp -r config dist/

# Expone el puerto de la API
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"] 