from sqlalchemy import Column, Integer, String, Enum, Boolean
from .database import Base
import enum

class Role(str, enum.Enum):
    owner = "owner"
    doctor = "doctor"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    role = Column(Enum(Role), default=Role.owner, nullable=False)
    is_active = Column(Boolean, default=True)
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"