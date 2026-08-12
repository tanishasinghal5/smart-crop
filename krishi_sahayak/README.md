# KrishiSahayak

A modern, production-ready RAG chatbot for agricultural advice, embedded directly into TerraByte.

## Setup Instructions

### 1. Get an API Key
KrishiSahayak uses Google's powerful Gemini models. To use the chat, you need an API key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a new API key.
3. In the `backend` folder, rename `.env.example` to `.env` and paste your key there:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### 2. Running Locally (Without Docker)

**Backend:**
You need Python 3.9+ installed.
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Frontend:**
The frontend consists of vanilla HTML, CSS, and JS (Tailwind via CDN).
Because of CORS and module strictness, it's best to run a simple server in the frontend directory:
```bash
cd frontend
python -m http.server 5500
```
Then navigate to `http://localhost:5500/index.html`.

**In TerraByte:**
The chat widget is already integrated into the TerraByte Dashboard. Simply launch the original TerraByte app and click the floating 🤖 button!

### 3. Running with Docker (Recommended)
From this `krishi_sahayak` root folder, simply run:
```bash
docker-compose up --build
```
This will start both the FastAPI backend (port 8001) and the Frontend web server (port 80).

## Uploading Knowledge (RAG)
1. Navigate to the Admin portal (`admin.html` in the frontend).
2. Upload PDFs, Text files, or Markdown files.
3. The RAG system will chunk, embed, and store these documents locally in ChromaDB.
4. KrishiSahayak will now automatically search these documents when answering questions and cite the source!
