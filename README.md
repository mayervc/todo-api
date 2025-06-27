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

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Ejecuta el servidor en modo producción
- `npm run sequelize` - Ejecuta comandos de Sequelize CLI

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
- Las variables de entorno se cargan automáticamente desde el archivo `.env`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
