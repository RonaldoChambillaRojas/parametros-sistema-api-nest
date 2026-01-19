import { IsString, MinLength } from 'class-validator';

export class CreateGrupoParametroDto {
  @IsString()
  @MinLength(1)
  nombreGrupoParametro: string;

  @IsString()
  @MinLength(1)
  usuarioRegistro: string;
}