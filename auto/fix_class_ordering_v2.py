#!/usr/bin/env python3
"""
Robust class member reorder script v2.
Correctly handles multi-line members by tracking brace/bracket/paren depth.
Only processes files that were restored from git (the 43 broken files).
Validates that no lines are lost during reordering.
"""

import os
import re
import sys

UI_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'app', 'lib', 'components', 'ui')

# Canonical order (0-indexed priority)
CATEGORY_ORDER = {
    'constructor':     0,
    'viewchild':       1,
    'output':          2,
    'model':           3,
    'input_required':  4,
    'input':           5,
    'private_inject':  6,
    'public_inject':   7,
    'store_alias':     8,
    'computed':        9,
    'signal':         10,
    'form':           11,
    'constant':       12,
    'lifecycle':      13,
    'public_method':  14,
    'private_method': 15,
    'effect':         16,
}

LIFECYCLE_METHODS = {'ngOnInit', 'ngOnDestroy', 'ngAfterViewInit', 'ngAfterContentInit',
                     'ngOnChanges', 'ngDoCheck', 'ngAfterContentChecked', 'ngAfterViewChecked'}

# Only process the 43 files that were restored from git
TARGET_FILES = [
    'accordion/accordion-context.ts',
    'accordion/accordion-item.component.ts',
    'alert-dialog/alert-dialog-trigger.component.ts',
    'calendar/calendar.component.ts',
    'carousel/carousel-next.component.ts',
    'carousel/carousel-previous.component.ts',
    'carousel/carousel.component.ts',
    'combobox/combobox-value.component.ts',
    'command/command-group.component.ts',
    'command/command-item.component.ts',
    'context-menu/context-menu-content.component.ts',
    'data-table/data-table-content.component.ts',
    'dialog/dialog-content.component.ts',
    'dialog/dialog-context.ts',
    'dialog/dialog-trigger.component.ts',
    'dialog/dialog.component.ts',
    'drawer/drawer-trigger.component.ts',
    'drawer/drawer.component.ts',
    'dropdown-menu/dropdown-menu-content.component.ts',
    'form/form-field.component.ts',
    'form/form-message.component.ts',
    'hover-card/hover-card-content.component.ts',
    'hover-card/hover-card-trigger.component.ts',
    'input-otp/input-otp-slot.component.ts',
    'input/input.component.ts',
    'menubar/menubar-trigger.component.ts',
    'navigation-menu/navigation-menu-content.component.ts',
    'popover/popover-trigger.component.ts',
    'radio-group/radio-group-item.component.ts',
    'segmented/segmented-item.component.ts',
    'select/select-trigger.component.ts',
    'sheet/sheet-content.component.ts',
    'sheet/sheet-trigger.component.ts',
    'sheet/sheet.component.ts',
    'slider/slider.component.ts',
    'tabs/tabs-context.ts',
    'tabs/tabs-trigger.component.ts',
    'tabs/tabs.component.ts',
    'toast/toast.component.ts',
    'toggle-group/toggle-group-item.component.ts',
    'toggle-group/toggle-group.component.ts',
    'toggle/toggle.component.ts',
    'tooltip/tooltip.component.ts',
]


def find_class_body(lines):
    """Find the class body start and end (inside the outermost braces of the class)."""
    class_start = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if re.match(r'^export\s+(abstract\s+)?class\s+', stripped):
            class_start = i
            break

    if class_start is None:
        return None, None

    # Find the opening brace of the class
    depth = 0
    brace_start = None
    for i in range(class_start, len(lines)):
        for ch in lines[i]:
            if ch == '{':
                if depth == 0:
                    brace_start = i
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    # brace_start+1 to i-1 is the class body (exclusive of braces line)
                    # But we need the content between the braces
                    return brace_start, i
    return None, None


def find_member_end(lines, start, end_limit):
    """
    Given a member starting at line `start`, find where it ends.
    Tracks depth of {}, (), [] and handles string literals.
    A member ends when we return to depth 0 and the line ends with ; or }
    (accounting for trailing comments).
    """
    depth_brace = 0
    depth_paren = 0
    depth_bracket = 0
    in_string = None  # None, "'", '"', '`'
    in_line_comment = False
    in_block_comment = False

    for i in range(start, end_limit):
        line = lines[i]
        j = 0
        in_line_comment = False
        while j < len(line):
            ch = line[j]

            # Handle block comments
            if in_block_comment:
                if ch == '*' and j + 1 < len(line) and line[j + 1] == '/':
                    in_block_comment = False
                    j += 2
                    continue
                j += 1
                continue

            # Handle line comments
            if in_line_comment:
                break

            # Handle strings
            if in_string:
                if ch == '\\':
                    j += 2  # skip escaped char
                    continue
                if ch == in_string:
                    if in_string == '`':
                        in_string = None
                    else:
                        in_string = None
                j += 1
                continue

            # Check for comment starts
            if ch == '/' and j + 1 < len(line):
                if line[j + 1] == '/':
                    in_line_comment = True
                    break
                elif line[j + 1] == '*':
                    in_block_comment = True
                    j += 2
                    continue

            # Check for string starts
            if ch in ("'", '"', '`'):
                in_string = ch
                j += 1
                continue

            # Track depth
            if ch == '{':
                depth_brace += 1
            elif ch == '}':
                depth_brace -= 1
            elif ch == '(':
                depth_paren += 1
            elif ch == ')':
                depth_paren -= 1
            elif ch == '[':
                depth_bracket += 1
            elif ch == ']':
                depth_bracket -= 1

            j += 1

        # Check if member ended after this line
        if depth_brace <= 0 and depth_paren <= 0 and depth_bracket <= 0:
            stripped = line.rstrip()
            # Remove trailing line comment for end detection
            code_part = stripped
            if '//' in code_part:
                # Simple heuristic: remove trailing // comment
                idx = code_part.rfind('//')
                # Make sure it's not inside a string (simple check)
                code_part = code_part[:idx].rstrip()

            if code_part.endswith(';') or code_part.endswith('}') or code_part.endswith(',') or code_part.endswith(')'):
                return i

            # Also end if the next line starts a new member or is blank followed by a member
            if i + 1 < end_limit:
                next_stripped = lines[i + 1].strip()
                if is_member_start(next_stripped) or is_comment_start(next_stripped):
                    return i

    return end_limit - 1


def is_comment_start(stripped):
    """Check if line starts a comment block (JSDoc or single-line)."""
    return stripped.startswith('/**') or stripped.startswith('/*') or stripped.startswith('//')


def is_member_start(stripped):
    """Check if a line looks like it starts a class member."""
    if not stripped or stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
        return False

    # Common member patterns
    patterns = [
        r'^(readonly|private|public|protected)\s+',
        r'^(abstract\s+)?(readonly\s+)?[\w]+\s*[=:(]',
        r'^(get|set)\s+\w+',
        r'^(async\s+)?\w+\s*\(',
        r'^constructor\s*\(',
        r'^(ng\w+)\s*\(',
        r'^@\w+',  # decorator
    ]
    for p in patterns:
        if re.match(p, stripped):
            return True
    return False


def classify_member(lines, start, end):
    """Classify a member block into a category."""
    # Get the significant line (skip decorators and comments)
    sig_line = None
    for i in range(start, end + 1):
        stripped = lines[i].strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*') or stripped.startswith('*/'):
            continue
        if stripped.startswith('@'):
            continue
        if stripped:
            sig_line = stripped
            break

    if sig_line is None:
        return 'constant'

    # Constructor
    if sig_line.startswith('constructor') or sig_line.startswith('protected constructor') or sig_line.startswith('private constructor') or sig_line.startswith('public constructor'):
        return 'constructor'

    # ViewChild / ViewChildren / ContentChild / ContentChildren
    full_block = '\n'.join(lines[start:end+1])
    if 'viewChild' in full_block or 'viewChildren' in full_block or 'contentChild' in full_block or 'contentChildren' in full_block:
        return 'viewchild'

    # Output
    if re.search(r'\boutput\s*[<(]', full_block) or 'outputFromObservable(' in full_block:
        return 'output'

    # Model
    if re.search(r'\bmodel\s*[<(]', full_block) or re.search(r'\bmodel\.required\s*[<(]', full_block):
        return 'model'

    # Input required
    if 'input.required' in full_block:
        return 'input_required'

    # Input
    if re.search(r'\binput\s*[<(]', full_block) and 'input.required' not in full_block:
        return 'input'

    # Effect
    if re.search(r'\beffect\s*\(', full_block):
        return 'effect'

    # Inject
    if 'inject(' in full_block:
        if sig_line.startswith('private') or sig_line.startswith('readonly private') or re.match(r'^(private\s+)?readonly\s+_', sig_line):
            return 'private_inject'
        return 'public_inject'

    # Computed
    if 'computed(' in full_block:
        return 'computed'

    # Signal
    if re.search(r'\bsignal\s*[<(]', full_block) or re.search(r'\blinkedSignal\s*[<(]', full_block):
        return 'signal'

    # Form-related
    if re.search(r'\b(FormGroup|FormControl|FormBuilder|FormArray|fb\.|new\s+Form)', full_block):
        return 'form'

    # Lifecycle methods
    for lc in LIFECYCLE_METHODS:
        if re.match(rf'^(async\s+)?{lc}\s*\(', sig_line):
            return 'lifecycle'

    # Methods
    method_match = re.match(r'^(private|protected|public)?\s*(async\s+)?(get\s+|set\s+)?(\w+)\s*[\(<]', sig_line)
    if method_match:
        visibility = method_match.group(1)
        name = method_match.group(4)
        if name in LIFECYCLE_METHODS:
            return 'lifecycle'
        if visibility == 'private' or visibility == 'protected':
            return 'private_method'
        return 'public_method'

    # Check for arrow function methods: name = (...) => { or name = () =>
    arrow_match = re.match(r'^(private|protected|public)?\s*(readonly\s+)?(\w+)\s*=\s*(\(|async\s*\()', sig_line)
    if arrow_match:
        visibility = arrow_match.group(1)
        if visibility == 'private' or visibility == 'protected':
            return 'private_method'
        return 'public_method'

    # Store aliases: something = this.store.selectSignal(...) etc
    if re.search(r'this\.\w+Store\b|this\.store\b', full_block):
        return 'store_alias'

    # Default: constant/property
    return 'constant'


def parse_members(lines, body_start, body_end):
    """
    Parse class body into individual members.
    Returns list of (category, start_line, end_line, lines_text).
    """
    members = []
    i = body_start + 1  # skip the line with opening brace

    while i < body_end:
        stripped = lines[i].strip()

        # Skip empty lines
        if not stripped:
            i += 1
            continue

        # Start of a member (could be a comment block, decorator, or actual member)
        member_start = i

        # Consume leading comments
        while i < body_end and (lines[i].strip().startswith('//') or
                                 lines[i].strip().startswith('/*') or
                                 lines[i].strip().startswith('*') or
                                 lines[i].strip().startswith('*/')):
            if lines[i].strip().startswith('/*'):
                # Find end of block comment
                while i < body_end and '*/' not in lines[i]:
                    i += 1
                i += 1  # skip the */ line
            else:
                i += 1

        # Skip empty lines between comment and member
        while i < body_end and not lines[i].strip():
            i += 1

        if i >= body_end:
            # Trailing comments at end of class
            members.append(('constant', member_start, i - 1, lines[member_start:i]))
            break

        # Consume decorators
        while i < body_end and lines[i].strip().startswith('@'):
            # Decorator might span multiple lines
            end = find_member_end(lines, i, body_end)
            i = end + 1

        # Skip empty lines after decorators
        while i < body_end and not lines[i].strip():
            i += 1

        if i >= body_end:
            members.append(('constant', member_start, i - 1, lines[member_start:i]))
            break

        # Now find the end of the actual member
        member_end = find_member_end(lines, i, body_end)
        actual_end = member_end

        # The full member includes its leading comments and decorators
        member_lines = lines[member_start:actual_end + 1]
        category = classify_member(lines, member_start, actual_end)

        members.append((category, member_start, actual_end, member_lines))
        i = actual_end + 1

    return members


def reorder_class(filepath):
    """Reorder class members in the given file. Returns True if modified."""
    with open(filepath, 'r') as f:
        lines = f.readlines()

    body_start, body_end = find_class_body(lines)
    if body_start is None or body_end is None:
        return False

    members = parse_members(lines, body_start, body_end)

    if not members:
        return False

    # Check if already in order
    categories = [m[0] for m in members]
    priorities = [CATEGORY_ORDER.get(c, 12) for c in categories]
    if priorities == sorted(priorities):
        return False  # already ordered

    # Sort members by category priority, preserving relative order within same category
    sorted_members = sorted(members, key=lambda m: CATEGORY_ORDER.get(m[0], 12))

    # Build new class body
    new_body_lines = []
    prev_category = None
    for i, (category, _, _, member_lines) in enumerate(sorted_members):
        # Add blank line between different categories
        if prev_category is not None and category != prev_category:
            new_body_lines.append('\n')
        new_body_lines.extend(member_lines)
        prev_category = category

    # Validate: no lines lost
    original_body = lines[body_start + 1:body_end]
    original_non_empty = [l.strip() for l in original_body if l.strip()]
    new_non_empty = [l.strip() for l in new_body_lines if l.strip()]

    if len(new_non_empty) != len(original_non_empty):
        print(f"  WARNING: Line count mismatch in {os.path.basename(filepath)}: "
              f"original={len(original_non_empty)}, new={len(new_non_empty)} — SKIPPING")
        return False

    # Validate: all original lines are present
    orig_set = sorted(original_non_empty)
    new_set = sorted(new_non_empty)
    if orig_set != new_set:
        # Find what's missing/extra
        from collections import Counter
        orig_counter = Counter(original_non_empty)
        new_counter = Counter(new_non_empty)
        missing = orig_counter - new_counter
        extra = new_counter - orig_counter
        if missing:
            print(f"  WARNING: Missing lines in {os.path.basename(filepath)}: {list(missing.keys())[:3]}... — SKIPPING")
        if extra:
            print(f"  WARNING: Extra lines in {os.path.basename(filepath)}: {list(extra.keys())[:3]}... — SKIPPING")
        return False

    # Reconstruct file
    new_lines = lines[:body_start + 1]  # everything up to and including class opening brace line
    # Make sure the opening brace line ends properly
    new_lines.extend(new_body_lines)
    # Ensure a newline before closing brace
    if new_body_lines and not new_body_lines[-1].endswith('\n'):
        new_lines.append('\n')
    new_lines.extend(lines[body_end:])  # closing brace and everything after

    with open(filepath, 'w') as f:
        f.writelines(new_lines)

    return True


def main():
    fixed_count = 0
    skipped_count = 0

    for rel_path in TARGET_FILES:
        filepath = os.path.join(UI_DIR, rel_path)
        if not os.path.exists(filepath):
            print(f"  File not found: {rel_path}")
            continue

        try:
            result = reorder_class(filepath)
            if result:
                print(f"  Reordered: {rel_path}")
                fixed_count += 1
            # else: already in order or no class
        except Exception as e:
            print(f"  ERROR in {rel_path}: {e}")
            skipped_count += 1

    print(f"\nDone: {fixed_count} files reordered, {skipped_count} errors")


if __name__ == '__main__':
    main()
