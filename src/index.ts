import express from 'express'
import db from '../models'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Todo API!')
})

app.get('/api/health-check', async (req, res) => {
  // Check DB connection
  try {
    await db.sequelize.authenticate()
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
