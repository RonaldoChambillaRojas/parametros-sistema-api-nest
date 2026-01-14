import { IsString, IsInt, IsOptional, IsIn, MinLength, Min } from 'class-validator';

export class UpdateEntidadSistemaDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreEntidadSistema?: string;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'E'])
  indicadorEstado?: string;

  @IsOptional()
  @IsInt()
  idModuloSistema?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  numeroRegistrosPendientesIteracion?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  numeroRegistrosPendientesSincronizacion?: number;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1', '2', '3'])
  modoSincronizacion?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  numeroFilasPorPagina?: number;

  @IsOptional()
  @IsString()
  estadoImportacion?: string;

  @IsOptional()
  @IsString()
  nombrePlantillaImportacion?: string;

  @IsString()
  @MinLength(1)
  usuarioModificacion: string;
}