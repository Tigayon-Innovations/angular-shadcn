# CI/CD Deployment Checklist

Complete this checklist to ensure proper setup of the shadcn-angular CI/CD pipeline.

## Pre-Deployment Setup

### Server Prerequisites
- [ ] Ubuntu/Debian server with sudo access
- [ ] Domain name: `shadcn-angular.tigayon.com`
- [ ] DNS records pointing to server IP
- [ ] Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)
- [ ] Minimum 2GB RAM, 10GB disk space

### Software Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Git installed
- [ ] Nginx installed
- [ ] OpenSSL/Certbot available

## Server Setup

### Initial Configuration
- [ ] Clone repository: `git clone https://github.com/your-repo/shadcn-angular.git`
- [ ] Navigate to directory: `cd shadcn-angular`
- [ ] Run setup script: `sudo ./scripts/deploy-setup.sh`
- [ ] Verify all packages installed: `npm ci`

### PM2 Setup
- [ ] Install PM2 globally: `npm install -g pm2`
- [ ] Run startup command: `pm2 startup systemd -u www-data --hp /var/lib/www-data`
- [ ] Copy ecosystem config: `cp ecosystem.config.js /var/www/shadcn-angular/`
- [ ] Start services: `pm2 start ecosystem.config.js`
- [ ] Save process list: `pm2 save`
- [ ] Verify status: `pm2 status`

### Nginx Setup
- [ ] Copy Nginx config: `sudo cp nginx/shadcn-angular.conf /etc/nginx/sites-available/shadcn-angular`
- [ ] Create symlink: `sudo ln -s /etc/nginx/sites-available/shadcn-angular /etc/nginx/sites-enabled/`
- [ ] Test config: `sudo nginx -t`
- [ ] Reload Nginx: `sudo systemctl reload nginx`
- [ ] Create .htpasswd: `sudo ./scripts/setup-nginx-auth.sh`
- [ ] Verify .htpasswd exists: `sudo ls -la /etc/nginx/.htpasswd`

### SSL/TLS Setup
- [ ] Install Certbot: `sudo apt-get install -y certbot python3-certbot-nginx`
- [ ] Obtain certificate: `sudo certbot --nginx -d shadcn-angular.tigayon.com -d www.shadcn-angular.tigayon.com`
- [ ] Verify certificate: `sudo ls -la /etc/letsencrypt/live/shadcn-angular.tigayon.com/`
- [ ] Enable auto-renewal: `sudo systemctl enable certbot.timer`
- [ ] Test renewal: `sudo certbot renew --dry-run`

### Service Scripts
- [ ] Make scripts executable: `chmod +x scripts/*.sh`
- [ ] Copy restart script: `sudo cp scripts/restart-services.sh /usr/local/bin/restart-services`
- [ ] Test restart script: `sudo /usr/local/bin/restart-services --status`
- [ ] Verify MCP script: `chmod +x scripts/mcp-manage.sh`

## Jenkins Setup

### Jenkins Installation
- [ ] Install Jenkins: `sudo apt-get install -y jenkins`
- [ ] Start Jenkins: `sudo systemctl start jenkins`
- [ ] Enable on boot: `sudo systemctl enable jenkins`
- [ ] Access Jenkins: `http://localhost:8080`
- [ ] Get admin password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`

### Jenkins Configuration
- [ ] Complete initial setup wizard
- [ ] Install recommended plugins
- [ ] Install NodeJS plugin
- [ ] Install Pipeline plugin
- [ ] Install GitHub Integration plugin
- [ ] Create NodeJS tool: `nodejs-18` (version 18.x)
- [ ] Configure Credentials:
  - [ ] GitHub SSH key
  - [ ] GitHub OAuth token (optional)
  - [ ] Jenkins sudo credentials

### Jenkins Job Setup
- [ ] Create new Pipeline job: `shadcn-angular`
- [ ] Configure Git repository
- [ ] Set Script Path: `Jenkinsfile`
- [ ] Set branch: `*/main`
- [ ] Enable GitHub webhook trigger
- [ ] Save job configuration

### GitHub Webhook
- [ ] Navigate to GitHub repository settings
- [ ] Go to Settings > Webhooks
- [ ] Click "Add webhook"
- [ ] Payload URL: `http://your-jenkins-url/github-webhook/`
- [ ] Content type: `application/json`
- [ ] Events: `Push events`
- [ ] Active: `Yes`
- [ ] Save webhook

## Jenkinsfile Configuration

### Environment Variables
- [ ] Verify `NODE_ENV = 'production'`
- [ ] Verify `APP_NAME = 'shadcn-angular'`
- [ ] Verify `DOMAIN = 'shadcn-angular.tigayon.com'`
- [ ] Verify `DEPLOY_DIR = '/var/www/shadcn-angular'`
- [ ] Verify `MCP_PORT = '3001'`
- [ ] Verify `APP_PORT = '4200'`

### Pipeline Stages
- [ ] Checkout stage configured
- [ ] Install Dependencies stage configured
- [ ] Lint stage configured
- [ ] Build Angular SSR stage configured
- [ ] Test stage configured
- [ ] Deploy Application stage (main branch only)
- [ ] Deploy MCP Server stage (main branch only)
- [ ] PM2 restart stages configured
- [ ] Health check stage configured
- [ ] Nginx reload stage configured

## Ecosystem Configuration

### Angular App Settings
- [ ] App name: `shadcn-angular`
- [ ] Script: `./dist/server/main.js`
- [ ] Port: 4200
- [ ] Instances: 2 (cluster mode)
- [ ] Max memory: 500M
- [ ] Auto-restart enabled
- [ ] Logs directory: `./logs`

### MCP Server Settings
- [ ] App name: `mcp-server`
- [ ] Script: `./mcp-server/http-server.ts`
- [ ] Port: 3001
- [ ] Instances: 1
- [ ] Max memory: 300M
- [ ] Auto-restart enabled
- [ ] Logs directory: `./logs`

## Nginx Configuration

### Basic Proxy Settings
- [ ] Upstream angular_app on localhost:4200
- [ ] Upstream mcp_server on localhost:3001
- [ ] HTTP to HTTPS redirect configured
- [ ] SSL certificates path correct
- [ ] SSL protocols: TLSv1.2 and TLSv1.3

### Security
- [ ] HSTS header configured
- [ ] Security headers configured
- [ ] Basic auth for MCP endpoint enabled
- [ ] Rate limiting configured
- [ ] Hidden files protection enabled

### Logging
- [ ] Access log path configured
- [ ] MCP access log path configured
- [ ] Error log path configured
- [ ] Log format configured
- [ ] Logs directory exists

### Performance
- [ ] Gzip compression enabled
- [ ] Static asset caching enabled
- [ ] Connection keepalive enabled
- [ ] Proxy buffering optimized
- [ ] Cache control headers set

## Testing

### Local Testing
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm run test` (or test command)
- [ ] Build completes successfully
- [ ] No errors in build output

### Pre-Deployment Testing
- [ ] Git repository configured
- [ ] GitHub webhook working
- [ ] Jenkins can access repository
- [ ] Jenkins can build project
- [ ] Build succeeds in Jenkins
- [ ] Build logs show no errors

### Post-Deployment Testing

#### Application Endpoints
- [ ] `https://shadcn-angular.tigayon.com/` loads successfully
- [ ] `https://shadcn-angular.tigayon.com/health` returns 200
- [ ] Application renders correctly
- [ ] Static assets load (CSS, JS, images)

#### MCP Endpoint
- [ ] `https://shadcn-angular.tigayon.com/mcp` requires authentication
- [ ] Basic auth with `jamel:jamel` works
- [ ] Wrong credentials rejected
- [ ] MCP endpoints respond correctly

#### Nginx
- [ ] `http://shadcn-angular.tigayon.com/` redirects to HTTPS
- [ ] HTTPS connection works
- [ ] SSL certificate is valid
- [ ] No certificate warnings

#### Services
- [ ] `pm2 status` shows both apps running
- [ ] `pm2 logs` shows clean startup
- [ ] `curl http://localhost:4200/health` works
- [ ] `curl http://localhost:3001/health` works
- [ ] Port 4200 listening (netstat)
- [ ] Port 3001 listening (netstat)

#### Logs
- [ ] Nginx access log updated on requests
- [ ] PM2 logs show clean startup
- [ ] No critical errors in logs
- [ ] Deployment logs in Jenkins show success

## Continuous Deployment Testing

### First Deployment
- [ ] Push test commit to main branch
- [ ] Jenkins build triggers automatically
- [ ] Build completes successfully
- [ ] Services restart without errors
- [ ] Application accessible after deployment
- [ ] Health checks pass
- [ ] No downtime during deployment

### Service Restart Testing
- [ ] Test restart script: `sudo /usr/local/bin/restart-services --restart-all`
- [ ] Test individual restart: `sudo /usr/local/bin/restart-services --restart-app`
- [ ] Test Nginx reload: `sudo /usr/local/bin/restart-services --restart-nginx`
- [ ] Check logs after restart
- [ ] Application still accessible after restart

## Monitoring and Logging

### PM2 Monitoring
- [ ] Can view status: `pm2 status`
- [ ] Can view logs: `pm2 logs`
- [ ] Can view individual app logs
- [ ] Process restarts are logged
- [ ] Memory usage is within limits

### Nginx Logging
- [ ] Access log file exists and is updated
- [ ] Error log file exists
- [ ] MCP access log exists
- [ ] Logs are readable (permissions set correctly)
- [ ] Log rotation working (if configured)

### Jenkins Logging
- [ ] Build logs are complete
- [ ] Build artifacts are saved
- [ ] Build history is maintained
- [ ] Logs are accessible after build

## Backup and Recovery

### Backup Strategy
- [ ] Backups created during deployment
- [ ] Backup directory exists: `/var/backups/shadcn-angular`
- [ ] Recent backups present
- [ ] Backup size reasonable
- [ ] Backup compression working

### Recovery Testing
- [ ] Tested backup extraction
- [ ] Tested service restart from backup
- [ ] Verified backup contains all files
- [ ] Recovery procedure documented

## Security Checklist

### Authentication
- [ ] Basic auth credentials set (jamel:jamel)
- [ ] .htpasswd file has correct permissions (644)
- [ ] Password hashed correctly (apr1)
- [ ] Only MCP endpoint requires auth
- [ ] Public endpoints accessible without auth

### SSL/TLS
- [ ] SSL certificate installed and valid
- [ ] Private key secure (permissions 600)
- [ ] TLS versions correct (1.2 and 1.3)
- [ ] Strong ciphers configured
- [ ] HSTS header enabled

### Network
- [ ] Firewall rules configured
- [ ] Only necessary ports open
- [ ] SSH key-based auth configured
- [ ] Password login disabled (optional but recommended)

### Application
- [ ] No secrets in code
- [ ] Environment variables for sensitive data
- [ ] .env files not committed to git
- [ ] Security headers configured
- [ ] CORS configured correctly

## Documentation

### Files Created
- [ ] Jenkinsfile - Jenkins pipeline definition
- [ ] ecosystem.config.js - PM2 configuration
- [ ] nginx/shadcn-angular.conf - Nginx configuration
- [ ] scripts/restart-services.sh - Service management script
- [ ] scripts/deploy-setup.sh - Initial setup script
- [ ] scripts/jenkins-deploy.sh - Jenkins deployment script
- [ ] scripts/setup-nginx-auth.sh - Auth setup script
- [ ] scripts/mcp-manage.sh - MCP management script
- [ ] .env.production.example - Environment template
- [ ] docs/JENKINS-SETUP.md - Jenkins guide
- [ ] docs/NGINX-SETUP.md - Nginx guide
- [ ] docs/PM2-SETUP.md - PM2 guide
- [ ] docs/CI-CD-DEPLOYMENT.md - Deployment guide

### Documentation Review
- [ ] All guides are clear and complete
- [ ] Commands are tested and working
- [ ] File paths are correct
- [ ] Examples are accurate
- [ ] Troubleshooting section covers common issues

## Final Verification

### Pre-Launch Checklist
- [ ] All setup steps completed
- [ ] All tests passing
- [ ] All documentation in place
- [ ] Team aware of deployment
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Recovery procedure tested

### Launch
- [ ] Push initial commit to main
- [ ] Verify Jenkins build succeeds
- [ ] Verify deployment successful
- [ ] Verify all endpoints working
- [ ] Monitor logs for errors
- [ ] Team notified of successful launch

### Post-Launch
- [ ] Monitor application for 24 hours
- [ ] Check error logs for issues
- [ ] Monitor performance metrics
- [ ] Document any issues encountered
- [ ] Plan improvement items

## Sign-Off

- [ ] Setup completed by: _________________
- [ ] Date: _________________
- [ ] Verified by: _________________
- [ ] Date verified: _________________
- [ ] Ready for production: Yes / No

---

**Notes:**
- Keep this checklist for reference
- Update as procedures change
- Use as template for future deployments
- Store in project documentation
