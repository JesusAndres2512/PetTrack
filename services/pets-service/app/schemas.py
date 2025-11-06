from pydantic import BaseModel
from datetime import date

class PetBase(BaseModel):
    name: str
    species: str
    breed: str
    birth_date: date
    owner_name: str

class PetCreate(PetBase):
    pass

class PetOut(PetBase):
    id: int
    name: str
    species: str
    breed: str
    birth_date: date
    owner_name: str

class Config:
    orm_mode = True
