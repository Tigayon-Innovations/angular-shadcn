/**
 * Radix-like Component Documentation Types
 * Provides comprehensive documentation structure following Radix UI patterns
 */

export interface ComponentDocumentation {
  /** Component name (e.g., "Accordion") */
  name: string;

  /** URL slug (e.g., "accordion") */
  slug: string;

  /** Brief description shown in the header */
  description: string;

  /** List of key features with icons */
  features: Feature[];

  /** Component anatomy - shows structure */
  anatomy: AnatomyInfo;

  /** Installation instructions */
  installation: InstallationInfo;

  /** API reference for each sub-component */
  apiReference: ComponentApiReference[];

  /** Usage examples with code */
  examples: DocumentationExample[];

  /** Accessibility information */
  accessibility: AccessibilityInfo;

  /** Additional links (source, issues, aria spec) */
  links: ExternalLink[];
}

export interface Feature {
  /** Feature description */
  text: string;

  /** Whether this is a key feature */
  highlight?: boolean;
}

export interface AnatomyInfo {
  /** Import statement */
  importStatement: string;

  /** JSX-like structure showing component hierarchy */
  structure: string;
}

export interface InstallationInfo {
  /** npm/pnpm/yarn/bun install commands */
  packageManager: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
  };

  /** Angular CLI command */
  ngAdd?: string;
}

export interface ComponentApiReference {
  /** Component/directive name (e.g., "Root", "Item", "Trigger") */
  name: string;

  /** Description of this component part */
  description: string;

  /** Props/inputs for this component */
  props: ApiProp[];

  /** Data attributes available */
  dataAttributes?: DataAttribute[];

  /** CSS custom properties */
  cssVariables?: CssVariable[];

  /** Events/outputs for this component */
  events?: ApiEvent[];

  /** Additional notes about this component */
  notes?: string[];
}

export interface ApiProp {
  /** Property name */
  name: string;

  /** TypeScript type */
  type: string;

  /** Default value if any */
  default?: string;

  /** Whether this prop is required */
  required?: boolean;

  /** Description of what this prop does */
  description: string;
}

export interface DataAttribute {
  /** Attribute name (e.g., "[data-state]") */
  name: string;

  /** Possible values */
  values: string;

  /** Description of what this attribute means */
  description?: string;
}

export interface CssVariable {
  /** Variable name (e.g., "--accordion-content-height") */
  name: string;

  /** Description of what this variable controls */
  description: string;
}

export interface ApiEvent {
  /** Event/output name */
  name: string;

  /** Event type/signature */
  type: string;

  /** Description of when this event emits */
  description: string;
}

export interface DocumentationExample {
  /** Example title */
  title: string;

  /** Example description */
  description?: string;

  /** Code snippet */
  code: string;

  /** Additional CSS if needed */
  css?: string;

  /** Whether this example has an interactive demo */
  hasDemo?: boolean;
}

export interface AccessibilityInfo {
  /** ARIA pattern this component follows */
  ariaPattern?: string;

  /** Link to WAI-ARIA documentation */
  ariaPatternUrl?: string;

  /** Keyboard interactions */
  keyboardInteractions: KeyboardInteraction[];

  /** ARIA attributes used */
  ariaAttributes?: AriaAttribute[];
}

export interface AriaAttribute {
  /** ARIA attribute name (e.g., "role", "aria-disabled") */
  name: string;

  /** Description of what this attribute does */
  description: string;
}

export interface KeyboardInteraction {
  /** Key(s) to press */
  key: string;

  /** What this key does */
  description: string;
}

export interface ExternalLink {
  /** Link text */
  text: string;

  /** URL */
  url: string;

  /** Icon type */
  icon?: 'source' | 'issue' | 'docs' | 'external';
}
