import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePassDBDto {
  @IsString()
  @MinLength(4, { message: 'La contraseña de BD debe tener al menos 4 caracteres' })
  @MaxLength(30)
  passDB: string;
}