# app.py
from flask import Flask, request, jsonify
from Model import match_participants,create_prompt
import os
import google.generativeai as genai
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()

# Load the API key from the environment
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)



model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])



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
    
    
    
@app.route('/GeminiMatching', methods=['POST'])
def GeminiMatching():
    data = request.json

    person1 = data['person1']
    person2 = data['person2']
    event = data['event']
    

    if not person1 or not person2 or not event:
        return jsonify({'error': 'Missing required fields'}), 400

    prompt = create_prompt(person1["info"], person2["info"],person1["name"],person2["name"],event["name"], event["description"])
    response = chat.send_message(prompt)

    return jsonify({'advice': response.text})
    


if __name__ == '__main__':
    app.run(debug=True,port=5500)
