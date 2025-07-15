import request from 'supertest'
import app from '../index'

describe('GET /api/health-check', () => {
  it('should return API and database status', async () => {
    const res = await request(app).get('/api/health-check')
    expect(res.status).toBe(200)
    expect(res.body.api).toBe('up')
    expect(['up', 'down']).toContain(res.body.database)
    if (res.body.database === 'down') {
      expect(res.body.error).toBeDefined()
    }
  })
})
