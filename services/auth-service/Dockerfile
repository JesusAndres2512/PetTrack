FROM python:3.11-slim

# 1. Variables de entorno opcionales
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 2. Instalar dependencias del sistema necesarias para SSL
RUN apt-get update && apt-get install -y ca-certificates wget && rm -rf /var/lib/apt/lists/*

# 3. Copiar requirements y instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copiar el código de la app
COPY . .

# 5. Copiar certificado DigiCert y actualizar trust store
# (esto asegura que PyMySQL/SQLAlchemy lo reconozca)
COPY DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# 6. Puerto expuesto
EXPOSE 8000

# 7. Comando por defecto
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
