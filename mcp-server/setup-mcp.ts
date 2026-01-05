#!/usr/bin/env node

/**
 * One-Click MCP Setup for ng-cn
 *
 * This script configures Claude Desktop to use your deployed MCP server URL
 * or localhost for development.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

function getConfigPath(): string {
  const platform = process.platform;

  if (platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else if (platform === 'win32') {
    return join(process.env.APPDATA || '', 'Claude', 'claude_desktop_config.json');
  } else {
    return join(homedir(), '.config', 'Claude', 'claude_desktop_config.json');
  }
}

async function main() {
  console.log('\n🚀 ng-cn MCP Setup\n');
  console.log('This tool will configure Claude Desktop to use your MCP server.\n');

  // Get the MCP URL from user
  const useLocal = await question('Use local development server? (y/n): ');

  let mcpUrl: string;
  if (useLocal.toLowerCase() === 'y') {
    mcpUrl = 'http://localhost:4000/api/mcp/sse';
    console.log('\n✓ Using local development server');
  } else {
    const customUrl = await question('Enter your deployed MCP URL (e.g., https://your-app.com/api/mcp/sse): ');
    mcpUrl = customUrl.trim();
  }

  // Get config path
  const configPath = getConfigPath();
  console.log(`\n📁 Config file: ${configPath}`);

  // Read or create config
  let config: any = { mcpServers: {} };

  if (existsSync(configPath)) {
    try {
      const content = readFileSync(configPath, 'utf-8');
      config = JSON.parse(content);
      if (!config.mcpServers) {
        config.mcpServers = {};
      }
    } catch (error) {
      console.log('⚠️  Could not parse existing config, creating new one');
    }
  }

  // Add or update ng-cn MCP server config
  config.mcpServers['ng-cn'] = {
    url: mcpUrl,
    transport: {
      type: 'sse'
    }
  };

  // Write config
  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('\n✅ Configuration saved successfully!');
    console.log('\n📝 Configuration:');
    console.log(JSON.stringify(config.mcpServers['ng-cn'], null, 2));
    console.log('\n🎉 Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Restart Claude Desktop');
    if (useLocal.toLowerCase() === 'y') {
      console.log('2. Start your development server: npm run serve:ssr');
    } else {
      console.log('2. Make sure your app is deployed and accessible');
    }
    console.log('3. Ask Claude: "What ng-cn components are available?"');
  } catch (error) {
    console.error('\n❌ Error writing config:', error);
    console.log('\n📋 Manual Configuration:');
    console.log(`Add this to ${configPath}:`);
    console.log(JSON.stringify(config.mcpServers['ng-cn'], null, 2));
  }

  rl.close();
}

main().catch(console.error);
