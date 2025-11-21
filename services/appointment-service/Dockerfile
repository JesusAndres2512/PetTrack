# =========================
# Dockerfile - Appointment Service
# =========================

# 1️⃣ Imagen base
FROM python:3.11-slim

# 2️⃣ Variables de entorno
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    APP_HOME=/app

# 3️⃣ Directorio de trabajo
WORKDIR $APP_HOME

# 4️⃣ Instalar dependencias del sistema necesarias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        wget \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 5️⃣ Copiar requirements e instalar dependencias Python
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 6️⃣ Copiar el código de la app
COPY ./app ./app

# 7️⃣ Copiar certificado DigiCert
# En CI/CD, asegúrate de crear este archivo antes del build
COPY ./certs/DigiCertGlobalRootG2.crt.pem /usr/local/share/ca-certificates/DigiCertGlobalRootG2.crt
RUN update-ca-certificates

# 8️⃣ Exponer puerto
EXPOSE 8000

# 9️⃣ Comando por defecto
# Desarrollo: incluir --reload
# Producción: quitar --reload
ARG ENVIRONMENT=development
CMD if [ "$ENVIRONMENT" = "development" ]; then \
        uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload; \
    else \
        uvicorn app.main:app --host 0.0.0.0 --port 8000; \
    fi
