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
} from '@nestjs/common';
import { ParametrosSistemaService } from './parametros-sistema.service';
import { CreateParametroSistemaDto } from './dto/create-parametros-sistema.dto';
import { UpdateParametroSistemaDto } from './dto/update-parametros-sistema.dto';

@Controller('parametros-sistema')
export class ParametrosSistemaController {
  constructor(
    private readonly parametrosSistemaService: ParametrosSistemaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createParametroSistemaDto: CreateParametroSistemaDto) {
    return this.parametrosSistemaService.create(createParametroSistemaDto);
  }

  @Get()
  findAll() {
    return this.parametrosSistemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parametrosSistemaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParametroSistemaDto: UpdateParametroSistemaDto,
  ) {
    return this.parametrosSistemaService.update(id, updateParametroSistemaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parametrosSistemaService.remove(id);
  }

  // Endpoint adicional para soft delete
  @Patch(':id/disable')
  softRemove(
    @Param('id', ParseIntPipe) id: number,
    @Body('usuarioModificacion') usuarioModificacion: string,
  ) {
    return this.parametrosSistemaService.softRemove(id, usuarioModificacion);
  }
}