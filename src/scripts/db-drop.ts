import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

async function dropDatabase() {
  const dbName = process.env.DB_DATABASE || 'todo_db'
  const dbUser = process.env.DB_USERNAME || 'postgres'
  const dbPassword = process.env.DB_PASSWORD || 'postgres'
  const dbHost = process.env.DB_HOST || 'localhost'
  const dbPort = parseInt(process.env.DB_PORT || '5432')

  console.log(`Dropping database: ${dbName}`)

  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: 'postgres',
    logging: false
  })

  try {
    // Forzar la desconexión de todas las conexiones activas
    await sequelize.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${dbName}'
        AND pid <> pg_backend_pid()
    `)

    await sequelize.query(`DROP DATABASE IF EXISTS "${dbName}"`)
    console.log(`✅ Database "${dbName}" dropped successfully!`)
  } catch (error: any) {
    console.error('❌ Error dropping database:', error.message)
    process.exit(1)
  } finally {
    await sequelize.close()
  }
}

dropDatabase()
