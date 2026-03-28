#!/usr/bin/env python3
"""
Automatically reorder class members in Angular component files to follow canonical order.

Canonical order:
1. constructor
2. viewChild / viewChildren
3. output
4. model
5. input.required
6. input
7. private inject
8. public inject / protected inject
9. store aliases
10. computed
11. signals (signal, linkedSignal)
12. forms
13. constants (readonly non-signal, non-inject, non-computed properties)
14. lifecycle hooks
15. public methods
16. private/protected methods
17. effects
"""

import re
import sys
from pathlib import Path
from dataclasses import dataclass, field

UI_DIR = Path("/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/src/app/lib/components/ui")

LIFECYCLE_HOOKS = [
    'ngOnChanges', 'ngOnInit', 'ngDoCheck',
    'ngAfterContentInit', 'ngAfterContentChecked',
    'ngAfterViewInit', 'ngAfterViewChecked', 'ngOnDestroy'
]

LIFECYCLE_ORDER = {hook: i for i, hook in enumerate(LIFECYCLE_HOOKS)}

ORDER_MAP = {
    'constructor': 1,
    'viewChild': 2,
    'output': 3,
    'model': 4,
    'input_required': 5,
    'input': 6,
    'private_inject': 7,
    'public_inject': 8,
    'store_alias': 9,
    'computed': 10,
    'signal': 11,
    'form': 12,
    'constant': 13,
    'lifecycle': 14,
    'public_method': 15,
    'private_method': 16,
    'effect': 17,
    'cva_callback': 13.5,  # ControlValueAccessor callbacks between constants and lifecycle
}


@dataclass
class ClassMember:
    lines: list[str]
    category: str
    order: float
    sub_order: int = 0  # for lifecycle hook ordering
    name: str = ''
    leading_comments: list[str] = field(default_factory=list)
    leading_blank_lines: int = 0


def find_member_end(lines: list[str], start: int) -> int:
    """Find the end of a multi-line member starting at `start`.
    Tracks brace, paren, and bracket depth.
    """
    depth_brace = 0
    depth_paren = 0
    depth_bracket = 0
    in_string = False
    string_char = ''
    in_template_literal = False

    i = start
    started = False

    while i < len(lines):
        line = lines[i]
        j = 0
        while j < len(line):
            ch = line[j]

            # Handle string context
            if in_string:
                if ch == '\\' and j + 1 < len(line):
                    j += 2
                    continue
                if ch == string_char:
                    in_string = False
                j += 1
                continue

            if in_template_literal:
                if ch == '\\' and j + 1 < len(line):
                    j += 2
                    continue
                if ch == '`':
                    in_template_literal = False
                j += 1
                continue

            # Start of string
            if ch in ('"', "'"):
                in_string = True
                string_char = ch
                j += 1
                continue

            if ch == '`':
                in_template_literal = True
                j += 1
                continue

            # Handle single-line comments
            if ch == '/' and j + 1 < len(line) and line[j + 1] == '/':
                break  # Rest of line is comment

            # Track depth
            if ch == '{':
                depth_brace += 1
                started = True
            elif ch == '}':
                depth_brace -= 1
            elif ch == '(':
                depth_paren += 1
                started = True
            elif ch == ')':
                depth_paren -= 1
            elif ch == '[':
                depth_bracket += 1
            elif ch == ']':
                depth_bracket -= 1

            j += 1

        # For single-line declarations (properties without braces/parens)
        stripped = lines[start].strip()
        if not started and i == start:
            # Simple property declaration ending with a value
            if stripped.endswith(';') or stripped.endswith(','):
                return i
            # Check if it's a complete single-line declaration
            if (depth_brace == 0 and depth_paren == 0 and depth_bracket == 0 and
                not stripped.endswith('{') and not stripped.endswith('(') and
                not stripped.endswith(',')):
                # Could be start of a multi-line - check next line
                if i + 1 < len(lines) and lines[i+1].strip() and not lines[i+1].strip().startswith('//'):
                    next_stripped = lines[i+1].strip()
                    # If next line starts with a new member or is a closing, this line is complete
                    if (is_member_start(next_stripped) or
                        next_stripped.startswith('}') or
                        next_stripped == ''):
                        return i
                else:
                    return i

        # Check if we've closed all opened brackets
        if started and depth_brace <= 0 and depth_paren <= 0 and depth_bracket <= 0:
            return i

        i += 1

    return len(lines) - 1


def is_member_start(line: str) -> bool:
    """Check if a line starts a new class member."""
    stripped = line.strip()
    if not stripped or stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
        return False

    # Class member patterns
    patterns = [
        r'^(public|private|protected|readonly)\s+',
        r'^(async\s+)?[a-zA-Z_]\w*\s*[\(=:]',
        r'^constructor\s*\(',
        r'^ngOn\w+\s*\(',
        r'^ngAfter\w+\s*\(',
        r'^ngDoCheck\s*\(',
        r'^get\s+\w+',
        r'^set\s+\w+',
    ]
    return any(re.match(p, stripped) for p in patterns)


def classify_member(lines: list[str]) -> tuple[str, str, int]:
    """Classify a member block. Returns (category, name, sub_order)."""
    first_line = lines[0].strip()
    full_text = ' '.join(l.strip() for l in lines)

    # Constructor
    if re.match(r'^constructor\s*\(', first_line):
        return 'constructor', 'constructor', 0

    # viewChild / viewChildren
    if 'viewChild' in full_text or 'viewChildren' in full_text:
        name = extract_name(first_line)
        return 'viewChild', name, 0

    # output
    if re.search(r'=\s*output[<(]', full_text):
        name = extract_name(first_line)
        return 'output', name, 0

    # model
    if re.search(r'=\s*model[<(]', full_text):
        name = extract_name(first_line)
        return 'model', name, 0

    # input.required
    if 'input.required' in full_text:
        name = extract_name(first_line)
        return 'input_required', name, 0

    # input
    if re.search(r'=\s*input[<(]', full_text):
        name = extract_name(first_line)
        return 'input', name, 0

    # effect
    if re.search(r'=\s*effect\s*\(', full_text):
        name = extract_name(first_line)
        return 'effect', name, 0

    # inject
    if 'inject(' in full_text:
        name = extract_name(first_line)
        if first_line.startswith('private'):
            return 'private_inject', name, 0
        return 'public_inject', name, 0

    # computed
    if re.search(r'=\s*computed[<(]', full_text):
        name = extract_name(first_line)
        return 'computed', name, 0

    # signal / linkedSignal
    if re.search(r'=\s*(signal|linkedSignal)[<(]', full_text):
        name = extract_name(first_line)
        return 'signal', name, 0

    # lifecycle hooks
    for hook in LIFECYCLE_HOOKS:
        if re.match(rf'^(?:public\s+|private\s+|protected\s+)?{hook}\s*\(', first_line):
            return 'lifecycle', hook, LIFECYCLE_ORDER.get(hook, 99)

    # ControlValueAccessor methods
    cva_methods = ['writeValue', 'registerOnChange', 'registerOnTouched', 'setDisabledState']
    for method_name in cva_methods:
        if re.match(rf'^(?:public\s+|private\s+|protected\s+)?{method_name}\s*\(', first_line):
            return 'cva_callback', method_name, cva_methods.index(method_name)

    # Methods
    method_match = re.match(
        r'^(?:public\s+|private\s+|protected\s+)?(?:readonly\s+)?(?:async\s+)?([a-zA-Z_]\w*)\s*[\(<]',
        first_line
    )
    if method_match:
        name = method_match.group(1)
        if first_line.startswith('private') or first_line.startswith('protected'):
            return 'private_method', name, 0
        return 'public_method', name, 0

    # Getter/setter
    getter_match = re.match(r'^(?:public\s+|private\s+|protected\s+)?(?:get|set)\s+(\w+)', first_line)
    if getter_match:
        name = getter_match.group(1)
        if first_line.startswith('private') or first_line.startswith('protected'):
            return 'private_method', name, 0
        return 'public_method', name, 0

    # Constants/properties (anything with = that isn't signal/computed/inject/input/etc)
    prop_match = re.match(
        r'^(?:public\s+|private\s+|protected\s+)?(?:readonly\s+)?(\w+)\s*[=:]',
        first_line
    )
    if prop_match:
        name = prop_match.group(1)
        # Check if it's a store alias (accessing another store's property)
        if re.search(r'=\s*this\.\w+\.\w+$', first_line.rstrip()):
            return 'store_alias', name, 0
        return 'constant', name, 0

    return 'constant', '', 0


def extract_name(line: str) -> str:
    """Extract the member name from a declaration line."""
    match = re.match(
        r'^(?:public\s+|private\s+|protected\s+)?(?:readonly\s+)?(?:async\s+)?(\w+)',
        line.strip()
    )
    return match.group(1) if match else ''


def parse_class_members(lines: list[str], class_body_start: int, class_body_end: int) -> list[ClassMember]:
    """Parse class body into individual members with their categories."""
    members = []
    i = class_body_start
    pending_comments = []
    pending_blanks = 0

    while i <= class_body_end:
        line = lines[i]
        stripped = line.strip()

        # Blank lines
        if not stripped:
            pending_blanks += 1
            i += 1
            continue

        # Comments (including JSDoc blocks)
        if stripped.startswith('//') or stripped.startswith('/**') or stripped.startswith('/*') or stripped.startswith('*'):
            if stripped.startswith('/**') or stripped.startswith('/*'):
                pending_comments.append(lines[i])
                # Single-line comment (e.g., /** comment */ or /* comment */)
                if '*/' in stripped[2:]:
                    i += 1
                    continue
                # Multi-line comment
                i += 1
                while i <= class_body_end:
                    pending_comments.append(lines[i])
                    if '*/' in lines[i]:
                        i += 1
                        break
                    i += 1
                continue
            else:
                pending_comments.append(lines[i])
                i += 1
                continue

        # This is a member start
        if is_member_start(stripped) or stripped.startswith('constructor'):
            member_start = i
            member_end = find_member_end(lines, i)
            member_lines = lines[member_start:member_end + 1]

            category, name, sub_order = classify_member(member_lines)
            order = ORDER_MAP.get(category, 99)

            member = ClassMember(
                lines=member_lines,
                category=category,
                order=order,
                sub_order=sub_order,
                name=name,
                leading_comments=pending_comments.copy(),
                leading_blank_lines=min(pending_blanks, 1),  # max 1 blank line
            )
            members.append(member)
            pending_comments.clear()
            pending_blanks = 0
            i = member_end + 1
        else:
            # Unknown line — treat as part of previous context
            pending_comments.append(lines[i])
            i += 1

    return members


def find_class_boundaries(content: str) -> list[tuple[int, int, int]]:
    """Find class declaration and body boundaries.
    Returns list of (decorator_start, body_start, body_end) line indices.
    """
    lines = content.split('\n')
    results = []

    i = 0
    while i < len(lines):
        stripped = lines[i].strip()

        # Look for class declaration
        if re.match(r'^export\s+class\s+\w+', stripped):
            # Find the opening brace
            j = i
            while j < len(lines) and '{' not in lines[j]:
                j += 1

            # body_start is the line after the opening brace
            body_start = j + 1

            # Find closing brace (track depth)
            depth = 1
            k = body_start
            while k < len(lines) and depth > 0:
                for ch in lines[k]:
                    if ch == '{':
                        depth += 1
                    elif ch == '}':
                        depth -= 1
                        if depth == 0:
                            break
                if depth == 0:
                    break
                k += 1

            body_end = k - 1  # Last line before closing brace
            results.append((i, body_start, body_end))
            i = k + 1
        else:
            i += 1

    return results


def reorder_file(filepath: Path) -> bool:
    """Reorder class members in a file. Returns True if modified."""
    content = filepath.read_text(encoding='utf-8')

    # Skip files without classes
    if not re.search(r'\bexport\s+class\s+\w+', content):
        return False

    lines = content.split('\n')
    boundaries = find_class_boundaries(content)

    if not boundaries:
        return False

    modified = False

    # Process classes in reverse order to maintain line indices
    for _, body_start, body_end in reversed(boundaries):
        if body_start > body_end:
            continue

        members = parse_class_members(lines, body_start, body_end)

        if not members:
            continue

        # Check if already in order
        current_orders = [(m.order, m.sub_order) for m in members]
        is_ordered = all(
            current_orders[i] <= current_orders[i + 1]
            for i in range(len(current_orders) - 1)
        )

        if is_ordered:
            continue

        # Sort members by canonical order, preserving relative order within same category
        sorted_members = sorted(
            members,
            key=lambda m: (m.order, m.sub_order, members.index(m))
        )

        # Rebuild the class body
        new_body_lines = []
        prev_category = None

        for member in sorted_members:
            # Add blank line between different categories
            if prev_category is not None and member.category != prev_category:
                new_body_lines.append('')

            # Add leading comments
            for comment_line in member.leading_comments:
                new_body_lines.append(comment_line)

            # Add member lines
            for member_line in member.lines:
                new_body_lines.append(member_line)

            prev_category = member.category

        # Replace the class body
        lines[body_start:body_end + 1] = new_body_lines
        modified = True

    if modified:
        # Clean up excessive blank lines
        cleaned = []
        prev_blank = False
        for line in lines:
            is_blank = line.strip() == ''
            if is_blank and prev_blank:
                continue
            cleaned.append(line)
            prev_blank = is_blank

        filepath.write_text('\n'.join(cleaned), encoding='utf-8')

    return modified


def main():
    ts_files = sorted([
        f for f in UI_DIR.rglob('*.ts')
        if f.name != 'index.ts'
        and not f.name.endswith('.spec.ts')
        and not f.name.endswith('.stories.ts')
    ])

    print(f"Scanning {len(ts_files)} files for ordering violations...\n")

    files_modified = 0
    files_skipped = 0
    errors = []

    for filepath in ts_files:
        try:
            if reorder_file(filepath):
                files_modified += 1
                print(f"  Reordered: {filepath.relative_to(UI_DIR)}")
            else:
                files_skipped += 1
        except Exception as e:
            errors.append((filepath.relative_to(UI_DIR), str(e)))
            print(f"  ERROR: {filepath.relative_to(UI_DIR)}: {e}")

    print(f"\nDone: {files_modified} files reordered, {files_skipped} files already correct")
    if errors:
        print(f"Errors: {len(errors)}")
        for path, err in errors:
            print(f"  {path}: {err}")


if __name__ == '__main__':
    main()
