# =============================
# Etapa 1: Build
# =============================
FROM node:20-alpine AS build

WORKDIR /app

# Recibimos la variable desde Azure como ARG
ARG VITE_API_GATEWAY

# La exponemos dentro del entorno de build
ENV VITE_API_GATEWAY=$VITE_API_GATEWAY

# Instalamos dependencias
COPY package*.json ./
RUN npm ci --silent

# Copiamos todo el código
COPY . .

# 🔥 Durante el build, Vite leerá VITE_API_GATEWAY correctamente
RUN npm run build

# =============================
# Etapa 2: Servir con Nginx
# =============================
FROM nginx:1.25-alpine

# Borramos archivos default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos el build generado
COPY --from=build /app/dist /usr/share/nginx/html

# Config de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
