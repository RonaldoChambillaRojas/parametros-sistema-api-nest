import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { GrupoParametro } from './entities/grupo-parametro.entity';
import { CreateGrupoParametroDto } from './dto/create-grupo-parametro.dto';
import { UpdateGrupoParametroDto } from './dto/update-grupo-parametro.dto';
import { DisableGrupoParametroDto } from './dto/disable-grupo-parametro.dto';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class GrupoParametroService {
  constructor(private tenantService: TenantService) {}

  private async getRepository(ruc: string): Promise<Repository<GrupoParametro>> {
    const connection = await this.tenantService.getTenantConnection(ruc);
    return connection.getRepository(GrupoParametro);
  }

  async create(
    ruc: string,
    createGrupoParametroDto: CreateGrupoParametroDto,
  ): Promise<GrupoParametro> {
    const repository = await this.getRepository(ruc);

    const grupo = repository.create({
      ...createGrupoParametroDto,
      indicadorEstado: 'A',
      fechaRegistro: new Date(),
    });

    return repository.save(grupo);
  }

  async findAll(ruc: string): Promise<GrupoParametro[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'),
      },
      order: { idGrupoParametro: 'ASC' },
    });
  }

  async findOne(ruc: string, id: number): Promise<GrupoParametro> {
    const repository = await this.getRepository(ruc);
    const grupo = await repository.findOne({
      where: {
        idGrupoParametro: id,
        indicadorEstado: Not('E'),
      },
    });

    if (!grupo) {
      throw new NotFoundException(
        `Grupo Parámetro con ID ${id} no fue encontrado o está eliminado en la base de datos del RUC ${ruc}`,
      );
    }

    return grupo;
  }

  async update(
    ruc: string,
    id: number,
    updateGrupoParametroDto: UpdateGrupoParametroDto,
  ): Promise<GrupoParametro> {
    const repository = await this.getRepository(ruc);
    const grupo = await this.findOne(ruc, id);

    if (updateGrupoParametroDto.nombreGrupoParametro !== undefined) {
      grupo.nombreGrupoParametro = updateGrupoParametroDto.nombreGrupoParametro;
    }

    grupo.usuarioModificacion = updateGrupoParametroDto.usuarioModificacion;
    grupo.fechaModificacion = new Date();

    return repository.save(grupo);
  }

  async toggleEstado(
    ruc: string,
    id: number,
    disableGrupoParametroDto: DisableGrupoParametroDto,
  ): Promise<GrupoParametro> {
    const repository = await this.getRepository(ruc);
    
    const grupo = await repository.findOne({
      where: { idGrupoParametro: id },
    });

    if (!grupo) {
      throw new NotFoundException(
        `Grupo Parámetro con ID ${id} no fue encontrado en la base de datos del RUC ${ruc}`,
      );
    }

    grupo.indicadorEstado = disableGrupoParametroDto.indicadorEstado;
    grupo.usuarioModificacion = disableGrupoParametroDto.usuarioModificacion;
    grupo.fechaModificacion = new Date();

    return repository.save(grupo);
  }

  async remove(ruc: string, id: number): Promise<void> {
    const repository = await this.getRepository(ruc);
    const grupo = await this.findOne(ruc, id);
    await repository.remove(grupo);
  }
}