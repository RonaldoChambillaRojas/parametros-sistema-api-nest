import { Module } from '@nestjs/common';
import { HostSistemaService } from './host-sistema.service';
import { HostSistemaController } from './host-sistema.controller';

@Module({
  controllers: [HostSistemaController],
  providers: [HostSistemaService],
  exports: [HostSistemaService],
})
export class HostSistemaModule {}