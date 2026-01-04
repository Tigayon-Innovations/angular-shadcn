# CI/CD Architecture & Workflow Diagrams

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL WORLD                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Users                    GitHub              Jenkins              │
│  (Browser)                (Repository)        (CI/CD Server)       │
│    │                         │                    │                │
│    │                         │                    │                │
└────┼─────────────────────────┼────────────────────┼────────────────┘
     │                         │                    │
     │ https request           │ webhook trigger    │ build & deploy
     │                         │                    │
     ▼                         ▼                    ▼
┌────────────────────────────────────────────────────────────────────┐
│                     PRODUCTION SERVER                               │
│                  shadcn-angular.tigayon.com                        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │         NGINX (Reverse Proxy - Port 80/443)                 │  │
│  │                                                              │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  HTTP to HTTPS Redirect (Port 80)                   │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  HTTPS Termination (Port 443)                       │  │  │
│  │  │  - SSL/TLS (Let's Encrypt)                          │  │  │
│  │  │  - Security Headers                                 │  │  │
│  │  │  - Rate Limiting                                    │  │  │
│  │  │  - Gzip Compression                                 │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ┌─────────────┬──────────────┬──────────────────┐          │  │
│  │  │             │              │                  │          │  │
│  │  ▼             ▼              ▼                  ▼          │  │
│  │ /        /health          /api/*             /mcp          │  │
│  │ (static) (health check)  (API calls)      (MCP Server)     │  │
│  │                                           + Basic Auth      │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                    │                │              │               │
│                    ▼                ▼              ▼               │
│  ┌─────────────────────────────┐  ┌──────────────────────┐        │
│  │   PM2 - shadcn-angular      │  │  PM2 - mcp-server    │        │
│  │                              │  │                      │        │
│  │  ┌──────────┬──────────┐    │  │  ┌────────────────┐  │        │
│  │  │ Instance │ Instance │    │  │  │   Instance 1   │  │        │
│  │  │    1     │    2     │    │  │  └────────────────┘  │        │
│  │  └────┬─────┴────┬─────┘    │  │       Port 3001      │        │
│  │       └──────┬───┘          │  └──────────────────────┘        │
│  │       Port 4200             │                                   │
│  │   (Cluster Mode)            │     MCP Services                  │
│  │  (Load Balanced)            │     - Component metadata         │
│  │                              │     - HTTP Server               │
│  │  Angular SSR Services        │                                  │
│  │  - Server-side rendering     │                                  │
│  │  - Dynamic content           │                                  │
│  │  - API endpoints             │                                  │
│  └─────────────────────────────┘                                   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              SUPPORT SERVICES                               │  │
│  │  - SSL/TLS (Let's Encrypt)                                  │  │
│  │  - Process Management (PM2)                                 │  │
│  │  - Logging & Monitoring                                     │  │
│  │  - Automatic Backups                                        │  │
│  │  - Health Checks                                            │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Deployment Pipeline Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    DEVELOPER                                 │
│                   (Git Push)                                 │
└──────────────────────┬───────────────────────────────────────┘
                       │ git push origin main
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  GITHUB WEBHOOK                              │
│              (Triggers Jenkins)                              │
└──────────────────────┬───────────────────────────────────────┘
                       │ trigger
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  JENKINS PIPELINE                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 1: Checkout                                  │   │
│  │ - Clone repository                                 │   │
│  │ - Checkout commit                                  │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 2: Install Dependencies                      │   │
│  │ - npm ci (clean install)                           │   │
│  │ - Install all required packages                    │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 3: Lint (Non-blocking)                       │   │
│  │ - Run linter                                       │   │
│  │ - Check code quality                               │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 4: Build Angular SSR                         │   │
│  │ - npm run build                                    │   │
│  │ - Generate dist/ directory                         │   │
│  │ - Optimize for production                          │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 5: Test (Non-blocking)                       │   │
│  │ - npm run test                                     │   │
│  │ - Run test suite with vitest                       │   │
│  │ - Generate coverage reports                        │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 6: Deploy Application (main branch only)     │   │
│  │ - Copy dist/ to /var/www/shadcn-angular            │   │
│  │ - Copy package.json & package-lock.json            │   │
│  │ - npm ci --production                              │   │
│  │ - Set directory permissions                        │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 7: Deploy MCP Server (main branch only)      │   │
│  │ - Copy MCP server files                            │   │
│  │ - npm ci --production for MCP                      │   │
│  │ - Set permissions                                  │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 8: Stop PM2 Services                         │   │
│  │ - pm2 stop shadcn-angular                          │   │
│  │ - pm2 stop mcp-server                              │   │
│  │ - Wait for clean shutdown                          │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 9: Start PM2 Services                        │   │
│  │ - pm2 start ecosystem.config.js                    │   │
│  │ - Start both apps (2 + 1 instances)                │   │
│  │ - pm2 save (persist process list)                  │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 10: Verify Health Check                      │   │
│  │ - Check if services are running                    │   │
│  │ - Verify ports are listening (4200, 3001)          │   │
│  │ - Check process status                             │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 11: Reload Nginx                             │   │
│  │ - nginx -t (test configuration)                    │   │
│  │ - systemctl reload nginx                           │   │
│  │ - Apply any new config changes                     │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Stage 12: Create Restart Script                    │   │
│  │ - Copy restart-services.sh to /usr/local/bin       │   │
│  │ - Make executable                                  │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ POST: Cleanup & Success                            │   │
│  │ - Clean workspace                                  │   │
│  │ - Archive build logs                               │   │
│  │ - Notify (optional)                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────┬───────────────────────────────────────────┘
                   │ deployment complete
                   ▼
┌──────────────────────────────────────────────────────────────┐
│          PRODUCTION SERVER LIVE UPDATE                       │
│      (No downtime - rolling restart)                        │
│                                                              │
│  ✓ Application serving requests                            │
│  ✓ MCP server accessible at /mcp                           │
│  ✓ All health checks passing                               │
│  ✓ Logs clean and operational                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 3. Request Flow Diagram

```
┌─────────┐
│ Browser │
└────┬────┘
     │ HTTPS Request
     │ https://shadcn-angular.tigayon.com/api/data
     │
     ▼
┌────────────────────────────────┐
│    Nginx (Port 443)            │
│  (SSL/TLS Termination)         │
│  - Decrypt HTTPS               │
│  - Rate limiting check         │
│  - Security header check       │
│  - Route decision              │
└────────┬───────────────────────┘
         │
    ┌────┴──────────────────────┐
    │                           │
    ▼                           ▼
┌──────────────────┐    ┌──────────────────┐
│  /api/*          │    │ /mcp             │
│  (Public API)    │    │ (Protected)      │
│                  │    │                  │
│  No Auth         │    │ Basic Auth Check │
│                  │    │ user: jamel      │
└────────┬─────────┘    │ pass: jamel      │
         │              │                  │
         │              └────────┬─────────┘
         │                       │
         ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │ PM2 App          │    │ PM2 MCP Server   │
    │ Port 4200        │    │ Port 3001        │
    │                  │    │                  │
    │ Instance 1       │    │ Instance 1       │
    │ Instance 2       │    └──────────────────┘
    └────────┬─────────┘           │
             │                     │ Response
             │ Response            │
             └──────────┬──────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Nginx Response       │
            │  - Add headers        │
            │  - Compress response  │
            │  - HTTPS encrypt      │
            └───────────┬───────────┘
                        │ HTTPS Response
                        ▼
                   ┌─────────┐
                   │ Browser │
                   └─────────┘
```

## 4. Service Management Diagram

```
┌────────────────────────────────────────────────────────┐
│         Service Management Commands                    │
└────────────────────────────────────────────────────────┘

Status & Information:
├─ pm2 status                          [Show all processes]
├─ pm2 info shadcn-angular             [App info]
├─ pm2 info mcp-server                 [MCP info]
├─ sudo systemctl status nginx         [Nginx status]
└─ sudo /usr/local/bin/restart-services --status [All]

Restart Services:
├─ sudo /usr/local/bin/restart-services --restart-all
│  └─ Restarts: PM2 (both apps) → Nginx
│
├─ sudo /usr/local/bin/restart-services --restart-app
│  └─ Restarts: Angular SSR app only (PM2)
│
├─ sudo /usr/local/bin/restart-services --restart-mcp
│  └─ Restarts: MCP server only (PM2)
│
└─ sudo /usr/local/bin/restart-services --restart-nginx
   └─ Restarts: Nginx only

View Logs:
├─ pm2 logs                            [All PM2 logs]
├─ pm2 logs shadcn-angular --lines 100 [App logs]
├─ pm2 logs mcp-server --lines 100     [MCP logs]
├─ sudo tail -f /var/log/nginx/shadcn-angular-access.log [Nginx access]
├─ sudo tail -f /var/log/nginx/error.log [Nginx errors]
└─ sudo tail -f /var/log/nginx/shadcn-angular-mcp.log [MCP access]

Monitoring:
├─ pm2 monit                           [Real-time monitoring]
├─ pm2 status                          [Memory/CPU usage]
└─ watch -n 1 'free -h && df -h'       [System resources]

Health Checks:
├─ curl https://shadcn-angular.tigayon.com/health
├─ curl -u jamel:jamel https://shadcn-angular.tigayon.com/mcp/health
└─ sudo /usr/local/bin/restart-services --health-check
```

## 5. Configuration File Relationships

```
┌─────────────────────────────────────────────────────┐
│          Jenkinsfile (CI/CD Orchestration)          │
│  - Defines pipeline stages                          │
│  - Calls jenkins-deploy.sh                          │
│  - Sets environment variables                       │
│  - Calls restart-services.sh                        │
└────┬────────────────────────────────────────────────┘
     │ triggers
     ▼
┌─────────────────────────────────────────────────────┐
│      scripts/jenkins-deploy.sh (Deployment)         │
│  - Copies dist files                                │
│  - Deploys MCP server                               │
│  - Installs dependencies                            │
│  - Restarts PM2 services                            │
│  - Runs health checks                               │
│  - Reloads Nginx                                    │
└────┬────────────────────────────────────────────────┘
     │ uses
     ├────────────────────────────────────────────┐
     │                                            │
     ▼                                            ▼
┌─────────────────────────────┐   ┌────────────────────────────┐
│ ecosystem.config.js         │   │ nginx/shadcn-angular.conf  │
│ (PM2 Configuration)         │   │ (Nginx Configuration)      │
│                             │   │                            │
│ - App settings (4200)       │   │ - Upstream proxies         │
│ - MCP settings (3001)       │   │ - SSL/TLS                  │
│ - Auto-restart              │   │ - Basic auth               │
│ - Memory limits             │   │ - Rate limiting            │
│ - Log management            │   │ - Security headers         │
│ - Cluster mode              │   │ - Compression              │
│                             │   │                            │
│ Started by:                 │   │ Loaded by:                 │
│ pm2 start ecosystem.config.js  │ nginx -t / systemctl reload│
└────────────────────────────┘   └────────────────────────────┘
     │                                      │
     │ manages                              │ configures
     ▼                                      ▼
┌─────────────────────────────┐   ┌────────────────────────────┐
│   PM2 Services              │   │   Nginx Web Server         │
│                             │   │                            │
│ ┌──────────────────────┐   │   │ ┌──────────────────────┐   │
│ │ shadcn-angular       │   │   │ │ Port 80 (HTTP)       │   │
│ │ - Instance 1         │   │   │ │ - Redirect to HTTPS  │   │
│ │ - Instance 2         │   │   │ └──────────────────────┘   │
│ │ Port 4200            │   │   │                            │
│ └──────────────────────┘   │   │ ┌──────────────────────┐   │
│                             │   │ │ Port 443 (HTTPS)     │   │
│ ┌──────────────────────┐   │   │ │ - SSL/TLS            │   │
│ │ mcp-server           │   │   │ │ - Proxy to 4200/3001 │   │
│ │ - Instance 1         │   │   │ │ - Basic auth for /mcp│   │
│ │ Port 3001            │   │   │ └──────────────────────┘   │
│ └──────────────────────┘   │   │                            │
│                             │   │ Configuration:             │
│ Log files:                  │   │ /etc/nginx/.htpasswd       │
│ - logs/angular-*.log        │   │ (Basic auth credentials)   │
│ - logs/mcp-*.log            │   │                            │
│                             │   │ Logs:                      │
│ Started by:                 │   │ /var/log/nginx/           │
│ restart-services.sh         │   │ /var/log/nginx/shadcn...  │
└─────────────────────────────┘   └────────────────────────────┘
     │                                      │
     └──────────────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Users Access         │
            │ https://...domain/    │
            └───────────────────────┘
```

## 6. Authentication Flow for MCP

```
┌─────────┐
│ Browser │ Requests /mcp endpoint
└────┬────┘
     │
     ▼
┌────────────────────────────────┐
│    Nginx (Port 443 - HTTPS)    │
│  1. Decrypt SSL/TLS            │
│  2. Check location = /mcp       │
│  3. Check basic auth header    │
└────────┬───────────────────────┘
         │
         ▼
     ┌────────────────────────┐
     │ Basic Auth Check       │
     │ (auth_basic "...")     │
     │                        │
     │ Expected:              │
     │ Base64(jamel:jamel)    │
     └────┬───────┬──────────┘
          │       │
    ┌─────▼──┐  ┌─▼──────────────────┐
    │ Valid  │  │ Invalid            │
    │ ✓      │  │ ✗ Return 401       │
    └────┬───┘  │ Unauthorized       │
         │      └────────────────────┘
         ▼
    ┌────────────────────────┐
    │ Rate Limiting Check    │
    │ (5 req/sec limit)      │
    │                        │
    │ Under limit: Continue  │
    │ Over limit:  Return 429│
    └────┬───────────────────┘
         │
         ▼
    ┌────────────────────────┐
    │ Proxy to MCP Server    │
    │ localhost:3001         │
    │ (upstream: mcp_server) │
    └────┬───────────────────┘
         │
         ▼
    ┌────────────────────────┐
    │ MCP Server Processing  │
    │ Port 3001              │
    │ (PM2 managed)          │
    └────┬───────────────────┘
         │
         ▼
    ┌────────────────────────┐
    │ Response to Browser    │
    │ - Via Nginx            │
    │ - Headers added        │
    │ - Compressed if needed │
    │ - HTTPS encrypted      │
    └────────────────────────┘
```

---

**These diagrams provide visual understanding of:**
- System architecture and components
- Complete deployment pipeline flow
- Request routing through the system
- Service management relationships
- Configuration file dependencies
- Authentication mechanisms

Use these diagrams alongside the documentation for complete understanding of the system.
