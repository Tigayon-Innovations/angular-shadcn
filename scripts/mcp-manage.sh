#!/bin/bash

###############################################################################
# MCP Server Management Script
# Manages MCP server deployment and configuration
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
DEPLOY_DIR="/var/www/shadcn-angular/mcp-server"
MCP_PORT=3001
MCP_HOST="localhost"
MCP_URL="https://shadcn-angular.tigayon.com/mcp"

# Functions
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}\n"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

# Check root
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root"
fi

# Parse command
case "${1:-}" in
    install)
        print_header "Installing MCP Server"

        mkdir -p "${DEPLOY_DIR}"
        cd "${DEPLOY_DIR}"

        # Install dependencies
        npm ci --production || error "Failed to install dependencies"
        success "Dependencies installed"

        # Create .env file
        cat > .env << EOF
NODE_ENV=production
PORT=${MCP_PORT}
HOST=${MCP_HOST}
MCP_URL=${MCP_URL}
LOG_LEVEL=info
EOF
        success ".env file created"

        # Start with PM2
        pm2 start http-server.ts --name mcp-server || error "Failed to start MCP server"
        pm2 save
        success "MCP server started"
        ;;

    start)
        print_header "Starting MCP Server"
        pm2 start mcp-server
        pm2 save
        success "MCP server started"
        ;;

    stop)
        print_header "Stopping MCP Server"
        pm2 stop mcp-server || true
        success "MCP server stopped"
        ;;

    restart)
        print_header "Restarting MCP Server"
        pm2 restart mcp-server || error "Failed to restart"
        pm2 save
        success "MCP server restarted"
        ;;

    status)
        print_header "MCP Server Status"
        pm2 info mcp-server

        # Health check
        if curl -s http://${MCP_HOST}:${MCP_PORT}/health > /dev/null 2>&1; then
            success "MCP server is healthy"
        else
            error "MCP server is not responding"
        fi
        ;;

    logs)
        print_header "MCP Server Logs"
        pm2 logs mcp-server --nostream --lines 100
        ;;

    *)
        echo "Usage: $0 [install|start|stop|restart|status|logs]"
        ;;
esac
