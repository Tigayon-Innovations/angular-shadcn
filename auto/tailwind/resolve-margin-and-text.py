import os
import re

def process_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace classes
    new_content = re.sub(r'\bmr-', 'me-', content)
    new_content = re.sub(r'\bml-', 'ms-', new_content)
    new_content = re.sub(r'\btext-left\b', 'text-start', new_content)
    new_content = re.sub(r'\btext-right\b', 'text-end', new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        return True
    return False

def traverse_and_process(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if process_html_file(file_path):
                    print(f"Changes made to: {file_path}")

if __name__ == "__main__":
    src_directory = 'src'
    traverse_and_process(src_directory)
