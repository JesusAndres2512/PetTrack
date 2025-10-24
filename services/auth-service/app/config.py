from pydantic import BaseSettings, PostgresDsn, validator
from typing import Optional, Dict, Any

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    FIRST_SUPERUSER_EMAIL: Optional[str] = None
    FIRST_SUPERUSER_PASSWORD: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True

    @validator("DATABASE_URL")
    def validate_db_url(cls, v: str) -> str:
        if not v.startswith("mysql+pymysql://"):
            raise ValueError("La URL de la base de datos debe usar mysql+pymysql")
        return v

settings = Settings()