import { Module } from '@nestjs/common';
import { GrupoParametroService } from './grupo-parametro.service';
import { GrupoParametroController } from './grupo-parametro.controller';

@Module({
  controllers: [GrupoParametroController],
  providers: [GrupoParametroService],
  exports: [GrupoParametroService],
})
export class GrupoParametroModule {}