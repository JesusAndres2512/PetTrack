import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("RECOMPENSAS_DB_URL", "mysql+aiomysql://root:password@localhost:3306/recompensas_db")
PORT = int(os.getenv("PORT", 8004))
