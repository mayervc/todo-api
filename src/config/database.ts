import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'todo_db',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres' as const,
    logging: console.log
  },
  test: {
    username: process.env.DB_TEST_USERNAME || 'postgres',
    password: process.env.DB_TEST_PASSWORD || '',
    database: process.env.DB_TEST_DATABASE || 'my_microservice_test_db',
    host: process.env.DB_TEST_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT || '5432'),
    dialect: 'postgres' as const,
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST || 'host.docker.internal',
    port: parseInt(process.env.DB_PORT!),
    dialect: 'postgres' as const,
    logging: false
  }
}

const currentConfig = config[env as keyof typeof config]

export const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    port: currentConfig.port,
    dialect: currentConfig.dialect,
    logging: currentConfig.logging
  }
)

export default config
