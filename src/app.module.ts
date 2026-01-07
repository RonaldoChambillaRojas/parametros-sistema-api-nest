import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import { ParametrosSistemaModule } from './parametros-sistema/parametros-sistema.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        if (!dbConfig) {
          throw new Error('Database configuration not found');
        }
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    ParametrosSistemaModule,
  ],
})
export class AppModule {}