import { Module } from '@nestjs/common';
import { ParametrosSistemaService } from './parametros-sistema.service';
import { ParametrosSistemaController } from './parametros-sistema.controller';

@Module({
  controllers: [ParametrosSistemaController],
  providers: [ParametrosSistemaService],
})
export class ParametrosSistemaModule {}
