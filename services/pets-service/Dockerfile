# =========================
# Dockerfile - Pets Service
# =========================

FROM python:3.11-slim

# 1️⃣ Variables de entorno
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    APP_HOME=/app

# 2️⃣ Directorio de trabajo
WORKDIR $APP_HOME

# 3️⃣ Instalar dependencias del sistema necesarias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        wget \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4️⃣ Copiar requirements e instalar dependencias Python
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 5️⃣ Copiar el código de la app
COPY ./app ./app

# 6️⃣ Copiar certificado DigiCert
COPY ./certs/DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# 7️⃣ Exponer puerto
EXPOSE 8000

# 8️⃣ Comando por defecto
ARG ENVIRONMENT=development
CMD if [ "$ENVIRONMENT" = "development" ]; then \
        uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload; \
    else \
        uvicorn app.main:app --host 0.0.0.0 --port 8000; \
    fi
