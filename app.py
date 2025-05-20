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
