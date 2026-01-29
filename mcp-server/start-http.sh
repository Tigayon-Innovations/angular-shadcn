#!/bin/bash

# Start ng-cn MCP Server with Streamable HTTP transport
# This script starts the server on port 3100 (default) or MCP_PORT if set

cd "$(dirname "$0")"

echo "🚀 Starting ng-cn MCP Server with Streamable HTTP transport..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
npx tsx streamable-http-server.ts
