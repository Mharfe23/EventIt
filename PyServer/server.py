# app.py
from flask import Flask, request, jsonify
from Model import extract_keywords, match_participants

app = Flask(__name__)

# Endpoint to receive participant info and return matches for a specific participant
@app.route('/matchup', methods=['POST'])
def match():
    data = request.json
    
    participants = data["participants"] 
    target = data["target"]
    if(not target or not participants):
        return jsonify({"error": "Missing data"}).status_code(400)

    matches = match_participants(participants, target)
    return jsonify({"matches": matches})

    # Rank matches for the specified participant
    
    
    
@app.route('/keywords', methods=['GET'])
def keywords():
    text = request.json['text']
    keywords = extract_keywords(text)
    return jsonify({"keywords": keywords})

if __name__ == '__main__':
    app.run(debug=True,port=5500)
