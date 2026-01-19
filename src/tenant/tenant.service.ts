import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ParametroSistema } from 'src/parametros-sistema/entities/parametros-sistema.entity';
import { EntidadSistema } from 'src/entidad-sistema/entities/entidad-sistema.entity';
import { ElementoEntidad } from 'src/elemento-entidad/entities/elemento-entidad.entity';
@Injectable()
export class TenantService {
  private connections: Map<string, DataSource> = new Map();
  private allowedTenants: string[];

  constructor(private configService: ConfigService) {
    const tenantsString = this.configService.get<string>('TENANTS_ALLOWED', '');
    this.allowedTenants = tenantsString.split(',').map((t) => t.trim());
  }

  /**
   * Verifica si un RUC es válido
   */
  isValidTenant(ruc: string): boolean {
    return this.allowedTenants.includes(ruc);
  }

  /**
   * Obtiene la lista de tenants permitidos
   */
  getAllowedTenants(): string[] {
    return this.allowedTenants;
  }

  /**
   * Obtiene o crea una conexión para el tenant específico
   */
  async getTenantConnection(ruc: string): Promise<DataSource> {
    // Validar que el RUC sea permitido
    if (!this.isValidTenant(ruc)) {
      throw new BadRequestException(
        `RUC "${ruc}" no válido. RUCs permitidos: ${this.allowedTenants.join(', ')}`,
      );
    }

    // Si ya existe la conexión, retornarla
    if (this.connections.has(ruc)) {
      const connection = this.connections.get(ruc);
      if (connection && connection.isInitialized) {
        return connection;
      }
    }

    // Crear nueva conexión
    const dataSourceOptions: DataSourceOptions = {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: ruc, // El nombre de la BD es el RUC
      entities: [ParametroSistema, ElementoEntidad, EntidadSistema], // Agregar nuevas entidades
      synchronize: false, // IMPORTANTE: siempre false en multi-tenant
      logging: this.configService.get<boolean>('DB_LOGGING'),
    };

    const dataSource = new DataSource(dataSourceOptions);

    try {
      await dataSource.initialize();
      this.connections.set(ruc, dataSource);
      console.log(`✅ Conexión establecida con tenant: ${ruc}`);
      return dataSource;
    } catch (error) {
      console.error(`❌ Error conectando al tenant ${ruc}:`, error.message);
      throw new BadRequestException(
        `No se pudo conectar a la base de datos del RUC: ${ruc}`,
      );
    }
  }

  /**
   * Cierra todas las conexiones (útil para cleanup)
   */
  async closeAllConnections(): Promise<void> {
    for (const [ruc, connection] of this.connections) {
      if (connection.isInitialized) {
        await connection.destroy();
        console.log(`🔌 Conexión cerrada para tenant: ${ruc}`);
      }
    }
    this.connections.clear();
  }
}