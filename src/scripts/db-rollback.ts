import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function rollback() {
  try {
    // Check if user wants to rollback all or just one
    const rollbackAll = process.argv.includes('--all')

    if (rollbackAll) {
      console.log('🔄 Rolling back all migrations...')
      const { stdout, stderr } = await execAsync(
        'npx sequelize-cli db:migrate:undo:all'
      )

      if (stderr) {
        console.error('⚠️  Rollback warnings:', stderr)
      }

      console.log(stdout)
      console.log('✅ All migrations rolled back successfully!')
    } else {
      console.log('🔄 Rolling back last migration...')
      const { stdout, stderr } = await execAsync(
        'npx sequelize-cli db:migrate:undo'
      )

      if (stderr) {
        console.error('⚠️  Rollback warnings:', stderr)
      }

      console.log(stdout)
      console.log('✅ Last migration rolled back successfully!')
    }
  } catch (error: any) {
    console.error('❌ Rollback failed:', error.message)
    process.exit(1)
  }
}

rollback()
