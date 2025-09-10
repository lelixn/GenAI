import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
factcheck_api_key = os.getenv("GOOGLE_FACTCHECK_API_KEY")

app = Flask(__name__)
CORS(app) 

@app.route('/api/check', methods=['POST'])
def check_credibility():
    data = request.json
    text_to_check = data.get('text', '')

    if not text_to_check:
        return jsonify({"error": "No text provided"}), 400

    # Implement API calls here
    # 1. Call Google Fact Check Tools API with `text_to_check`

    # 2. Call Gemini API with a prompt to analyze `text_to_check` and explain the reasoning
    response = client.models.generate_content(
        model="gemma-3-27b-it",
        contents=f"Analyze this text for misinformation and bias. Explain your findings in a simple summary. TEXT: {text_to_check}"
    )

    # For the prototype, we'll return a simple dummy response
    # You will replace this with real API logic.
    response_data = {
        "factCheckSummary": "This claim has been checked by multiple sources and found to be misleading.",
        "explainableInsights": "The AI identified a lack of verifiable sources and a highly emotional tone in the original text, which are common indicators of misinformation. Specifically, the claim about 'miracle cures' is not supported by scientific consensus."
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)