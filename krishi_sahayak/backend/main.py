import os
import shutil
import tempfile
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_classic.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# langchain-google-genai reads GOOGLE_API_KEY; our .env uses GEMINI_API_KEY
if os.environ.get("GEMINI_API_KEY") and not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]

app = FastAPI(title="Krishi Sahayak API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PERSIST_DIR = "./chroma_db"

# Global model instances
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash")
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2")

def get_embeddings():
    return embeddings

def get_vectorstore():
    return Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=get_embeddings())

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    history: Optional[List[ChatMessage]] = []
    language: Optional[str] = "English"

class WeatherResponse(BaseModel):
    temperature: float
    condition: str
    humidity: int

@app.post("/api/chat")
async def chat(request: ChatRequest):
    vectorstore = get_vectorstore()
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    
    llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", temperature=0.3)
    
    system_prompt = (
        "You are an AI agricultural assistant named Krishi Sahayak. "
        "You must follow these strict safety rules:\n"
        "1. Never make direct chemical pesticide or fertilizer recommendations without a strong safety disclaimer.\n"
        "2. Always prefer and recommend Integrated Pest Management (IPM) and organic farming practices first.\n"
        "3. Answer the user in the language they request: {language}.\n"
        "4. Use the following context to answer the question.\n\n"
        "Context:\n{context}\n\n"
        "Chat History:\n{history}\n"
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}")
    ])
    
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    # Format history
    history_str = "\n".join([f"{msg.role}: {msg.content}" for msg in request.history])
    
    try:
        response = rag_chain.invoke({
            "input": request.question,
            "language": request.language,
            "history": history_str
        })
        return {"answer": response["answer"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")
        
    try:
        suffix = ".pdf" if file.filename.endswith('.pdf') else ".txt"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name
            
        if suffix == ".pdf":
            loader = PyPDFLoader(tmp_path)
        else:
            loader = TextLoader(tmp_path, encoding='utf-8')
            
        documents = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(documents)
        
        vectorstore = get_vectorstore()
        vectorstore.add_documents(chunks)
        # Chroma handles persistence automatically in recent versions, but we initialize it with the directory.
        
        os.unlink(tmp_path)
        return {"message": f"Successfully processed and stored {len(chunks)} chunks from {file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weather", response_model=WeatherResponse)
async def get_weather(lat: float, lon: float):
    # Dummy weather data based on lat/lon request
    return WeatherResponse(
        temperature=28.5,
        condition="Partly Cloudy",
        humidity=65
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
