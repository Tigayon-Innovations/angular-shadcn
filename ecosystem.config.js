module.exports = {
  apps: [
    {
      name: 'shadcn-angular',
      script: './dist/shadcn-angular/server/server.mjs',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4200,
        HOST: 'localhost'
      },
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/angular-error.log',
      out_file: './logs/angular-out.log',
      log_file: './logs/angular-combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      ignore_watch: [
        'node_modules',
        'dist',
        'logs',
        '.next',
        '.git'
      ],
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'mcp-server',
      script: './dist/mcp-server/http-server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3100,
        HOST: 'localhost',
        MCP_URL: 'https://shadcn-angular.tigayon.com/mcp'
      },
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      error_file: './logs/mcp-error.log',
      out_file: './logs/mcp-out.log',
      log_file: './logs/mcp-combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      ignore_watch: [
        'node_modules',
        'dist',
        'logs',
        '.git'
      ],
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],

  deploy: {
    production: {
      user: 'www-data',
      host: 'shadcn-angular.tigayon.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-repo/shadcn-angular.git',
      path: '/var/www/shadcn-angular',
      'post-deploy': 'npm ci --production && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
