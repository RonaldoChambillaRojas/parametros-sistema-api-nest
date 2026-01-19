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
  @IsIn(['A', 'E'])
  indicadorEstado?: 'A' | 'E';

  @IsString()
  @MinLength(1)
  usuarioModificacion: string;
}