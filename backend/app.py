from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

SUSPICIOUS_WORDS = [
    'shocking', 'secret', 'viral', 'exposed', 'guaranteed', 'miracle',
    'breaking', 'urgent', 'share now', 'they do not want you to know',
    'overnight', 'cure', 'free money', 'unconfirmed'
]

def analyze_text(text: str):
    clean = text.lower().strip()
    words = re.findall(r"[a-zA-Z']+", clean)
    found = [w for w in SUSPICIOUS_WORDS if w in clean]
    exclamation_score = min(text.count('!') * 5, 15)
    caps_score = 10 if sum(1 for c in text if c.isupper()) > max(15, len(text) * 0.18) else 0
    keyword_score = min(len(found) * 12, 55)
    length_score = 10 if len(words) < 12 else 0
    score = keyword_score + exclamation_score + caps_score + length_score

    if score >= 60:
        prediction = 'Fake'
        risk = 'High'
        confidence = min(92, score + 18)
    elif score >= 30:
        prediction = 'Suspicious'
        risk = 'Medium'
        confidence = min(78, score + 32)
    else:
        prediction = 'Real'
        risk = 'Low'
        confidence = max(63, 88 - score)

    reason_map = {
        'Fake': 'The content contains strong suspicious language patterns, emotional wording, or unverified-style claims.',
        'Suspicious': 'The content has some warning signs and should be verified with trusted sources before sharing.',
        'Real': 'The content does not show strong fake-news language signals in this demo model.'
    }

    return {
        'prediction': prediction,
        'confidence': int(confidence),
        'risk_level': risk,
        'reason': reason_map[prediction],
        'keywords': found[:6]
    }

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'TruthLens AI Backend'})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json() or {}
    text = data.get('text', '')
    if not text or len(text.strip()) < 10:
        return jsonify({'error': 'Please provide at least 10 characters of news text.'}), 400
    return jsonify(analyze_text(text))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
