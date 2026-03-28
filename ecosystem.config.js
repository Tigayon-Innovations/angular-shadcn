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
      },
      autorestart: true,
      max_memory_restart: '500M',
      error_file: './logs/angular-error.log',
      out_file: './logs/angular-out.log',
    },
    {
      name: 'mcp-server',
      script: './dist/mcp-server/streamable-http-server.js',
      env: {
        NODE_ENV: 'production',
        MCP_PORT: 3100,
      },
      autorestart: true,
      max_memory_restart: '300M',
      error_file: './logs/mcp-error.log',
      out_file: './logs/mcp-out.log',
    },
  ],
};
