from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from typing import List

from . import models, schemas
from .database import Base, engine, get_db
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Auth Service")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

API_AUDIENCE = "https://api-gateway-apppettrack.azure-api.net/"
API_ISSUER = "https://auth-service-apppettrack-caerbec2asefbwcd.canadacentral-01.azurewebsites.net/"

# ===== JWT =====
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta

    to_encode.update({
        "exp": expire,
        "aud": API_AUDIENCE,
        "iss": API_ISSUER
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            audience="https://api-gateway-apppettrack.azure-api.net/",
            issuer="https://auth-service-apppettrack-caerbec2asefbwcd.canadacentral-01.azurewebsites.net/",
            options={"verify_aud": False} 
        )

        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Token inválido")

        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")

        return user

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")


# ===== Decorador de roles =====
def role_required(allowed_roles: List[str]):
    def wrapper(user: models.User = Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(status_code=403, detail="No tienes permisos")
        return user
    return wrapper


# ===== REGISTER =====
@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(statusCode=400, detail="Email ya registrado")

    hashed_pw = pwd_context.hash(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        role=user.role,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ===== LOGIN =====
@app.post("/login")
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == credentials.username).first()

    if not user or not pwd_context.verify(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token(
        data={
            "sub": user.email,
            "role": user.role
        },
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "role": user.role
    }


# ===== PROFILE =====
@app.get("/profile", response_model=schemas.UserResponse)
def profile(user: models.User = Depends(get_current_user)):
    return user


# ===== USERS LIST =====
@app.get("/users", response_model=List[schemas.UserResponse])
def list_users(current_user: models.User = Depends(role_required(["admin", "doctor"])),
               db: Session = Depends(get_db)):

    users = db.query(models.User).all()
    return users


# ===== DASHBOARD =====
@app.get("/dashboard/{role}")
def dashboard(role: str, current_user: models.User = Depends(get_current_user)):

    if role == "admin" and current_user.role != "admin":
        raise HTTPException(status_code=403)

    if role == "doctor" and current_user.role != "doctor":
        raise HTTPException(status_code=403)

    if role == "user" and current_user.role != "user":
        raise HTTPException(status_code=403)

    return {"message": f"Bienvenido al dashboard de {role}, {current_user.username}"}


# ===== DELETE USER =====
@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int,
                db: Session = Depends(get_db),
                current_user: models.User = Depends(role_required(["admin"]))):

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()


# ===== UPDATE USER =====
@app.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(
    user_id: int,
    updated_data: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(role_required(["admin"]))
):

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if updated_data.username:
        user.username = updated_data.username
    if updated_data.email:
        user.email = updated_data.email
    if updated_data.role:
        if updated_data.role not in ["user", "doctor", "admin"]:
            raise HTTPException(status_code=400, detail="Rol no válido")
        user.role = updated_data.role
    if updated_data.password:
        user.hashed_password = pwd_context.hash(updated_data.password)

    db.commit()
    db.refresh(user)
    return user
# ===== HEALTH CHECK =====
@app.get("/health")
def health():
    return {"status": "ok"}