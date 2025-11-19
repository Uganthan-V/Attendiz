# tree_to_json.py
import os, json

def build_tree(path):
    tree = {"name": os.path.basename(path) or path, "path": path, "type": "dir", "children": []}
    try:
        with os.scandir(path) as it:
            for entry in it:
                if entry.is_dir(follow_symlinks=False):
                    tree["children"].append(build_tree(entry.path))
                else:
                    tree["children"].append({"name": entry.name, "path": entry.path, "type": "file"})
    except PermissionError:
        pass
    return tree

root = r"C:\My files\my apps\face_re1"
with open("folder_structure.json", "w", encoding="utf-8") as f:
    json.dump(build_tree(root), f, indent=2, ensure_ascii=False)