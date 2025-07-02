import express from 'express'
import { sequelize } from './config/database'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Todo API!')
})

app.get('/api/health-check', async (req, res) => {
  try {
    await sequelize.authenticate()
    res.status(200).json({
      api: 'up',
      database: 'up'
    })
  } catch (error) {
    res.status(200).json({
      api: 'up',
      database: 'down',
      error: (error as Error).message
    })
  }
})

if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
