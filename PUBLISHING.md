# Publishing shadcn-angular to npm

This guide explains how to publish the shadcn-angular component library to npm so users can install it using `ng add shadcn-angular`.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **npm CLI Access**: Log in to npm on your local machine
3. **Package Name Availability**: Verify the package name is available on npm

## Initial Setup

### 1. Check Package Name Availability

```bash
npm search shadcn-angular
```

If the name is taken, update the `name` field in [package.json](package.json) to something unique (e.g., `@yourusername/shadcn-angular` for a scoped package).

### 2. Update package.json Configuration

Make these critical changes to [package.json](package.json):

```json
{
  "name": "shadcn-angular",  // Or @scope/shadcn-angular for scoped package
  "version": "1.0.0",         // Change from "0.0.0" to a proper version
  "private": false,           // IMPORTANT: Remove or set to false
  "description": "Beautifully designed Angular components built with Tailwind CSS",
  "keywords": [
    "angular",
    "components",
    "tailwind",
    "shadcn",
    "ui",
    "design-system"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/shadcn-angular.git"
  },
  "homepage": "https://github.com/yourusername/shadcn-angular#readme",
  "bugs": {
    "url": "https://github.com/yourusername/shadcn-angular/issues"
  },
  "schematics": "./schematics/collection.json",
  "ng-add": {
    "save": "dependencies"
  }
}
```

### 3. Create/Update .npmignore

Create a [.npmignore](.npmignore) file to exclude unnecessary files from the published package:

```
# Source files
src/
docs/
scripts/
nginx/
mcp-server/

# Build artifacts (keep only dist if needed)
.angular/
node_modules/

# Development files
*.spec.ts
*.test.ts
test-setup.ts
vitest.config.ts
karma.conf.js

# CI/CD
.github/
Jenkinsfile*
ecosystem.config.js

# Documentation (except README)
*.md
!README.md
!LICENSE

# Environment files
.env*
.vscode/
.idea/

# Logs
logs/
*.log
npm-debug.log*
```

### 4. Add Required Files

#### LICENSE

Create a [LICENSE](LICENSE) file (MIT is common):

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

#### README.md

Update your [README.md](README.md) with installation instructions:

```markdown
# shadcn-angular

Beautifully designed Angular components built with Tailwind CSS v4.

## Installation

```bash
ng add shadcn-angular
```

## Usage

After installation, import components in your Angular project:

```typescript
import { ButtonComponent } from 'shadcn-angular';
```

For more information, visit [your-docs-url].
```

## Build Process

### 1. Build Schematics

The schematics must be compiled before publishing:

```bash
npm run build:schematics
```

This compiles TypeScript files in the `schematics/` directory. Verify the output files are created.

### 2. Test Schematics Locally

Before publishing, test your `ng add` schematic locally:

```bash
# In your shadcn-angular directory
npm link

# In a test Angular project
cd /path/to/test-project
ng add file:/path/to/shadcn-angular
```

Or using `npm pack`:

```bash
# Create a tarball
npm pack

# This creates shadcn-angular-1.0.0.tgz

# Test in another project
cd /path/to/test-project
ng add /path/to/shadcn-angular/shadcn-angular-1.0.0.tgz
```

### 3. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included. Ensure:
- ✅ `schematics/` folder is included
- ✅ `collection.json` is included
- ✅ `README.md` is included
- ❌ `src/`, `node_modules/`, test files are excluded

## Publishing to npm

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials.

### 2. Verify Your Configuration

```bash
npm whoami  # Verify you're logged in
npm config list  # Check your npm configuration
```

### 3. Publish (First Time)

```bash
# For public package
npm publish --access public

# For scoped package (@scope/package)
npm publish --access public
```

### 4. Verify Publication

Visit `https://www.npmjs.com/package/shadcn-angular` to confirm your package is live.

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes
  ```bash
  npm version patch
  npm publish
  ```

- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
  ```bash
  npm version minor
  npm publish
  ```

- **Major** (1.0.0 → 2.0.0): Breaking changes
  ```bash
  npm version major
  npm publish
  ```

The `npm version` command automatically:
1. Updates version in package.json
2. Creates a git commit
3. Creates a git tag

Then push changes:
```bash
git push && git push --tags
```

## Updating Published Package

When you need to publish an update:

```bash
# 1. Make your changes and commit them
git add .
git commit -m "feat: add new component"

# 2. Build schematics
npm run build:schematics

# 3. Update version (choose one)
npm version patch  # or minor, or major

# 4. Publish
npm publish

# 5. Push to git
git push && git push --tags
```

## Automation with CI/CD

### GitHub Actions Example

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build schematics
        run: npm run build:schematics
      
      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token as a secret in GitHub: Settings → Secrets → Actions → `NPM_TOKEN`

## Testing Installation

After publishing, test in a fresh Angular project:

```bash
# Create new Angular project
npx @angular/cli@latest new test-app --standalone
cd test-app

# Install your package
ng add shadcn-angular

# Verify it works
npm start
```

## Troubleshooting

### "private": true Error

**Problem**: `npm publish` fails with "This package is marked as private"

**Solution**: Set `"private": false` or remove the `private` field from [package.json](package.json)

### Missing Files in Published Package

**Problem**: Schematics or required files not included

**Solution**: 
1. Check [.npmignore](.npmignore) - you might be excluding too much
2. Use `npm pack --dry-run` to preview contents
3. Ensure `schematics` folder and `collection.json` aren't excluded

### ng add Not Working

**Problem**: Users can't run `ng add your-package`

**Solution**:
1. Verify `"schematics": "./schematics/collection.json"` is in package.json
2. Verify `"ng-add"` config is present
3. Ensure schematics are compiled (run `npm run build:schematics`)
4. Check that [schematics/collection.json](schematics/collection.json) points to correct files

### Version Already Published

**Problem**: Can't publish same version twice

**Solution**: Update version number:
```bash
npm version patch
npm publish
```

### Scoped Package Issues

**Problem**: Scoped packages (@scope/name) require special handling

**Solution**: Always use `--access public` for free scoped packages:
```bash
npm publish --access public
```

## Best Practices

1. **Test Before Publishing**: Always test with `npm pack` or `npm link`
2. **Semantic Versioning**: Follow semver strictly
3. **Changelog**: Maintain a CHANGELOG.md
4. **Git Tags**: Tag releases in git
5. **Documentation**: Keep README.md updated
6. **Security**: Run `npm audit` before publishing
7. **CI/CD**: Automate publishing with GitHub Actions or similar
8. **Deprecation**: Use `npm deprecate` for old versions instead of unpublishing

## Useful Commands

```bash
# Check what will be published
npm pack --dry-run

# Create a local tarball for testing
npm pack

# Link for local testing
npm link

# Check package info
npm view shadcn-angular

# Deprecate a version
npm deprecate shadcn-angular@1.0.0 "Please use version 1.0.1"

# Unpublish (only within 72 hours, use sparingly)
npm unpublish shadcn-angular@1.0.0
```

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Angular Schematics](https://angular.dev/tools/cli/schematics)
- [Semantic Versioning](https://semver.org/)
- [npm Documentation](https://docs.npmjs.com/)

## Support

If users encounter issues with `ng add shadcn-angular`, direct them to:
- GitHub Issues: https://github.com/yourusername/shadcn-angular/issues
- Documentation: [your-docs-url]

---

**Ready to Publish?** Follow the checklist:

- [ ] Update version from 0.0.0 to 1.0.0
- [ ] Set `private: false` in package.json
- [ ] Build schematics: `npm run build:schematics`
- [ ] Test locally: `npm pack` and `ng add` in test project
- [ ] Login to npm: `npm login`
- [ ] Publish: `npm publish --access public`
- [ ] Verify on npmjs.com
- [ ] Test fresh install in new project
- [ ] Create GitHub release
- [ ] Update documentation
