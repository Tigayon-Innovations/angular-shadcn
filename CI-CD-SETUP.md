# Complete CI/CD Setup for shadcn-angular.tigayon.com

## 📋 Overview

This comprehensive CI/CD setup includes:
- **Jenkins Pipeline** - Automated build, test, and deployment
- **PM2 Process Manager** - Manages Angular SSR app (2 instances) and MCP server
- **Nginx Reverse Proxy** - HTTPS termination, load balancing, security
- **SSL/TLS** - Let's Encrypt certificate management
- **Basic Authentication** - MCP server protected with credentials
- **Service Management** - Restart scripts and automation

## 🚀 Quick Start

### 1. Initial Server Setup
```bash
# Clone repository
git clone https://github.com/your-repo/shadcn-angular.git
cd shadcn-angular

# Run initial setup (requires sudo)
sudo ./scripts/deploy-setup.sh
```

### 2. Set Up SSL Certificate
```bash
sudo certbot --nginx -d shadcn-angular.tigayon.com -d www.shadcn-angular.tigayon.com
```

### 3. Configure Jenkins
- Create new Pipeline job pointing to this repository
- Set Jenkinsfile path: `Jenkinsfile`
- Configure GitHub webhook for automatic deployment
- See [docs/JENKINS-SETUP.md](docs/JENKINS-SETUP.md) for details

### 4. Deploy
```bash
git push origin main
# Jenkins will automatically build and deploy
```

## 📁 File Structure

```
shadcn-angular/
├── Jenkinsfile                    # Jenkins CI/CD pipeline
├── ecosystem.config.js            # PM2 configuration
├── .env.production.example        # Environment variables template
│
├── nginx/
│   └── shadcn-angular.conf       # Nginx reverse proxy config
│
├── scripts/
│   ├── deploy-setup.sh           # Initial server setup script
│   ├── jenkins-deploy.sh         # Jenkins deployment script
│   ├── restart-services.sh       # Service restart utility
│   ├── setup-nginx-auth.sh       # Nginx basic auth setup
│   └── mcp-manage.sh             # MCP server management
│
└── docs/
    ├── CI-CD-DEPLOYMENT.md       # Complete deployment guide
    ├── JENKINS-SETUP.md          # Jenkins configuration guide
    ├── NGINX-SETUP.md            # Nginx configuration guide
    ├── PM2-SETUP.md              # PM2 management guide
    └── DEPLOYMENT-CHECKLIST.md   # Pre-deployment checklist
```

## 🔧 Key Configuration

### Application Architecture
```
GitHub Repository
    ↓ (webhook trigger)
Jenkins Pipeline
    ├── Checkout
    ├── Install Dependencies
    ├── Build Angular SSR
    ├── Run Tests
    ├── Deploy App & MCP
    ├── Start PM2 Services
    └── Reload Nginx
         ↓
    Production Server (https://shadcn-angular.tigayon.com)
         ↓
    Nginx (SSL/TLS, Auth, Rate Limiting)
         ├── Port 4200 (Angular SSR) - 2 instances
         └── Port 3001 (MCP Server) - 1 instance
```

### Services & Ports
| Service | Port | Instances | Manager | Status |
|---------|------|-----------|---------|--------|
| Angular SSR | 4200 | 2 | PM2 | `pm2 status` |
| MCP Server | 3001 | 1 | PM2 | `pm2 status` |
| Nginx | 80/443 | 1 | systemd | `systemctl status nginx` |

### Authentication
| Endpoint | Auth | Username | Password |
|----------|------|----------|----------|
| https://shadcn-angular.tigayon.com/ | None | - | - |
| https://shadcn-angular.tigayon.com/mcp | Basic | jamel | jamel |

## 📚 Documentation

### Setup Guides
1. **[CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md)** - Complete deployment guide
   - Architecture overview
   - Workflow explanation
   - Service management commands
   - Troubleshooting guide

2. **[JENKINS-SETUP.md](docs/JENKINS-SETUP.md)** - Jenkins configuration
   - Installation steps
   - Job setup
   - Pipeline stages
   - Build troubleshooting

3. **[NGINX-SETUP.md](docs/NGINX-SETUP.md)** - Nginx configuration
   - Reverse proxy setup
   - SSL/TLS configuration
   - Security features
   - Testing endpoints

4. **[PM2-SETUP.md](docs/PM2-SETUP.md)** - PM2 process management
   - Service configuration
   - CLI commands
   - Monitoring
   - Troubleshooting

5. **[DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md)** - Pre-deployment checklist
   - Complete setup verification
   - Testing procedures
   - Sign-off template

## 🛠️ Management Commands

### View Status
```bash
# All services
pm2 status

# Detailed info
pm2 info shadcn-angular
pm2 info mcp-server

# Nginx status
sudo systemctl status nginx
```

### Restart Services
```bash
# All services (Nginx + PM2)
sudo /usr/local/bin/restart-services --restart-all

# Only Angular app
sudo /usr/local/bin/restart-services --restart-app

# Only MCP server
sudo /usr/local/bin/restart-services --restart-mcp

# Only Nginx
sudo /usr/local/bin/restart-services --restart-nginx

# View status
sudo /usr/local/bin/restart-services --status

# Health checks
sudo /usr/local/bin/restart-services --health-check
```

### View Logs
```bash
# All PM2 logs
pm2 logs

# Angular app logs
pm2 logs shadcn-angular --lines 100

# MCP server logs
pm2 logs mcp-server --lines 100

# Nginx access logs
sudo tail -f /var/log/nginx/shadcn-angular-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# MCP access logs
sudo tail -f /var/log/nginx/shadcn-angular-mcp.log
```

## 🔐 Security Features

### Authentication
- **MCP Endpoint**: Protected with HTTP Basic Authentication
  - Username: `jamel`
  - Password: `jamel`

### Encryption
- **HTTPS/TLS**: All traffic encrypted (TLS 1.2 & 1.3)
- **HSTS**: Enforces HTTPS for 1 year
- **SSL Session Caching**: Performance optimization

### Network Security
- **Rate Limiting**: API endpoints protected (10-5 req/sec)
- **Security Headers**: XSS, Clickjacking, MIME type protection
- **Hidden Files**: Blocked from web access
- **Firewall**: Only HTTP/HTTPS/SSH open

### Application Security
- **Cluster Mode**: Load balanced across 2 instances
- **Auto-restart**: Services restart on failure
- **Memory Limits**: Prevent memory leaks
- **Process Monitoring**: Continuous health checks

## 📊 Monitoring & Logs

### Log Locations
```
Application Logs:      /var/log/shadcn-angular/
                      - angular-error.log
                      - angular-out.log
                      - angular-combined.log
                      - mcp-error.log
                      - mcp-out.log
                      - mcp-combined.log

Nginx Logs:           /var/log/nginx/
                      - shadcn-angular-access.log
                      - shadcn-angular-mcp.log
                      - error.log

Jenkins Logs:         /var/log/jenkins/
                      - jenkins.log

Backup Logs:          /var/backups/shadcn-angular/
                      - backup-YYYYMMDD_HHMMSS.tar.gz
```

### Real-time Monitoring
```bash
# Watch all services
pm2 monit

# Watch Nginx traffic
sudo tcpdump -i eth0 'tcp port 443'

# Monitor disk/memory
watch -n 1 'df -h && free -h'
```

## 🚢 Deployment Workflow

### Automatic Deployment (GitHub Push)
```
1. Developer pushes to main branch
   ↓
2. GitHub webhook triggers Jenkins
   ↓
3. Jenkins clones repository & installs dependencies
   ↓
4. Builds Angular SSR application
   ↓
5. Runs automated tests
   ↓
6. Deploys to /var/www/shadcn-angular
   ↓
7. Restarts PM2 services
   ↓
8. Runs health checks
   ↓
9. Reloads Nginx configuration
   ↓
✓ Deployment complete (no downtime with rolling restart)
```

### Manual Deployment
```bash
# Via Jenkins UI
1. Go to Jenkins Dashboard
2. Click "Build Now"
3. Monitor build progress
4. Check production deployment

# Via Server
sudo /usr/local/bin/restart-services --restart-all
```

## 🧪 Testing

### Test Endpoints
```bash
# Main application
curl -k https://shadcn-angular.tigayon.com/

# Health check
curl -k https://shadcn-angular.tigayon.com/health

# MCP endpoint (with auth)
curl -u jamel:jamel https://shadcn-angular.tigayon.com/mcp

# HTTP to HTTPS redirect
curl -i http://shadcn-angular.tigayon.com/
# Should show: 301 Moved Permanently
```

### Build Verification
```bash
# Local build test
npm ci
npm run build
npm run test

# Check build output
ls -la dist/
```

## 🐛 Troubleshooting

### Common Issues

**Services not starting:**
```bash
pm2 status
pm2 logs
sudo systemctl status nginx
```

**Port already in use:**
```bash
sudo lsof -i :4200
sudo lsof -i :3001
sudo kill -9 <PID>
```

**Nginx configuration error:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

**SSL certificate issues:**
```bash
sudo certbot renew --dry-run
sudo openssl x509 -in /etc/letsencrypt/live/shadcn-angular.tigayon.com/fullchain.pem -text -noout
```

See [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md#troubleshooting) for detailed troubleshooting.

## 💾 Backup & Recovery

### Automatic Backups
Created during deployment:
```bash
/var/backups/shadcn-angular/backup-YYYYMMDD_HHMMSS.tar.gz
```

### Manual Backup
```bash
sudo tar -czf backup-$(date +%Y%m%d_%H%M%S).tar.gz /var/www/shadcn-angular
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

## 📋 Pre-Deployment Checklist

Before deploying, verify:
- [ ] Server has minimum 2GB RAM, 10GB disk
- [ ] Domain DNS records configured
- [ ] Ports 80, 443, 22 open in firewall
- [ ] All scripts have execute permissions
- [ ] Jenkins configured and connected
- [ ] GitHub webhook configured
- [ ] SSL certificate obtained
- [ ] Environment variables set
- [ ] Nginx configuration tested
- [ ] PM2 services configured
- [ ] Backups configured

See [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) for complete checklist.

## 📞 Support

For issues or questions:

1. Check relevant documentation in `docs/` directory
2. Review log files for error details
3. Test manually on production server
4. Check GitHub issues or team communication

### Key Log Files
```bash
# View app logs
pm2 logs

# View Nginx errors
sudo tail -f /var/log/nginx/error.log

# View Jenkins logs
sudo tail -f /var/log/jenkins/jenkins.log
```

## 📝 Files Summary

| File | Purpose | Frequency |
|------|---------|-----------|
| Jenkinsfile | CI/CD pipeline | Every push |
| ecosystem.config.js | PM2 configuration | Per deployment |
| nginx/shadcn-angular.conf | Nginx reverse proxy | Per setup |
| scripts/restart-services.sh | Service management | On-demand |
| scripts/deploy-setup.sh | Initial setup | Once per server |
| docs/* | Documentation | Reference |

## 🎯 Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Page Load Time | < 2s | Browser DevTools |
| API Response | < 200ms | curl/Postman |
| Memory Usage | < 500MB app | pm2 monit |
| CPU Usage | < 50% | pm2 monit |
| Uptime | > 99.9% | pm2 status |

## 📦 What's Included

✅ **Jenkins Pipeline** - Full CI/CD automation  
✅ **PM2 Configuration** - Process management for 2 apps  
✅ **Nginx Setup** - Reverse proxy with SSL/TLS  
✅ **Basic Authentication** - MCP server protection  
✅ **Service Scripts** - Restart and management utilities  
✅ **Complete Documentation** - Setup and troubleshooting guides  
✅ **Automated Backups** - Deployment rollback capability  
✅ **Health Checks** - Service monitoring  

## 🔄 Workflow Summary

```
Development    Jenkins         Production      Users
   ↓             ↓                ↓              ↓
   
git push    →  Build test    →  Deploy      →  Access
main            Deploy           Verify        App
                Health check     Restart    https://...
                                Services
                                 ↓
                            (Live in < 5 min)
```

## 📞 Next Steps

1. **Read** [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md)
2. **Run** `sudo ./scripts/deploy-setup.sh`
3. **Configure** Jenkins and GitHub webhook
4. **Obtain** SSL certificate with Certbot
5. **Test** by pushing to main branch
6. **Monitor** deployment in Jenkins console

---

**Version:** 1.0  
**Last Updated:** January 4, 2026  
**Domain:** shadcn-angular.tigayon.com  
**Credentials:** jamel:jamel (MCP auth)
