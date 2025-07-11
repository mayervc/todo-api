# Testing with Docker Compose

This project includes a comprehensive testing setup that runs with Docker Compose to ensure consistent test environments.

## 🚀 Quick Start

### Run Tests with Docker Compose

```bash
npm run test:compose
```

This command will:

1. Set up the test environment (create `.env.test` if needed)
2. Start PostgreSQL test database
3. Run all tests in isolation
4. Clean up containers automatically

## 📋 Available Test Commands

### Docker Compose Tests

```bash
npm run test:compose          # Run all tests with Docker Compose
npm run test:docker           # Run tests inside Docker container
npm run test:docker:watch     # Run tests in watch mode with Docker
```

### Local Tests

```bash
npm test                      # Run tests locally
npm run test:watch            # Run tests in watch mode locally
npm run test:setup            # Set up test environment
```

## 🏗️ Test Architecture

### Services

- **postgres-test**: Isolated PostgreSQL database for testing
- **todo-api-test**: Application container running tests

### Configuration

- **`.env.test`**: Test-specific environment variables
- **`jest.config.js`**: Jest configuration with Docker optimizations
- **`src/__tests__/setup.ts`**: Global test setup

### Test Database

- **Host**: `postgres-test` (Docker service name)
- **Port**: `5432` (internal)
- **Database**: `todo_test`
- **User**: `todo_user`
- **Password**: `todo_password`

## 📁 Test Structure

```
src/__tests__/
├── setup.ts              # Global test setup
├── health-check.test.ts  # API health check tests
└── user.test.ts         # User model tests
```

## 🔧 Test Configuration

### Jest Configuration

- **Timeout**: 30 seconds for database operations
- **Environment**: Node.js
- **Coverage**: HTML, LCOV, and text reports
- **Test Pattern**: `**/*.test.ts` and `**/*.spec.ts`

### Database Setup

- Tests use `sequelize.sync({ force: true })` for clean state
- Each test runs in isolation
- Automatic cleanup after each test

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   ```bash
   # Check if test database is running
   docker-compose ps postgres-test

   # Restart test services
   docker-compose down && npm run test:compose
   ```

2. **Tests Timeout**
   - Increase timeout in `jest.config.js`
   - Check database connection in test setup

3. **Environment Variables**
   ```bash
   # Recreate test environment
   npm run test:setup
   ```

### Debug Mode

```bash
# Run tests with verbose output
npm run test:docker -- --verbose

# Run specific test file
npm run test:docker -- --testNamePattern="User Model"
```

## 📊 Coverage Reports

After running tests, coverage reports are generated in:

- `coverage/` directory
- HTML report: `coverage/index.html`
- LCOV report: `coverage/lcov.info`

## 🔄 CI/CD Integration

The test setup is designed to work seamlessly in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: npm run test:compose
```

## 📝 Adding New Tests

1. Create test file in `src/__tests__/`
2. Follow naming convention: `*.test.ts` or `*.spec.ts`
3. Import models and utilities as needed
4. Use `beforeAll`/`afterAll` for setup/cleanup
5. Run tests to verify: `npm run test:compose`
