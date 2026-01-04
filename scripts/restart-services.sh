#!/bin/bash

###############################################################################
# Restart Services Script for shadcn-angular.tigayon.com
# Restarts Nginx, PM2 services, and MCP Server
# Usage: ./restart-services.sh [--restart-all|--restart-app|--restart-mcp|--restart-nginx]
###############################################################################

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="shadcn-angular"
MCP_NAME="mcp-server"
DEPLOY_DIR="/var/www/shadcn-angular"
LOG_DIR="/var/log/shadcn-angular"
NGINX_ERROR_LOG="/var/log/nginx/error.log"

# Authentication (hardcoded for Jenkins)
JENKINS_USER="jamel"
JENKINS_PASS="jamel"

# Create log directory if it doesn't exist
mkdir -p "${LOG_DIR}"

# Logging function
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${timestamp} [${level}] ${message}" | tee -a "${LOG_DIR}/restart-services.log"
}

# Error handling
error_exit() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    log "ERROR" "$1"
    exit 1
}

# Success message
success() {
    echo -e "${GREEN}✓ $1${NC}"
    log "INFO" "$1"
}

# Info message
info() {
    echo -e "${BLUE}ℹ $1${NC}"
    log "INFO" "$1"
}

# Warning message
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
    log "WARN" "$1"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error_exit "This script must be run as root"
    fi
}

# Check if user is authenticated (basic auth check)
authenticate() {
    # This is called from Jenkins with credentials
    # In a real environment, this would validate against LDAP/OAuth
    if [[ "${JENKINS_USER}" != "jamel" ]] || [[ "${JENKINS_PASS}" != "jamel" ]]; then
        error_exit "Authentication failed"
    fi
    info "User authenticated successfully"
}

# Check service health
check_health() {
    local service=$1
    info "Checking health of ${service}..."

    case $service in
        "app")
            if curl -s http://localhost:4200/health > /dev/null 2>&1; then
                success "Angular app is healthy"
                return 0
            else
                warning "Angular app health check failed"
                return 1
            fi
            ;;
        "mcp")
            if curl -s -u jamel:jamel http://localhost:3001/health > /dev/null 2>&1; then
                success "MCP server is healthy"
                return 0
            else
                warning "MCP server health check failed"
                return 1
            fi
            ;;
        "nginx")
            if systemctl is-active --quiet nginx; then
                success "Nginx is running"
                return 0
            else
                warning "Nginx is not running"
                return 1
            fi
            ;;
    esac
}

# Restart Nginx
restart_nginx() {
    info "Restarting Nginx..."

    # Test Nginx configuration
    if ! nginx -t 2>&1; then
        error_exit "Nginx configuration test failed"
    fi
    success "Nginx configuration is valid"

    # Reload Nginx
    if systemctl reload nginx; then
        success "Nginx reloaded successfully"
        sleep 2
        check_health "nginx"
        return 0
    else
        error_exit "Failed to reload Nginx"
    fi
}

# Restart PM2 App
restart_pm2_app() {
    info "Restarting PM2 ${APP_NAME}..."

    cd "${DEPLOY_DIR}" || error_exit "Cannot access deployment directory"

    # Stop the app
    if pm2 stop "${APP_NAME}" 2>/dev/null; then
        success "Stopped ${APP_NAME}"
    fi

    sleep 2

    # Start the app
    if pm2 start ecosystem.config.js --only "${APP_NAME}"; then
        success "Started ${APP_NAME}"
        pm2 save
        sleep 3
        check_health "app"
        return 0
    else
        error_exit "Failed to start ${APP_NAME}"
    fi
}

# Restart PM2 MCP Server
restart_pm2_mcp() {
    info "Restarting PM2 ${MCP_NAME}..."

    cd "${DEPLOY_DIR}" || error_exit "Cannot access deployment directory"

    # Stop the MCP server
    if pm2 stop "${MCP_NAME}" 2>/dev/null; then
        success "Stopped ${MCP_NAME}"
    fi

    sleep 2

    # Start the MCP server
    if pm2 start ecosystem.config.js --only "${MCP_NAME}"; then
        success "Started ${MCP_NAME}"
        pm2 save
        sleep 3
        check_health "mcp"
        return 0
    else
        error_exit "Failed to start ${MCP_NAME}"
    fi
}

# Restart all services
restart_all() {
    info "Restarting all services..."

    # Restart PM2 services first
    restart_pm2_app || true
    restart_pm2_mcp || true

    # Then restart Nginx
    restart_nginx || true

    info "All services restart complete"
    show_status
}

# Show services status
show_status() {
    echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}Service Status${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}\n"

    pm2 status

    echo -e "\n${BLUE}Nginx Status:${NC}"
    systemctl status nginx --no-pager | head -5

    echo -e "\n${BLUE}Port Status:${NC}"
    netstat -tlnp 2>/dev/null | grep -E ":(4200|3001)" || echo "Ports not yet listening"

    echo -e "\n${BLUE}═══════════════════════════════════════${NC}\n"
}

# Show logs
show_logs() {
    local service=$1
    case $service in
        "app")
            echo -e "\n${BLUE}Angular App Logs (last 50 lines):${NC}"
            pm2 logs "${APP_NAME}" --nostream --lines 50
            ;;
        "mcp")
            echo -e "\n${BLUE}MCP Server Logs (last 50 lines):${NC}"
            pm2 logs "${MCP_NAME}" --nostream --lines 50
            ;;
        "nginx")
            echo -e "\n${BLUE}Nginx Error Logs (last 50 lines):${NC}"
            tail -50 "${NGINX_ERROR_LOG}"
            ;;
        "all")
            echo -e "\n${BLUE}All Logs:${NC}"
            pm2 logs --nostream --lines 50
            ;;
    esac
}

# Display usage information
usage() {
    cat << EOF
${BLUE}Usage: $0 [OPTION]${NC}

OPTIONS:
    --restart-all      Restart all services (PM2 app, MCP, and Nginx)
    --restart-app      Restart only the Angular app (PM2)
    --restart-mcp      Restart only the MCP server (PM2)
    --restart-nginx    Restart only Nginx
    --status           Show status of all services
    --logs [service]   Show logs for service (app|mcp|nginx|all)
    --health-check     Run health checks on all services
    --help             Display this help message

EXAMPLES:
    $0 --restart-all
    $0 --restart-app
    $0 --logs app
    $0 --status

EOF
}

# Main script logic
main() {
    check_root

    # Parse command line arguments
    case "${1:-}" in
        --restart-all)
            restart_all
            ;;
        --restart-app)
            restart_pm2_app
            ;;
        --restart-mcp)
            restart_pm2_mcp
            ;;
        --restart-nginx)
            restart_nginx
            ;;
        --status)
            show_status
            ;;
        --logs)
            show_logs "${2:-all}"
            ;;
        --health-check)
            info "Running health checks..."
            check_health "app"
            check_health "mcp"
            check_health "nginx"
            ;;
        --help)
            usage
            ;;
        *)
            echo -e "${RED}Invalid option${NC}\n"
            usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
