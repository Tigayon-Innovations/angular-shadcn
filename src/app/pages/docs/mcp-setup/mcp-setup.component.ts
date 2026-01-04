import { CodeBlock } from '@/components/code-block';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Separator } from '@/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertCircle, CheckCircle2, Globe, LucideAngularModule, Package, Sparkles, Terminal } from 'lucide-angular';

/**
 * MCP Setup documentation page.
 */
@Component({
  selector: 'McpSetupPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Button,
    Badge,
    Separator,
    CodeBlock,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    LucideAngularModule,
  ],
  template: `
    <article class="relative">
      <!-- Header -->
      <div class="space-y-4 pb-8 pt-6 md:pb-10">
        <div class="flex items-center gap-2">
          <Badge variant="outline" class="font-mono text-xs">AI Assistant</Badge>
          <Badge class="font-mono text-xs">✨ One-Click Setup</Badge>
        </div>
        <div class="space-y-2">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            MCP Server Setup
          </h1>
          <p class="text-lg text-muted-foreground leading-7">
            Enable AI assistants like Claude to intelligently work with shadcn-angular components.
            Setup in seconds with just a URL - no complex configuration needed!
          </p>
        </div>
      </div>

      <Separator class="mb-10" />

      <div class="space-y-12">
        <!-- Quick Start -->
        <section class="space-y-6">
          <div class="rounded-lg border-2 border-primary bg-primary/5 p-6">
            <div class="flex items-start gap-4">
              <lucide-icon [img]="icons.Sparkles" class="h-8 w-8 text-primary shrink-0 mt-1" />
              <div class="space-y-3 flex-1">
                <h2 class="text-2xl font-bold">✨ One-Click Setup</h2>
                <p class="text-muted-foreground">
                  Just add this URL to your IDE's MCP configuration:
                </p>
                <CodeBlock code="https://shadcn-angular.tigayon.com/mcp" language="text" />
                <p class="text-sm text-muted-foreground">
                  That's it! No build steps, no local server, no dependencies. Works instantly with Claude Desktop, Zed, Cline, and any MCP-compatible client. 🎉
                </p>
              </div>
            </div>
          </div>
        </section>
        <!-- Overview -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              How It Works
            </h2>
            <p class="text-muted-foreground leading-7">
              The shadcn-angular MCP server is hosted at <code class="px-1.5 py-0.5 rounded bg-muted text-foreground">shadcn-angular.tigayon.com</code>
              and serves component information via HTTP endpoints. Your AI assistant connects directly to this service - no local installation,
              no build steps, no dependencies. Just add the URL to your IDE config and you're ready to go!
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <lucide-icon [img]="icons.Globe" class="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Deployed with Your App</CardTitle>
                <CardDescription>
                  MCP endpoints are served directly from your Angular SSR server at /api/mcp
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <lucide-icon [img]="icons.Sparkles" class="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Component Search</CardTitle>
                <CardDescription>
                  Find components by name, description, or category instantly
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <lucide-icon [img]="icons.Package" class="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Multi-Package Manager</CardTitle>
                <CardDescription>
                  Installation support for npm, pnpm, yarn, bun, and ng add
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <!-- Prerequisites -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Prerequisites
            </h2>
          </div>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground">
            <li>An MCP-compatible IDE or client (Claude Desktop, Zed, Cline, etc.)</li>
            <li>Internet connection to access the MCP service</li>
          </ul>
          <p class="text-sm text-muted-foreground">
            That's it! No Node.js, no build tools, no local server needed. The MCP service is hosted and ready to use.
          </p>
        </section>

        <!-- Setup Methods -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Setup Methods
            </h2>
          </div>

          <Tabs defaultValue="claude">
            <TabsList class="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="claude">Claude Desktop</TabsTrigger>
              <TabsTrigger value="zed">Zed</TabsTrigger>
              <TabsTrigger value="cline">Cline</TabsTrigger>
            </TabsList>

            <TabsContent value="claude" class="mt-6 space-y-6">
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Claude Desktop Configuration</h3>
                <p class="text-muted-foreground">
                  Add the MCP server to your Claude Desktop configuration file:
                </p>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">1. Locate your config file</h4>
                  <Tabs defaultValue="macos">
                    <TabsList class="grid w-full max-w-md grid-cols-3">
                      <TabsTrigger value="macos">macOS</TabsTrigger>
                      <TabsTrigger value="windows">Windows</TabsTrigger>
                      <TabsTrigger value="linux">Linux</TabsTrigger>
                    </TabsList>
                    <TabsContent value="macos" class="mt-4">
                      <CodeBlock
                        code="~/Library/Application Support/Claude/claude_desktop_config.json"
                        language="bash"
                      />
                    </TabsContent>
                    <TabsContent value="windows" class="mt-4">
                      <CodeBlock
                        code="%APPDATA%\\Claude\\claude_desktop_config.json"
                        language="bash"
                      />
                    </TabsContent>
                    <TabsContent value="linux" class="mt-4">
                      <CodeBlock
                        code="~/.config/Claude/claude_desktop_config.json"
                        language="bash"
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">2. Add the configuration</h4>
                  <CodeBlock
                    [code]="claudeConfigCode"
                    language="json"
                  />
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">3. Restart Claude Desktop</h4>
                  <p class="text-sm text-muted-foreground">
                    Completely quit and restart Claude Desktop for the changes to take effect.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="zed" class="mt-6 space-y-6">
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Zed Editor Configuration</h3>
                <p class="text-muted-foreground">
                  Configure the MCP server in your Zed settings:
                </p>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">1. Open Zed settings</h4>
                  <p class="text-sm text-muted-foreground">
                    Press <kbd class="px-2 py-1 rounded bg-muted text-xs">Cmd+,</kbd> (macOS) or
                    <kbd class="px-2 py-1 rounded bg-muted text-xs">Ctrl+,</kbd> (Windows/Linux)
                  </p>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">2. Click "Open settings.json"</h4>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">3. Add the context server</h4>
                  <CodeBlock
                    [code]="zedConfigCode"
                    language="json"
                  />
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">4. Restart Zed</h4>
                  <p class="text-sm text-muted-foreground">
                    Restart Zed editor to load the MCP server.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cline" class="mt-6 space-y-6">
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Cline (VS Code) Configuration</h3>
                <p class="text-muted-foreground">
                  Configure the MCP server in VS Code settings:
                </p>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">1. Install Cline extension</h4>
                  <p class="text-sm text-muted-foreground">
                    Install the Cline extension from the VS Code marketplace if you haven't already.
                  </p>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">2. Open VS Code settings</h4>
                  <p class="text-sm text-muted-foreground">
                    Press <kbd class="px-2 py-1 rounded bg-muted text-xs">Cmd+,</kbd> (macOS) or
                    <kbd class="px-2 py-1 rounded bg-muted text-xs">Ctrl+,</kbd> (Windows/Linux)
                  </p>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">3. Search for "Cline: MCP Settings"</h4>
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">4. Add the server configuration</h4>
                  <CodeBlock
                    [code]="clineConfigCode"
                    language="json"
                  />
                </div>

                <div class="space-y-3">
                  <h4 class="text-base font-medium">5. Reload VS Code</h4>
                  <p class="text-sm text-muted-foreground">
                    Reload the VS Code window to apply the changes.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <!-- Verification -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Verification
            </h2>
          </div>
          <div class="space-y-4">
            <p class="text-muted-foreground leading-7">
              After configuration, verify the MCP server is working:
            </p>
            <ol class="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
              <li>Open Claude Desktop</li>
              <li>Look for an MCP indicator or connection status</li>
              <li>Try asking: <em>"What shadcn-angular components are available?"</em></li>
              <li>Claude should respond with component information from the MCP server</li>
            </ol>
            <div class="rounded-lg border border-green-500/50 bg-green-500/10 p-4 flex gap-3">
              <lucide-icon [img]="icons.CheckCircle2" class="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-green-900 dark:text-green-200">Success</p>
                <p class="text-sm text-green-800 dark:text-green-300 mt-1">
                  If Claude provides detailed component information, the MCP server is working correctly!
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Available Tools
            </h2>
            <p class="text-muted-foreground">
              Once configured, Claude can access these MCP tools:
            </p>
          </div>
          <div class="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle class="text-lg">search_components</CardTitle>
                <CardDescription>
                  Search for components by name, description, or category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code='Ask Claude: "Search for button components"'
                  language="text"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="text-lg">get_component</CardTitle>
                <CardDescription>
                  Get detailed information about a specific component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code='Ask Claude: "Show me details about the Button component"'
                  language="text"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="text-lg">list_components</CardTitle>
                <CardDescription>
                  List all available components with optional category filter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code='Ask Claude: "List all form components"'
                  language="text"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Troubleshooting -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Troubleshooting
            </h2>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">MCP server not connecting</h3>
              <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Verify the URL is correct: <code class="px-1.5 py-0.5 rounded bg-muted text-foreground">https://shadcn-angular.tigayon.com/mcp</code></li>
                <li>Ensure you have a stable internet connection</li>
                <li>Check your IDE's config file format (JSON must be valid)</li>
                <li>Completely restart your IDE after configuration changes</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Service unavailable</h3>
              <p class="text-muted-foreground">
                If you get a service unavailable error, the MCP service might be temporarily down. Try again in a few moments.
              </p>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Tools not showing up</h3>
              <p class="text-muted-foreground">
                After adding the configuration, you should see MCP tools available in your IDE. If not:
              </p>
              <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Check your IDE's MCP settings or logs</li>
                <li>Verify the URL is accessible in your browser</li>
                <li>Make sure your IDE supports SSE (Server-Sent Events) transport</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Next Steps -->
        <section class="space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2">
              Next Steps
            </h2>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Explore Components</CardTitle>
                <CardDescription>
                  Browse the component library and see what's available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button routerLink="/docs/components" variant="outline" class="w-full">
                  View Components
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
                <CardDescription>
                  Learn how to install and configure shadcn-angular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button routerLink="/docs/installation" variant="outline" class="w-full">
                  Installation
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </article>
  `,
})
export class McpSetupPage {
  protected readonly icons = {
    Sparkles,
    Package,
    Terminal,
    AlertCircle,
    CheckCircle2,
    Globe,
  };

  protected readonly claudeConfigCode = `{
  "mcpServers": {
    "shadcn-angular": {
      "url": "https://shadcn-angular.tigayon.com/mcp",
      "transport": {
        "type": "sse"
      }
    }
  }
}`;

  protected readonly zedConfigCode = `{
  "context_servers": {
    "shadcn-angular": {
      "settings": {
        "url": "https://shadcn-angular.tigayon.com/mcp"
      }
    }
  }
}`;

  protected readonly clineConfigCode = `{
  "mcpServers": {
    "shadcn-angular": {
      "url": "https://shadcn-angular.tigayon.com/mcp",
      "transport": {
        "type": "sse"
      }
    }
  }
}`;
}
