import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logging Interceptor
 * 
 * Los interceptors permiten:
 * - Ejecutar lógica antes/después del manejo de la request
 * - Transformar el resultado o excepción
 * - Extender el comportamiento básico de funciones
 * - Logging, caching, transformación de respuestas
 * 
 * Uso:
 * 
 * 1. Global (en main.ts):
 *    app.useGlobalInterceptors(new LoggingInterceptor());
 * 
 * 2. En un controlador:
 *    @UseInterceptors(LoggingInterceptor)
 *    @Controller('users')
 *    export class UsersController {}
 * 
 * 3. En un método:
 *    @UseInterceptors(LoggingInterceptor)
 *    @Get()
 *    findAll() {}
 * 
 * Otros ejemplos de interceptors:
 * 
 * // Transform Response Interceptor
 * @Injectable()
 * export class TransformInterceptor implements NestInterceptor {
 *   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
 *     return next.handle().pipe(
 *       map(data => ({
 *         success: true,
 *         data,
 *         timestamp: new Date().toISOString()
 *       }))
 *     );
 *   }
 * }
 * 
 * // Timeout Interceptor
 * @Injectable()
 * export class TimeoutInterceptor implements NestInterceptor {
 *   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
 *     return next.handle().pipe(timeout(5000));
 *   }
 * }
 */

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(`Incoming Request: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.log(
          `Completed: ${method} ${url} ${response.statusCode} - ${delay}ms`,
        );
      }),
    );
  }
}