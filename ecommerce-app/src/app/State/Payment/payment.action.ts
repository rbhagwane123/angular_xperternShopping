import { createAction, props } from '@ngrx/store';

export const createPaymentRequest = createAction(
  '[Product] Create Payment Request',
  props<{ orderId: any }>()
);

export const createPaymentySuccess = createAction(
  '[Product] Create Payment Success',
  props<{ payload: any }>()
);

export const createPaymentFailure = createAction(
  '[Product] Create Payment Failure',
  props<{ payload: any }>()
);

export const updatePaymentRequest = createAction(
  '[Product] Update Payment Request',
  props<{ payload: any }>()
);

export const updatePaymentySuccess = createAction(
  '[Product] Update Payment Success',
  props<{ payload: any }>()
);

export const updatePaymentFailure = createAction(
  '[Product] Update Payment Failure',
  props<{ payload: any }>()
);
