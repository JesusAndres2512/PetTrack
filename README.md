# PetTrack.
 Aplicación Web para Clínicas Veterinarias - Documentación Oficial

## Contexto y Necesidad.

Las clínicas veterinarias enfrentan dificultades en la gestión de citas, organización de historiales clínicos y comunicación con los propietarios de mascotas. Esto genera:

- Pérdida de citas importantes (vacunas, desparasitaciones).
- Errores administrativos.
- Acceso lento a historiales en emergencias.
- Mala experiencia del cliente.

Por ello, se propone una solución digital integral que permita:

- Gestión eficiente de historiales.
- Automatización de recordatorios.
- Interacción fluida entre clínica y dueño.
- Mejora en calidad del servicio y fidelización.

## 🚧 Arquitectura Basada en Microservicios

Este proyecto sigue una arquitectura basada en microservicios, todos gestionados dentro de un monorepositorio. Cada microservicio está organizado en su propio directorio dentro del mismo repositorio:

- **auth-service**: Gestión de usuarios (Doctor/Dueño) y autenticación JWT.
- **pets-service**: Registro de mascotas al sistema.
- **appointment-service**: Agendamiento y gestión de citas.
- **api-gateway**: Puerta de entrada, documentación y enrutamiento.
- **web-client**: Cliente web con (HTML/CSS).

## 🛠️ Tecnologías Utilizadas

| Herramienta       | Descripción                          |
|------------------|--------------------------------------|
| Python 3.12      | Backend (FastAPI)                     |
| FastAPI          | Framework para APIs RESTful          |
| SQLAlchemy       | ORM para conexión a MySQL             |
| MySQL            | Base de datos relacional              |
| Docker           | Contenedores y orquestación con Compose |
| GitHub Actions   | CI/CD automatizado                    |
| Azure            | ACR (Azure Container Registry) y App Service |
| HTML/CSS         | Cliente web simple                    |
| uvicorn --reload | Recarga automática del servidor en desarrollo   |

## 🏗️ Estructura del Monorepo

```bash
PetTrack/
├── .github/                      # Workflows de CI/CD
│
├── clients/
│   └── web-client/              # Cliente web (HTML/CSS/JS)
│       ├── public/             # Archivos estáticos
│       ├── src/                # Lógica de frontend (si aplica)
│
├── services/
│   ├── api-gateway/            # API Gateway (NGINX)
│   ├── appointments-service/   # Microservicio de citas
│   ├── auth-service/           # Microservicio de autenticación
│   └── pets-service/           # Microservicio de mascotas
│
├── venv/                       # Entorno virtual (Para desarrollo local)
│
├── docker-compose.yml          # Orquestación de servicios
└── README.md                   # Documentación del proyecto
```

# 🚀 Guía Completa para Levantar PetTrack con Docker Compose

## ✅ Requisitos Previos

- Docker y Docker Compose instalados en el sistema.
- Archivos `.env` correctamente configurados en cada microservicio:

## 
---

## ⚙️ Comandos para Levantar Todos los Servicios

### 1. Construir y levantar toda la aplicación:

Desde la raíz del monorepo (`/PetTrack`):

```bash
docker compose up --build
```

### 2. Verificar contenedores corriendo:
```bash
docker ps
```

### 3. Detener y eliminar contenedores:
```bash
docker compose down
```

### Limpiar completamente (incluye volúmenes y huérfanos):
```bash
docker compose down --volumes --remove-orphans
```

### Comandos Útiles
| Action                            | Command                                                 |
|----------------------------------|---------------------------------------------------------|
| Run Service (Dev - FastAPI)      | `uvicorn app.main:app --reload --port 8000`            |
| Docker Build                     | `docker build -t <service-name> .`                     |
| Docker Compose Up                | `docker compose up --build`                            |
| Alembic Migration (Python)       | `alembic upgrade head`                                 |
| Auto Reload (FastAPI)            | `uvicorn app.main:app --reload`                        |
| Sequelize CLI (if Node.js svc)   | `npx sequelize-cli db:migrate`                         |

### 🧩 Consideraciones del Monorepo

- Todos los microservicios viven dentro del directorio `/services`.
- Se utiliza `Docker Compose` para levantar la solución completa.
- Cada microservicio tiene su propio archivo `.env` y `Dockerfile`.
- Las rutas relativas se manejan desde la raíz (`/PetTrack`).

## 🌐 Endpoints Principales

| Servicio          | Endpoint base            | Descripción                         |
|-------------------|--------------------------|-------------------------------------|
| Login Service     | `/auth/login`            | Login                               |
| Register Service  | `/auth/register`         | Registro                            |
| Appointments      | `/appointments`          | Crear, listar y eliminar citas      |
| Pets              | `/pets`                  | CRUD de mascotas                    |
| API Gateway       | `/`                      | Redirección a cada microservicio    |


### 👩‍💻 Autor@s

Desarrollado como solución tecnológica para mejorar la gestión de clínicas veterinarias mediante microservicios desplegados en Azure.

**Equipo PetTrack**  
Arnol Pérez - Jesus Cabezas - Daniel Leon



