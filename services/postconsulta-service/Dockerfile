# Imagen base de Python
FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de requerimientos
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código del servicio
COPY . .

# Exponer el puerto (debe coincidir con el del .env)
EXPOSE 8004

# Comando para ejecutar el servicio
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8004"]
