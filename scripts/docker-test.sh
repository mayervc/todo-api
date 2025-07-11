#!/bin/bash
set -e

docker compose build

docker compose run --rm todo-api sh -c 'npm install && NODE_ENV=test npx ts-node scripts/test-orchestrator.ts' 