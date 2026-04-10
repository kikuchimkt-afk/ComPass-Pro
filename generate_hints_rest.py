import re
import json
import urllib.request
import urllib.error
import time
import sys
import glob

# Flush prints immediately
sys.stdout.reconfigure(line_buffering=True)

API_KEY = "AIzaSyBivbg2MPWQuvYHjGa-YbN1j4pKE_oBDQ0" # User provided key
MODEL = "gemini-3-flash-preview"

PROMPT_TEMPLATE = """
以下の英文を、英語の語順（チャンクごと）のまま、直訳風の日本語に訳してください。
元の自然な日本語訳も参考にしつつ、生徒が「あ、この語順で英語を書けばいいんだな」と頭から英作できるようなヒントを作成してください。
チャンクの区切りには「 / 」を使用してください。

英文: {answer}
意訳(参考): {sentenceJa}

出力は以下のJSON形式のみとし、マークダウンやその他の文章は含めないでください。
{{
  "literalJa": "直訳風の日本語（スラッシュ区切り）"
}}
"""

def get_literal_ja(sentence_ja, answer):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    prompt = PROMPT_TEMPLATE.format(sentenceJa=sentence_ja, answer=answer)
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.1, "responseMimeType": "application/json"}
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'}, method='POST')
    
    retries = 3
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                text = res_json['candidates'][0]['content']['parts'][0]['text']
                
                out = json.loads(text)
                return out['literalJa']
        except urllib.error.HTTPError as e:
            err_body = e.read().decode()
            print(f"Error {e.code}: {err_body}")
            time.sleep(5)
        except Exception as e:
            print(f"Error fetching for: {answer}. Attempt {attempt+1}/{retries}. Error: {e}")
            time.sleep(5)
    return None

def process_file(file_path):
    print(f"\n======================\nProcessing {file_path}...\n======================")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    pattern = r'(?m)^([\ \t]+)sentenceJa:\s*"(.*?)",\s*\n[\ \t]+answer:\s*"(.*?)",\s*\n[\ \t]+pieces:'
    
    matches = list(re.finditer(pattern, content))
    print(f"Found {len(matches)} chunks to process in {file_path}.")
    
    if len(matches) == 0:
        print("No matches. Maybe already processed?")
        return
        
    count = 0
    new_content = content
    
    for i, match in enumerate(matches):
        full_match = match.group(0)
        indent = match.group(1)
        sentence_ja = match.group(2)
        answer = match.group(3)
        
        # Check if already has literalJa in the new document content
        pos = new_content.find(full_match)
        if f'literalJa: "' in new_content[max(0, pos-50) : pos+50]:
             continue
        
        print(f"[{file_path}] ({i+1}/{len(matches)}): {answer[:30]}...")
             
        literal_ja = get_literal_ja(sentence_ja, answer)
        if literal_ja:
            replacement = f'{indent}sentenceJa: "{sentence_ja}",\n{indent}literalJa: "{literal_ja}",\n{indent}answer: "{answer}",\n{indent}pieces:'
            new_content = new_content.replace(full_match, replacement)
            # print(f" -> {literal_ja}")
            count += 1
            
            # Save progressively
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
        else:
            print(" -> Failed to generate.")
            
        time.sleep(2)
        
    print(f"Done processing {file_path}! Successfully updated {count} out of {len(matches)} chunks.")

def main():
    files_to_process = [
        "data-grade2.js",
        "data-pre2.js",
        "data-pre2-email.js"
    ]
    for f in files_to_process:
        process_file(f)

if __name__ == "__main__":
    main()
