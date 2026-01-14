import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ParametrosSistemaService } from './parametros-sistema.service';
import { CreateParametroSistemaDto } from './dto/create-parametros-sistema.dto';
import { UpdateParametroSistemaDto } from './dto/update-parametros-sistema.dto';
import { TenantInterceptor } from 'src/tenant/tenant.interceptor';
import { TenantId } from 'src/tenant/tenant.decorator';
@Controller('parametros-sistema')
@UseInterceptors(TenantInterceptor)
export class ParametrosSistemaController {
  constructor(
    private readonly parametrosSistemaService: ParametrosSistemaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() ruc: string,
    @Body() createParametroSistemaDto: CreateParametroSistemaDto,
  ) {
    return this.parametrosSistemaService.create(ruc, createParametroSistemaDto);
  }

  @Get()
  findAll(@TenantId() ruc: string) {
    return this.parametrosSistemaService.findAll(ruc);
  }

  @Get(':id')
  findOne(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.parametrosSistemaService.findOne(ruc, id);
  }

  @Get('deleted/all')
  findAllDeleted(@TenantId() ruc: string) {
    return this.parametrosSistemaService.findAllDeleted(ruc);
  }

  @Get('health')
  health() {
    return { status: 'OK' };
  }

  @Patch(':id')
  update(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParametroSistemaDto: UpdateParametroSistemaDto,
  ) {
    return this.parametrosSistemaService.update(
      ruc,
      id,
      updateParametroSistemaDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.parametrosSistemaService.remove(ruc, id);
  }

  @Patch(':id/disable')
  softRemove(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body('usuarioModificacion') usuarioModificacion: string,
  ) {
    return this.parametrosSistemaService.softRemove(
      ruc,
      id,
      usuarioModificacion,
    );
  }
}