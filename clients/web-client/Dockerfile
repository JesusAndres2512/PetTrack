# =============================
# Etapa 1: Build del frontend
# =============================
FROM node:20-alpine AS build

WORKDIR /app

# Recibir variables que vienen desde Azure
ARG VITE_API_GATEWAY
ENV VITE_API_GATEWAY=${VITE_API_GATEWAY}

COPY package*.json ./
RUN npm ci --silent

COPY . .

# Confirmar variable antes del build (debug opcional)
RUN echo "Usando VITE_API_GATEWAY = $VITE_API_GATEWAY"

RUN npm run build

# =============================
# Etapa 2: Servir con Nginx
# =============================
FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
