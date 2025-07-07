import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import { sequelize } from '../config/database'

dotenv.config()

async function migrate() {
  try {
    // Ejecutar migraciones usando Sequelize programáticamente
    await sequelize.sync({ alter: true })
    console.log('✅ Migrations executed successfully!')
  } catch (error: any) {
    console.error('❌ Error running migrations:', error.message)
    process.exit(1)
  } finally {
    await sequelize.close()
  }
}

migrate()
