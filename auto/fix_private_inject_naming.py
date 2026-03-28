#!/usr/bin/env python3
"""
Fix private inject naming: add _ prefix to private readonly inject variables
and update all references within the same file.
"""

import re
from pathlib import Path

UI_DIR = Path("/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/src/app/lib/components/ui")

def fix_private_inject_naming(filepath: Path) -> bool:
    """Fix private inject naming in a single file. Returns True if modified."""
    content = filepath.read_text(encoding='utf-8')

    # Find all private readonly injects WITHOUT _ prefix
    pattern = re.compile(
        r'private\s+readonly\s+([a-zA-Z][a-zA-Z0-9]*)\s*=\s*inject\('
    )

    matches = list(pattern.finditer(content))
    if not matches:
        return False

    modified = False
    for match in matches:
        var_name = match.group(1)
        if var_name.startswith('_'):
            continue  # Already has prefix

        new_name = f'_{var_name}'

        # Replace the declaration
        old_decl = f'private readonly {var_name}'
        new_decl = f'private readonly {new_name}'

        # Replace all this.varName references with this._varName
        # Use word boundary to avoid partial matches
        old_ref = f'this.{var_name}'
        new_ref = f'this.{new_name}'

        # Count occurrences to verify
        decl_count = content.count(old_decl)
        ref_count = content.count(old_ref)

        if decl_count == 0:
            continue

        # Perform replacements
        content = content.replace(old_decl, new_decl)

        # Replace this.varName but NOT this.varNameSomethingElse
        # Use regex for word boundary
        content = re.sub(
            rf'this\.{re.escape(var_name)}\b',
            f'this.{new_name}',
            content
        )

        modified = True
        print(f"    {var_name} -> {new_name} ({ref_count} refs)")

    if modified:
        filepath.write_text(content, encoding='utf-8')

    return modified


def main():
    ts_files = sorted([
        f for f in UI_DIR.rglob('*.ts')
        if f.name != 'index.ts'
        and not f.name.endswith('.spec.ts')
        and not f.name.endswith('.stories.ts')
    ])

    print(f"Scanning {len(ts_files)} files for private inject naming violations...\n")

    files_modified = 0

    for filepath in ts_files:
        try:
            rel = filepath.relative_to(UI_DIR)
            # Check if file has violations first
            content = filepath.read_text(encoding='utf-8')
            if re.search(r'private\s+readonly\s+([a-zA-Z][a-zA-Z0-9]*)\s*=\s*inject\(', content):
                # Check if any don't start with _
                matches = re.findall(r'private\s+readonly\s+([a-zA-Z][a-zA-Z0-9]*)\s*=\s*inject\(', content)
                non_prefixed = [m for m in matches if not m.startswith('_')]
                if non_prefixed:
                    print(f"  {rel}:")
                    if fix_private_inject_naming(filepath):
                        files_modified += 1
        except Exception as e:
            print(f"  ERROR: {filepath.relative_to(UI_DIR)}: {e}")

    print(f"\nDone: {files_modified} files modified")


if __name__ == '__main__':
    main()
