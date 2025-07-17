# Multi-stage Dockerfile
FROM node:22-alpine AS base

# Crear usuario no-root
RUN adduser -D -u 1001 appuser

# Default directory
ENV INSTALL_PATH=/app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Copia archivos de dependencias
COPY package*.json tsconfig.json ./

# ================================
# DEVELOPMENT STAGE
# ================================
FROM base AS development

# Instala todas las dependencias (incluyendo dev)
RUN npm ci --include=dev

# Copia el resto del código
COPY . .

# Cambiar propiedad al usuario no-root
RUN chown -R appuser:appuser $INSTALL_PATH

# Cambiar a usuario no-root
USER appuser

# Expone el puerto
EXPOSE 3000

# Comando para desarrollo con hot reload
CMD ["npm", "run", "dev"]

# ================================
# PRODUCTION STAGE
# ================================
FROM base AS production

# Instala solo dependencias de producción
RUN npm ci --only=production

# Copia el código
COPY . .

# Compila la aplicación
RUN npm run build

# Cambiar propiedad al usuario no-root
RUN chown -R appuser:appuser $INSTALL_PATH

# Cambiar a usuario no-root
USER appuser

# Expone el puerto
EXPOSE 3000

# Comando para producción
CMD ["npm", "start"]