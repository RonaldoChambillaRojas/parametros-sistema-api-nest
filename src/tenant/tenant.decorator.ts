import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para extraer el RUC del tenant desde el request
 */
export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantId;
  },
);