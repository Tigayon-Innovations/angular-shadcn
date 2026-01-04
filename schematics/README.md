# shadcn-angular Schematics

Angular schematics for installing shadcn-angular components individually.

## Usage

### Install Dependencies

First, add shadcn-angular to your project:

```bash
ng add shadcn-angular
```

This will:
- Install required dependencies (lucide-angular, class-variance-authority, clsx, tailwind-merge, @angular/cdk)
- Set up the project for shadcn-angular components

### Install Individual Components

Install specific components using the component schematic:

```bash
ng generate shadcn-angular:component button
```

Or use the shorter alias:

```bash
ng g shadcn-angular:c data-table
```

### Available Components

- `button` - Button component with variants
- `card` - Card component with header, content, and footer
- `input` - Input component
- `label` - Label component
- `separator` - Separator component
- `badge` - Badge component with variants
- `alert` - Alert component with variants
- `dialog` - Dialog component with overlay
- `data-table` - Data table with sorting, filtering, and pagination
- And many more...

### Options

#### Component Schematic

```bash
ng g shadcn-angular:component <name> [options]
```

Options:
- `--path` - The path to install the component (default: `src/app/lib/components/ui`)
- `--project` - The project name

Example:
```bash
ng g shadcn-angular:c button --path=src/components
```

## Development

To build the schematics:

```bash
npm run build:schematics
```

This compiles the TypeScript files in the `schematics` directory to JavaScript.

## Structure

```
schematics/
├── collection.json          # Schematic collection definition
├── tsconfig.json           # TypeScript config for schematics
├── ng-add/                 # ng-add schematic
│   ├── index.ts
│   └── schema.json
└── component/              # Component installation schematic
    ├── index.ts
    └── schema.json
```

## How It Works

1. **ng-add**: Sets up the project with required dependencies
2. **component**: Copies component files from the source to your project

The component schematic:
- Validates the component name against the registry
- Creates the component directory structure
- Copies all component files
- Reports required dependencies
- Provides import instructions
