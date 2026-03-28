# File Rewrite Patterns

Concrete examples for safely rewriting files that resist incremental edits.

---

## Pattern 1: Python Raw-String Full Rewrite

Best for Angular templates, HTML files with complex attribute bindings.

```bash
python3 << 'PYEOF'
import pathlib

content = r"""<div class="flex flex-col gap-4">
	@if (isLoading()) {
		<mat-spinner [diameter]="20" />
	} @else {
		<button
			(click)="save()"
			[ngClass]="{
				'bg-gray-900': !disabled(),
				'bg-gray-300 cursor-not-allowed': disabled(),
			}"
		>
			Continue
		</button>
	}
</div>
"""

pathlib.Path("/absolute/path/to/component.html").write_text(content)
print("Done")
PYEOF
```

**Key points:**
- `r"""..."""` disables Python escape processing — tabs, quotes, `@`, `$`, `()`, `[]`, `{}` all pass through literally.
- The heredoc `<< 'PYEOF'` feeds Python source to the interpreter — the *shell* doesn't parse the HTML at all.
- Use `\t` for tabs only if you *want* Python to interpret them; in raw strings `\t` is literal backslash-t. For actual tabs, include real tab characters in the content.

---

## Pattern 2: Python with Triple Single-Quotes

Use when the template content contains `"""` (triple double-quotes):

```bash
python3 << 'PYEOF'
import pathlib

content = r'''<div title="some &quot;quoted&quot; text">
	@for (item of items(); track item.id) {
		<span [attr.data-id]="item.id">{{ item.name }}</span>
	}
</div>
'''

pathlib.Path("/absolute/path/to/component.html").write_text(content)
print("Done")
PYEOF
```

---

## Pattern 3: Backup + Delete + create_file

When you prefer the `create_file` tool over Python (simpler, no shell):

```
Step 1: Terminal — backup
  cp component.html component.html.bak

Step 2: Terminal — remove original
  rm component.html

Step 3: create_file tool — write new content
  (create_file handles all characters natively)

Step 4: Terminal — verify
  head -5 component.html && echo "---" && tail -5 component.html

Step 5: Terminal — cleanup
  rm component.html.bak
```

**Trade-off:** If `create_file` fails after `rm`, you need the backup.

---

## Anti-Patterns (DO NOT USE)

### Shell heredoc directly to file

```bash
# BROKEN — Angular @if, (click), [ngClass], {} all cause shell issues
cat > file.html << 'EOF'
<div [ngClass]="{'active': isActive()}">
  @if (show()) { <span>Hi</span> }
</div>
EOF
```

Even with single-quoted `'EOF'`, complex Angular templates with nested quotes, parentheses, and braces can produce corrupted output.

### sed with Angular templates

```bash
# BROKEN — escaping nightmare
sed -i '' 's/@if (loading())/something/g' file.html
```

Parentheses, braces, and `@` require extensive escaping in sed. Not worth it.

---

## Decision Tree

```
Need to edit a file?
├─ Small change (1–10 lines), confident about whitespace?
│  └─ Use replace_string_in_file
├─ Small change but tab/space mismatch causes failure?
│  └─ Use Python to read the file, find/replace, and write back
├─ Large rewrite (50%+ of file)?
│  └─ Backup → Python raw-string full rewrite → Verify
└─ Creating a brand-new file?
   └─ Use create_file tool directly
```
