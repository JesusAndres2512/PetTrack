# =========================
# Dockerfile - Auth Service con RSA256
# =========================

FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias necesarias para OpenSSL
RUN apt-get update \
    && apt-get install -y openssl ca-certificates wget \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código de la app
COPY ./app ./app

# Certificado DigiCert
COPY ./certs/DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# Crear directorio de claves
RUN mkdir -p /app/keys

# Generar claves RSA solo si no existen
RUN if [ ! -f /app/keys/private.pem ]; then \
        echo "🔐 Generando claves RSA256..." && \
        openssl genrsa -out /app/keys/private.pem 2048 && \
        openssl rsa -in /app/keys/private.pem -pubout -out /app/keys/public.pem && \
        chmod 600 /app/keys/private.pem && \
        chmod 644 /app/keys/public.pem ; \
    else \
        echo "🔐 Claves RSA ya existen, no se regeneran."; \
    fi

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
