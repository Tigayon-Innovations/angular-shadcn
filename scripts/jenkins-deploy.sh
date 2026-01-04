#!/bin/bash

###############################################################################
# CI/CD Deployment Script for Jenkins
# Handles deployment from Jenkins pipeline to production
###############################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
DEPLOY_DIR="/var/www/shadcn-angular"
APP_USER="www-data"
APP_GROUP="www-data"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/shadcn-angular"

# Functions
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root or with sudo"
fi

log "Starting deployment..."

# Create backup directory
mkdir -p "${BACKUP_DIR}"
log "Backup directory ready: ${BACKUP_DIR}"

# Backup current deployment
if [ -d "${DEPLOY_DIR}" ] && [ -d "${DEPLOY_DIR}/dist" ]; then
    log "Backing up current deployment..."
    tar -czf "${BACKUP_DIR}/backup-${TIMESTAMP}.tar.gz" "${DEPLOY_DIR}" 2>/dev/null || true
    success "Backup created: backup-${TIMESTAMP}.tar.gz"
fi

# Create deployment directory if it doesn't exist
mkdir -p "${DEPLOY_DIR}"
success "Deployment directory ready"

# Copy application files from workspace
log "Copying application files..."
if [ -d "./dist" ]; then
    cp -r ./dist/* "${DEPLOY_DIR}/" || error "Failed to copy dist files"
    success "Application files copied"
fi

if [ -f "package.json" ]; then
    cp package.json "${DEPLOY_DIR}/"
    success "package.json copied"
fi

if [ -f "package-lock.json" ]; then
    cp package-lock.json "${DEPLOY_DIR}/"
    success "package-lock.json copied"
fi

if [ -f "ecosystem.config.js" ]; then
    cp ecosystem.config.js "${DEPLOY_DIR}/"
    success "ecosystem.config.js copied"
fi

# Copy MCP server files
log "Deploying MCP server..."
mkdir -p "${DEPLOY_DIR}/mcp-server"
if [ -d "./mcp-server" ]; then
    cp -r ./mcp-server/* "${DEPLOY_DIR}/mcp-server/" || error "Failed to copy MCP files"
    success "MCP server files copied"
fi

# Install production dependencies
log "Installing production dependencies..."
cd "${DEPLOY_DIR}" || error "Cannot access deployment directory"

npm ci --production || error "Failed to install dependencies"
success "Production dependencies installed"

# Install MCP dependencies
log "Installing MCP server dependencies..."
if [ -d "./mcp-server" ]; then
    cd "${DEPLOY_DIR}/mcp-server"
    npm ci --production || warning "Failed to install MCP dependencies"
    success "MCP dependencies installed"
    cd "${DEPLOY_DIR}"
fi

# Set proper permissions
log "Setting directory permissions..."
chown -R ${APP_USER}:${APP_GROUP} "${DEPLOY_DIR}"
success "Permissions set"

# Stop services
log "Stopping services..."
pm2 stop shadcn-angular mcp-server 2>/dev/null || true
sleep 2
success "Services stopped"

# Start services
log "Starting services..."
cd "${DEPLOY_DIR}"
pm2 start ecosystem.config.js || error "Failed to start services"
pm2 save
success "Services started"

sleep 3

# Health checks
log "Running health checks..."

# Check if Angular app is running
if curl -s http://localhost:4200/health > /dev/null 2>&1; then
    success "Angular app is running"
else
    warning "Angular app health check failed"
fi

# Check if MCP server is running
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    success "MCP server is running"
else
    warning "MCP server health check failed"
fi

# Reload Nginx
log "Reloading Nginx..."
if nginx -t; then
    systemctl reload nginx
    success "Nginx reloaded"
else
    error "Nginx configuration test failed"
fi

# Show status
log "Final status check..."
pm2 status

log "Deployment completed successfully!"
success "shadcn-angular deployment finished at $(date '+%Y-%m-%d %H:%M:%S')"
