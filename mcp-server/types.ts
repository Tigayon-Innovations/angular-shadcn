/**
 * Types for ng-cn MCP Server
 */

export interface PackageManager {
  name: 'npm' | 'pnpm' | 'yarn' | 'bun';
  addCommand: string;
  ngAddCommand: string;
}

export interface ComponentInput {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

export interface ComponentInstallation {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
  ngAdd: string;
  manual: {
    description: string;
    steps: string[];
    files: string[];
  };
}

export interface ComponentMetadata {
  name: string;
  selector: string;
  package: string;
  description: string;
  category: 'basic' | 'form' | 'layout' | 'overlay' | 'complex' | 'advanced';
  dependencies: string[];
  inputs?: ComponentInput[];
  outputs?: ComponentOutput[];
  examples: ComponentExample[];
  installation: ComponentInstallation;
  usage: string;
  variants?: {
    name: string;
    values: string[];
    default?: string;
  }[];
  relatedComponents?: string[];
  documentation?: string;
}

export interface MCPToolRequest {
  tool: string;
  arguments: Record<string, unknown>;
}

export interface MCPToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

export interface SearchComponentsArgs {
  query?: string;
  category?: ComponentMetadata['category'];
  packageManager?: PackageManager['name'];
}

export interface GetComponentArgs {
  name: string;
  packageManager?: PackageManager['name'];
}

export interface GetInstallCommandArgs {
  components: string[];
  packageManager?: PackageManager['name'];
}
