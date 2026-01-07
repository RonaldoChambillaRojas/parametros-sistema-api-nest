import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * TypeORM CLI Configuration
 * 
 * Este archivo es usado por el CLI de TypeORM para ejecutar migraciones.
 * 
 * Comandos útiles:
 * - npm run migration:generate -- src/database/migrations/NombreMigracion
 * - npm run migration:create -- src/database/migrations/NombreMigracion
 * - npm run migration:run
 * - npm run migration:revert
 */

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
});