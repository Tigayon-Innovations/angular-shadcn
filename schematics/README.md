# shadcn-angular Schematics

Angular schematics for installing shadcn-angular components individually.

## Usage

### Install Dependencies

First, add shadcn-angular to your project:

```bash
ng add @ng-cn/core
```

This will:
- Install required dependencies (lucide-angular, class-variance-authority, clsx, tailwind-merge, @angular/cdk)
- Set up the project for shadcn-angular components
- **Prompt you to select components** to install initially (multi-select checkbox)

### Interactive Component Selection

When running `ng add @ng-cn/core`, you'll be presented with an interactive multi-select prompt:

```
? Which components would you like to add? (Press space to select, enter to confirm)
❯◯ Button - Displays a button or a component that looks like a button
 ◯ Card - Displays a card with header, content, and footer
 ◯ Input - Displays a form input field
 ◯ Label - Renders an accessible label associated with controls
 ◯ Checkbox - A control that allows toggling between checked and not checked
 ...
```

Use **space** to select/deselect components and **enter** to confirm your selection.

### Skip Component Selection

If you want to skip the component selection prompt:

```bash
ng add @ng-cn/core --components=button,card,input
```

Or to skip adding any components initially:

```bash
ng add @ng-cn/core --components=
```

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
cd schematics
npx tsc -p tsconfig.json
```

This compiles the TypeScript files in the `schematics` directory to JavaScript.

### Testing

Run the test script to verify the schematics work correctly:

```bash
cd schematics
node test-schematic.js
```

This will:
- Create a mock Angular project with a tsconfig.json containing comments (like real projects)
- Run the ng-add schematic
- Verify all expected files are created
- Verify tsconfig path aliases are configured
- Verify styles are imported correctly
- Verify dependencies are added

### Local Testing

To test the schematic locally with a real Angular project:

```bash
# 1. Build the schematics
cd schematics && npx tsc -p tsconfig.json && cd ..

# 2. Create a test project
ng new test-app --style=scss --routing=true

# 3. Link the local package
cd test-app
npm link ../shadcn-angular

# 4. Run the schematic
ng add @ng-cn/core --skip-confirmation
```

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
