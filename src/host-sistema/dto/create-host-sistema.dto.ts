import { IsString, IsOptional, MinLength, MaxLength, IsStrongPassword } from 'class-validator';

export class CreateHostSistemaDto {
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
  @IsStrongPassword({
    minLength: 4,          // Longitud mínima
    minLowercase: 1,       // Al menos 1 minúscula
    minUppercase: 1,       // Al menos 1 mayúscula
    minNumbers: 1,         // Al menos 1 número
    minSymbols: 0          // Pon 0 si no quieres obligar a usar símbolos
  })
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
  @IsStrongPassword({
    minLength: 4,          // Longitud mínima
    minLowercase: 1,       // Al menos 1 minúscula
    minUppercase: 1,       // Al menos 1 mayúscula
    minNumbers: 1,         // Al menos 1 número
    minSymbols: 0          // Pon 0 si no quieres obligar a usar símbolos
  })
  @MinLength(4, { message: 'La contraseña de BD debe tener al menos 4 caracteres' })
  @MaxLength(30)
  passDB?: string;
}