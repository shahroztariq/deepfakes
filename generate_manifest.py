import os
import json

# Define the base directory for your examples
BASE_DIR = 'public/examples'
OUTPUT_FILE = 'public/data/deepfake_examples.json'

def generate_manifest():
    manifest = {
        "faceswap": { "in-the-wild": [], "benchmark": [] },
        "reenactment": { "in-the-wild": [], "benchmark": [] },
        "synthesis": { "in-the-wild": [], "benchmark": [] }
    }
    
    # Supported media types
    supported_exts = {'.png', '.jpg', '.jpeg', '.gif', '.mp4', '.webm'}
    
    for category in manifest.keys():
        for subcategory in manifest[category].keys():
            dir_path = os.path.join(BASE_DIR, category, subcategory)
            if not os.path.exists(dir_path):
                continue
                
            for root, _, files in os.walk(dir_path):
                for filename in files:
                    ext = os.path.splitext(filename)[1].lower()
                    if ext in supported_exts:
                        # Determine the relative folder name to extract the source/dataset name
                        rel_dir = os.path.relpath(root, dir_path)
                        # If the file is directly in the root without a subfolder, fallback to "General"
                        source_name = rel_dir if rel_dir != "." else "General"
                        
                        rel_file_path = os.path.relpath(os.path.join(root, filename), BASE_DIR)
                        # Construct the web path relative to public/
                        web_path = f"/examples/{rel_file_path.replace(os.sep, '/')}"
                        
                        file_type = "video" if ext in {'.mp4', '.webm'} else "image"
                        
                        manifest[category][subcategory].append({
                            "url": web_path,
                            "type": file_type,
                            "filename": filename,
                            "source": source_name
                        })

    with open(OUTPUT_FILE, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"✅ Successfully generated manifest at {OUTPUT_FILE} with discovered files and nested folders.")

if __name__ == '__main__':
    generate_manifest()
