#!/bin/bash

###############################################################################
# Setup Nginx Basic Auth for MCP Server
# Generates .htpasswd file with basic auth credentials
# Usage: ./setup-nginx-auth.sh
###############################################################################

NGINX_CONFIG_DIR="/etc/nginx"
HTPASSWD_FILE="${NGINX_CONFIG_DIR}/.htpasswd"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Nginx basic authentication for MCP server...${NC}\n"

# Check if htpasswd is installed
if ! command -v htpasswd &> /dev/null; then
    echo "Installing apache2-utils..."
    apt-get update
    apt-get install -y apache2-utils
fi

# Create .htpasswd file with credentials
# Username: jamel, Password: jamel
htpasswd -bc "${HTPASSWD_FILE}" jamel jamel

# Set proper permissions
chmod 644 "${HTPASSWD_FILE}"

echo -e "${GREEN}✓ .htpasswd file created at ${HTPASSWD_FILE}${NC}"
echo -e "${GREEN}✓ Nginx basic auth is configured${NC}\n"

# Display the content
echo "File content:"
cat "${HTPASSWD_FILE}"
