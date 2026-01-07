import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Pagination DTO
 * 
 * DTO (Data Transfer Object) para paginación de resultados.
 * 
 * Los DTOs se usan para:
 * - Definir la estructura de datos esperada
 * - Validar inputs con class-validator
 * - Transformar datos con class-transformer
 * - Documentación automática con Swagger
 * 
 * Decoradores comunes de validación:
 * - @IsString(), @IsNumber(), @IsBoolean(), @IsEmail(), @IsUrl()
 * - @MinLength(), @MaxLength(), @Min(), @Max()
 * - @IsOptional(), @IsNotEmpty()
 * - @IsArray(), @ArrayMinSize(), @ArrayMaxSize()
 * - @ValidateNested(), @Type()
 * 
 * Uso en controlador:
 * 
 * @Get()
 * async findAll(@Query() paginationDto: PaginationDto) {
 *   return this.service.findAll(paginationDto);
 * }
 * 
 * Ejemplo de request:
 * GET /api/users?page=1&limit=10
 * 
 * Ejemplo de DTO de creación:
 * 
 * export class CreateUserDto {
 *   @IsString()
 *   @MinLength(3)
 *   @MaxLength(50)
 *   name: string;
 * 
 *   @IsEmail()
 *   email: string;
 * 
 *   @IsString()
 *   @MinLength(8)
 *   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
 *     message: 'Password must contain uppercase, lowercase and number'
 *   })
 *   password: string;
 * }
 */

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}