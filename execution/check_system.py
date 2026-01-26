import sys
import os
import platform
from datetime import datetime

def main():
    print("Running System Health Check...")
    
    # helper for output both to console and file
    output_lines = []
    
    def log(msg):
        print(msg)
        output_lines.append(msg)

    log(f"Timestamp: {datetime.now().isoformat()}")
    log(f"Python Version: {sys.version}")
    log(f"Platform: {platform.platform()}")
    log(f"Current Directory: {os.getcwd()}")
    
    # Check directories
    required_dirs = ['directives', 'execution', '.tmp']
    all_dirs_exist = True
    for d in required_dirs:
        exists = os.path.isdir(d)
        status = "EXISTS" if exists else "MISSING"
        if not exists:
            all_dirs_exist = False
        log(f"Directory '{d}': {status}")
        
    # Write to .tmp/system_status.txt
    output_path = os.path.join('.tmp', 'system_status.txt')
    try:
        # Ensure .tmp exists just in case
        os.makedirs('.tmp', exist_ok=True)
        
        with open(output_path, 'w') as f:
            f.write("\n".join(output_lines))
        log(f"\nStatus written to {output_path}")
    except Exception as e:
        log(f"Error writing to .tmp: {e}")

    if all_dirs_exist:
        log("\n✅ System seems correctly instantiated.")
    else:
        log("\n❌ System Check Failed: Missing directories.")
        sys.exit(1)

if __name__ == "__main__":
    main()
