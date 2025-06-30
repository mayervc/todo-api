import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import process from 'process'
import dotenv from 'dotenv'

dotenv.config()

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const pathToConfig = path.resolve(
  __dirname,
  '..',
  '..',
  'config',
  'config.json'
)
const config = require(pathToConfig)[env]
const db: { [key: string]: any } = {}

let sequelize: Sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  )
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE || config.database,
    process.env.DB_USERNAME || config.username,
    process.env.DB_PASSWORD || config.password,
    {
      ...config,
      host: process.env.DB_HOST || config.host,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : config.port,
      dialect: 'postgres'
    }
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    )
  })
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
