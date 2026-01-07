import { SetMetadata } from '@nestjs/common';

/**
 * Example Decorators
 * 
 * Los decoradores personalizados permiten agregar metadata a clases, métodos o parámetros.
 * 
 * Tipos de decoradores comunes:
 * 
 * 1. Decoradores de Método/Clase:
 *    - SetMetadata: Agrega metadata personalizada
 *    - Útil para guards, interceptors, etc.
 * 
 * 2. Decoradores de Parámetro:
 *    - createParamDecorator: Extrae datos de la request
 * 
 * Ejemplos de uso:
 * 
 * // Decorador simple con metadata
 * export const IS_PUBLIC_KEY = 'isPublic';
 * export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
 * 
 * // Uso en controlador
 * @Public()
 * @Get('public-route')
 * publicRoute() {
 *   return 'This is public';
 * }
 * 
 * // Decorador de parámetro para obtener usuario
 * export const GetUser = createParamDecorator(
 *   (data: unknown, ctx: ExecutionContext) => {
 *     const request = ctx.switchToHttp().getRequest();
 *     return request.user;
 *   },
 * );
 * 
 * // Uso en controlador
 * @Get('profile')
 * getProfile(@GetUser() user: User) {
 *   return user;
 * }
 */

export const EXAMPLE_KEY = 'example';
export const ExampleDecorator = () => SetMetadata(EXAMPLE_KEY, true);