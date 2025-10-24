# Usa una imagen base ligera de NGINX
FROM nginx:alpine

# Elimina los archivos HTML por defecto de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia tus archivos HTML al directorio raíz del servidor
COPY public/ /usr/share/nginx/html/

# Copia configuración personalizada de NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 8080 (para acceso desde el host)
EXPOSE 8080

# Mantiene NGINX corriendo en primer plano
CMD ["nginx", "-g", "daemon off;"]
