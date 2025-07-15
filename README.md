# Todo API

Una API RESTful para gestión de tareas (todos) construida con Node.js, TypeScript, Express y PostgreSQL.

## 🚀 Tecnologías

- **Node.js** (LTS v22 o superior)
- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM**
- **Docker** (para la base de datos)

## 📋 Prerrequisitos

- Node.js (v22 o superior)
- Docker (para la base de datos PostgreSQL)
- npm o yarn

## 🛠️ Instalación

1. **Clona el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd todo-api
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   Copia el archivo `.env.example` a `.env.local` para tu entorno local:

   ```bash
   cp .env.example .env.local
   ```

   Edita los valores si es necesario.

## 🚀 Uso

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

### Migraciones de base de datos

```bash
npx sequelize-cli db:migrate
```

## 📡 Endpoints

### Health Check

Verifica el estado de la API y la base de datos.

- **URL:** `GET /api/health-check`
- **Respuesta exitosa:**
  ```json
  {
    "api": "up",
    "database": "up"
  }
  ```
- **Respuesta con error de base de datos:**
  ```json
  {
    "api": "up",
    "database": "down",
    "error": "mensaje de error"
  }
  ```

## 🏗️ Estructura del Proyecto

```
todo-api/
├── config/          # Configuración de Sequelize
├── migrations/      # Migraciones de base de datos
├── models/          # Modelos de Sequelize
├── seeders/         # Datos de prueba
├── src/             # Código fuente
│   └── index.ts     # Punto de entrada de la aplicación
├── .env.example     # Variables de entorno de ejemplo
├── .env.local       # Variables de entorno local
├── .eslintrc.json   # Configuración de ESLint
├── package.json     # Dependencias y scripts
└── tsconfig.json    # Configuración de TypeScript
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Ejecuta el servidor en modo producción
- `npm run sequelize` - Ejecuta comandos de Sequelize CLI
- `npm run db:create` - Crea la base de datos usando un script TypeScript personalizado
- `npm run db:drop` - Elimina la base de datos usando un script TypeScript personalizado
- `npm run db:migrate` - Ejecuta todas las migraciones pendientes usando Sequelize CLI
- `npm run rollback` - Revierte la última migración usando Sequelize CLI

## 🐳 Manejo de la base de datos con Docker Compose

Puedes crear, eliminar y migrar la base de datos directamente desde Docker Compose usando los scripts:

```bash
# Eliminar la base de datos
docker compose run --rm todo-api npm run db:drop

# Crear la base de datos
docker compose run --rm todo-api npm run db:create

# Ejecutar migraciones
docker compose run --rm todo-api npm run db:migrate

# Revertir la última migración
docker compose run --rm todo-api npm run db:rollback
```

Esto ejecutará los scripts usando Sequelize CLI y los scripts personalizados de creación/eliminación de base de datos dentro del contenedor, usando las variables de entorno configuradas.

## 🧪 Testing

El flujo de testing ahora utiliza un archivo dedicado de Docker Compose para test: `docker-compose.test.yml`.

### Ejecutar tests en entorno Docker (recomendado)

```bash
# Levanta los servicios de testing y ejecuta los tests
docker compose -f docker-compose.test.yml up --abort-on-container-exit
```

Esto levantará los servicios necesarios para testing (`postgres-test` y `todo-api-test`), ejecutará los tests y apagará los contenedores al finalizar.

### Ejecutar tests localmente

```bash
npm test
```

### Ejecutar tests en modo watch local

```bash
npm run test:watch
```

## 🐳 Docker

La base de datos PostgreSQL se ejecuta en un contenedor Docker para facilitar el desarrollo.

### Comandos útiles de Docker:

```bash
# Ver contenedores activos
docker ps

# Ver logs del contenedor
docker logs todo-postgres

# Detener el contenedor
docker stop todo-postgres

# Eliminar el contenedor
docker rm -f todo-postgres
```

## 📝 Notas

- El puerto 5433 se usa para evitar conflictos con otras instancias de PostgreSQL
- Asegúrate de que el puerto 5433 esté disponible antes de levantar el contenedor
- Las variables de entorno se cargan automáticamente desde el archivo `.env.local`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
