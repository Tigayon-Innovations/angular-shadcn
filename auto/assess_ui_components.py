#!/usr/bin/env python3
"""
Assess Angular UI component files for class member ordering, clean code, and code review violations.

Rules checked:
1. Class Member Ordering (canonical order violations)
2. Clean Code (naming, return types, any usage, comments)
3. Code Review (structural issues)
"""

import os
import re
import json
import sys
from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional

UI_DIR = Path("/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/src/app/lib/components/ui")

# Canonical member order positions
MEMBER_ORDER = {
    'constructor': 1,
    'viewChild': 2,
    'viewChildren': 2,
    'output': 3,
    'model': 4,
    'input.required': 5,
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
}

LIFECYCLE_HOOKS = [
    'ngOnChanges', 'ngOnInit', 'ngDoCheck',
    'ngAfterContentInit', 'ngAfterContentChecked',
    'ngAfterViewInit', 'ngAfterViewChecked', 'ngOnDestroy'
]

@dataclass
class Issue:
    file: str
    line: int
    category: str  # ordering, naming, return_type, any_type, comment, structural
    severity: str  # critical, warning, suggestion
    message: str

@dataclass
class FileReport:
    path: str
    relative_path: str
    issues: list = field(default_factory=list)
    has_class: bool = False
    line_count: int = 0


def classify_member(line: str, prev_lines: list[str] = None) -> Optional[str]:
    """Classify a class member line into its canonical category."""
    stripped = line.strip()

    # Constructor
    if re.match(r'^\s*constructor\s*\(', stripped):
        return 'constructor'

    # viewChild / viewChildren
    if 'viewChild' in stripped or 'viewChildren' in stripped:
        return 'viewChild'

    # output
    if re.search(r'=\s*output[<(]', stripped):
        return 'output'

    # model
    if re.search(r'=\s*model[<(]', stripped):
        return 'model'

    # input.required
    if 'input.required' in stripped:
        return 'input.required'

    # input (but not input.required)
    if re.search(r'=\s*input[<(]', stripped) and 'input.required' not in stripped:
        return 'input'

    # inject
    if 'inject(' in stripped:
        if stripped.startswith('private'):
            return 'private_inject'
        elif stripped.startswith('public') or stripped.startswith('readonly'):
            return 'public_inject'
        # No modifier defaults to public in many cases
        return 'public_inject'

    # computed
    if re.search(r'=\s*computed[<(]', stripped):
        return 'computed'

    # effect
    if re.search(r'=\s*effect\s*\(', stripped):
        return 'effect'

    # signal
    if re.search(r'=\s*signal[<(]', stripped):
        return 'signal'

    # linkedSignal
    if re.search(r'=\s*linkedSignal[<(]', stripped):
        return 'signal'

    # lifecycle
    for hook in LIFECYCLE_HOOKS:
        if re.match(rf'^\s*(public\s+|private\s+|protected\s+)?{hook}\s*\(', stripped):
            return 'lifecycle'

    # methods - skip template control flow keywords and common statements
    # Require visibility modifier OR be a clear method declaration to avoid matching continuation lines like cn(, map(, etc.
    skip_keywords = ('if', 'for', 'while', 'return', 'switch', 'else', 'case', 'try', 'catch', 'throw', 'new', 'super', 'class', 'import', 'export', 'const', 'let', 'var', 'type', 'interface', 'enum')
    # Methods with explicit visibility modifier
    if re.match(r'^\s*(public|private|protected)\s+(readonly\s+)?(async\s+)?[a-zA-Z_]\w*\s*[\(<]', stripped):
        fn_match = re.match(r'^\s*(?:public|private|protected)\s+(?:readonly\s+)?(?:async\s+)?([a-zA-Z_]\w*)\s*[\(<]', stripped)
        if fn_match and fn_match.group(1) not in skip_keywords:
            if stripped.startswith('private') or stripped.startswith('protected'):
                return 'private_method'
            return 'public_method'
    # Methods without modifier but with clear method signature (name followed by params and brace/colon)
    if re.match(r'^\s*(async\s+)?[a-zA-Z_]\w*\s*\([^)]*\)\s*[:{]', stripped):
        fn_match = re.match(r'^\s*(?:async\s+)?([a-zA-Z_]\w*)\s*\(', stripped)
        if fn_match and fn_match.group(1) not in skip_keywords:
            return 'public_method'

    return None


def analyze_file(filepath: Path) -> FileReport:
    """Analyze a single TypeScript file for violations."""
    rel_path = str(filepath.relative_to(UI_DIR.parent.parent.parent.parent))
    report = FileReport(path=str(filepath), relative_path=rel_path)

    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception:
        return report

    lines = content.split('\n')
    report.line_count = len(lines)

    # Skip non-class files (pure type/interface/const exports, barrel files)
    if not re.search(r'\bclass\s+\w+', content):
        return report

    report.has_class = True

    # --- Check 1: `any` type usage ---
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        # Skip comments
        if stripped.startswith('//') or stripped.startswith('*') or stripped.startswith('/*'):
            continue
        # Look for : any, <any>, as any
        any_matches = list(re.finditer(r'(?<![a-zA-Z])any(?![a-zA-Z])', line))
        for m in any_matches:
            # Context check - is it a type annotation?
            before = line[:m.start()]
            if ':' in before or '<' in before or 'as ' in before or '| ' in before or ', ' in before:
                report.issues.append(Issue(
                    file=rel_path, line=i, category='any_type',
                    severity='critical',
                    message=f'`any` type found: `{stripped.strip()[:80]}`'
                ))

    # --- Check 2: Missing return types on methods ---
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        # Match method declarations
        method_match = re.match(
            r'^\s*(public|private|protected|readonly)?\s*(async\s+)?([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*:\s*\S+|^\s*(public|private|protected|readonly)?\s*(async\s+)?([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{',
            stripped
        )
        if method_match:
            func_name = method_match.group(3) or method_match.group(7)
            if not func_name:
                continue
            # Skip constructor, lifecycle hooks, template keywords
            skip_kw = {'constructor', 'if', 'for', 'while', 'return', 'switch', 'else', 'case',
                        'try', 'catch', 'throw', 'new', 'super', 'class', 'import', 'export',
                        'const', 'let', 'var', 'type', 'interface', 'enum'}
            if func_name in skip_kw or func_name in LIFECYCLE_HOOKS:
                continue
            # Check if return type is specified (between ) and {)
            between = re.search(r'\)\s*:\s*\w+', stripped)
            if not between:
                report.issues.append(Issue(
                    file=rel_path, line=i, category='return_type',
                    severity='warning',
                    message=f'Method `{func_name}()` missing explicit return type'
                ))

    # --- Check 3: Commented-out code ---
    in_block_comment = False
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if '/*' in stripped:
            in_block_comment = True
        if '*/' in stripped:
            in_block_comment = False
            continue
        if in_block_comment:
            continue
        # Lines that look like commented-out code
        if re.match(r'^\s*//\s*(const|let|var|this\.|public|private|return|if|for|import)\s', stripped):
            report.issues.append(Issue(
                file=rel_path, line=i, category='comment',
                severity='warning',
                message=f'Commented-out code: `{stripped[:80]}`'
            ))

    # --- Check 4: Section divider comments ---
    for i, line in enumerate(lines, 1):
        if re.match(r'^\s*//\s*={3,}|^\s*//\s*-{3,}|^\s*//\s*#{3,}', line):
            report.issues.append(Issue(
                file=rel_path, line=i, category='comment',
                severity='suggestion',
                message=f'Section divider comment: `{line.strip()[:60]}`'
            ))

    # --- Check 5: Class member ordering ---
    # Find class body
    class_match = re.search(r'\bclass\s+(\w+).*?\{', content)
    if class_match:
        class_start = content[:class_match.end()].count('\n') + 1
        # Track member categories found in order
        member_sequence = []
        for i, line in enumerate(lines[class_start-1:], class_start):
            cat = classify_member(line)
            if cat:
                order_val = MEMBER_ORDER.get(cat, 99)
                member_sequence.append((i, cat, order_val, line.strip()[:60]))

        # Check ordering violations
        max_order_so_far = 0
        prev_cat = None
        for line_num, cat, order_val, snippet in member_sequence:
            if order_val < max_order_so_far and cat != prev_cat:
                report.issues.append(Issue(
                    file=rel_path, line=line_num, category='ordering',
                    severity='warning',
                    message=f'`{cat}` (order {order_val}) appears after higher-order member (order {max_order_so_far}). Expected canonical position.'
                ))
            if order_val > max_order_so_far:
                max_order_so_far = order_val
            prev_cat = cat

    # --- Check 6: Inject naming conventions ---
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        inject_match = re.match(r'^\s*(private|public)\s+readonly\s+(\w+)\s*=\s*inject\((\w+)\)', stripped)
        if inject_match:
            visibility = inject_match.group(1)
            var_name = inject_match.group(2)
            class_name = inject_match.group(3)
            if visibility == 'private' and not var_name.startswith('_'):
                report.issues.append(Issue(
                    file=rel_path, line=i, category='naming',
                    severity='warning',
                    message=f'Private inject `{var_name}` should be prefixed with `_`: `_{var_name}`'
                ))
            if visibility == 'public' and var_name.startswith('_'):
                report.issues.append(Issue(
                    file=rel_path, line=i, category='naming',
                    severity='warning',
                    message=f'Public inject `{var_name}` should not have `_` prefix'
                ))

    # --- Check 7: Generic variable names ---
    generic_names = {'data', 'result', 'temp', 'item', 'value', 'info', 'stuff', 'obj', 'val'}
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('*'):
            continue
        for name in generic_names:
            # Check for standalone variable declarations
            if re.search(rf'\b(const|let|var)\s+{name}\b\s*[=:]', stripped):
                report.issues.append(Issue(
                    file=rel_path, line=i, category='naming',
                    severity='suggestion',
                    message=f'Generic variable name `{name}` — use a more descriptive name'
                ))

    # --- Check 8: Boolean variables without is/has/can/should prefix ---
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        bool_match = re.search(r'=\s*signal\s*<\s*boolean\s*>', stripped)
        if bool_match:
            name_match = re.match(r'^\s*(public|private|protected|readonly|\s)*(\w+)\s*=', stripped)
            if name_match:
                var_name = name_match.group(2)
                if var_name and not re.match(r'^(is|has|can|should|was|did|will)', var_name):
                    report.issues.append(Issue(
                        file=rel_path, line=i, category='naming',
                        severity='suggestion',
                        message=f'Boolean signal `{var_name}` should use is/has/can/should prefix'
                    ))

    # --- Check 9: Missing readonly on signals/inject ---
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        # inject without readonly
        if 'inject(' in stripped and ('private' in stripped or 'public' in stripped) and 'readonly' not in stripped:
            report.issues.append(Issue(
                file=rel_path, line=i, category='structural',
                severity='warning',
                message=f'Inject missing `readonly` modifier: `{stripped[:60]}`'
            ))

    return report


def main():
    # Collect all .ts files (skip index.ts, spec, stories)
    ts_files = sorted([
        f for f in UI_DIR.rglob('*.ts')
        if f.name != 'index.ts'
        and not f.name.endswith('.spec.ts')
        and not f.name.endswith('.stories.ts')
    ])

    print(f"\n{'='*80}")
    print(f"  UI Component Assessment Report")
    print(f"  Directory: {UI_DIR}")
    print(f"  Total files to scan: {len(ts_files)}")
    print(f"{'='*80}\n")

    all_reports = []
    total_issues = 0
    files_with_issues = 0
    category_counts = {}
    severity_counts = {'critical': 0, 'warning': 0, 'suggestion': 0}

    for filepath in ts_files:
        report = analyze_file(filepath)
        all_reports.append(report)
        if report.issues:
            files_with_issues += 1
            total_issues += len(report.issues)
            for issue in report.issues:
                category_counts[issue.category] = category_counts.get(issue.category, 0) + 1
                severity_counts[issue.severity] += 1

    # --- Summary ---
    print(f"## Summary\n")
    print(f"- **Files scanned:** {len(ts_files)}")
    print(f"- **Files with classes:** {sum(1 for r in all_reports if r.has_class)}")
    print(f"- **Files with issues:** {files_with_issues}")
    print(f"- **Total issues:** {total_issues}")
    print()

    print(f"### By Severity\n")
    for sev in ['critical', 'warning', 'suggestion']:
        print(f"- **{sev.capitalize()}:** {severity_counts[sev]}")
    print()

    print(f"### By Category\n")
    for cat, count in sorted(category_counts.items(), key=lambda x: -x[1]):
        print(f"- **{cat}:** {count}")
    print()

    # --- Files with issues (grouped by component directory) ---
    print(f"\n{'='*80}")
    print(f"  Detailed Findings (files with issues only)")
    print(f"{'='*80}\n")

    # Group by component directory
    dir_groups: dict[str, list[FileReport]] = {}
    for report in all_reports:
        if not report.issues:
            continue
        component_dir = str(Path(report.relative_path).parent)
        if component_dir not in dir_groups:
            dir_groups[component_dir] = []
        dir_groups[component_dir].append(report)

    for dir_path in sorted(dir_groups.keys()):
        reports = dir_groups[dir_path]
        print(f"\n### {dir_path}/\n")
        for report in reports:
            filename = Path(report.relative_path).name
            print(f"  **{filename}** ({len(report.issues)} issues)")
            for issue in report.issues:
                icon = "🔴" if issue.severity == 'critical' else "🟡" if issue.severity == 'warning' else "🔵"
                print(f"    {icon} L{issue.line} [{issue.category}] {issue.message}")
        print()

    # --- Top priority files for fixing ---
    print(f"\n{'='*80}")
    print(f"  Top Priority Files (most issues)")
    print(f"{'='*80}\n")

    ranked = sorted(
        [r for r in all_reports if r.issues],
        key=lambda r: (
            -sum(1 for i in r.issues if i.severity == 'critical'),
            -len(r.issues)
        )
    )

    for i, report in enumerate(ranked[:30], 1):
        crits = sum(1 for i in report.issues if i.severity == 'critical')
        warns = sum(1 for i in report.issues if i.severity == 'warning')
        suggs = sum(1 for i in report.issues if i.severity == 'suggestion')
        print(f"  {i:2d}. {report.relative_path}")
        print(f"      Critical: {crits}, Warning: {warns}, Suggestion: {suggs}")

    # Write JSON report for programmatic use
    json_report = {
        'summary': {
            'total_files': len(ts_files),
            'files_with_classes': sum(1 for r in all_reports if r.has_class),
            'files_with_issues': files_with_issues,
            'total_issues': total_issues,
            'by_severity': severity_counts,
            'by_category': category_counts,
        },
        'files': [
            {
                'path': r.relative_path,
                'issues': [
                    {
                        'line': i.line,
                        'category': i.category,
                        'severity': i.severity,
                        'message': i.message,
                    }
                    for i in r.issues
                ]
            }
            for r in all_reports if r.issues
        ]
    }

    json_path = Path('/Users/jameleidyassin/Desktop/Tigayon/shadcn-angular/auto/ui_assessment_report.json')
    json_path.write_text(json.dumps(json_report, indent=2))
    print(f"\n\nJSON report written to: {json_path}")


if __name__ == '__main__':
    main()
