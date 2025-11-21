from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from . import models, schemas
from .database import Base, engine, get_db
import requests
import os

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Pets Service")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL")


# =====================================================
# 🔐 Obtener usuario desde Auth-Service (usando /profile)
# =====================================================
def get_user(token: str = Depends(oauth2_scheme)):
    r = requests.get(f"{AUTH_SERVICE_URL}/profile",
                     headers={"Authorization": f"Bearer {token}"})

    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Token inválido")

    return r.json()


# =====================================================
# 🔐 Roles
# =====================================================
def role_required(roles: list[str]):
    """Verifica si el usuario tiene un rol permitido."""
    def wrapper(user=Depends(get_user)):
        if user["role"] not in roles:
            raise HTTPException(
                status_code=403,
                detail=f"Acceso denegado. Se requiere uno de los roles: {roles}"
            )
        return user
    return wrapper


# =====================================================
# 🟢 Crear mascota (doctor/admin)
# =====================================================
@app.post("/pets", response_model=schemas.PetResponse)
def create_pet(
    pet: schemas.PetBase,
    user=Depends(role_required(["doctor", "admin"])),
    db: Session = Depends(get_db)
):
    new_pet = models.Pet(**pet.dict(), owner_id=user["id"])
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet


# =====================================================
# 🟦 Listar solo las mascotas del dueño (user)
# =====================================================
@app.get("/pets/my", response_model=list[schemas.PetResponse])
def my_pets(
    user=Depends(role_required(["user"])),
    db: Session = Depends(get_db)
):
    return db.query(models.Pet).filter(models.Pet.owner_id == user["id"]).all()


# =====================================================
# 🟣 Listar TODAS las mascotas (admin / doctor)
# =====================================================
@app.get("/pets/all", response_model=list[schemas.PetResponse])
def all_pets(
    user=Depends(role_required(["doctor", "admin"])),
    db: Session = Depends(get_db)
):
    return db.query(models.Pet).all()


# =====================================================
# 🟡 Listar mascotas visibles para cualquier rol
# (user = propias, doctor/admin = todas)
# =====================================================
@app.get("/pets", response_model=list[schemas.PetResponse])
def list_pets(
    user=Depends(get_user),
    db: Session = Depends(get_db)
):
    if user["role"] in ["doctor", "admin"]:
        return db.query(models.Pet).all()

    return db.query(models.Pet).filter(models.Pet.owner_id == user["id"]).all()


# =====================================================
# 🔴 Eliminar mascota (solo admin)
# =====================================================
@app.delete("/pets/{pet_id}", status_code=204)
def delete_pet(
    pet_id: int,
    user=Depends(role_required(["admin"])),
    db: Session = Depends(get_db)
):
    pet = db.query(models.Pet).filter(models.Pet.id == pet_id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    db.delete(pet)
    db.commit()
    return {"message": "Mascota eliminada correctamente"}


# =====================================================
# 🟢 Health pública
# =====================================================
@app.get("/pets/health")
def health():
    return {"status": "Pets Service OK"}
