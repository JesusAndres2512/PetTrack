from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Pet(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    species = Column(String(50))
    breed = Column(String(50))
    birth_date = Column(Date)
    owner_name = Column(String(100))
