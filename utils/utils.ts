import { OrderStatusEnum } from '../src/enums/enums';

export const orderStatusUpdateValidation = (
  oldStatus: OrderStatusEnum,
  newStatus: OrderStatusEnum,
) => {
  return !(
    oldStatus === OrderStatusEnum.CANCELLED ||
    oldStatus === OrderStatusEnum.DELIVERED ||
    newStatus === OrderStatusEnum.CREATED
  );
};
