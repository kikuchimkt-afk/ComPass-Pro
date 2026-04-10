import json
import urllib.request
import base64
import time

API_KEY = "AIzaSyBbIgJsbT2xVFSBrtYG5kuRjGgBje-B00g" # 3rd key
MODEL = "gemini-1.5-flash"

def extract_text(image_path):
    try:
        with open(image_path, "rb") as f:
            img_data = base64.b64encode(f.read()).decode("utf-8")
    except Exception as e:
        print(f"Could not open {image_path}: {e}")
        return
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [{
            "parts": [
                {"text": "Extract all text exactly as written. This is an English test. Look for Question 5."},
                {
                    "inline_data": {
                        "mime_type": "image/png",
                        "data": img_data
                    }
                }
            ]
        }]
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode())
                print(f"--- {image_path} ---")
                print(data['candidates'][0]['content']['parts'][0]['text'])
                return
        except Exception as e:
            print(f"Attempt {attempt+1}/5 Error on {image_path}: {e}")
            try:
                print(e.read().decode())
            except:
                pass
            time.sleep(3)

extract_text("page11.png")
