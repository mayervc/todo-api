#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Running tests with Docker Compose...${NC}"

# Run tests with Docker Compose
docker-compose up --abort-on-container-exit --exit-code-from todo-api-test postgres-test todo-api-test

# Get the exit code
EXIT_CODE=$?

echo -e "${YELLOW}🧹 Cleaning up test containers...${NC}"
docker-compose down

# Print results
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
else
    echo -e "${RED}❌ Tests failed with exit code: $EXIT_CODE${NC}"
fi

exit $EXIT_CODE 