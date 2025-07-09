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
   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   PORT=3000
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=todo_db
   DB_HOST=localhost
   DB_PORT=5433
   ```

4. **Levanta la base de datos PostgreSQL con Docker**
   ```bash
   docker run --name todo-postgres \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=todo_db \
     -p 5433:5432 \
     -d postgres
   ```

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
├── .env             # Variables de entorno
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
- `npm run migrate` - Ejecuta todas las migraciones pendientes usando Sequelize CLI
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

## 🧪 Testing

El proyecto incluye un sistema completo de testing que se ejecuta con Docker Compose para garantizar entornos de prueba consistentes.

### Ejecutar Tests

```bash
# Ejecutar todos los tests con Docker Compose
npm run test:compose

# Ejecutar tests localmente
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

### Estructura de Tests

- **`src/__tests__/`**: Directorio principal de tests
- **`src/__tests__/setup.ts`**: Configuración global de tests
- **`src/__tests__/health-check.test.ts`**: Tests de endpoints de API
- **`src/__tests__/user.test.ts`**: Tests del modelo User

### Configuración de Tests

- **Base de datos de test**: PostgreSQL aislado (`postgres-test`)
- **Variables de entorno**: `.env.test` (se crea automáticamente)
- **Cobertura**: Reportes HTML y LCOV generados automáticamente
- **Timeout**: 30 segundos para operaciones de base de datos

### Comandos de Test Disponibles

```bash
npm run test:compose          # Tests con Docker Compose
npm run test:docker           # Tests dentro del contenedor
npm run test:docker:watch     # Tests en modo watch con Docker
npm test                      # Tests locales
npm run test:watch            # Tests en modo watch local
npm run test:setup            # Configurar entorno de test
```

Para más detalles sobre testing, consulta [docs/TESTING.md](docs/TESTING.md).

## 📝 Notas

- El puerto 5433 se usa para evitar conflictos con otras instancias de PostgreSQL
- Asegúrate de que el puerto 5433 esté disponible antes de levantar el contenedor
- Las variables de entorno se cargan automáticamente desde el archivo `.env`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
