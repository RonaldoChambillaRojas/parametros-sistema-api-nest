import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**
 * Example Guard
 * 
 * Los guards determinan si una request debe ser manejada por el handler o no.
 * Se usan principalmente para autorización.
 * 
 * Uso:
 * 
 * 1. Global (en main.ts):
 *    const reflector = app.get(Reflector);
 *    app.useGlobalGuards(new ExampleGuard(reflector));
 * 
 * 2. En un controlador:
 *    @UseGuards(ExampleGuard)
 *    @Controller('users')
 *    export class UsersController {}
 * 
 * 3. En un método:
 *    @UseGuards(ExampleGuard)
 *    @Get()
 *    findAll() {}
 * 
 * Ejemplos comunes:
 * 
 * // Guard de autenticación
 * @Injectable()
 * export class AuthGuard implements CanActivate {
 *   canActivate(context: ExecutionContext): boolean {
 *     const request = context.switchToHttp().getRequest();
 *     return request.headers.authorization !== undefined;
 *   }
 * }
 * 
 * // Guard de roles con metadata
 * export const ROLES_KEY = 'roles';
 * export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
 * 
 * @Injectable()
 * export class RolesGuard implements CanActivate {
 *   constructor(private reflector: Reflector) {}
 * 
 *   canActivate(context: ExecutionContext): boolean {
 *     const requiredRoles = this.reflector.get<string[]>(
 *       ROLES_KEY,
 *       context.getHandler(),
 *     );
 *     if (!requiredRoles) return true;
 *     
 *     const { user } = context.switchToHttp().getRequest();
 *     return requiredRoles.some((role) => user.roles?.includes(role));
 *   }
 * }
 * 
 * // Uso con decorador
 * @Roles('admin')
 * @Get('admin-only')
 * adminRoute() {}
 */

@Injectable()
export class ExampleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Implementar lógica del guard aquí
    return true;
  }
}