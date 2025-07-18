import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function run() {
  const isWatch = process.argv.includes('--watch')
  try {
    console.log('STEP 1: Crear la base de datos de test...')
    await execAsync('npm run db:create')

    console.log('STEP 2: Ejecutar migraciones...')
    await execAsync('npm run db:migrate')

    console.log('STEP 3: Ejecutar los tests...')
    const testCmd = isWatch
      ? 'jest --config jest.config.js --watch src/__tests__'
      : 'jest --config jest.config.js src/__tests__'
    const { stdout, stderr } = await execAsync(testCmd)
    if (stdout) process.stdout.write(stdout)
    if (stderr) process.stderr.write(stderr)
  } catch (err) {
    console.error('Error en el proceso de testing:', err)
    process.exit(1)
  } finally {
    console.log('STEP 4: Borrar la base de datos de test...')
    try {
      await execAsync('npm run db:drop')
    } catch (err) {
      console.error('Error al borrar la base de datos de test:', err)
    }
  }
}

run()
