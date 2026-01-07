# API de Parámetros del Sistema

API RESTful desarrollada con NestJS y TypeORM para la gestión de parámetros del sistema. Permite realizar operaciones CRUD sobre parámetros configurables del sistema.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Seeds](#seeds)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)

## ✨ Características

- ✅ **CRUD Completo** - Crear, leer, actualizar y eliminar parámetros
- ✅ **Validación de Datos** - Validación automática con class-validator
- ✅ **TypeORM con MySQL** - ORM robusto con soporte para migraciones
- ✅ **Soft Delete** - Desactivación lógica de parámetros
- ✅ **CORS Configurado** - Listo para conectar con frontends
- ✅ **Docker** - Base de datos MySQL en contenedor
- ✅ **Seeds** - Datos de prueba precargados
- ✅ **Variables de Entorno Validadas** - Configuración segura y validada

## 📦 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Docker y Docker Compose

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd parametros-sistema-api
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
NODE_ENV=development
PORT=3001
API_PREFIX=api

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=parametros_sistema_db
DB_SYNCHRONIZE=true
DB_LOGGING=true

CORS_ORIGIN=http://localhost:3000
```

4. **Levantar la base de datos:**
```bash
npm run docker:db
```

5. **Ejecutar seeds (opcional pero recomendado):**
```bash
npm run seed:run
```

6. **Iniciar la aplicación:**
```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3001/api`

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Ambiente de ejecución | `development` |
| `PORT` | Puerto de la aplicación | `3001` |
| `API_PREFIX` | Prefijo global de rutas | `api` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USERNAME` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `root` |
| `DB_DATABASE` | Nombre de la base de datos | `parametros_sistema_db` |
| `DB_SYNCHRONIZE` | Sincronización automática (solo dev) | `true` |
| `DB_LOGGING` | Mostrar queries SQL | `true` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:3000` |

## 🎯 Uso

### Desarrollo Local
```bash
# Iniciar solo la base de datos
npm run docker:db

# Iniciar en modo desarrollo
npm run start:dev

# Ver logs de la base de datos
npm run docker:db:logs
```

## 📡 API Endpoints

Base URL: `http://localhost:3001/api`

### Parámetros Sistema

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/parametros-sistema` | Listar todos los parámetros |
| `GET` | `/parametros-sistema/:id` | Obtener un parámetro por ID |
| `POST` | `/parametros-sistema` | Crear un nuevo parámetro |
| `PATCH` | `/parametros-sistema/:id` | Actualizar un parámetro |
| `DELETE` | `/parametros-sistema/:id` | Eliminar un parámetro (hard delete) |
| `PATCH` | `/parametros-sistema/:id/disable` | Desactivar un parámetro (soft delete) |

## 💡 Ejemplos de Uso

### Listar todos los parámetros
```bash
curl -X GET http://localhost:3001/api/parametros-sistema
```

**Respuesta:**
```json
[
  {
    "idParametroSistema": 1,
    "nombreParametroSistema": "URL_API_PRINCIPAL",
    "valorParametroSistema": "https://api.ejemplo.com/v1",
    "idGrupoParametro": 1,
    "idEntidadSistema": 1,
    "indicadorEstado": "A",
    "usuarioRegistro": "admin",
    "fechaRegistro": "2026-01-07T17:30:00.000Z",
    "usuarioModificacion": null,
    "fechaModificacion": null,
    "estadoSincronizacion": "P"
  }
]
```

### Obtener un parámetro por ID
```bash
curl -X GET http://localhost:3001/api/parametros-sistema/1
```

### Crear un nuevo parámetro
```bash
curl -X POST http://localhost:3001/api/parametros-sistema \
  -H "Content-Type: application/json" \
  -d '{
    "nombreParametroSistema": "NUEVO_PARAMETRO",
    "valorParametroSistema": "valor_ejemplo",
    "idGrupoParametro": 1,
    "idEntidadSistema": 1,
    "indicadorEstado": "A",
    "usuarioRegistro": "admin"
  }'
```

**Respuesta:**
```json
{
  "nombreParametroSistema": "NUEVO_PARAMETRO",
  "valorParametroSistema": "valor_ejemplo",
  "idGrupoParametro": 1,
  "idEntidadSistema": 1,
  "indicadorEstado": "A",
  "usuarioRegistro": "admin",
  "estadoSincronizacion": "P",
  "idParametroSistema": 9,
  "fechaRegistro": "2026-01-07T17:35:00.000Z",
  "usuarioModificacion": null,
  "fechaModificacion": "2026-01-07T17:35:00.000Z"
}
```

### Actualizar un parámetro
```bash
curl -X PATCH http://localhost:3001/api/parametros-sistema/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombreParametroSistema": "URL_API_PRINCIPAL_ACTUALIZADA",
    "valorParametroSistema": "https://api-nueva.ejemplo.com/v2",
    "usuarioModificacion": "admin"
  }'
```

### Desactivar un parámetro (Soft Delete)
```bash
curl -X PATCH http://localhost:3001/api/parametros-sistema/1/disable \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioModificacion": "admin"
  }'
```

### Eliminar un parámetro (Hard Delete)
```bash
curl -X DELETE http://localhost:3001/api/parametros-sistema/1
```

## 🌱 Seeds

El proyecto incluye seeds para poblar la base de datos con datos de prueba.

### Ejecutar Seeds
```bash
npm run seed:run
```

Los seeds crean 8 parámetros de ejemplo:

1. **URL_API_PRINCIPAL** - URL de la API principal
2. **TIMEOUT_REQUESTS** - Tiempo de espera para requests
3. **MAX_INTENTOS_LOGIN** - Máximo de intentos de login
4. **TIEMPO_EXPIRACION_TOKEN** - Tiempo de expiración de tokens
5. **EMAIL_NOTIFICACIONES** - Email para notificaciones
6. **HABILITAR_LOGS** - Activar/desactivar logs
7. **MODO_MANTENIMIENTO** - Modo de mantenimiento del sistema
8. **VERSION_APP** - Versión de la aplicación

### Crear Seeds Personalizados

Para agregar más datos de prueba, edita `src/database/seeds/parametro-sistema.seeder.ts` y agrega más objetos al array `parametros`.

## 📁 Estructura del Proyecto
```
parametros-sistema-api/
├── src/
│   ├── modules/
│   │   └── parametros-sistema/
│   │       ├── dto/
│   │       │   ├── create-parametro-sistema.dto.ts
│   │       │   └── update-parametro-sistema.dto.ts
│   │       ├── entities/
│   │       │   └── parametro-sistema.entity.ts
│   │       ├── parametros-sistema.controller.ts
│   │       ├── parametros-sistema.service.ts
│   │       └── parametros-sistema.module.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── env.validation.ts
│   │   └── typeorm.cli.config.ts
│   ├── database/
│   │   └── seeds/
│   │       ├── parametro-sistema.seeder.ts
│   │       └── run-seed.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## 📜 Scripts Disponibles
```bash
# Desarrollo
npm run start:dev          # Iniciar en modo desarrollo
npm run start:debug        # Iniciar en modo debug
npm run build              # Compilar para producción
npm run start:prod         # Iniciar en producción

# Tests
npm run test               # Ejecutar tests unitarios
npm run test:e2e           # Ejecutar tests e2e
npm run test:cov           # Tests con cobertura

# Docker
npm run docker:db          # Iniciar MySQL
npm run docker:db:stop     # Detener MySQL
npm run docker:db:logs     # Ver logs de MySQL

# Seeds
npm run seed:run           # Ejecutar seeds

# Linting
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código
```

## 🗄️ Modelo de Datos

### ParametroSistema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idParametroSistema` | `int` | ID único (auto-incremental) |
| `nombreParametroSistema` | `varchar(100)` | Nombre del parámetro |
| `valorParametroSistema` | `text` | Valor del parámetro |
| `idGrupoParametro` | `int` | ID del grupo (nullable) |
| `idEntidadSistema` | `int` | ID de la entidad |
| `indicadorEstado` | `char(1)` | Estado (A=Activo, I=Inactivo) |
| `usuarioRegistro` | `varchar(50)` | Usuario que creó el registro |
| `fechaRegistro` | `datetime` | Fecha de creación |
| `usuarioModificacion` | `varchar(50)` | Usuario que modificó (nullable) |
| `fechaModificacion` | `datetime` | Fecha de modificación (nullable) |
| `estadoSincronizacion` | `char(1)` | Estado de sincronización (P=Pendiente) |

## 🐳 Docker

### Solo Base de Datos
```bash
# Iniciar
npm run docker:db

# Detener
npm run docker:db:stop

# Ver logs
npm run docker:db:logs
```

### Conectarse a MySQL
```bash
# Desde la terminal
docker exec -it nestjs_mysql mysql -uroot -proot parametros_sistema_db

# Desde TablePlus o cualquier cliente
Host: 127.0.0.1
Port: 3306
User: root
Password: root
Database: parametros_sistema_db
```



