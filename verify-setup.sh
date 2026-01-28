#!/bin/bash

echo "=== PM2 Status ===" 
pm2 list

echo ""
echo "=== Checking Ports ===" 
if command -v ss &> /dev/null; then
  ss -tuln | grep -E ":(4200|4500)"
else
  netstat -tuln | grep -E ":(4200|4500)"
fi

echo ""
echo "=== Curl Tests ===" 
echo "Testing port 4200 (Angular):"
curl -m 2 http://localhost:4200 -w "\nStatus: %{http_code}\n" 2>/dev/null || echo "No response"

echo ""
echo "Testing port 4500 (MCP Server):"
curl -m 2 http://localhost:4500 -w "\nStatus: %{http_code}\n" 2>/dev/null || echo "No response"

echo ""
echo "=== Processes ===" 
ps aux | grep -E "(node|npm)" | grep -v grep
