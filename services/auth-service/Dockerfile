FROM python:3.11-slim

# 1. Variables de entorno opcionales
ENV PYTHONUNBUFFERED=1

# 2. Crear directorio de trabajo
WORKDIR /app

# 3. Instalar dependencias del sistema y actualizar certificados
RUN apt-get update \
    && apt-get install -y ca-certificates wget \
    && rm -rf /var/lib/apt/lists/*

# 4. Copiar requirements y instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar el código de la app
COPY app/ ./app

# 6. Copiar certificado DigiCert y actualizar trust store
COPY DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# 7. Puerto expuesto
EXPOSE 8000

# 8. Comando por defecto
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
