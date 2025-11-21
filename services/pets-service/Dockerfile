FROM python:3.11-slim

WORKDIR /app

# 1️⃣ Instalar dependencias del sistema necesarias para SSL
RUN apt-get update \
    && apt-get install -y ca-certificates wget \
    && rm -rf /var/lib/apt/lists/*

# 2️⃣ Copiar requirements e instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3️⃣ Copiar el código de la app
COPY app/ ./app

# 4️⃣ Copiar certificado DigiCert y actualizar trust store
COPY DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# 5️⃣ Puerto expuesto
EXPOSE 8000

# 6️⃣ Comando por defecto
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
