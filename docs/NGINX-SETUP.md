# Nginx Configuration Guide for shadcn-angular.tigayon.com

## Overview
This guide explains the Nginx configuration for the Angular SSR application and MCP server.

## Files
- `nginx/shadcn-angular.conf` - Main Nginx configuration

## Configuration Features

### 1. SSL/TLS
- HTTP to HTTPS redirect
- TLS 1.2 and 1.3 support
- SSL/TLS session caching
- HSTS header for security

### 2. Reverse Proxy
- **Angular SSR**: Port 4200 (upstream: `angular_app`)
- **MCP Server**: Port 3001 (upstream: `mcp_server`)

### 3. Security
- Basic authentication for MCP endpoint (username: `jamel`, password: `jamel`)
- Security headers (X-Frame-Options, Content-Security-Policy, etc.)
- Hidden files protection
- Rate limiting for API endpoints

### 4. Performance
- Gzip compression for text, CSS, JS, fonts
- Static asset caching (images, fonts, CSS, JS)
- Connection keepalive
- Proxy buffering optimization

### 5. Rate Limiting
- API endpoints: 10 requests/sec (burst 30)
- MCP endpoint: 5 requests/sec (burst 20)
- Application: 10 requests/sec (burst 30)

## Setup Instructions

### 1. Install Nginx
```bash
sudo apt-get update
sudo apt-get install -y nginx
```

### 2. Copy Configuration
```bash
sudo cp nginx/shadcn-angular.conf /etc/nginx/sites-available/shadcn-angular
sudo ln -s /etc/nginx/sites-available/shadcn-angular /etc/nginx/sites-enabled/shadcn-angular
```

### 3. Setup Basic Authentication

#### Generate .htpasswd File
```bash
# Using setup script
sudo ./scripts/setup-nginx-auth.sh

# Or manually
sudo htpasswd -c /etc/nginx/.htpasswd jamel
# Enter password: jamel
```

#### Verify File
```bash
sudo cat /etc/nginx/.htpasswd
# Should show: jamel:$apr1$...
```

### 4. Test Nginx Configuration
```bash
sudo nginx -t
# Should output: syntax is ok, test is successful
```

### 5. Start/Reload Nginx
```bash
# Start Nginx
sudo systemctl start nginx

# Reload configuration
sudo systemctl reload nginx

# Enable on boot
sudo systemctl enable nginx
```

## SSL/TLS Setup

### Using Let's Encrypt with Certbot

#### Install Certbot
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

#### Obtain Certificate
```bash
# Automatic renewal with Nginx plugin
sudo certbot --nginx -d shadcn-angular.tigayon.com -d www.shadcn-angular.tigayon.com

# Or standalone
sudo certbot certonly --standalone -d shadcn-angular.tigayon.com -d www.shadcn-angular.tigayon.com
```

#### Auto-renewal
```bash
# Enable auto-renewal
sudo systemctl enable certbot.timer

# Check renewal
sudo certbot renew --dry-run
```

## Endpoints

### Public Endpoints
- **Root**: https://shadcn-angular.tigayon.com/
- **Health Check**: https://shadcn-angular.tigayon.com/health
- **API**: https://shadcn-angular.tigayon.com/api/*

### Protected Endpoints
- **MCP Server**: https://shadcn-angular.tigayon.com/mcp
  - Requires basic auth (username: `jamel`, password: `jamel`)

## Testing

### Test Root Endpoint
```bash
curl -k https://shadcn-angular.tigayon.com/
```

### Test Health Check
```bash
curl -k https://shadcn-angular.tigayon.com/health
```

### Test MCP Endpoint (with auth)
```bash
curl -u jamel:jamel -k https://shadcn-angular.tigayon.com/mcp
```

### Test HTTP to HTTPS Redirect
```bash
curl -i http://shadcn-angular.tigayon.com/
# Should show: 301 Moved Permanently
```

## Logging

Logs are stored in:
- **Access Log**: `/var/log/nginx/shadcn-angular-access.log`
- **MCP Log**: `/var/log/nginx/shadcn-angular-mcp.log`
- **Error Log**: `/var/log/nginx/shadcn-angular-error.log`
- **Nginx Error**: `/var/log/nginx/error.log`

### View Logs
```bash
# Real-time logs
sudo tail -f /var/log/nginx/shadcn-angular-access.log

# MCP logs
sudo tail -f /var/log/nginx/shadcn-angular-mcp.log

# Last 100 lines
sudo tail -100 /var/log/nginx/shadcn-angular-access.log
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 80/443
sudo lsof -i :80
sudo lsof -i :443

# Kill process if needed
sudo kill -9 <PID>
```

### Configuration Errors
```bash
# Test config
sudo nginx -t

# View syntax errors
sudo nginx -T | grep -A 5 "error"
```

### SSL Certificate Issues
```bash
# Check certificate validity
sudo openssl x509 -in /etc/letsencrypt/live/shadcn-angular.tigayon.com/fullchain.pem -text -noout

# Renew certificate
sudo certbot renew --force-renewal
```

### Authentication Not Working
```bash
# Verify .htpasswd file exists and has content
sudo ls -la /etc/nginx/.htpasswd
sudo cat /etc/nginx/.htpasswd

# Recreate if needed
sudo ./scripts/setup-nginx-auth.sh
```

### Services Not Responding
```bash
# Check if backend services are running
sudo lsof -i :4200
sudo lsof -i :3001

# Check netstat
sudo netstat -tlnp | grep -E ":(4200|3001)"
```

## Security Headers Explained

### Strict-Transport-Security (HSTS)
Forces HTTPS for all future requests. Valid for 1 year.

### X-Frame-Options
Prevents clickjacking attacks. Only allows same-origin frames.

### X-Content-Type-Options
Prevents MIME type sniffing. Forces browser to respect Content-Type.

### Content-Security-Policy
Restricts resources that can be loaded. Helps prevent XSS attacks.

## Performance Optimization

### Gzip Compression
Enabled for:
- text/plain
- text/css
- text/xml
- text/javascript
- application/json
- application/javascript
- application/xml+rss
- font/truetype, font/opentype
- image/svg+xml

### Caching Strategy
- **Static Assets**: 30 days (images, fonts, CSS, JS)
- **HTML**: 1 hour
- **Dynamic Content**: No cache (must-revalidate)

## Related Files
- [Jenkinsfile](../Jenkinsfile) - CI/CD pipeline
- [PM2 Configuration](../ecosystem.config.js) - Process management
- [Restart Services Script](./scripts/restart-services.sh) - Service management
