# Complete CI/CD Setup - Master Index

Welcome to the comprehensive CI/CD setup for **shadcn-angular.tigayon.com**. This document serves as your master guide to all created files and documentation.

## 🎯 Start Here

### For Quick Setup (5 minutes)
1. Read: [CI-CD-SETUP.md](CI-CD-SETUP.md)
2. Run: `sudo ./scripts/deploy-setup.sh`
3. Configure: Jenkins with [docs/JENKINS-SETUP.md](docs/JENKINS-SETUP.md)

### For Complete Understanding (30 minutes)
1. Review: [SETUP-SUMMARY.md](SETUP-SUMMARY.md) - Overview of all files
2. Study: [docs/ARCHITECTURE-DIAGRAMS.md](docs/ARCHITECTURE-DIAGRAMS.md) - Visual architecture
3. Read: [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md) - Detailed workflow

### For Hands-On Setup (1-2 hours)
1. Follow: [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md)
2. Execute: Each setup step in order
3. Verify: All tests pass before proceeding

---

## 📚 Documentation Index

### Main Documentation Files

| Document | Purpose | Read Time | Audience |
|----------|---------|-----------|----------|
| [CI-CD-SETUP.md](CI-CD-SETUP.md) | Quick reference & overview | 10 min | Everyone |
| [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md) | Complete deployment guide | 30 min | DevOps, Devs |
| [docs/ARCHITECTURE-DIAGRAMS.md](docs/ARCHITECTURE-DIAGRAMS.md) | Visual system architecture | 15 min | Everyone |
| [SETUP-SUMMARY.md](SETUP-SUMMARY.md) | Files created & organization | 10 min | DevOps |
| [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) | Pre-deployment verification | 20 min | DevOps |

### Service-Specific Guides

| Document | Purpose | Read Time | For |
|----------|---------|-----------|-----|
| [docs/JENKINS-SETUP.md](docs/JENKINS-SETUP.md) | Jenkins installation & config | 20 min | Jenkins admin |
| [docs/NGINX-SETUP.md](docs/NGINX-SETUP.md) | Nginx configuration & testing | 20 min | Nginx admin |
| [docs/PM2-SETUP.md](docs/PM2-SETUP.md) | PM2 process management | 15 min | Ops engineer |

---

## 🔧 Configuration Files

### Root Level

#### [Jenkinsfile](Jenkinsfile)
Jenkins CI/CD pipeline definition
- **Size**: ~200 lines
- **Key Stages**: 12 stages from checkout to nginx reload
- **Trigger**: Git push to main branch
- **Usage**: Automated by Jenkins

#### [ecosystem.config.js](ecosystem.config.js)
PM2 process configuration
- **Size**: ~60 lines
- **Apps**: Angular SSR (2 instances) + MCP (1 instance)
- **Features**: Auto-restart, memory limits, clustering
- **Usage**: `pm2 start ecosystem.config.js`

#### [.env.production.example](.env.production.example)
Environment variables template
- **Size**: ~35 lines
- **Content**: Ports, paths, auth, logging
- **Usage**: Copy to `.env.production`, customize for server

### Nginx Configuration

#### [nginx/shadcn-angular.conf](nginx/shadcn-angular.conf)
Nginx reverse proxy configuration
- **Size**: ~250 lines
- **Features**: SSL/TLS, basic auth, rate limiting, compression
- **Usage**: Copy to `/etc/nginx/sites-available/`
- **Auth**: Username `jamel`, Password `jamel`

---

## 🚀 Deployment Scripts

### Initial Setup

#### [scripts/deploy-setup.sh](scripts/deploy-setup.sh)
One-time server setup script
- **Size**: ~150 lines
- **Performs**: Prerequisites check, directory setup, Nginx config, PM2 init
- **Usage**: `sudo ./scripts/deploy-setup.sh`
- **Run Once**: During initial server setup

### Automation Scripts

#### [scripts/jenkins-deploy.sh](scripts/jenkins-deploy.sh)
Jenkins deployment automation script
- **Size**: ~120 lines
- **Performs**: Backup, copy files, install deps, start services
- **Called By**: Jenkins Jenkinsfile
- **Usage**: Automatic (via Jenkins pipeline)

#### [scripts/restart-services.sh](scripts/restart-services.sh)
Comprehensive service management script
- **Size**: ~300 lines
- **Features**: Restart services, health checks, status, logs
- **Usage**: `sudo /usr/local/bin/restart-services [options]`
- **Commands**:
  - `--restart-all` - Restart everything
  - `--restart-app` - Restart Angular app
  - `--restart-mcp` - Restart MCP server
  - `--restart-nginx` - Restart Nginx
  - `--status` - Show status
  - `--logs` - View logs
  - `--health-check` - Health checks

### Utility Scripts

#### [scripts/setup-nginx-auth.sh](scripts/setup-nginx-auth.sh)
Nginx basic authentication setup
- **Size**: ~30 lines
- **Creates**: `/etc/nginx/.htpasswd`
- **Usage**: `sudo ./scripts/setup-nginx-auth.sh`
- **Run Once**: During initial Nginx setup

#### [scripts/mcp-manage.sh](scripts/mcp-manage.sh)
MCP server management utility
- **Size**: ~80 lines
- **Commands**: install, start, stop, restart, status, logs
- **Usage**: `sudo ./scripts/mcp-manage.sh [command]`
- **Run As Needed**: For MCP-specific operations

---

## 📋 Quick Reference

### File Locations on Server

```
/var/www/shadcn-angular/                    # Application root
  ├── dist/                                  # Built application
  ├── mcp-server/                            # MCP server code
  ├── node_modules/                          # Dependencies
  ├── logs/                                  # Application logs
  ├── package.json
  ├── ecosystem.config.js
  └── ...

/etc/nginx/
  ├── sites-available/shadcn-angular        # Nginx config
  ├── sites-enabled/shadcn-angular          # Enabled symlink
  └── .htpasswd                              # MCP auth

/usr/local/bin/
  └── restart-services                       # Service script

/var/log/
  ├── nginx/                                 # Nginx logs
  └── shadcn-angular/                        # App logs

/var/backups/shadcn-angular/                # Deployment backups

/var/lib/jenkins/                           # Jenkins home

/etc/letsencrypt/
  └── live/shadcn-angular.tigayon.com/      # SSL certs
```

### Command Quick Reference

```bash
# View Status
pm2 status
sudo systemctl status nginx
/usr/local/bin/restart-services --status

# View Logs
pm2 logs
sudo tail -f /var/log/nginx/error.log

# Restart Services
/usr/local/bin/restart-services --restart-all
/usr/local/bin/restart-services --restart-app
/usr/local/bin/restart-services --restart-mcp

# Test Endpoints
curl https://shadcn-angular.tigayon.com/
curl -u jamel:jamel https://shadcn-angular.tigayon.com/mcp

# SSH to Server
ssh user@shadcn-angular.tigayon.com
```

### Key Credentials

| Item | Value |
|------|-------|
| Domain | shadcn-angular.tigayon.com |
| MCP Username | jamel |
| MCP Password | jamel |
| App Port | 4200 |
| MCP Port | 3001 |
| Deploy Directory | /var/www/shadcn-angular |

---

## 🔄 Deployment Sequence

### Phase 1: One-Time Server Setup
1. SSH into production server
2. Clone repository
3. Run `sudo ./scripts/deploy-setup.sh`
4. Run `sudo ./scripts/setup-nginx-auth.sh`
5. Obtain SSL certificate with Certbot

### Phase 2: Jenkins Configuration
1. Install Jenkins
2. Create new Pipeline job
3. Configure GitHub webhook
4. Point to this repository

### Phase 3: Continuous Deployment
1. Push to main branch
2. Jenkins automatically builds and deploys
3. Application goes live

### Phase 4: Operational
1. Monitor with PM2 and logs
2. Restart services as needed
3. Update and redeploy via git push

---

## 🎯 What Each File Does

### At Deployment Time (Jenkins Runs)
1. **Jenkinsfile** → Defines all stages
2. **scripts/jenkins-deploy.sh** → Copies files, installs deps
3. **ecosystem.config.js** → Starts PM2 services
4. **nginx/shadcn-angular.conf** → Reloaded by Jenkins

### During Operation
1. **ecosystem.config.js** → Manages PM2 processes
2. **nginx/shadcn-angular.conf** → Routes all traffic
3. **.htpasswd** → Protects MCP endpoint
4. **scripts/restart-services.sh** → Manual service control

### For Maintenance
1. **scripts/restart-services.sh** → Service management
2. **scripts/mcp-manage.sh** → MCP-specific ops
3. **PM2-SETUP.md** → Process info and commands
4. **NGINX-SETUP.md** → Nginx troubleshooting

---

## 🚨 Common Tasks

### View What's Running
```bash
pm2 status
```
See [PM2-SETUP.md](docs/PM2-SETUP.md#commands)

### Restart Everything
```bash
sudo /usr/local/bin/restart-services --restart-all
```
See [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md#restart-services)

### Check Logs for Errors
```bash
pm2 logs
sudo tail -f /var/log/nginx/error.log
```
See [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md#monitoring)

### Update MCP Credentials
```bash
sudo ./scripts/setup-nginx-auth.sh
sudo systemctl reload nginx
```
See [NGINX-SETUP.md](docs/NGINX-SETUP.md#testing)

### Deploy New Version
```bash
git push origin main
# Watch Jenkins build and deploy automatically
```
See [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md#automatic)

---

## 📊 Architecture Overview

```
GitHub Push
   ↓ (webhook)
Jenkins Pipeline
   ├─ Build
   ├─ Test
   ├─ Deploy to /var/www/
   ├─ Start PM2 (port 4200, 3001)
   └─ Reload Nginx (port 443)
       ↓
Production Server Live
   ├─ https://shadcn-angular.tigayon.com/ (public)
   ├─ https://shadcn-angular.tigayon.com/mcp (auth required)
   └─ Users access app
```

---

## 🔐 Security Summary

| Aspect | Implementation |
|--------|-----------------|
| HTTPS | SSL/TLS with Let's Encrypt |
| HSTS | Enforced for 1 year |
| Auth | Basic auth (jamel:jamel) for MCP |
| Rate Limiting | 5-10 req/sec per endpoint |
| Headers | Security headers configured |
| Firewall | Ports 80, 443, 22 open |
| Backups | Automatic per deployment |

---

## ✅ Verification Checklist

See [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) for comprehensive checklist

Quick verification:
```bash
# Check all services running
pm2 status

# Test main endpoint
curl https://shadcn-angular.tigayon.com/health

# Test MCP endpoint
curl -u jamel:jamel https://shadcn-angular.tigayon.com/mcp

# Check Nginx
sudo nginx -t
```

---

## 🆘 Troubleshooting

### Services Not Running
See: [docs/CI-CD-DEPLOYMENT.md#troubleshooting](docs/CI-CD-DEPLOYMENT.md#troubleshooting)

### Nginx Issues
See: [docs/NGINX-SETUP.md#troubleshooting](docs/NGINX-SETUP.md#troubleshooting)

### PM2 Problems
See: [docs/PM2-SETUP.md#troubleshooting](docs/PM2-SETUP.md#troubleshooting)

### Deployment Failures
See: [docs/JENKINS-SETUP.md#troubleshooting](docs/JENKINS-SETUP.md#troubleshooting)

---

## 📞 Support Resources

| Issue | See |
|-------|-----|
| Setup steps | [CI-CD-SETUP.md](CI-CD-SETUP.md) |
| Architecture | [docs/ARCHITECTURE-DIAGRAMS.md](docs/ARCHITECTURE-DIAGRAMS.md) |
| Jenkins | [docs/JENKINS-SETUP.md](docs/JENKINS-SETUP.md) |
| Nginx | [docs/NGINX-SETUP.md](docs/NGINX-SETUP.md) |
| PM2 | [docs/PM2-SETUP.md](docs/PM2-SETUP.md) |
| Deployment | [docs/CI-CD-DEPLOYMENT.md](docs/CI-CD-DEPLOYMENT.md) |
| Verification | [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) |
| File Summary | [SETUP-SUMMARY.md](SETUP-SUMMARY.md) |

---

## 📈 Success Metrics

After deployment, verify:
- ✅ Jenkins builds succeed
- ✅ Application loads in browser
- ✅ Health check endpoint responds
- ✅ MCP accessible with auth
- ✅ Logs show clean startup
- ✅ Zero downtime during deployment
- ✅ SSL certificate valid
- ✅ All services restart successfully

---

## 🎓 Learning Path

1. **Beginner**: Read [CI-CD-SETUP.md](CI-CD-SETUP.md) - Understand overview
2. **Intermediate**: Study [docs/ARCHITECTURE-DIAGRAMS.md](docs/ARCHITECTURE-DIAGRAMS.md) - Visualize system
3. **Advanced**: Read service-specific guides - Master each component
4. **Expert**: Work through [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) - Complete setup

---

## 📝 Document Statistics

| Category | Count | Lines |
|----------|-------|-------|
| Configuration Files | 4 | ~400 |
| Deployment Scripts | 5 | ~700 |
| Documentation | 8 | ~4,000 |
| **Total** | **17** | **~5,100** |

---

## 🎉 You're Ready!

You now have:
- ✅ Complete CI/CD pipeline with Jenkins
- ✅ PM2 process management for 2 applications
- ✅ Nginx reverse proxy with security
- ✅ Basic authentication for MCP
- ✅ Automated deployment scripts
- ✅ Comprehensive documentation
- ✅ Troubleshooting guides
- ✅ Architecture diagrams

**Next Step**: Follow the Quick Start in [CI-CD-SETUP.md](CI-CD-SETUP.md)

---

**Version**: 1.0  
**Last Updated**: January 4, 2026  
**Status**: ✅ Ready for Production  
**Maintained By**: Your Team
