import { DataSource } from 'typeorm';

/**
 * Example Seeder
 * 
 * Este es un archivo de ejemplo para crear seeders.
 * 
 * Uso:
 * 1. Importar la entidad que necesites poblar
 * 2. Implementar el método run() con la lógica de inserción
 * 3. Importar y ejecutar este seeder en run-seed.ts
 * 
 * Ejemplo:
 * 
 * import { User } from '../../modules/users/entities/user.entity';
 * 
 * export class UserSeeder {
 *   async run(dataSource: DataSource): Promise<void> {
 *     const userRepository = dataSource.getRepository(User);
 *     
 *     const users = [
 *       { name: 'John Doe', email: 'john@example.com' },
 *       { name: 'Jane Doe', email: 'jane@example.com' },
 *     ];
 * 
 *     for (const userData of users) {
 *       const exists = await userRepository.findOne({ 
 *         where: { email: userData.email } 
 *       });
 *       
 *       if (!exists) {
 *         const user = userRepository.create(userData);
 *         await userRepository.save(user);
 *         console.log(`User ${userData.email} created`);
 *       }
 *     }
 *   }
 * }
 */

export class ExampleSeeder {
  async run(dataSource: DataSource): Promise<void> {
    // Implementar lógica del seeder aquí
    console.log('Example seeder executed');
  }
}