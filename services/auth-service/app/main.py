from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from app.models import User  # Aquí importas tu modelo real
from app.schemas import UserCreate, UserLogin, Token
from app.auth import create_access_token
from passlib.hash import bcrypt
from sqlalchemy import text
from app.database import engine  # ajusta si es necesario
from typing import List
from app.schemas import UserOut  # Lo crearemos a continuación
import os

# ------------------ Configuración ------------------
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://user:password@db:3306/vet_auth")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ------------------ App Init ------------------
app = FastAPI()

# ------------------ CORS Middleware (¡Agregado correctamente!) ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],            # Permite todos los métodos (incluye OPTIONS)
    allow_headers=["*"],            # Permite todos los headers (incluye Content-Type)
)

# ------------------ Base de datos ------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------ Endpoints ------------------


@app.get("/users", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    new_user = User(
        email=user.email,
        hashed_password=bcrypt.hash(user.password),
        full_name=user.full_name,
        role=user.role  # Usa el rol de schemas.py
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Usuario registrado", "user_id": new_user.id}

@app.post("/login", response_model=Token)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not bcrypt.verify(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value}
    )
    return {"access_token": access_token, "token_type": "bearer"}
