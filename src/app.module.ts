import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { TenantModule } from './tenant/tenant.module';
import { ParametrosSistemaModule } from './parametros-sistema/parametros-sistema.module';
import { ElementoEntidadModule } from './elemento-entidad/elemento-entidad.module';
import { EntidadSistemaModule } from './entidad-sistema/entidad-sistema.module';
import { TipoDocumentoModule } from './tipo-documento/tipo-documento.module';
import { GrupoParametroModule } from './grupo-parametro/grupo-parametro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TenantModule,
    ParametrosSistemaModule,
    ElementoEntidadModule,
    EntidadSistemaModule,
    TipoDocumentoModule,
    GrupoParametroModule,
  ],
})
export class AppModule {}