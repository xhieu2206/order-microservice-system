import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderStatusEnum } from '../enums/enums';
import { IsEnum } from 'class-validator';

export const CommonErrorAuthorizationResponse = () => {
  return applyDecorators(
    ApiBearerAuth('JWT'),
    ApiUnauthorizedResponse({
      description: 'Missing or wrong access token',
    }),
  );
};

export const NotFoundResponse = () => {
  return applyDecorators(
    ApiNotFoundResponse({
      description: "Couldn't found resource with this provided ID",
    }),
  );
};

export const OrderStatusFieldRequest = () => {
  return applyDecorators(
    ApiProperty({
      required: true,
      description: `Accept one one of there value: "created", "confirmed", "cancelled", "delivered"`,
      type: OrderStatusEnum,
      enumName: 'OrderStatusEnum',
      enum: OrderStatusEnum,
    }),
    IsEnum(OrderStatusEnum),
  );
};
