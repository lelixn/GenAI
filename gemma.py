from app import load_dotenv
import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemma-3-27b-it",
    contents="Roses are red...",
)

print(response.text)