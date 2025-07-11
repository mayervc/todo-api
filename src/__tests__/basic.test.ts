describe('Basic Test Suite', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle environment variables', () => {
    expect(process.env.NODE_ENV).toBeDefined()
  })

  it('should work with async operations', async () => {
    const result = await Promise.resolve('success')
    expect(result).toBe('success')
  })
})
