import request from 'supertest'
import app from '../index'
import db from '../models'

describe('GET /api/health-check', () => {
  it('should return api and database status', async () => {
    const response = await request(app).get('/api/health-check')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('api')
    expect(response.body).toHaveProperty('database')
  })
})

// Cierra la conexión de Sequelize después de todos los tests
afterAll(async () => {
  await db.sequelize.close()
})
