import urllib.request
import zlib
import base64
import os

def generate_image(mmd_file, out_file):
    with open(mmd_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Kroki encoding
    compressed = zlib.compress(text.encode('utf-8'), 9)
    payload = base64.urlsafe_b64encode(compressed).decode('ascii')
    
    url = f"https://kroki.io/mermaid/png/{payload}"
    print(f"Fetching: {url[:60]}...")
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(out_file, 'wb') as out:
            out.write(response.read())
        print(f"Successfully generated {out_file}")
    except Exception as e:
        print(f"Error generating {out_file}: {e}")

if __name__ == '__main__':
    for i in range(3):
        mmd = f"dfd_level_{i}.mmd"
        png = f"dfd_level_{i}.png"
        if os.path.exists(mmd):
            generate_image(mmd, png)
