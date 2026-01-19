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
import { ElementoEntidadService } from './elemento-entidad.service';
import { CreateElementoEntidadDto } from './dto/create-elemento-entidad.dto';
import { UpdateElementoEntidadDto } from './dto/update-elemento-entidad.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { TenantInterceptor } from '../tenant/tenant.interceptor';

@Controller('elemento-entidad')
@UseInterceptors(TenantInterceptor)
export class ElementoEntidadController {
  constructor(
    private readonly elementoEntidadService: ElementoEntidadService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() ruc: string,
    @Body() createElementoEntidadDto: CreateElementoEntidadDto,
  ) {
    return this.elementoEntidadService.create(ruc, createElementoEntidadDto);
  }

  @Get()
  findAll(
    @TenantId() ruc: string,
    @Query('relations') relations?: string,
  ) {
    if (relations === 'true') {
      return this.elementoEntidadService.findAllWithRelations(ruc);
    }
    return this.elementoEntidadService.findAll(ruc);
  }

  @Get('by-entidad/:idEntidad')
  findByEntidad(
    @TenantId() ruc: string,
    @Param('idEntidad', ParseIntPipe) idEntidad: number,
  ) {
    return this.elementoEntidadService.findByEntidad(ruc, idEntidad);
  }

  @Get(':id')
  findOne(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.elementoEntidadService.findOne(ruc, id);
  }

  @Patch(':id')
  update(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateElementoEntidadDto: UpdateElementoEntidadDto,
  ) {
    return this.elementoEntidadService.update(
      ruc,
      id,
      updateElementoEntidadDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.elementoEntidadService.remove(ruc, id);
  }

  @Patch(':id/disable')
  softRemove(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body('usuarioModificacion') usuarioModificacion: string,
  ) {
    return this.elementoEntidadService.softRemove(ruc, id, usuarioModificacion);
  }
}