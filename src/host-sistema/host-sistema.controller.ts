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
import { HostSistemaService } from './host-sistema.service';
import { CreateHostSistemaDto } from './dto/create-host-sistema.dto';
import { UpdateHostSistemaDto } from './dto/update-host-sistema.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatePassDBDto } from './dto/update-passdb.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { TenantInterceptor } from '../tenant/tenant.interceptor';

@Controller('host-sistema')
@UseInterceptors(TenantInterceptor)
export class HostSistemaController {
  constructor(private readonly hostSistemaService: HostSistemaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() ruc: string,
    @Body() createHostSistemaDto: CreateHostSistemaDto,
  ) {
    return this.hostSistemaService.create(ruc, createHostSistemaDto);
  }

  @Get()
  findAll(@TenantId() ruc: string) {
    return this.hostSistemaService.findAll(ruc);
  }

  @Get(':id')
  findOne(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.hostSistemaService.findOne(ruc, id);
  }

  @Patch(':id')
  update(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHostSistemaDto: UpdateHostSistemaDto,
  ) {
    return this.hostSistemaService.update(ruc, id, updateHostSistemaDto);
  }

  @Patch(':id/password')
  updatePassword(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.hostSistemaService.updatePassword(ruc, id, updatePasswordDto);
  }

  @Patch(':id/passdb')
  updatePassDB(
    @TenantId() ruc: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassDBDto: UpdatePassDBDto,
  ) {
    return this.hostSistemaService.updatePassDB(ruc, id, updatePassDBDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@TenantId() ruc: string, @Param('id', ParseIntPipe) id: number) {
    return this.hostSistemaService.remove(ruc, id);
  }
}