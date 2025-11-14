import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME = os.getenv("APP_NAME")
    APP_ENV = os.getenv("APP_ENV")
    PORT = int(os.getenv("PORT"))

    DATABASE_URL = os.getenv("DATABASE_URL")

settings = Settings()
