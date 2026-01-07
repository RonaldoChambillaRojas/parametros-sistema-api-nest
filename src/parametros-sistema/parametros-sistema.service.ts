import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametroSistema } from './entities/parametros-sistema.entity';
import { CreateParametroSistemaDto } from './dto/create-parametros-sistema.dto';
import { UpdateParametroSistemaDto } from './dto/update-parametros-sistema.dto';

@Injectable()
export class ParametrosSistemaService {
  constructor(
    @InjectRepository(ParametroSistema)
    private parametrosSistemaRepository: Repository<ParametroSistema>,
  ) {}

  async create(
    createParametroSistemaDto: CreateParametroSistemaDto,
  ): Promise<ParametroSistema> {
    const parametro = this.parametrosSistemaRepository.create({
      ...createParametroSistemaDto,
      indicadorEstado: createParametroSistemaDto.indicadorEstado || 'A',
      estadoSincronizacion: 'P',
    });

    return this.parametrosSistemaRepository.save(parametro);
  }

  async findAll(): Promise<ParametroSistema[]> {
    return this.parametrosSistemaRepository.find({
      order: { idParametroSistema: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ParametroSistema> {
    const parametro = await this.parametrosSistemaRepository.findOne({
      where: { idParametroSistema: id },
    });

    if (!parametro) {
      throw new NotFoundException(
        `Parámetro con ID ${id} no fue encontrado`,
      );
    }

    return parametro;
  }

  async update(
    id: number,
    updateParametroSistemaDto: UpdateParametroSistemaDto,
  ): Promise<ParametroSistema> {
    const parametro = await this.findOne(id);

    // Solo actualizar los campos permitidos
    if (updateParametroSistemaDto.nombreParametroSistema !== undefined) {
      parametro.nombreParametroSistema =
        updateParametroSistemaDto.nombreParametroSistema;
    }

    if (updateParametroSistemaDto.valorParametroSistema !== undefined) {
      parametro.valorParametroSistema =
        updateParametroSistemaDto.valorParametroSistema;
    }

    if (updateParametroSistemaDto.idGrupoParametro !== undefined) {
        parametro.idGrupoParametro = updateParametroSistemaDto.idGrupoParametro === null 
    ? null 
    : updateParametroSistemaDto.idGrupoParametro;
}

    if (updateParametroSistemaDto.indicadorEstado !== undefined) {
      parametro.indicadorEstado = updateParametroSistemaDto.indicadorEstado;
    }

    parametro.usuarioModificacion =
      updateParametroSistemaDto.usuarioModificacion;
    parametro.estadoSincronizacion = 'P';

    return this.parametrosSistemaRepository.save(parametro);
  }

  async remove(id: number): Promise<void> {
    const parametro = await this.findOne(id);
    await this.parametrosSistemaRepository.remove(parametro);
  }

  // Método adicional para soft delete (cambiar estado a 'I')
  async softRemove(id: number, usuarioModificacion: string): Promise<ParametroSistema> {
    const parametro = await this.findOne(id);
    parametro.indicadorEstado = 'I';
    parametro.usuarioModificacion = usuarioModificacion;
    parametro.estadoSincronizacion = 'P';
    
    return this.parametrosSistemaRepository.save(parametro);
  }
}