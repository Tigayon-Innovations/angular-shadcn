#!/bin/bash

###############################################################################
# Deploy and Setup Script for shadcn-angular.tigayon.com
# Sets up the entire application with PM2, Nginx, and SSL
# Run this on your production server
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
DEPLOY_DIR="/var/www/shadcn-angular"
DOMAIN="shadcn-angular.tigayon.com"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
APP_USER="www-data"
APP_GROUP="www-data"

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

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root"
fi

print_header "Initial Setup Checks"

# Check system packages
echo "Checking required packages..."
required_packages=("curl" "git" "nginx" "nodejs" "npm")

for package in "${required_packages[@]}"; do
    if command -v "$package" &> /dev/null; then
        success "$package is installed"
    else
        warning "$package is not installed"
    fi
done

# Install PM2 globally if not installed
if ! npm list -g pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
    success "PM2 installed"
else
    success "PM2 is already installed"
fi

# Setup PM2 to start on boot
print_header "Setting up PM2"
pm2 startup systemd -u ${APP_USER} --hp /var/lib/${APP_USER}
success "PM2 startup script configured"

# Create deployment directory
print_header "Creating Deployment Directory"
if [ ! -d "${DEPLOY_DIR}" ]; then
    mkdir -p "${DEPLOY_DIR}"
    success "Created ${DEPLOY_DIR}"
else
    warning "${DEPLOY_DIR} already exists"
fi

# Create logs directory
mkdir -p "${DEPLOY_DIR}/logs"
success "Created logs directory"

# Set directory permissions
chown -R ${APP_USER}:${APP_GROUP} "${DEPLOY_DIR}"
success "Set permissions for ${DEPLOY_DIR}"

# Setup Nginx
print_header "Setting up Nginx"

# Copy Nginx configuration
if [ -f "./nginx/shadcn-angular.conf" ]; then
    cp "./nginx/shadcn-angular.conf" "${NGINX_SITES_AVAILABLE}/shadcn-angular"
    success "Copied Nginx configuration"
else
    error "Nginx configuration file not found at ./nginx/shadcn-angular.conf"
fi

# Create symbolic link to enable the site
if [ ! -L "${NGINX_SITES_ENABLED}/shadcn-angular" ]; then
    ln -s "${NGINX_SITES_AVAILABLE}/shadcn-angular" "${NGINX_SITES_ENABLED}/shadcn-angular"
    success "Enabled shadcn-angular Nginx site"
fi

# Test Nginx configuration
if nginx -t; then
    success "Nginx configuration is valid"
else
    error "Nginx configuration test failed"
fi

# Setup Nginx basic auth for MCP server
print_header "Setting up Nginx Basic Authentication"

if command -v htpasswd &> /dev/null; then
    htpasswd -bc /etc/nginx/.htpasswd jamel jamel
    chmod 644 /etc/nginx/.htpasswd
    success "Basic auth configured (username: jamel, password: jamel)"
else
    echo "Installing apache2-utils for htpasswd..."
    apt-get update
    apt-get install -y apache2-utils
    htpasswd -bc /etc/nginx/.htpasswd jamel jamel
    chmod 644 /etc/nginx/.htpasswd
    success "Basic auth configured"
fi

# Reload Nginx
systemctl reload nginx
success "Nginx reloaded"

# Setup SSL (Let's Encrypt)
print_header "SSL Certificate Setup (Let's Encrypt)"

if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    apt-get install -y certbot python3-certbot-nginx
    success "Certbot installed"
else
    success "Certbot is already installed"
fi

echo "To obtain SSL certificates, run:"
echo -e "${YELLOW}sudo certbot certonly --standalone -d ${DOMAIN} -d www.${DOMAIN}${NC}"
echo -e "Or with Nginx plugin:"
echo -e "${YELLOW}sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"

# Make scripts executable
print_header "Making Scripts Executable"

chmod +x ./scripts/restart-services.sh
success "restart-services.sh is executable"

chmod +x ./scripts/setup-nginx-auth.sh
success "setup-nginx-auth.sh is executable"

# Copy restart script to /usr/local/bin
cp ./scripts/restart-services.sh /usr/local/bin/restart-services
chmod +x /usr/local/bin/restart-services
success "restart-services script installed to /usr/local/bin"

print_header "Setup Complete!"

echo -e "${GREEN}✓ Deployment directory: ${DEPLOY_DIR}${NC}"
echo -e "${GREEN}✓ Nginx is configured and running${NC}"
echo -e "${GREEN}✓ PM2 is ready for process management${NC}"
echo -e "${GREEN}✓ Basic auth is configured for MCP server${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Obtain SSL certificate: sudo certbot --nginx -d ${DOMAIN}"
echo "2. Deploy your application files to ${DEPLOY_DIR}"
echo "3. Run: cd ${DEPLOY_DIR} && npm ci --production"
echo "4. Start services: pm2 start ecosystem.config.js"
echo "5. Save PM2 process list: pm2 save\n"

echo -e "${YELLOW}Commands to manage services:${NC}"
echo "- View status: pm2 status"
echo "- View logs: pm2 logs"
echo "- Restart all: /usr/local/bin/restart-services --restart-all"
echo "- Restart app: /usr/local/bin/restart-services --restart-app"
echo "- Restart MCP: /usr/local/bin/restart-services --restart-mcp"
echo "- Restart Nginx: /usr/local/bin/restart-services --restart-nginx\n"
