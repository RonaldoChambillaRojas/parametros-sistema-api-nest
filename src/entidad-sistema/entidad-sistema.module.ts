import { Module } from '@nestjs/common';
import { EntidadSistemaService } from './entidad-sistema.service';
import { EntidadSistemaController } from './entidad-sistema.controller';

@Module({
  controllers: [EntidadSistemaController],
  providers: [EntidadSistemaService],
  exports: [EntidadSistemaService],
})
export class EntidadSistemaModule {}