import { IsString, IsInt, IsOptional, IsIn, MinLength } from 'class-validator';

export class CreateParametroSistemaDto {
  @IsString()
  @MinLength(1)
  nombreParametroSistema: string;

  @IsString()
  @MinLength(1)
  valorParametroSistema: string;

  @IsOptional()
  @IsInt()
  idGrupoParametro?: number;

  @IsInt()
  idEntidadSistema: number;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'I'])
  indicadorEstado?: 'A' | 'I';

  @IsString()
  @MinLength(1)
  usuarioRegistro: string;
}