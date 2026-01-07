import { Injectable } from '@nestjs/common';
import { CreateParametrosSistemaDto } from './dto/create-parametros-sistema.dto';
import { UpdateParametrosSistemaDto } from './dto/update-parametros-sistema.dto';

@Injectable()
export class ParametrosSistemaService {
  create(createParametrosSistemaDto: CreateParametrosSistemaDto) {
    return 'This action adds a new parametrosSistema';
  }

  findAll() {
    return `This action returns all parametrosSistema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parametrosSistema`;
  }

  update(id: number, updateParametrosSistemaDto: UpdateParametrosSistemaDto) {
    return `This action updates a #${id} parametrosSistema`;
  }

  remove(id: number) {
    return `This action removes a #${id} parametrosSistema`;
  }
}
