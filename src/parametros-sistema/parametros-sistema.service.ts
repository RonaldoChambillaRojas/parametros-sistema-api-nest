import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { ParametroSistema } from './entities/parametros-sistema.entity';
import { UpdateParametroSistemaDto } from './dto/update-parametros-sistema.dto';
import { TenantService } from '../tenant/tenant.service';
import { CreateParametroSistemaDto } from './dto/create-parametros-sistema.dto';

@Injectable()
export class ParametrosSistemaService {
  constructor(private tenantService: TenantService) {}

  /**
   * Obtiene el repositorio para el tenant específico
   */
  private async getRepository(ruc: string): Promise<Repository<ParametroSistema>> {
    const connection = await this.tenantService.getTenantConnection(ruc);
    return connection.getRepository(ParametroSistema);
  }

  async create(
    ruc: string,
    createParametroSistemaDto: CreateParametroSistemaDto,
  ): Promise<ParametroSistema> {
    const repository = await this.getRepository(ruc);
    
    const parametro = repository.create({
      ...createParametroSistemaDto,
      indicadorEstado: createParametroSistemaDto.indicadorEstado || 'A',
      estadoSincronizacion: '0',
      fechaRegistro: new Date(),
    });

    return repository.save(parametro);
  }

  async findAll(ruc: string): Promise<ParametroSistema[]> {
    const repository = await this.getRepository(ruc);
    return repository.find({
      where: {
        indicadorEstado: Not('E'), // Excluir registros eliminados
      },
      order: { idParametroSistema: 'ASC' },
    });
  }

  async findOne(ruc: string, id: number): Promise<ParametroSistema> {
    const repository = await this.getRepository(ruc);
    const parametro = await repository.findOne({
      where: { 
        idParametroSistema: id,
        indicadorEstado: Not('E'), // Excluir registros eliminados
      },
    });

    if (!parametro) {
      throw new NotFoundException(
        `Parámetro con ID ${id} no fue encontrado o está eliminado en la base de datos del RUC ${ruc}`,
      );
    }

    return parametro;
  }

  async update(
    ruc: string,
    id: number,
    updateParametroSistemaDto: UpdateParametroSistemaDto,
  ): Promise<ParametroSistema> {
    const repository = await this.getRepository(ruc);
    const parametro = await this.findOne(ruc, id);

    if (updateParametroSistemaDto.nombreParametroSistema !== undefined) {
      parametro.nombreParametroSistema =
        updateParametroSistemaDto.nombreParametroSistema;
    }

    if (updateParametroSistemaDto.valorParametroSistema !== undefined) {
      parametro.valorParametroSistema =
        updateParametroSistemaDto.valorParametroSistema;
    }

    if (updateParametroSistemaDto.idGrupoParametro !== undefined) {
      parametro.idGrupoParametro = updateParametroSistemaDto.idGrupoParametro;
    }

    if (updateParametroSistemaDto.indicadorEstado !== undefined) {
      parametro.indicadorEstado = updateParametroSistemaDto.indicadorEstado;
    }

    parametro.usuarioModificacion =
      updateParametroSistemaDto.usuarioModificacion;
    parametro.fechaModificacion = new Date();
    parametro.estadoSincronizacion = '0';

    return repository.save(parametro);
  }

  async remove(ruc: string, id: number): Promise<void> {
    const repository = await this.getRepository(ruc);
    const parametro = await this.findOne(ruc, id);
    await repository.remove(parametro);
  }

  async softRemove(
    ruc: string,
    id: number,
    usuarioModificacion: string,
  ): Promise<ParametroSistema> {
    const repository = await this.getRepository(ruc);
    const parametro = await this.findOne(ruc, id);
    
    parametro.indicadorEstado = 'E';
    parametro.usuarioModificacion = usuarioModificacion;
    parametro.fechaModificacion = new Date();
    parametro.estadoSincronizacion = '0';

    return repository.save(parametro);
  }

  async findAllDeleted(ruc: string): Promise<ParametroSistema[]> {
  const repository = await this.getRepository(ruc);
  return repository.find({
    where: {
      indicadorEstado: 'E', // Solo registros eliminados
    },
    order: { idParametroSistema: 'ASC' },
  });
}
}