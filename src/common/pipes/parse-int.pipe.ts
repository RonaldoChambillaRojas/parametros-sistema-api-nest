import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/**
 * Example Parse Int Pipe
 * 
 * Los pipes transforman o validan datos antes de que lleguen al handler.
 * 
 * Tipos de pipes:
 * 1. Transformation: Transforman el input al formato deseado
 * 2. Validation: Validan el input y lanzan excepción si es inválido
 * 
 * Pipes integrados en NestJS:
 * - ValidationPipe: Valida con class-validator
 * - ParseIntPipe: Convierte a número entero
 * - ParseBoolPipe: Convierte a boolean
 * - ParseArrayPipe: Convierte a array
 * - ParseUUIDPipe: Valida UUID
 * - DefaultValuePipe: Establece valor por defecto
 * 
 * Uso:
 * 
 * 1. Global (en main.ts):
 *    app.useGlobalPipes(new ValidationPipe());
 * 
 * 2. En un parámetro:
 *    @Get(':id')
 *    findOne(@Param('id', ParseIntPipe) id: number) {}
 * 
 * 3. En un controlador:
 *    @UsePipes(ValidationPipe)
 *    @Controller('users')
 *    export class UsersController {}
 * 
 * Ejemplo de pipe de validación con DTO:
 * 
 * // DTO
 * export class CreateUserDto {
 *   @IsString()
 *   @MinLength(3)
 *   name: string;
 * 
 *   @IsEmail()
 *   email: string;
 * 
 *   @IsInt()
 *   @Min(18)
 *   age: number;
 * }
 * 
 * // Uso en controlador
 * @Post()
 * create(@Body() createUserDto: CreateUserDto) {
 *   return this.usersService.create(createUserDto);
 * }
 */

@Injectable()
export class ParseIntCustomPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a valid integer.`,
      );
    }
    return val;
  }
}