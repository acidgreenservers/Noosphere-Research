#!/bin/bash

# Noosphere Research Hub Docker Deployment Script
# This script builds and deploys the website using Docker

set -e

echo "🚀 Building Noosphere Research Hub Docker image..."

# Build the Docker image
docker-compose build --no-cache

echo "✅ Docker image built successfully!"

echo "🌐 Starting Noosphere Research Hub container..."

# Start the container
docker-compose up -d

echo "🎉 Deployment complete!"
echo ""
echo "📍 Your website is now running at: http://localhost:8080"
echo ""
echo "🔍 To check container status: docker-compose ps"
echo "📝 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
echo ""
echo "💡 For Cloudflare Tunnel setup:"
echo "   1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/"
echo "   2. Create tunnel: cloudflared tunnel create noosphere-research"
echo "   3. Configure tunnel: cloudflared tunnel route dns noosphere-research yourdomain.com"
echo "   4. Run tunnel: cloudflared tunnel run noosphere-research"
