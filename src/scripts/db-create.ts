import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

async function createDatabase() {
  const dbName = process.env.DB_DATABASE || 'todo_db'
  const dbUser = process.env.DB_USERNAME || 'postgres'
  const dbPassword = process.env.DB_PASSWORD || 'postgres'
  const dbHost = process.env.DB_HOST || 'localhost'
  const dbPort = parseInt(process.env.DB_PORT || '5432')

  console.log(`Creating database: ${dbName}`)

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
    await sequelize.query(`CREATE DATABASE "${dbName}"`)
    console.log(`✅ Database "${dbName}" created successfully!`)
  } catch (error: any) {
    if (error.original?.code === '42P04') {
      console.log(`ℹ️  Database "${dbName}" already exists.`)
    } else {
      console.error('❌ Error creating database:', error.message)
      process.exit(1)
    }
  } finally {
    await sequelize.close()
  }
}

createDatabase()
