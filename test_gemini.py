import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from PIL import Image


# Load .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found in .env")


# Find image
folder = Path("test_images")
extensions = {".jpg", ".jpeg", ".png", ".webp"}

images = [
    p for p in folder.iterdir()
    if p.is_file() and p.suffix.lower() in extensions
]

if not images:
    raise FileNotFoundError("No image found in test_images/")

image_path = images[0]

print(f"Testing image: {image_path.name}")


# Gemini client
client = genai.Client(api_key=api_key)


# Load image
image = Image.open(image_path)

print("Image loaded.")
print("Sending image to Gemini...")


# Simple request
response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=[
        "Describe the visible symptoms on this tomato plant image. "
        "Do not give a definitive diagnosis. "
        "If the symptoms are unclear, say so.",
        image
    ]
)


print("\n--- Gemini response ---")
print(response.text)
