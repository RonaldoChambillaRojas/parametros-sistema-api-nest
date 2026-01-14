import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { EntidadSistema } from './entities/entidad-sistema.entity';
import { CreateEntidadSistemaDto } from './dto/create-entidad-sistema.dto';
import { UpdateEntidadSistemaDto } from './dto/update-entidad-sistema.dto';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class EntidadSistemaService {
  constructor(private tenantService: TenantService) {}

  private async getRepository(ruc: string): Promise<Repository<EntidadSistema>> {
    const connection = await this.tenantService.getTenantConnection(ruc);
    return connection.getRepository(EntidadSistema);
  }

  async create(
    ruc: string,
    createEntidadSistemaDto: CreateEntidadSistemaDto,
  ): Promise<EntidadSistema> {
    const repository = await this.getRepository(ruc);

    const entidad = repository.create({
      ...createEntidadSistemaDto,
      indicadorEstado: createEntidadSistemaDto.indicadorEstado || 'A',
      fechaRegistro: new Date(),
      numeroRegistrosPendientesIteracion:
        createEntidadSistemaDto.numeroRegistrosPendientesIteracion || 0,
      numeroRegistrosPendientesSincronizacion:
        createEntidadSistemaDto.numeroRegistrosPendientesSincronizacion || 0,
      modoSincronizacion: createEntidadSistemaDto.modoSincronizacion || '2',
      numeroFilasPorPagina: createEntidadSistemaDto.numeroFilasPorPagina || 20,
      estadoImportacion: createEntidadSistemaDto.estadoImportacion || '0',
      nombrePlantillaImportacion:
        createEntidadSistemaDto.nombrePlantillaImportacion || '',
    });

    return repository.save(entidad);
  }

  async findAll(ruc: string): Promise<EntidadSistema[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'),
      },
      order: { idEntidadSistema: 'ASC' },
    });
  }

  async findAllWithElements(ruc: string): Promise<EntidadSistema[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'),
      },
      relations: ['elementos'],
      order: { idEntidadSistema: 'ASC' },
    });
  }

  async findOne(ruc: string, id: number): Promise<EntidadSistema> {
    const repository = await this.getRepository(ruc);
    const entidad = await repository.findOne({
      where: {
        idEntidadSistema: id,
        indicadorEstado: Not('E'),
      },
    });

    if (!entidad) {
      throw new NotFoundException(
        `Entidad con ID ${id} no fue encontrada o está eliminada en la base de datos del RUC ${ruc}`,
      );
    }

    return entidad;
  }

  async findOneWithElements(ruc: string, id: number): Promise<EntidadSistema> {
    const repository = await this.getRepository(ruc);
    const entidad = await repository.findOne({
      where: {
        idEntidadSistema: id,
        indicadorEstado: Not('E'),
      },
      relations: ['elementos'],
    });

    if (!entidad) {
      throw new NotFoundException(
        `Entidad con ID ${id} no fue encontrada o está eliminada en la base de datos del RUC ${ruc}`,
      );
    }

    return entidad;
  }

  async update(
    ruc: string,
    id: number,
    updateEntidadSistemaDto: UpdateEntidadSistemaDto,
  ): Promise<EntidadSistema> {
    const repository = await this.getRepository(ruc);
    const entidad = await this.findOne(ruc, id);

    Object.keys(updateEntidadSistemaDto).forEach((key) => {
      if (
        key !== 'usuarioModificacion' &&
        updateEntidadSistemaDto[key] !== undefined
      ) {
        entidad[key] = updateEntidadSistemaDto[key];
      }
    });

    entidad.usuarioModificacion = updateEntidadSistemaDto.usuarioModificacion;
    entidad.fechaModificacion = new Date();

    return repository.save(entidad);
  }

  async remove(ruc: string, id: number): Promise<void> {
    const repository = await this.getRepository(ruc);
    const entidad = await this.findOne(ruc, id);
    await repository.remove(entidad);
  }

  async softRemove(
    ruc: string,
    id: number,
    usuarioModificacion: string,
  ): Promise<EntidadSistema> {
    const repository = await this.getRepository(ruc);
    const entidad = await this.findOne(ruc, id);

    entidad.indicadorEstado = 'E';
    entidad.usuarioModificacion = usuarioModificacion;
    entidad.fechaModificacion = new Date();

    return repository.save(entidad);
  }
}