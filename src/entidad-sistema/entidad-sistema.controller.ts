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
  Query,
} from '@nestjs/common';
import { EntidadSistemaService } from './entidad-sistema.service';
import { CreateEntidadSistemaDto } from './dto/create-entidad-sistema.dto';
import { UpdateEntidadSistemaDto } from './dto/update-entidad-sistema.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { TenantInterceptor } from '../tenant/tenant.interceptor';

@Controller('entidad-sistema')
@UseInterceptors(TenantInterceptor)
export class EntidadSistemaController {
  constructor(private readonly entidadSistemaService: EntidadSistemaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() ruc: string,
    @Body() createEntidadSistemaDto: CreateEntidadSistemaDto,
  ) {
    return this.entidadSistemaService.create(ruc, createEntidadSistemaDto);
  }

  @Get()
  findAll(
    @TenantId() ruc: string,
    @Query('elements') elements?: string,
  ) {
    if (elements === 'true') {
      return this.entidadSistemaService.findAllWithElements(ruc);
    }
    return this.entidadSistemaService.findAll(ruc);
  }

  @Get(':id')
  findOne(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Query('elements') elements?: string,
  ) {
    if (elements === 'true') {
      return this.entidadSistemaService.findOneWithElements(ruc, id);
    }
    return this.entidadSistemaService.findOne(ruc, id);
  }

  @Patch(':id')
  update(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntidadSistemaDto: UpdateEntidadSistemaDto,
  ) {
    return this.entidadSistemaService.update(
      ruc,
      id,
      updateEntidadSistemaDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.entidadSistemaService.remove(ruc, id);
  }

  @Patch(':id/disable')
  softRemove(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body('usuarioModificacion') usuarioModificacion: string,
  ) {
    return this.entidadSistemaService.softRemove(ruc, id, usuarioModificacion);
  }
}