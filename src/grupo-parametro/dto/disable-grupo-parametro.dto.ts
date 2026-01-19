import { IsString, IsIn, MinLength } from 'class-validator';

export class DisableGrupoParametroDto {
  @IsString()
  @IsIn(['A', 'E'])
  indicadorEstado: 'A' | 'E';

  @IsString()
  @MinLength(1)
  usuarioModificacion: string;
}