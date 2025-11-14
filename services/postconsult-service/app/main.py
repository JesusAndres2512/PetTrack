from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.postconsultas import router

app = FastAPI(title="PostConsult Service", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)

@app.get("/")
def root():
    return {"service": "postconsult-service", "status": "running"}
