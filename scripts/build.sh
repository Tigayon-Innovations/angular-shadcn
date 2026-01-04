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

# Install dependencies if node_modules is empty or incomplete
echo ""
echo "Checking dependencies..."
if [ ! -d "node_modules/@angular/cli" ]; then
    echo "⚠ @angular/cli not found, installing dependencies..."
    npm install
else
    echo "✓ @angular/cli found"
fi

# Add node_modules/.bin to PATH
export PATH="$(pwd)/node_modules/.bin:$PATH"

echo ""
echo "Current PATH (first component):"
echo "$(pwd)/node_modules/.bin"

echo ""
echo "Checking for ng command..."
if which ng > /dev/null 2>&1; then
    echo "✓ ng found at: $(which ng)"
else
    echo "✗ ng not found in PATH"
    if [ -f "node_modules/.bin/ng" ]; then
        echo "✓ ng found in node_modules/.bin"
        ls -la node_modules/.bin/ng
    else
        echo "✗ ng not found in node_modules/.bin"
        echo "Available binaries in node_modules/.bin:"
        ls -la node_modules/.bin/ 2>/dev/null || echo "node_modules/.bin not found"
        exit 1
    fi
fi

echo ""
echo "Building Angular application..."

# Run build
npm run build

echo ""
echo "========== Build Complete =========="
echo "Build output:"
if [ -d "dist" ]; then
    ls -la dist/
else
    echo "dist folder not found"
    exit 1
fi
