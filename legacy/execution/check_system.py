import sys
import json
import os
import platform
from datetime import datetime

def main():
    print("Running System Health Check...")
    
    # helper for output both to console and file
    # Collect data for JSON output
    data = {
        "timestamp": datetime.now().isoformat(),
        "python_version": sys.version,
        "platform": platform.platform(),
        "cwd": os.getcwd(),
        "checks": {}
    }

    # Check directories
    required_dirs = ['directives', 'execution', '.tmp']
    all_dirs_exist = True
    
    for d in required_dirs:
        exists = os.path.isdir(d)
        status = "EXISTS" if exists else "MISSING"
        if not exists:
            all_dirs_exist = False
        data["checks"][d] = status
        
    # Write human readable log to .tmp (keep legacy behavior but cleaner)
    try:
        os.makedirs('.tmp', exist_ok=True)
        with open(os.path.join('.tmp', 'system_status.txt'), 'w') as f:
            f.write(json.dumps(data, indent=2))
    except Exception:
        pass # Non-critical

    if all_dirs_exist:
        result = {"status": "success", "data": data}
        print(json.dumps(result, indent=2))
    else:
        result = {"status": "error", "message": "Missing required directories", "data": data}
        print(json.dumps(result, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
