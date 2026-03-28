#!/usr/bin/env python3
"""Rename boolean signals to use is/has/can/should prefix."""
import re
import os

UI = os.path.join(os.path.dirname(__file__), '..', 'src', 'app', 'lib', 'components', 'ui')

renames = [
    ('checkbox/checkbox.component.ts', 'formsDisabled', 'isFormsDisabled'),
    ('radio-group/radio-group.component.ts', 'formsDisabled', 'isFormsDisabled'),
    ('slider/slider.component.ts', 'formsDisabled', 'isFormsDisabled'),
    ('switch/switch.component.ts', 'formsDisabled', 'isFormsDisabled'),
    ('combobox/combobox.component.ts', '_open', '_isOpen'),
    ('select/select.component.ts', '_open', '_isOpen'),
    ('select/select.component.ts', '_disabled', '_isDisabled'),
]

for rel, old, new_name in renames:
    path = os.path.join(UI, rel)
    with open(path) as f:
        content = f.read()
    pattern = re.compile(r'\b' + re.escape(old) + r'\b')
    count = len(pattern.findall(content))
    new_content = pattern.sub(new_name, content)
    if new_content != content:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f'  {rel}: {old} -> {new_name} ({count} occurrences)')

print('Done')
