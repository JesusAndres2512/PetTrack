from fastapi import FastAPI, Request
from .config import AUTH_SERVICE_URL, PETS_SERVICE_URL, APPOINTMENTS_SERVICE_URL
from .proxy import forward_request

app = FastAPI(title="API Gateway")

@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_proxy(path: str, request: Request):
    return await forward_request(request, AUTH_SERVICE_URL, f"/{path}")

@app.api_route("/pets/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def pets_proxy(path: str, request: Request):
    return await forward_request(request, PETS_SERVICE_URL, f"/{path}")

@app.api_route("/appointments/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def appointments_proxy(path: str, request: Request):
    return await forward_request(request, APPOINTMENTS_SERVICE_URL, f"/{path}")

@app.get("/")
def root():
    return {"message": "🚀 API Gateway operativo", 
            "routes": ["/auth/*", "/pets/*", "/appointments/*"]}
