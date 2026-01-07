import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametroSistema } from './entities/parametros-sistema.entity';
import { ParametrosSistemaService } from './parametros-sistema.service';
import { ParametrosSistemaController } from './parametros-sistema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParametroSistema])],
  controllers: [ParametrosSistemaController],
  providers: [ParametrosSistemaService],
  exports: [ParametrosSistemaService],
})
export class ParametrosSistemaModule {}