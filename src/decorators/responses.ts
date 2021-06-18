import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const CommonErrorAuthorizationResponse = () => {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      example: 'Bearer {token}',
    }),
    ApiUnauthorizedResponse({
      description: 'Missing or wrong access token',
    }),
  );
};
