# Usa una imagen oficial de Node.js como base
FROM node:22-alpine

# Crear usuario no-root primero
RUN adduser -D -u 1001 appuser

# Default directory.
ENV INSTALL_PATH=/app
RUN mkdir -p $INSTALL_PATH

# Create app directory.
WORKDIR $INSTALL_PATH

# Copia los archivos de dependencias y tsconfig primero para aprovechar el cache de Docker
COPY package*.json tsconfig.json ./

# Instala las dependencias de forma limpia
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Copia la carpeta de configuración
RUN cp -r src/config dist/

# Cambiar propiedad de la app al usuario no-root
RUN chown -R appuser:appuser $INSTALL_PATH

# Cambiar a usuario no-root
USER appuser

# Expone el puerto de la API
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"] 