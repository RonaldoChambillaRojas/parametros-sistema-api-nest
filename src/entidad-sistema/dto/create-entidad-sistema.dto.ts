import { IsString, IsInt, IsOptional, IsIn, MinLength, Min } from 'class-validator';

export class CreateEntidadSistemaDto {
  @IsString()
  @MinLength(1)
  nombreEntidadSistema: string;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'E'])
  indicadorEstado?: string;

  @IsInt()
  idModuloSistema: number;

  @IsString()
  @MinLength(1)
  usuarioRegistro: string;

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
}