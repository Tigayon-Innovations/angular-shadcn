#!/usr/bin/env python3
"""Remove section divider comments from all UI component files."""

import re
from pathlib import Path

UI_DIR = Path("/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/src/app/lib/components/ui")

# Pattern matches lines like:
# // ============================================================================
# // =========================================================
# // -----------------------------------------------------------
DIVIDER_PATTERN = re.compile(r'^\s*//\s*[=\-#]{3,}\s*$')

# Pattern matches section label lines between dividers like:
# // Types
# // Component
# // Switch Component
SECTION_LABEL_PATTERN = re.compile(r'^\s*//\s*[A-Z][A-Za-z0-9 ]*\s*$')

files_modified = 0
lines_removed = 0

for filepath in sorted(UI_DIR.rglob('*.ts')):
    if filepath.name == 'index.ts' or filepath.name.endswith('.spec.ts'):
        continue

    content = filepath.read_text(encoding='utf-8')
    lines = content.split('\n')
    new_lines = []
    i = 0
    modified = False

    while i < len(lines):
        # Check for divider block pattern:
        # // ====...
        # // Label Text
        # // ====...
        if DIVIDER_PATTERN.match(lines[i]):
            # Look ahead for the section label + closing divider pattern
            block_lines = [i]
            j = i + 1

            # Skip blank lines
            while j < len(lines) and lines[j].strip() == '':
                block_lines.append(j)
                j += 1

            # Check for section label
            if j < len(lines) and SECTION_LABEL_PATTERN.match(lines[j]):
                block_lines.append(j)
                j += 1

                # Skip blank lines
                while j < len(lines) and lines[j].strip() == '':
                    block_lines.append(j)
                    j += 1

                # Check for closing divider
                if j < len(lines) and DIVIDER_PATTERN.match(lines[j]):
                    block_lines.append(j)
                    j += 1

                    # Also remove trailing blank line after the block
                    while j < len(lines) and lines[j].strip() == '':
                        block_lines.append(j)
                        j += 1

                    # Successfully identified a full divider block — skip it
                    lines_removed += len(block_lines)
                    modified = True
                    i = j
                    continue

            # Single divider line (no label) — remove it
            lines_removed += 1
            modified = True
            i += 1
            continue

        new_lines.append(lines[i])
        i += 1

    if modified:
        # Clean up excessive blank lines (more than 1 consecutive)
        cleaned = []
        prev_blank = False
        for line in new_lines:
            is_blank = line.strip() == ''
            if is_blank and prev_blank:
                continue
            cleaned.append(line)
            prev_blank = is_blank

        filepath.write_text('\n'.join(cleaned), encoding='utf-8')
        files_modified += 1
        print(f"  Fixed: {filepath.relative_to(UI_DIR)}")

print(f"\nDone: {files_modified} files modified, {lines_removed} lines removed")
