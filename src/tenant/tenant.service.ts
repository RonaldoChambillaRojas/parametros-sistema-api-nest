import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ParametroSistema } from '../parametros-sistema/entities/parametros-sistema.entity';
import { ElementoEntidad } from '../elemento-entidad/entities/elemento-entidad.entity';
import { EntidadSistema } from '../entidad-sistema/entities/entidad-sistema.entity';
import { GrupoParametro } from '../grupo-parametro/entities/grupo-parametro.entity';

@Injectable()
export class TenantService {
  private connections: Map<string, DataSource> = new Map();
  private allowedTenants: string[];

  constructor(private configService: ConfigService) {
    const tenantsString = this.configService.get<string>('TENANTS_ALLOWED', '');
    this.allowedTenants = tenantsString.split(',').map((t) => t.trim());
  }

  isValidTenant(ruc: string): boolean {
    return this.allowedTenants.includes(ruc);
  }

  getAllowedTenants(): string[] {
    return this.allowedTenants;
  }

  async getTenantConnection(ruc: string): Promise<DataSource> {
    if (!this.isValidTenant(ruc)) {
      throw new BadRequestException(
        `RUC "${ruc}" no válido. RUCs permitidos: ${this.allowedTenants.join(', ')}`,
      );
    }

    if (this.connections.has(ruc)) {
      const connection = this.connections.get(ruc);
      if (connection && connection.isInitialized) {
        return connection;
      }
    }

    const dataSourceOptions: DataSourceOptions = {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: ruc,
      entities: [
        ParametroSistema,
        ElementoEntidad,
        EntidadSistema,
        GrupoParametro, // Agregar aquí
      ],
      synchronize: false,
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