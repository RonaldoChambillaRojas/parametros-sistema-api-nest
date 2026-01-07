# NestJS TypeORM MySQL Starter

Una plantilla completa y lista para usar de NestJS con TypeORM y MySQL, configurada con las mejores prácticas y herramientas esenciales para iniciar cualquier proyecto backend.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso](#uso)
- [Guías de Desarrollo](#guías-de-desarrollo)
- [Scripts Disponibles](#scripts-disponibles)
- [Docker](#docker)
- [Migraciones](#migraciones)
- [Seeds](#seeds)
- [Convenciones de Código](#convenciones-de-código)

## ✨ Características

- ✅ **NestJS** - Framework progresivo de Node.js
- ✅ **TypeORM** - ORM para TypeScript y JavaScript
- ✅ **MySQL** - Base de datos relacional
- ✅ **Validación de Variables de Entorno** - Con class-validator
- ✅ **Class Validator & Transformer** - Validación y transformación de DTOs
- ✅ **Docker & Docker Compose** - Containerización lista para desarrollo y producción
- ✅ **Dockerfile Multi-stage** - Build optimizado para producción
- ✅ **CORS Configurado** - Listo para conectar con frontends
- ✅ **Migraciones** - Sistema de migraciones de TypeORM
- ✅ **Seeds** - Sistema para poblar datos iniciales
- ✅ **Estructura Modular** - Organización clara y escalable
- ✅ **Ejemplos Documentados** - Archivos de ejemplo con comentarios explicativos

## 📦 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Docker y Docker Compose (opcional, pero recomendado)

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/RonaldoChambillaRojas/nestjs-typeorm-mysql-starter.git
cd nestjs-typeorm-mysql-starter
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones.

4. **Levantar la base de datos con Docker:**
```bash
npm run docker:db
```

5. **Iniciar la aplicación:**
```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000/api`

## 📁 Estructura del Proyecto
```
nestjs-typeorm-mysql-starter/
├── src/
│   ├── common/                      # Recursos compartidos
│   │   ├── decorators/              # Decoradores personalizados
│   │   │   └── example.decorator.ts # Ejemplo de decoradores con documentación
│   │   ├── dto/                     # DTOs compartidos
│   │   │   └── pagination.dto.ts    # DTO de paginación reutilizable
│   │   ├── filters/                 # Filtros de excepciones
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/                  # Guards de autenticación/autorización
│   │   │   └── example.guard.ts
│   │   ├── interceptors/            # Interceptors (logging, transform, etc.)
│   │   │   └── logging.interceptor.ts
│   │   └── pipes/                   # Pipes de validación/transformación
│   │       └── parse-int.pipe.ts
│   ├── config/                      # Configuraciones
│   │   ├── database.config.ts       # Configuración de TypeORM
│   │   ├── env.validation.ts        # Validación de variables de entorno
│   │   └── typeorm.cli.config.ts    # Configuración para CLI de TypeORM
│   ├── database/                    # Base de datos
│   │   ├── migrations/              # Migraciones de TypeORM
│   │   │   └── .gitkeep
│   │   └── seeds/                   # Seeds para datos iniciales
│   │       ├── run-seed.ts          # Script para ejecutar seeds
│   │       └── example.seeder.ts    # Ejemplo de seeder
│   ├── modules/                     # Módulos de la aplicación
│   │   └── example/                 # Módulo de ejemplo
│   │       ├── entities/            # Entidades de TypeORM
│   │       │   └── example.entity.ts
│   │       └── example.module.ts    # Definición del módulo
│   ├── app.module.ts                # Módulo raíz
│   └── main.ts                      # Punto de entrada
├── test/                            # Tests e2e
├── .dockerignore                    # Archivos ignorados por Docker
├── .env                             # Variables de entorno (no commitear)
├── .env.example                     # Ejemplo de variables de entorno
├── .gitignore                       # Archivos ignorados por Git
├── docker-compose.yml               # Configuración de MySQL
├── docker-compose.dev.yml           # Stack completo (app + MySQL)
├── Dockerfile                       # Dockerfile multi-stage optimizado
├── package.json                     # Dependencias y scripts
└── README.md                        # Este archivo
```

## ⚙️ Configuración

### Variables de Entorno

El archivo `.env.example` contiene todas las variables necesarias. Cópialo a `.env` y ajusta según tu entorno:
```env
# Application
NODE_ENV=development          # Ambiente: development, production, test
PORT=3000                     # Puerto donde corre la aplicación
API_PREFIX=api                # Prefijo global para todas las rutas

# Database
DB_HOST=localhost             # Host de MySQL (usa 'mysql' si usas docker-compose.dev.yml)
DB_PORT=3306                  # Puerto de MySQL
DB_USERNAME=root              # Usuario de MySQL
DB_PASSWORD=root              # Contraseña de MySQL
DB_DATABASE=nestjs_starter    # Nombre de la base de datos
DB_SYNCHRONIZE=true           # Solo true en desarrollo (sincroniza entidades automáticamente)
DB_LOGGING=true               # Muestra queries SQL en consola

# CORS
CORS_ORIGIN=http://localhost:3000  # Origen permitido para CORS
```

### Validación de Variables de Entorno

La aplicación valida automáticamente las variables de entorno al iniciar usando `class-validator`. La configuración está en `src/config/env.validation.ts`.

Si falta alguna variable o tiene un formato incorrecto, la aplicación no iniciará y mostrará un error descriptivo.

## 🎯 Uso

### Desarrollo Local
```bash
# Iniciar solo la base de datos
npm run docker:db

# Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# Ver logs de la base de datos
npm run docker:db:logs
```

### Desarrollo con Docker (App + DB)
```bash
# Iniciar aplicación y base de datos
npm run docker:full

# Detener todo
npm run docker:full:stop
```

### Producción
```bash
# Build para producción
npm run build

# Iniciar en modo producción
npm run start:prod
```

## 📚 Guías de Desarrollo

### 1. Crear un Nuevo Módulo

Ejemplo: Módulo de Usuarios

**Paso 1: Generar el módulo con NestJS CLI**
```bash
nest g module modules/users
nest g service modules/users
nest g controller modules/users
```

**Paso 2: Crear la entidad**

Crea `src/modules/users/entities/user.entity.ts`:
```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

**Paso 3: Crear DTOs**

Crea `src/modules/users/dto/create-user.dto.ts`:
```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;
}
```

**Paso 4: Implementar el servicio**

En `src/modules/users/users.service.ts`:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
```

**Paso 5: Implementar el controlador**

En `src/modules/users/users.controller.ts`:
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
```

**Paso 6: Registrar en el módulo**

En `src/modules/users/users.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportar si otros módulos lo necesitan
})
export class UsersModule {}
```

**Paso 7: Importar en AppModule**

En `src/app.module.ts`:
```typescript
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // ... otras importaciones
    UsersModule,
  ],
})
export class AppModule {}
```

### 2. Trabajar con Relaciones

Ejemplo: Relación User -> Posts (One-to-Many)

**En User Entity:**
```typescript
import { OneToMany } from 'typeorm';
import { Post } from '../posts/entities/post.entity';

@Entity('users')
export class User {
  // ... otros campos

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
```

**En Post Entity:**
```typescript
import { ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
```

### 3. Usar Paginación
```typescript
import { PaginationDto } from '../../common/dto/pagination.dto';

@Get()
async findAll(@Query() paginationDto: PaginationDto) {
  const [data, total] = await this.usersRepository.findAndCount({
    skip: paginationDto.skip,
    take: paginationDto.limit,
  });

  return {
    data,
    total,
    page: paginationDto.page,
    limit: paginationDto.limit,
    totalPages: Math.ceil(total / paginationDto.limit),
  };
}
```

### 4. Aplicar Guards, Interceptors, Filters

**Global (en main.ts):**
```typescript
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // ...
}
```

**En un controlador específico:**
```typescript
import { UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';

@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {}
```

### 5. Crear Decoradores Personalizados

**Ejemplo: Decorador para obtener el usuario actual**

Crea `src/common/decorators/get-user.decorator.ts`:
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

**Uso:**
```typescript
@Get('profile')
getProfile(@GetUser() user: User) {
  return user;
}
```

## 📜 Scripts Disponibles
```bash
# Desarrollo
npm run start:dev          # Inicia en modo desarrollo con hot-reload
npm run start:debug        # Inicia en modo debug

# Producción
npm run build              # Compila el proyecto
npm run start:prod         # Inicia en modo producción

# Tests
npm run test               # Ejecuta tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end

# Linting y formato
npm run lint               # Ejecuta ESLint
npm run format             # Formatea código con Prettier

# Docker
npm run docker:db          # Inicia solo MySQL
npm run docker:db:stop     # Detiene MySQL
npm run docker:db:logs     # Ver logs de MySQL
npm run docker:full        # Inicia app + MySQL
npm run docker:full:stop   # Detiene todo

# Migraciones
npm run migration:generate -- src/database/migrations/NombreMigracion
npm run migration:create -- src/database/migrations/NombreMigracion
npm run migration:run      # Ejecuta migraciones pendientes
npm run migration:revert   # Revierte última migración

# Seeds
npm run seed:run           # Ejecuta seeds
```

## 🐳 Docker

### Solo Base de Datos

Para desarrollo local usando MySQL en Docker:
```bash
npm run docker:db
```

Esto levanta MySQL en el puerto 3306 con las credenciales configuradas en `docker-compose.yml`.

### Stack Completo (App + DB)

Para levantar todo el stack en Docker:
```bash
npm run docker:full
```

Esto usa `docker-compose.dev.yml` que incluye:
- Aplicación NestJS en el puerto 3000
- MySQL en el puerto 3306
- Red compartida entre contenedores

### Build para Producción

El `Dockerfile` incluido usa multi-stage build para optimizar el tamaño final:
```bash
docker build -t nestjs-app .
docker run -p 3000:3000 nestjs-app
```

## 🔄 Migraciones

Las migraciones permiten versionar cambios en el esquema de la base de datos.

### Generar una Migración (Automática)

TypeORM compara tus entidades con la base de datos y genera la migración:
```bash
npm run migration:generate -- src/database/migrations/CreateUsersTable
```

### Crear una Migración (Manual)

Para escribir una migración manualmente:
```bash
npm run migration:create -- src/database/migrations/AddIndexToUsers
```

### Ejecutar Migraciones
```bash
npm run migration:run
```

### Revertir Migración
```bash
npm run migration:revert
```

### ⚠️ Importante sobre DB_SYNCHRONIZE

- **Desarrollo:** Puedes usar `DB_SYNCHRONIZE=true` para sincronizar automáticamente
- **Producción:** SIEMPRE usa `DB_SYNCHRONIZE=false` y trabaja con migraciones

## 🌱 Seeds

Los seeds permiten poblar la base de datos con datos iniciales.

### Crear un Seeder

Crea un archivo en `src/database/seeds/`, por ejemplo `user.seeder.ts`:
```typescript
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';

export class UserSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    
    const users = [
      { name: 'Admin User', email: 'admin@example.com' },
      { name: 'Test User', email: 'test@example.com' },
    ];

    for (const userData of users) {
      const exists = await userRepository.findOne({ 
        where: { email: userData.email } 
      });
      
      if (!exists) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`User ${userData.email} created`);
      }
    }
  }
}
```

### Registrar el Seeder

En `src/database/seeds/run-seed.ts`:
```typescript
import { UserSeeder } from './user.seeder';

async function runSeeds() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    await new UserSeeder().run(dataSource);
    
    console.log('Seeds executed successfully');
    await dataSource.destroy();
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}
```

### Ejecutar Seeds
```bash
npm run seed:run
```

## 📝 Convenciones de Código

### Naming Conventions

- **Archivos:** kebab-case (`user.entity.ts`, `create-user.dto.ts`)
- **Clases:** PascalCase (`UserEntity`, `CreateUserDto`)
- **Variables y funciones:** camelCase (`findUser`, `isActive`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_KEY`)

### Estructura de Archivos
```
modules/
└── users/
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    ├── entities/
    │   └── user.entity.ts
    ├── users.controller.ts
    ├── users.service.ts
    └── users.module.ts
```

### DTOs

- Usa `class-validator` para validación
- Crea DTOs separados para create, update, y query parameters
- Reutiliza DTOs comunes desde `src/common/dto/`

### Servicios

- Un servicio por módulo
- Inyecta repositorios en el constructor
- Maneja la lógica de negocio
- Lanza excepciones de NestJS (`NotFoundException`, `BadRequestException`, etc.)

### Controladores

- Un controlador por módulo
- Solo maneja HTTP (request/response)
- Delega lógica al servicio
- Usa DTOs para validación

## 🤝 Contribuir

Si encuentras algún bug o tienes sugerencias para mejorar esta plantilla:

1. Abre un issue describiendo el problema o mejora
2. Haz un fork del repositorio
3. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia [MIT](LICENSE).

## 🙏 Agradecimientos

Esta plantilla fue creada con las mejores prácticas de la comunidad NestJS y TypeORM.

---

**¿Listo para construir algo increíble? ¡Feliz codeo! 🚀**