import json

with open("pdf_content.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("pdf_summary.md", "w", encoding="utf-8") as out:
    for p in data:
        out.write(f"# PAGE {p['page']}\n\n{p['text']}\n\n---\n\n")

print("Saved pdf_summary.md successfully.")
