# shadcn-angular CI/CD Setup Guide

This guide provides complete setup instructions for deploying the Angular SSR application with Jenkins, PM2, Nginx, and the MCP server.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                       │
└────────────────────────┬────────────────────────────────────┘
                         │ (Push to main branch)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Jenkins Pipeline (CI/CD)                    │
│  - Checkout code                                            │
│  - Install dependencies                                     │
│  - Build Angular SSR                                        │
│  - Run tests                                                │
│  - Deploy application & MCP server                          │
│  - Restart PM2 services                                     │
│  - Reload Nginx                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Production Server                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Nginx (Reverse Proxy)                   │  │
│  │  - https://shadcn-angular.tigayon.com              │  │
│  │  - https://shadcn-angular.tigayon.com/mcp (auth)   │  │
│  └────────────┬──────────────────┬─────────────────────┘  │
│               │                  │                         │
│         ┌─────▼────┐       ┌─────▼──────┐                │
│         │  PM2 App │       │ PM2 MCP    │                │
│         │ (port 4200)      │ (port 3001)│                │
│         ├─────────────────┬┴────────────┤                │
│         │ Instance 1      │ Instance 1  │                │
│         │ Instance 2      │             │                │
│         └─────────────────┴─────────────┘                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              System Services                          │  │
│  │  - SSL/TLS (Let's Encrypt)                           │  │
│  │  - PM2 (Process Manager)                             │  │
│  │  - Nginx (Web Server)                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Server Setup (First Time)

```bash
# Clone the repository
git clone https://github.com/your-repo/shadcn-angular.git
cd shadcn-angular

# Run initial setup (requires sudo)
sudo ./scripts/deploy-setup.sh
```

### 2. Jenkins Setup

```bash
# Install Jenkins (see docs/JENKINS-SETUP.md)
sudo apt-get install -y jenkins

# Configure Jenkins and create pipeline job
# Point to this repository's Jenkinsfile
```

### 3. SSL Certificate Setup

```bash
# Obtain SSL certificate with Let's Encrypt
sudo certbot --nginx -d shadcn-angular.tigayon.com -d www.shadcn-angular.tigayon.com
```

### 4. Deploy

Push to main branch and watch Jenkins build and deploy automatically:

```bash
git push origin main
```

## File Structure

```
shadcn-angular/
├── Jenkinsfile                          # Jenkins CI/CD pipeline
├── ecosystem.config.js                  # PM2 process configuration
├── .env.production.example              # Environment variables template
│
├── nginx/
│   └── shadcn-angular.conf             # Nginx reverse proxy config
│
├── scripts/
│   ├── deploy-setup.sh                 # Initial server setup
│   ├── jenkins-deploy.sh               # Jenkins deployment script
│   ├── restart-services.sh             # Service restart utility
│   ├── setup-nginx-auth.sh             # Nginx auth setup
│   └── mcp-manage.sh                   # MCP server management
│
├── docs/
│   ├── JENKINS-SETUP.md                # Jenkins setup guide
│   ├── NGINX-SETUP.md                  # Nginx configuration guide
│   ├── PM2-SETUP.md                    # PM2 management guide
│   └── CI-CD-DEPLOYMENT.md             # This file
│
└── mcp-server/                         # MCP server source code
    ├── package.json
    ├── http-server.ts
    └── ...
```

## Configuration Files

### 1. Jenkinsfile
Main Jenkins pipeline definition with stages for:
- Build
- Test
- Deploy
- Health checks

**Key Variables:**
- `NODE_ENV=production`
- `DEPLOY_DIR=/var/www/shadcn-angular`
- `DOMAIN=shadcn-angular.tigayon.com`

### 2. ecosystem.config.js
PM2 configuration for managing:
- Angular SSR app (port 4200, 2 instances)
- MCP server (port 3001, 1 instance)

**Features:**
- Auto-restart
- Memory limits (500MB app, 300MB MCP)
- Log rotation
- Cluster mode for app

### 3. nginx/shadcn-angular.conf
Nginx reverse proxy configuration:
- HTTP to HTTPS redirect
- SSL/TLS termination
- Basic auth for MCP endpoint
- Rate limiting
- Gzip compression
- Security headers

**Credentials:**
- Username: `jamel`
- Password: `jamel`

### 4. .env.production.example
Environment variables for production deployment:
- Ports and hosts
- File paths
- Authentication settings
- Logging configuration

## Deployment Workflow

### Automatic (GitHub Push)

```
1. Push to main branch
   ↓
2. GitHub webhook triggers Jenkins
   ↓
3. Jenkins clones repository
   ↓
4. npm ci (install dependencies)
   ↓
5. npm run build (build Angular SSR)
   ↓
6. npm run test (run tests)
   ↓
7. Copy dist files to /var/www/shadcn-angular
   ↓
8. Install production dependencies
   ↓
9. Deploy MCP server files
   ↓
10. Stop PM2 services
   ↓
11. Start PM2 services with ecosystem.config.js
   ↓
12. Health checks (verify services running)
   ↓
13. Reload Nginx configuration
   ↓
14. Deployment complete ✓
```

### Manual Deployment

```bash
# From Jenkins dashboard
1. Click "Build Now"
2. Monitor console output
3. Check production server
```

## Service Management

### View Status
```bash
# All services
pm2 status

# Nginx status
sudo systemctl status nginx

# Full health check
/usr/local/bin/restart-services --status
```

### Restart Services

#### From Jenkins Pipeline
Add to Jenkinsfile:
```groovy
stage('Restart Services') {
    steps {
        sh 'sudo /usr/local/bin/restart-services --restart-all'
    }
}
```

#### Manually on Server
```bash
# Restart all services
sudo /usr/local/bin/restart-services --restart-all

# Restart only app
sudo /usr/local/bin/restart-services --restart-app

# Restart only MCP
sudo /usr/local/bin/restart-services --restart-mcp

# Restart only Nginx
sudo /usr/local/bin/restart-services --restart-nginx
```

### View Logs

#### PM2 Logs
```bash
# All logs
pm2 logs

# Angular app logs
pm2 logs shadcn-angular

# MCP server logs
pm2 logs mcp-server

# Last 100 lines
pm2 logs --lines 100
```

#### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/shadcn-angular-access.log

# MCP access logs
sudo tail -f /var/log/nginx/shadcn-angular-mcp.log

# Error logs
sudo tail -f /var/log/nginx/shadcn-angular-error.log
```

## Endpoints

### Public Endpoints
- **Application**: https://shadcn-angular.tigayon.com/
- **Health Check**: https://shadcn-angular.tigayon.com/health
- **API**: https://shadcn-angular.tigayon.com/api/*

### Protected Endpoints
- **MCP Server**: https://shadcn-angular.tigayon.com/mcp
  - **Authentication**: Basic Auth
  - **Username**: `jamel`
  - **Password**: `jamel`

### Testing Endpoints

```bash
# Test main application
curl -k https://shadcn-angular.tigayon.com/

# Test health check
curl -k https://shadcn-angular.tigayon.com/health

# Test MCP endpoint (with auth)
curl -u jamel:jamel -k https://shadcn-angular.tigayon.com/mcp

# Test HTTP to HTTPS redirect
curl -i http://shadcn-angular.tigayon.com/
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check Jenkins logs
sudo tail -f /var/log/jenkins/jenkins.log

# Check npm cache
npm cache clean --force

# Verify Node.js version
node --version
npm --version
```

#### 2. Services Not Starting
```bash
# Check PM2 status
pm2 status

# View PM2 logs
pm2 logs

# Check system resources
free -h
df -h
```

#### 3. Nginx Issues
```bash
# Test configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check ports
sudo netstat -tlnp | grep -E ":(80|443)"
```

#### 4. MCP Server Not Accessible
```bash
# Check if MCP is running
curl -v http://localhost:3001

# Test with auth
curl -u jamel:jamel -v http://localhost:3001

# Check Nginx auth
sudo cat /etc/nginx/.htpasswd
```

#### 5. SSL Certificate Issues
```bash
# Check certificate validity
sudo openssl x509 -in /etc/letsencrypt/live/shadcn-angular.tigayon.com/fullchain.pem -text -noout

# Renew certificate
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal
```

## Security

### Authentication
- **MCP Server**: Basic Auth (username: `jamel`, password: `jamel`)
- **Jenkins**: GitHub OAuth or Jenkins native auth
- **Deployment**: SSH key-based authentication

### Network Security
- **HTTPS/TLS**: All traffic encrypted
- **HSTS**: Enforces HTTPS for 1 year
- **Rate Limiting**: API endpoints protected
- **Security Headers**: XSS, Clickjacking, MIME type protection
- **Hidden Files**: Blocked from web access

### Firewall Rules
```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Allow PM2/Nginx internal only
sudo ufw deny 4200/tcp
sudo ufw deny 3001/tcp
```

## Backup and Recovery

### Automated Backups
Backups are created during deployment:
```bash
/var/backups/shadcn-angular/backup-YYYYMMDD_HHMMSS.tar.gz
```

### Manual Backup
```bash
# Backup application
sudo tar -czf backup-$(date +%Y%m%d_%H%M%S).tar.gz /var/www/shadcn-angular

# Backup Nginx config
sudo tar -czf nginx-backup-$(date +%Y%m%d_%H%M%S).tar.gz /etc/nginx

# Backup PM2
pm2 save
```

### Recovery
```bash
# Stop services
sudo pm2 stop all

# Restore backup
sudo tar -xzf /var/backups/shadcn-angular/backup-YYYYMMDD_HHMMSS.tar.gz -C /

# Restart services
sudo /usr/local/bin/restart-services --restart-all
```

## Monitoring

### Health Checks
```bash
# Automated health checks run in Jenkins pipeline
# Manual check:
/usr/local/bin/restart-services --health-check
```

### Performance Monitoring
```bash
# Real-time monitoring
pm2 monit

# Memory and CPU
pm2 status

# Disk usage
df -h
```

### Log Analysis
```bash
# Last 1000 lines of access log
sudo tail -1000 /var/log/nginx/shadcn-angular-access.log | \
  awk '{print $1, $7}' | sort | uniq -c | sort -rn

# Find errors
sudo grep "error" /var/log/nginx/shadcn-angular-error.log
```

## Maintenance

### Regular Tasks

#### Daily
- Monitor logs for errors
- Check PM2 process health
- Monitor disk space

#### Weekly
- Review error logs
- Check SSL certificate expiration
- Monitor application performance

#### Monthly
- Rotate logs
- Review access patterns
- Update dependencies
- Check security patches

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Build and test
npm run build
npm run test

# Deploy to production
git push origin main
```

## Related Documentation

- [JENKINS-SETUP.md](./docs/JENKINS-SETUP.md) - Detailed Jenkins configuration
- [NGINX-SETUP.md](./docs/NGINX-SETUP.md) - Detailed Nginx configuration
- [PM2-SETUP.md](./docs/PM2-SETUP.md) - Detailed PM2 configuration
- [.env.production.example](./.env.production.example) - Environment variables
- [Jenkinsfile](./Jenkinsfile) - Jenkins pipeline definition
- [ecosystem.config.js](./ecosystem.config.js) - PM2 configuration
- [nginx/shadcn-angular.conf](./nginx/shadcn-angular.conf) - Nginx configuration

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review relevant documentation in `docs/` directory
3. Check log files:
   - Jenkins: `/var/log/jenkins/jenkins.log`
   - PM2: `pm2 logs`
   - Nginx: `/var/log/nginx/`
   - App: `/var/log/shadcn-angular/`
4. Contact the development team

## License

See LICENSE file in repository root.
