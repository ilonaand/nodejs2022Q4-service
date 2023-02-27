import { applyDecorators, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

const PublicAuthMiddleware = SetMetadata(IS_PUBLIC_KEY, true);
export const Public = () => applyDecorators(PublicAuthMiddleware);
