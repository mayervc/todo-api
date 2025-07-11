import { writeFileSync } from 'fs'
import { join } from 'path'

const testEnvContent = `# Test Environment Configuration
NODE_ENV=test
DB_HOST=postgres-test
DB_PORT=5432
DB_USERNAME=todo_user
DB_PASSWORD=todo_password
DB_DATABASE=todo_test
`

function setupTestEnv() {
  try {
    const envPath = join(process.cwd(), '.env.test')
    writeFileSync(envPath, testEnvContent)
    console.log('✅ .env.test file created successfully!')
  } catch (error) {
    console.error('❌ Error creating .env.test:', error)
    process.exit(1)
  }
}

setupTestEnv()
