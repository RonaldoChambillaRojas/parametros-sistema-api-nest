import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateHostSistemaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  hostname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  @MaxLength(30)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  port?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  usernameDB?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'La contraseña de BD debe tener al menos 4 caracteres' })
  @MaxLength(30)
  passDB?: string;
}