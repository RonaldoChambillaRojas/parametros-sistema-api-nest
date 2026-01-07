import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParametrosSistemaService } from './parametros-sistema.service';
import { CreateParametrosSistemaDto } from './dto/create-parametros-sistema.dto';
import { UpdateParametrosSistemaDto } from './dto/update-parametros-sistema.dto';

@Controller('parametros-sistema')
export class ParametrosSistemaController {
  constructor(private readonly parametrosSistemaService: ParametrosSistemaService) {}

  @Post()
  create(@Body() createParametrosSistemaDto: CreateParametrosSistemaDto) {
    return this.parametrosSistemaService.create(createParametrosSistemaDto);
  }

  @Get()
  findAll() {
    return this.parametrosSistemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parametrosSistemaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParametrosSistemaDto: UpdateParametrosSistemaDto) {
    return this.parametrosSistemaService.update(+id, updateParametrosSistemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parametrosSistemaService.remove(+id);
  }
}
