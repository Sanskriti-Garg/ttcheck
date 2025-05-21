from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load predefined Q&A pairs
with open("qa_pairs.json", "r") as f:
    qa_pairs = json.load(f)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "").strip().lower()
    reply = qa_pairs.get(user_input, "I'm sorry, I didn't understand that.")
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)















from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Example Swagger API base (replace with yours)
SWAGGER_API = "https://your-swagger-api.com/chatbot/query"

@app.route('/api/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message')

    try:
        # Adjust query params if needed
        response = requests.get(SWAGGER_API, params={"message": user_msg})
        data = response.json()

        # Change based on actual Swagger API response structure
        reply = data.get("reply", "No valid response from API")
        return jsonify({"reply": reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Error fetching data from API"}), 500

if __name__ == "__main__":
    app.run(port=5000)
