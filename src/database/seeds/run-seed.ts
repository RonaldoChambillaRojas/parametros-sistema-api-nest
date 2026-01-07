import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ParametroSistemaSeeder } from './parametro-sistema.seeder';

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
    console.log('🔌 Conectando a la base de datos...');
    await dataSource.initialize();
    console.log('✅ Conexión establecida\n');

    console.log('🌱 Ejecutando seeds...\n');
    await new ParametroSistemaSeeder().run(dataSource);

    console.log('\n🎉 Seeds ejecutados exitosamente');
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seeds:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

runSeeds();