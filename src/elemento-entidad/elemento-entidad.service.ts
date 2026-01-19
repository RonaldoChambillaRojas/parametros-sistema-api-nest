import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { ElementoEntidad } from './entities/elemento-entidad.entity';
import { CreateElementoEntidadDto } from './dto/create-elemento-entidad.dto';
import { UpdateElementoEntidadDto } from './dto/update-elemento-entidad.dto';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class ElementoEntidadService {
  constructor(private tenantService: TenantService) {}

  private async getRepository(ruc: string): Promise<Repository<ElementoEntidad>> {
    const connection = await this.tenantService.getTenantConnection(ruc);
    return connection.getRepository(ElementoEntidad);
  }

  async create(
    ruc: string,
    createElementoEntidadDto: CreateElementoEntidadDto,
  ): Promise<ElementoEntidad> {
    const repository = await this.getRepository(ruc);

    const elemento = repository.create({
      ...createElementoEntidadDto,
      visible: createElementoEntidadDto.visible || '1',
      editable: createElementoEntidadDto.editable || '1',
      indicadorEstado: createElementoEntidadDto.indicadorEstado || 'A',
      fechaRegistro: new Date(),
    });

    return repository.save(elemento);
  }

  async findAll(ruc: string): Promise<ElementoEntidad[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'),
      },
      order: { id: 'ASC' },
    });
  }

  async findAllWithRelations(ruc: string): Promise<ElementoEntidad[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'),
      },
      relations: ['entidad'],
      order: { id: 'ASC' },
    });
  }

  async findByEntidad(ruc: string, idEntidad: number): Promise<ElementoEntidad[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        idEntidad,
        indicadorEstado: Not('E'),
      },
      order: { id: 'ASC' },
    });
  }

  async findOne(ruc: string, id: number): Promise<ElementoEntidad> {
    const repository = await this.getRepository(ruc);
    const elemento = await repository.findOne({
      where: {
        id,
        indicadorEstado: Not('E'),
      },
      relations: ['entidad'],
    });

    if (!elemento) {
      throw new NotFoundException(
        `Elemento con ID ${id} no fue encontrado o está eliminado en la base de datos del RUC ${ruc}`,
      );
    }

    return elemento;
  }

  async update(
    ruc: string,
    id: number,
    updateElementoEntidadDto: UpdateElementoEntidadDto,
  ): Promise<ElementoEntidad> {
    const repository = await this.getRepository(ruc);
    const elemento = await this.findOne(ruc, id);

    if (updateElementoEntidadDto.idEntidad !== undefined) {
      elemento.idEntidad = updateElementoEntidadDto.idEntidad;
    }

    if (updateElementoEntidadDto.nombreElemento !== undefined) {
      elemento.nombreElemento = updateElementoEntidadDto.nombreElemento;
    }

    if (updateElementoEntidadDto.visible !== undefined) {
      elemento.visible = updateElementoEntidadDto.visible;
    }

    if (updateElementoEntidadDto.editable !== undefined) {
      elemento.editable = updateElementoEntidadDto.editable;
    }

    if (updateElementoEntidadDto.indicadorEstado !== undefined) {
      elemento.indicadorEstado = updateElementoEntidadDto.indicadorEstado;
    }

    elemento.usuarioModificacion = updateElementoEntidadDto.usuarioModificacion;
    elemento.fechaModificacion = new Date();

    return repository.save(elemento);
  }

  async remove(ruc: string, id: number): Promise<void> {
    const repository = await this.getRepository(ruc);
    const elemento = await this.findOne(ruc, id);
    await repository.remove(elemento);
  }

  async softRemove(
    ruc: string,
    id: number,
    usuarioModificacion: string,
  ): Promise<ElementoEntidad> {
    const repository = await this.getRepository(ruc);
    const elemento = await this.findOne(ruc, id);

    elemento.indicadorEstado = 'E';
    elemento.usuarioModificacion = usuarioModificacion;
    elemento.fechaModificacion = new Date();

    return repository.save(elemento);
  }
}