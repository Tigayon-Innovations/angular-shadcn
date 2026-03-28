---
name: file-rewrite-strategy
description: >-
  Safely rewrite or wholesale-replace Angular template and TypeScript files that
  resist incremental edits. Use when replace_string_in_file or heredoc approaches
  fail due to tab/space mismatches, shell-hostile characters, or large multi-section
  rewrites where incremental edits are impractical.
---

# File Rewrite Strategy

## When to Apply

Activate this skill when:

- `replace_string_in_file` fails because the file uses **tab indentation** that renders as spaces in the read context.
- A file needs a **full-page rewrite** (e.g., redesigning a login form, converting a whole template).
- The file content contains **shell-hostile characters** (`@if`, `(click)=`, `[ngClass]`, `${}`, backticks, single quotes inside attributes) that break heredoc or `cat` commands.
- Multiple incremental replacements would be fragile and error-prone compared to a single clean rewrite.

## Why Common Approaches Fail

### `replace_string_in_file` / `multi_replace_string_in_file`

- **Tab vs space mismatch:** The `read_file` tool renders tab characters as visual spaces. When copying text back into `oldString`, spaces don't match the actual tabs in the file. The tool requires an **exact byte match**.
- **Large rewrites:** When replacing 80%+ of a file, chaining many small replacements is slow, error-prone, and often hits ambiguity failures.

### Shell heredoc (`cat > file << 'EOF'`)

- Angular templates contain `@if`, `@for`, `@switch` — the `@` is benign but quotes/parens around them interact badly with shell parsing.
- `(click)="fn()"` — parentheses and nested quotes confuse the shell.
- `[ngClass]="{...}"` — braces can trigger brace expansion.
- `$variable` — dollar signs trigger shell variable interpolation even in some heredoc forms.
- Single quotes wrapping the delimiter (`<< 'EOF'`) prevents variable expansion but doesn't prevent all parsing issues with complex Angular template syntax.

### `sed` / `awk` inline replacement

- Same escaping nightmare. Angular templates are not sed-friendly.

## Recommended Approach: Python File Writer

Use a Python script to write the file. Python handles all special characters natively through its string system.

### Pattern

```
python3 << 'PYEOF'
import pathlib
content = r"""<FULL FILE CONTENT HERE>"""
pathlib.Path("<ABSOLUTE_FILE_PATH>").write_text(content)
print("Done")
PYEOF
```

### Why This Works

1. **Python raw strings (`r"""..."""`)** — no character is special except `"""` itself.
2. **If the content contains `"""`** — use a regular string with minimal escaping, or split into concatenated parts.
3. **`pathlib.Path.write_text()`** — atomic, clean, handles encoding.
4. **No shell escaping** — the heredoc feeds Python source to `python3`, and Python's own string handling is far more predictable than shell parsing.

### Alternative: `create_file` Tool (New Files Only)

- The `create_file` tool writes content exactly as provided with no shell escaping.
- **Limitation:** It only works for **new** files — it refuses to overwrite existing files.
- **Workaround:** Delete the original file first via terminal (`rm`), then `create_file`.
- **Risk:** If `create_file` fails after deletion, you've lost the file. Always backup first.

## Workflow

1. **Backup** the original file:
   ```
   cp original.html original.html.bak
   ```
2. **Draft** the full new content in your response context.
3. **Write** using the Python pattern above.
4. **Verify** the result with `read_file` (check first and last 10 lines).
5. **Clean up** the backup once verified:
   ```
   rm original.html.bak
   ```

## Rules

- Always **backup before rewriting**. Never delete without a backup.
- Always **verify after writing** — read the first and last ~10 lines to confirm correctness.
- Prefer **incremental `replace_string_in_file`** for small, targeted edits (1–10 lines). This skill is for when that approach fails or is impractical.
- When using Python raw strings, avoid `"""` in the template content. If unavoidable, use `'''` as the Python delimiter or escape minimally.
- **Never use `sed`/`awk`** for Angular template rewrites — the escaping cost is too high and errors are silent.

Read `references/file-rewrite-patterns.md` for concrete examples.
