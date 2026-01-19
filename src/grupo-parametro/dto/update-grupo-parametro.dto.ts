import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateGrupoParametroDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreGrupoParametro?: string;

  @IsString()
  @MinLength(1)
  usuarioModificacion: string;
}