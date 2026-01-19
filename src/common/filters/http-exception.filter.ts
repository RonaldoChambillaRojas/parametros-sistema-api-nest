import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * HTTP Exception Filter
 * 
 * Los filtros de excepción capturan excepciones lanzadas durante el procesamiento de requests.
 * Permiten personalizar la respuesta de error.
 * 
 * Uso:
 * 
 * 1. Global (en main.ts):
 *    app.useGlobalFilters(new HttpExceptionFilter());
 * 
 * 2. En un controlador específico:
 *    @UseFilters(HttpExceptionFilter)
 *    @Controller('users')
 *    export class UsersController {}
 * 
 * 3. En un método específico:
 *    @UseFilters(HttpExceptionFilter)
 *    @Get()
 *    findAll() {}
 * 
 * Ejemplo de respuesta personalizada:
 * {
 *   "statusCode": 404,
 *   "timestamp": "2024-01-01T00:00:00.000Z",
 *   "path": "/api/users/123",
 *   "message": "User not found"
 * }
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}