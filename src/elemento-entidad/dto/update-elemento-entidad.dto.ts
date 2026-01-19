import { IsString, IsInt, IsOptional, IsIn, MinLength } from 'class-validator';

export class UpdateElementoEntidadDto {
  @IsOptional()
  @IsInt()
  idEntidad?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreElemento?: string;

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
  usuarioModificacion: string;
}