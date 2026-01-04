#!/bin/bash
set -e

# Build script for Jenkins that properly handles NVM and npm

export NVM_DIR="${NVM_DIR:=/var/lib/jenkins/.nvm}"
NODE_VERSION="${NODE_VERSION:=24}"

echo "========== Build Script =========="
echo "NVM_DIR: $NVM_DIR"
echo "NODE_VERSION: $NODE_VERSION"

# Source NVM
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
else
    echo "Error: nvm.sh not found at $NVM_DIR/nvm.sh"
    exit 1
fi

# Use the specified Node version
echo "Loading Node.js v$NODE_VERSION..."
nvm use $NODE_VERSION

# Verify Node and npm
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Add node_modules/.bin to PATH
export PATH="$(pwd)/node_modules/.bin:$(npm bin):$PATH"

echo "Current PATH:"
echo "$PATH"

echo ""
echo "Checking for ng command..."
if which ng; then
    echo "✓ ng found"
else
    echo "✗ ng not found, checking node_modules..."
    if [ -f "node_modules/.bin/ng" ]; then
        echo "✓ ng found in node_modules/.bin"
        ls -la node_modules/.bin/ng
    else
        echo "✗ ng not found in node_modules/.bin"
        echo "Available binaries:"
        ls -la node_modules/.bin/ 2>/dev/null | head -20 || echo "node_modules/.bin not found"
        exit 1
    fi
fi

echo ""
echo "Building Angular application..."

# Run build with explicit bash shell for npm
bash -c 'export PATH="$(pwd)/node_modules/.bin:$PATH" && npm run build'

echo ""
echo "========== Build Complete =========="
echo "Build output:"
ls -la dist/ || echo "dist folder not found"
