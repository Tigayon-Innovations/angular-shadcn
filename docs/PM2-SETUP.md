# PM2 Configuration Guide for shadcn-angular

## Overview
This guide explains the PM2 ecosystem configuration for managing the Angular SSR application and MCP server.

## Files
- `ecosystem.config.js` - Main PM2 configuration file

## Configuration Details

### Angular SSR Application
- **Name**: `shadcn-angular`
- **Script**: `./dist/server/main.js`
- **Port**: 4200
- **Instances**: 2 (cluster mode for load balancing)
- **Max Memory**: 500MB
- **Auto-restart**: Enabled

### MCP Server
- **Name**: `mcp-server`
- **Script**: `./mcp-server/http-server.ts`
- **Port**: 3001
- **Instances**: 1 (single instance)
- **Max Memory**: 300MB
- **Auto-restart**: Enabled

## Setup Instructions

### 1. Install PM2 Globally
```bash
npm install -g pm2
```

### 2. Setup PM2 to Start on Boot
```bash
pm2 startup systemd -u www-data --hp /var/lib/www-data
pm2 start ecosystem.config.js
pm2 save
```

### 3. Managing Services

#### View Status
```bash
pm2 status
```

#### View Logs
```bash
pm2 logs
pm2 logs shadcn-angular
pm2 logs mcp-server
```

#### Stop Services
```bash
pm2 stop all
pm2 stop shadcn-angular
pm2 stop mcp-server
```

#### Restart Services
```bash
pm2 restart all
pm2 restart shadcn-angular
pm2 restart mcp-server
```

#### Start Services
```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --only shadcn-angular
pm2 start ecosystem.config.js --only mcp-server
```

#### Save/Load Process List
```bash
# Save current process list
pm2 save

# Load process list (runs on reboot if setup with startup)
pm2 resurrect
```

### 4. Monitoring

#### Watch for Changes
PM2 is configured with `watch: false`, so it won't restart on file changes in production.
To enable watching during development:
```bash
pm2 start ecosystem.config.js --watch
```

#### Memory Monitoring
Each process has a maximum memory limit:
- Angular App: 500MB
- MCP Server: 300MB

If memory is exceeded, PM2 will automatically restart the process.

### 5. Log Locations
Logs are stored in the `logs/` directory:
- `angular-error.log` - Angular app errors
- `angular-out.log` - Angular app output
- `angular-combined.log` - Combined Angular logs
- `mcp-error.log` - MCP server errors
- `mcp-out.log` - MCP server output
- `mcp-combined.log` - Combined MCP logs

### 6. Troubleshooting

#### Services Not Starting
```bash
# Check PM2 error logs
pm2 logs

# Check process details
pm2 info shadcn-angular
pm2 info mcp-server

# View PM2 internal logs
pm2 logs PM2
```

#### High Memory Usage
```bash
# Monitor memory in real-time
pm2 monit

# Check which process is using memory
pm2 status
```

#### Port Already in Use
```bash
# Check which process is using the port
lsof -i :4200
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### 7. Health Checks
Implement health check endpoints:

#### Angular App Health
```
GET http://localhost:4200/health
```

#### MCP Server Health
```
GET http://localhost:3001/health
```

## Deployment with Jenkins

The Jenkinsfile will:
1. Stop PM2 services
2. Deploy new files
3. Start PM2 services with the ecosystem config
4. Verify health checks

## Related Files
- [Jenkinsfile](../Jenkinsfile) - CI/CD pipeline
- [Nginx Configuration](../nginx/shadcn-angular.conf) - Reverse proxy
- [Restart Services Script](./restart-services.sh) - Service management
