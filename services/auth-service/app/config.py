import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("AUTH_DATABASE_URL")
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES", 30))
