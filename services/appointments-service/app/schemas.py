from pydantic import BaseModel
from datetime import datetime

class AppointmentBase(BaseModel):
    pet_name: str
    owner_name: str
    date: datetime
    reason: str | None = None

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(BaseModel):
    id: int
    pet_name: str
    owner_name: str
    date: datetime
    reason: str | None = None

    class Config:
        from_attributes = True

