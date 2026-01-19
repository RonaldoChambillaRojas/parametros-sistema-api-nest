import { IsString, IsInt, IsOptional, IsIn, MinLength } from 'class-validator';

export class CreateElementoEntidadDto {
  @IsInt()
  idEntidad: number;

  @IsString()
  @MinLength(1)
  nombreElemento: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  visible?: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  editable?: string;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'E'])
  indicadorEstado?: string;

  @IsString()
  @MinLength(1)
  usuarioRegistro: string;
}