import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Importar seeds aquí
// import { UserSeeder } from './user.seeder';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
});

async function runSeeds() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    // Ejecutar seeds aquí
    // await new UserSeeder().run(dataSource);
    
    console.log('Seeds executed successfully');
    
    await dataSource.destroy();
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds();