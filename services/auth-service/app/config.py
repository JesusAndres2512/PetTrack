import os
from dotenv import load_dotenv

load_dotenv()

# Cargar claves RSA
with open(os.getenv("PRIVATE_KEY_PATH"), "r") as f:
    PRIVATE_KEY = f.read()

with open(os.getenv("PUBLIC_KEY_PATH"), "r") as f:
    PUBLIC_KEY = f.read()


DATABASE_URL = os.getenv("AUTH_DATABASE_URL")
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES", 60))


