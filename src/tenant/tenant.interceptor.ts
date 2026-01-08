import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

/**
 * Interceptor que extrae el RUC del header y lo valida
 */
@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private tenantService: TenantService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Extraer RUC del header
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new BadRequestException(
        'Header "X-Tenant-Id" es requerido. Debe contener el RUC del cliente.',
      );
    }

    // Validar que el tenant sea válido
    if (!this.tenantService.isValidTenant(tenantId)) {
      const allowedTenants = this.tenantService.getAllowedTenants();
      throw new BadRequestException(
        `RUC "${tenantId}" no válido. RUCs permitidos: ${allowedTenants.join(', ')}`,
      );
    }

    // Agregar el tenantId al request para usarlo después
    request.tenantId = tenantId;

    return next.handle();
  }
}