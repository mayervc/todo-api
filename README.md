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
   DB_USERNAME=todo_user
   DB_PASSWORD=todo_password
   DB_DATABASE=todo_db
   DB_HOST=localhost
   DB_PORT=5433
   ```

4. **Levanta los servicios con Docker Compose**
   ```bash
   docker compose up -d
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

## 🐳 Docker Compose

El proyecto usa Docker Compose para gestionar tanto el entorno de desarrollo como el de testing.

### Servicios Disponibles

- **`postgres`**: Base de datos PostgreSQL para desarrollo (puerto 5433)
- **`postgres-test`**: Base de datos PostgreSQL para testing (puerto 5434, perfil `test`)
- **`todo-api`**: Servicio principal de la aplicación
- **`todo-api-test`**: Servicio dedicado para testing (perfil `test`)

### Comandos de Docker Compose

```bash
# Levantar servicios de desarrollo
docker compose up -d

# Levantar todos los servicios (incluyendo testing)
docker compose --profile test up -d

# Ver logs
docker compose logs -f

# Detener servicios
docker compose down

# Eliminar volúmenes (cuidado: borra datos)
docker compose down -v
```

### Manejo de la base de datos con Docker Compose

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

## 🧪 Testing

El proyecto incluye un sistema completo de testing que se puede ejecutar tanto localmente como en Docker Compose para garantizar entornos de prueba consistentes.

### Tabla de Comandos de Testing

| Contexto            | Comando                                                                                                          | Descripción                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Local               | `npm test`                                                                                                       | Ejecuta los tests localmente                                     |
| Local (watch)       | `npm run test:watch`                                                                                             | Ejecuta los tests en modo watch local                            |
| Docker Test Service | `docker compose --profile test run --rm todo-api-test`                                                           | Ejecuta tests usando el servicio dedicado de test                |
| Docker Compose      | `docker compose run --rm todo-api npm run test`                                                                  | Ejecuta los tests dentro del contenedor Docker                   |
| Flujo Pro (Docker)  | `./scripts/docker-test.sh`                                                                                       | Orquesta: crea DB, migra, testea y borra la DB de test en Docker |
| Manual Pro (Docker) | `docker compose run --rm todo-api sh -c 'npm install && NODE_ENV=test npx ts-node scripts/test-orchestrator.ts'` | Ejecuta el orquestador de tests manualmente en Docker            |

### Ejecutar Tests

```bash
# Ejecutar tests con el servicio dedicado de test (recomendado)
docker compose --profile test run --rm todo-api-test

# Ejecutar todos los tests con Docker Compose (rápido, solo tests)
docker compose run --rm todo-api npm run test

# Ejecutar el flujo profesional de testing (crea, migra y borra la DB de test)
./scripts/docker-test.sh

# Ejecutar tests localmente
npm test

# Ejecutar tests en modo watch local
npm run test:watch
```

### Servicios de Docker Compose

El proyecto incluye dos servicios principales:

- **`todo-api`**: Servicio principal para desarrollo y producción
- **`todo-api-test`**: Servicio dedicado para testing (usa perfil `test`)

#### Perfiles de Docker Compose

- **Sin perfil**: Solo se ejecutan los servicios principales (`todo-api`, `postgres`)
- **Perfil `test`**: Incluye el servicio `todo-api-test` y `postgres-test` optimizado para testing

```bash
# Ver servicios disponibles
docker compose config --services

# Ver servicios con perfil test
docker compose --profile test config --services
```

### Estructura de Tests

- **`src/__tests__/`**: Directorio principal de tests
- **`src/__tests__/basic.test.ts`**: Ejemplo de test básico

### Notas sobre Testing

- El flujo profesional (`./scripts/docker-test.sh`) garantiza un entorno limpio: crea la base de datos de test, ejecuta migraciones, corre los tests y borra la base de datos al finalizar.
- El comando `docker compose run --rm todo-api npm run test` ejecuta solo los tests, asumiendo que la base de datos de test ya está lista.
- Para desarrollo rápido, puedes usar los comandos locales (`npm test`, `npm run test:watch`).

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
