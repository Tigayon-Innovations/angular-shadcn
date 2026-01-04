# Jenkins Setup Guide for shadcn-angular CI/CD

## Overview
This guide provides setup and usage instructions for the Jenkins CI/CD pipeline for Angular SSR deployment.

## Files
- `Jenkinsfile` - Main pipeline definition

## Jenkins Setup

### 1. Install Jenkins

#### On Ubuntu/Debian
```bash
# Install Java
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update
sudo apt-get install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### Get Initial Admin Password
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### 2. Configure Jenkins

#### Access Jenkins
Open http://localhost:8080 in your browser

#### Install Recommended Plugins
- Pipeline
- GitHub Integration
- NodeJS Plugin
- Timestamper
- Log Parser
- Email Extension

#### Install Additional Plugins
- Node.js Plugin
- SSH Agent
- Credentials Binding

### 3. Configure Credentials

#### SSH Key for Git
1. Go to Jenkins > Manage Jenkins > Manage Credentials
2. Create new SSH credential with your GitHub private key
3. Add GitHub public key to your repository

#### System Credentials
1. Create credential for deployment user
2. Add credential for MCP authentication

### 4. Create New Job

#### Pipeline Job
1. Go to Jenkins Dashboard
2. Click "New Item"
3. Enter job name: "shadcn-angular"
4. Select "Pipeline"
5. Click OK

#### Pipeline Configuration
1. In Pipeline section, select "Pipeline script from SCM"
2. Select "Git"
3. Enter repository URL: https://github.com/your-repo/shadcn-angular.git
4. Select credentials
5. Set branch: */main
6. Script path: Jenkinsfile

### 5. Configure Webhooks (GitHub)

#### GitHub Repository Settings
1. Go to Settings > Webhooks
2. Click "Add webhook"
3. Payload URL: http://your-jenkins-url/github-webhook/
4. Content type: application/json
5. Events: Push events
6. Active: Yes

### 6. Node.js Configuration

#### Install Node.js Plugin
- Go to Jenkins > Manage Jenkins > Manage Plugins
- Search for "NodeJS"
- Install plugin

#### Configure Node.js
1. Go to Jenkins > Manage Jenkins > Global Tool Configuration
2. Find "NodeJS" section
3. Click "Add NodeJS"
4. Name: nodejs-18
5. Version: v18.x (or your preferred version)
6. Save

#### Update Jenkinsfile
Ensure Jenkinsfile has:
```groovy
tools {
    nodejs 'nodejs-18'
}
```

## Pipeline Stages

### 1. Checkout
- Clones the repository
- Checks out the branch triggering the build

### 2. Install Dependencies
- Runs `npm ci` for clean install

### 3. Lint
- Runs linter (non-blocking)

### 4. Build Angular SSR
- Runs `npm run build`
- Generates optimized production build

### 5. Test
- Runs test suite with vitest
- Non-blocking (won't fail pipeline)

### 6. Deploy Application
- Only runs on `main` branch
- Copies dist files to deployment directory
- Installs production dependencies

### 7. Deploy MCP Server
- Only runs on `main` branch
- Copies MCP server files
- Installs MCP dependencies

### 8. Stop PM2 Services
- Stops Angular app and MCP server

### 9. Start PM2 Services
- Starts services with ecosystem config
- Saves PM2 process list

### 10. Verify Health Check
- Checks if services are responding
- Verifies ports are listening

### 11. Reload Nginx
- Tests Nginx configuration
- Reloads Nginx to apply changes

### 12. Create Restart Script
- Copies restart script to `/usr/local/bin`

## Running the Pipeline

### Manual Trigger
1. Go to Jenkins Dashboard
2. Click "Build Now"
3. Monitor build progress in console

### Automatic Trigger
- Pipeline runs automatically on Git push to `main` branch
- Webhook must be configured in GitHub

### View Build Logs
1. Click on build number
2. Select "Console Output"
3. View real-time logs

## Environment Variables

### Global Variables
Set in Jenkins Configuration:

```groovy
NODE_ENV = 'production'
APP_NAME = 'shadcn-angular'
DOMAIN = 'shadcn-angular.tigayon.com'
MCP_PORT = '3001'
APP_PORT = '4200'
DEPLOY_DIR = '/var/www/shadcn-angular'
```

### Build-Specific Variables
```groovy
BUILD_NUMBER
BUILD_ID
GIT_BRANCH
GIT_COMMIT
```

## Deployment Directory Structure

```
/var/www/shadcn-angular/
├── dist/                      # Built application
├── mcp-server/               # MCP server code
├── node_modules/             # Dependencies
├── logs/                      # PM2 logs
├── package.json
├── ecosystem.config.js
└── ...
```

## Post-Deployment

### Verify Deployment
1. Check PM2 status
2. Run health checks
3. Verify Nginx is serving content
4. Test MCP endpoint with auth

### Restart Services (from Jenkins)
```bash
# Run restart script
/usr/local/bin/restart-services --restart-all

# Check status
/usr/local/bin/restart-services --status

# View logs
/usr/local/bin/restart-services --logs all
```

## Troubleshooting

### Build Failures

#### Node.js Not Found
```groovy
// Ensure Jenkins has nodejs 'nodejs-18' configured
tools {
    nodejs 'nodejs-18'
}
```

#### Permission Denied
```bash
# Ensure Jenkins user has sudo access
sudo visudo
# Add: jenkins ALL=(ALL) NOPASSWD: ALL
```

#### Port Already in Use
```bash
# Kill existing process
sudo lsof -i :4200
sudo kill -9 <PID>
```

### Pipeline Issues

#### Stuck Build
1. Click "Stop" button in Jenkins UI
2. Check system resources
3. View console output for errors

#### Services Not Starting
```bash
# SSH to server and check
sudo pm2 status
sudo pm2 logs
```

#### Nginx Reload Failed
```bash
# Test configuration
sudo nginx -t

# Fix any errors and reload
sudo systemctl reload nginx
```

## Backup and Recovery

### Backup Build Artifacts
```bash
# Jenkins stores builds in /var/lib/jenkins/jobs
sudo tar -czf jenkins-backup.tar.gz /var/lib/jenkins
```

### Rollback Failed Deployment
```bash
# Restore from backup
sudo tar -xzf /var/backups/shadcn-angular/backup-<timestamp>.tar.gz -C /

# Restart services
/usr/local/bin/restart-services --restart-all
```

## Monitoring

### Jenkins Monitoring
- Monitor Jenkins system load
- Monitor disk space for build artifacts
- Monitor pipeline execution times

### Deployment Monitoring
- Monitor application memory usage
- Monitor response times
- Monitor error rates

### Commands
```bash
# View PM2 monitoring
sudo pm2 monit

# View logs
sudo pm2 logs

# Check disk space
df -h

# Check memory
free -h
```

## Related Files
- [PM2 Configuration](../ecosystem.config.js) - Process management
- [Nginx Configuration](../nginx/shadcn-angular.conf) - Reverse proxy
- [Restart Services Script](../scripts/restart-services.sh) - Service management
- [Environment Variables](../.env.production.example) - Configuration
