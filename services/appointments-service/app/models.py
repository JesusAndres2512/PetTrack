from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    pet_name = Column(String(255), nullable=False)
    owner_name = Column(String(255), nullable=False)
    date = Column(DateTime, nullable=False)
    reason = Column(String(255), nullable=True)
