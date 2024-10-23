import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Load the API key from the environment
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

# List models and find the Gemini model that supports content generation

# Initialize the chat with the context
model = genai.GenerativeModel('gemini-pro')
context = """
We are at a technology event. I will provide the profile of two people, and you need to give advice to the first person 
on how to network effectively with the second person.

Profile 1: Alice is passionate about artificial intelligence and mobile application development. 
She has worked on several AI projects and is always looking for new technologies to improve her skills. 
She participates in tech events to meet other professionals and exchange ideas.

Profile 2: Bob is an expert in cloud computing and has a strong background in distributed systems. 
He has been a keynote speaker at several technology conferences and is known for his work on scalable web applications.
"""

# Start chat with the initial context
chat = model.start_chat(history=[{"role": "system", "content": context}])

# Loop for interacting with the AI
while True:
    prompt = input("Ask me anything: ")
    if prompt.lower() == "exit":
        break
    response = chat.send_message(prompt)
    print(response.text)
