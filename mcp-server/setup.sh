#!/bin/bash

# shadcn-angular MCP Server Configuration Helper
# This script helps you set up the MCP server for Claude Desktop

set -e

echo "🚀 shadcn-angular MCP Server Setup"
echo "===================================="
echo ""

# Get the absolute path to the project
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MCP_SERVER_PATH="$PROJECT_DIR/dist/mcp-server/index.js"

echo "📍 Project directory: $PROJECT_DIR"
echo ""

# Check if the MCP server is built
if [ ! -f "$MCP_SERVER_PATH" ]; then
    echo "⚠️  MCP server not found. Building now..."
    echo ""
    cd "$PROJECT_DIR"
    npm run build:mcp
    echo ""
    echo "✅ MCP server built successfully!"
    echo ""
fi

# Detect OS
OS=""
CONFIG_PATH=""

if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    OS="Windows"
    CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
else
    echo "❓ Unknown operating system: $OSTYPE"
    OS="Unknown"
fi

echo "💻 Detected OS: $OS"
echo ""

# Generate configuration
echo "📝 Configuration for Claude Desktop:"
echo ""
echo "Config file location:"
echo "  $CONFIG_PATH"
echo ""
echo "Add this to your configuration:"
echo ""
echo "{"
echo "  \"mcpServers\": {"
echo "    \"shadcn-angular\": {"
echo "      \"command\": \"node\","
echo "      \"args\": [\"$MCP_SERVER_PATH\"]"
echo "    }"
echo "  }"
echo "}"
echo ""

# Offer to create/update config
if [ "$OS" != "Unknown" ]; then
    read -p "Would you like to automatically configure Claude Desktop? (y/n) " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Create config directory if it doesn't exist
        mkdir -p "$(dirname "$CONFIG_PATH")"

        # Create or update config
        if [ -f "$CONFIG_PATH" ]; then
            echo "⚠️  Config file already exists. Creating backup..."
            cp "$CONFIG_PATH" "$CONFIG_PATH.backup.$(date +%Y%m%d_%H%M%S)"
            echo "✅ Backup created"
            echo ""

            # Check if shadcn-angular already exists in config
            if grep -q "shadcn-angular" "$CONFIG_PATH"; then
                echo "⚠️  shadcn-angular server already configured."
                read -p "Update the existing configuration? (y/n) " -n 1 -r
                echo ""

                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    # Use jq if available, otherwise manual edit
                    if command -v jq &> /dev/null; then
                        temp_file=$(mktemp)
                        jq ".mcpServers[\"shadcn-angular\"].args = [\"$MCP_SERVER_PATH\"]" "$CONFIG_PATH" > "$temp_file"
                        mv "$temp_file" "$CONFIG_PATH"
                        echo "✅ Configuration updated"
                    else
                        echo "⚠️  jq not found. Please manually update the path in:"
                        echo "  $CONFIG_PATH"
                    fi
                fi
            else
                # Add new server
                if command -v jq &> /dev/null; then
                    temp_file=$(mktemp)
                    jq ".mcpServers[\"shadcn-angular\"] = {\"command\": \"node\", \"args\": [\"$MCP_SERVER_PATH\"]}" "$CONFIG_PATH" > "$temp_file"
                    mv "$temp_file" "$CONFIG_PATH"
                    echo "✅ Configuration added"
                else
                    echo "⚠️  jq not found. Please manually add the configuration to:"
                    echo "  $CONFIG_PATH"
                fi
            fi
        else
            # Create new config
            cat > "$CONFIG_PATH" <<EOF
{
  "mcpServers": {
    "shadcn-angular": {
      "command": "node",
      "args": ["$MCP_SERVER_PATH"]
    }
  }
}
EOF
            echo "✅ Configuration file created"
        fi

        echo ""
        echo "🎉 Setup complete!"
        echo ""
        echo "Next steps:"
        echo "1. Restart Claude Desktop completely"
        echo "2. Ask: 'What components are available in shadcn-angular?'"
        echo ""
    fi
fi

echo "📚 Documentation:"
echo "  - Quick Start: mcp-server/QUICKSTART.md"
echo "  - Setup Guide: docs/MCP-SETUP.md"
echo "  - Examples: mcp-server/EXAMPLES.md"
echo ""
echo "✨ Enjoy using shadcn-angular with AI assistance!"
