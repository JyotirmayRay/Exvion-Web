#!/bin/bash
set -e

echo "🚀 Deploying Exvion API..."

# Pull latest
git pull origin main

# Build Docker image
docker-compose build api

# Stop old container
docker-compose down api

# Start new container
docker-compose up -d api

# Run migrations
docker-compose exec api npx prisma migrate deploy

# Health check
sleep 5
curl -f http://localhost:3001/api/health && \
  echo "✅ API is healthy" || \
  echo "❌ API health check failed"

echo "✅ Deployment complete"
