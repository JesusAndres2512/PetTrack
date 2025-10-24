import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, User, Role
from app.database import get_db
from app.config import settings
from passlib.context import CryptContext

#Hola

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db():
    engine = create_engine(settings.DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Crear usuario admin si no existe
        admin_user = db.query(User).filter(User.email == settings.FIRST_SUPERUSER_EMAIL).first()
        if not admin_user and settings.FIRST_SUPERUSER_EMAIL and settings.FIRST_SUPERUSER_PASSWORD:
            hashed_password = pwd_context.hash(settings.FIRST_SUPERUSER_PASSWORD)
            admin_user = User(
                email=settings.FIRST_SUPERUSER_EMAIL,
                hashed_password=hashed_password,
                full_name="Initial Admin",
                role=Role.admin,
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created successfully")
        else:
            print("Admin user already exists or not configured")
    except Exception as e:
        print(f"Error initializing database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()