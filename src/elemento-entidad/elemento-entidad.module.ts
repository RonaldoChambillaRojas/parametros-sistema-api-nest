import { Module } from '@nestjs/common';
import { ElementoEntidadService } from './elemento-entidad.service';
import { ElementoEntidadController } from './elemento-entidad.controller';

@Module({
  controllers: [ElementoEntidadController],
  providers: [ElementoEntidadService],
  exports: [ElementoEntidadService],
})
export class ElementoEntidadModule {}