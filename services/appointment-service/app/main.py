from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas
from .database import Base, engine, get_db
from fastapi.security import OAuth2PasswordBearer
import requests
import os

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Appointments Service")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL")


# 🔐 Obtener información del usuario desde auth-service
def get_user(token: str = Depends(oauth2_scheme)):
    r = requests.get(f"{AUTH_SERVICE_URL}/profile",
                     headers={"Authorization": f"Bearer {token}"})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Token inválido")
    return r.json()


# 🔎 Validar roles fácilmente
def require_role(user, allowed_roles: list):
    if user["role"] not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para realizar esta acción"
        )


# 🟢 Crear cita (solo doctor y admin)
@app.post("/appointments", response_model=schemas.AppointmentResponse)
def create_appointment(
    appo: schemas.AppointmentBase,
    user=Depends(get_user),
    db: Session = Depends(get_db)
):
    require_role(user, ["doctor", "admin"])

    new_appo = models.Appointment(**appo.dict(), owner_id=appo.owner_id)
    db.add(new_appo)
    db.commit()
    db.refresh(new_appo)
    return new_appo


# 🔵 Listar citas
@app.get("/appointments", response_model=list[schemas.AppointmentResponse])
def list_appointments(
    user=Depends(get_user),
    db: Session = Depends(get_db)
):
    # Dueño → solo sus citas
    if user["role"] == "user":
        return db.query(models.Appointment).filter(
            models.Appointment.owner_id == user["id"]
        ).all()

    # Doctor y Admin → todas las citas
    return db.query(models.Appointment).all()


# 🔴 Eliminar cita (solo admin)
@app.delete("/appointments/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    user=Depends(get_user),
    db: Session = Depends(get_db)
):
    require_role(user, ["admin"])

    appo = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id
    ).first()

    if not appo:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    db.delete(appo)
    db.commit()
    return {"message": "Cita eliminada correctamente"}
