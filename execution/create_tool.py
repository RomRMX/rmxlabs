import os
import sys
import argparse
import re

def to_snake_case(name):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()

def get_next_directive_number(directives_dir):
    try:
        files = os.listdir(directives_dir)
        max_num = 0
        for f in files:
            match = re.match(r'(\d+)_', f)
            if match:
                num = int(match.group(1))
                if num > max_num:
                    max_num = num
        return max_num + 1
    except OSError:
        return 1

def create_directive(number, name, goal, directives_dir, script_name):
    filename = f"{number:03d}_{name}.md"
    filepath = os.path.join(directives_dir, filename)
    
    content = f"""# Directive: {name.replace('_', ' ').title()}

## Goal
{goal}

## Inputs
- `example_input`: Description of input.

## Tools/Scripts
- `execution/{script_name}`

## Outputs
- JSON object with results.

## Edge Cases
- [ ] Handle missing inputs
- [ ] Handle API errors
"""
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created directive: {filepath}")

def create_execution_script(name, execution_dir):
    filename = f"{name}.py"
    filepath = os.path.join(execution_dir, filename)
    
    content = f"""import sys
import json
import argparse

def main():
    parser = argparse.ArgumentParser(description="{name.replace('_', ' ').title()}")
    parser.add_argument('--input', help='Example input')
    # Add arguments here
    
    args = parser.parse_args()
    
    try:
        # Business logic here
        result = {{
            "status": "success",
            "data": "Placeholder data"
        }}
        
        # Always output JSON to stdout
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        error_result = {{
            "status": "error",
            "message": str(e)
        }}
        print(json.dumps(error_result, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
"""
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created execution script: {filepath}")

def main():
    parser = argparse.ArgumentParser(description="Scaffold a new Agent Tool")
    parser.add_argument("--name", required=True, help="Name of the tool (snake_case)")
    parser.add_argument("--goal", required=True, help="Goal of the tool")
    args = parser.parse_args()
    
    project_root = os.getcwd()
    directives_dir = os.path.join(project_root, 'directives')
    execution_dir = os.path.join(project_root, 'execution')
    
    # Ensure directories exist
    os.makedirs(directives_dir, exist_ok=True)
    os.makedirs(execution_dir, exist_ok=True)
    
    next_num = get_next_directive_number(directives_dir)
    script_name = f"{args.name}.py"
    
    create_directive(next_num, args.name, args.goal, directives_dir, script_name)
    create_execution_script(args.name, execution_dir)
    
    print("\n✅ Tool scaffolding complete.")

if __name__ == "__main__":
    main()
