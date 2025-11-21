import os
from dotenv import load_dotenv

load_dotenv()

# Defaults y validaciones
ALGORITHM = os.getenv("AUTH_ALGORITHM", "RS256").upper()
if ALGORITHM not in ("RS256",):
    raise RuntimeError(f"AUTH_ALGORITHM debe ser 'RS256' (actual: {ALGORITHM})")

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

PRIVATE_KEY_PATH = os.getenv("PRIVATE_KEY_PATH", "/app/keys/private.pem")
PUBLIC_KEY_PATH = os.getenv("PUBLIC_KEY_PATH", "/app/keys/public.pem")

def _read_key(path, name):
    try:
        with open(path, "r") as f:
            return f.read()
    except Exception as e:
        raise RuntimeError(f"No se pudo leer {name} en {path}: {e}")

PRIVATE_KEY = _read_key(PRIVATE_KEY_PATH, "PRIVATE_KEY")
PUBLIC_KEY = _read_key(PUBLIC_KEY_PATH, "PUBLIC_KEY")
