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
import { GrupoParametroService } from './grupo-parametro.service';
import { CreateGrupoParametroDto } from './dto/create-grupo-parametro.dto';
import { UpdateGrupoParametroDto } from './dto/update-grupo-parametro.dto';
import { DisableGrupoParametroDto } from './dto/disable-grupo-parametro.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { TenantInterceptor } from '../tenant/tenant.interceptor';

@Controller('grupo-parametro')
@UseInterceptors(TenantInterceptor)
export class GrupoParametroController {
  constructor(private readonly grupoParametroService: GrupoParametroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() ruc: string,
    @Body() createGrupoParametroDto: CreateGrupoParametroDto,
  ) {
    return this.grupoParametroService.create(ruc, createGrupoParametroDto);
  }

  @Get()
  findAll(@TenantId() ruc: string) {
    return this.grupoParametroService.findAll(ruc);
  }

  @Get(':id')
  findOne(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.grupoParametroService.findOne(ruc, id);
  }

  @Patch(':id')
  update(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrupoParametroDto: UpdateGrupoParametroDto,
  ) {
    return this.grupoParametroService.update(ruc, id, updateGrupoParametroDto);
  }

  @Patch(':id/toggle-estado')
  toggleEstado(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() disableGrupoParametroDto: DisableGrupoParametroDto,
  ) {
    return this.grupoParametroService.toggleEstado(
      ruc,
      id,
      disableGrupoParametroDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.grupoParametroService.remove(ruc, id);
  }
}