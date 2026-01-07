import { IsString, IsInt, IsOptional, IsIn, MinLength } from 'class-validator';

export class UpdateParametroSistemaDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreParametroSistema?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  valorParametroSistema?: string;

  @IsOptional()
  @IsInt()
  idGrupoParametro?: number | null;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'I'])
  indicadorEstado?: 'A' | 'I';

  @IsString()
  @MinLength(1)
  usuarioModificacion: string;
}