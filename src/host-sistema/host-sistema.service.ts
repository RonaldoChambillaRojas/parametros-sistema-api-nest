import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HostSistema } from './entities/host-sistema.entity';
import { CreateHostSistemaDto } from './dto/create-host-sistema.dto';
import { UpdateHostSistemaDto } from './dto/update-host-sistema.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatePassDBDto } from './dto/update-passdb.dto';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class HostSistemaService {
  constructor(private tenantService: TenantService) {}

  private async getRepository(ruc: string): Promise<Repository<HostSistema>> {
    const connection = await this.tenantService.getTenantConnection(ruc);
    return connection.getRepository(HostSistema);
  }

  async create(
    ruc: string,
    createHostSistemaDto: CreateHostSistemaDto,
  ): Promise<HostSistema> {
    const repository = await this.getRepository(ruc);

    const host = repository.create({
      hostname: createHostSistemaDto.hostname,
      username: createHostSistemaDto.username,
      port: createHostSistemaDto.port,
      usernameDB: createHostSistemaDto.usernameDB,
      // Usar campos temporales para las contraseñas
      passwordPlain: createHostSistemaDto.password,
      passDBPlain: createHostSistemaDto.passDB,
    });

    const saved = await repository.save(host);

    // Retornar sin las contraseñas
    return this.findOne(ruc, saved.id);
  }

  async findAll(ruc: string): Promise<HostSistema[]> {
    const repository = await this.getRepository(ruc);
    // No incluye password ni passDB por el select: false
    return repository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(ruc: string, id: number): Promise<HostSistema> {
    const repository = await this.getRepository(ruc);
    const host = await repository.findOne({
      where: { id },
    });

    if (!host) {
      throw new NotFoundException(
        `Host Sistema con ID ${id} no fue encontrado en la base de datos del RUC ${ruc}`,
      );
    }

    return host;
  }

  async update(
    ruc: string,
    id: number,
    updateHostSistemaDto: UpdateHostSistemaDto,
  ): Promise<HostSistema> {
    const repository = await this.getRepository(ruc);
    const host = await this.findOne(ruc, id);

    // Actualizar campos normales
    if (updateHostSistemaDto.hostname !== undefined) {
      host.hostname = updateHostSistemaDto.hostname;
    }
    if (updateHostSistemaDto.username !== undefined) {
      host.username = updateHostSistemaDto.username;
    }
    if (updateHostSistemaDto.port !== undefined) {
      host.port = updateHostSistemaDto.port;
    }
    if (updateHostSistemaDto.usernameDB !== undefined) {
      host.usernameDB = updateHostSistemaDto.usernameDB;
    }

    // Actualizar contraseñas si se envían
    if (updateHostSistemaDto.password !== undefined) {
      host.passwordPlain = updateHostSistemaDto.password;
    }
    if (updateHostSistemaDto.passDB !== undefined) {
      host.passDBPlain = updateHostSistemaDto.passDB;
    }

    await repository.save(host);

    return this.findOne(ruc, id);
  }

  async updatePassword(
    ruc: string,
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<HostSistema> {
    const repository = await this.getRepository(ruc);
    const host = await this.findOne(ruc, id);

    host.passwordPlain = updatePasswordDto.password;
    await repository.save(host);

    return this.findOne(ruc, id);
  }

  async updatePassDB(
    ruc: string,
    id: number,
    updatePassDBDto: UpdatePassDBDto,
  ): Promise<HostSistema> {
    const repository = await this.getRepository(ruc);
    const host = await this.findOne(ruc, id);

    host.passDBPlain = updatePassDBDto.passDB;
    await repository.save(host);

    return this.findOne(ruc, id);
  }

  async remove(ruc: string, id: number): Promise<void> {
    const repository = await this.getRepository(ruc);
    const host = await this.findOne(ruc, id);
    await repository.remove(host);
  }
}