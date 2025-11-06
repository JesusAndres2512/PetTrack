from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI()

# CORS: Permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o ["http://localhost:8080"] si quieres restringir
    allow_methods=["*"],
    allow_headers=["*"],
)

# URLs internas de los microservicios
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://auth-service:8000")
APPOINTMENTS_SERVICE_URL = os.getenv("APPOINTMENTS_SERVICE_URL", "http://appointments-service:8000")
PETS_SERVICE_URL = os.getenv("PETS_SERVICE_URL", "http://pets-service:8000")

# --- AUTH SERVICE PROXIES ---

@app.post("/auth/register")
async def register(request: Request):
    body = await request.body()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{AUTH_SERVICE_URL}/register", content=body, headers=request.headers)
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.post("/auth/login")
async def login(request: Request):
    body = await request.body()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{AUTH_SERVICE_URL}/login", content=body, headers=request.headers)
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.get("/auth/users")
async def get_users():
    async with httpx.AsyncClient() as client:
        response = await client.get("http://auth-service:8000/users")
    return Response(content=response.content, status_code=response.status_code)
    
# --- APPOINTMENTS SERVICE PROXIES (Ejemplo) ---

@app.get("/appointments/")
async def get_appointments(request: Request):
    query_string = request.url.query  # obtiene ?skip=0&limit=10 si existe
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{APPOINTMENTS_SERVICE_URL}/appointments/?{query_string}")
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.post("/appointments/")
async def create_appointment(request: Request):
    body = await request.body()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{APPOINTMENTS_SERVICE_URL}/appointments/", content=body, headers=request.headers)
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.get("/pets/")
async def get_pets(request: Request):
    query_string = request.url.query  # obtiene ?skip=0&limit=10 si existe
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PETS_SERVICE_URL}/pets/?{query_string}")      
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.post("/pets/")
async def create_pet(request: Request):
    body = await request.body()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{PETS_SERVICE_URL}/pets/", content=body, headers=request.headers)
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.get("/pets/{pet_id}")
async def get_pet(pet_id: int, request: Request):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PETS_SERVICE_URL}/pets/{pet_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())


