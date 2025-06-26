import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Todo API!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
