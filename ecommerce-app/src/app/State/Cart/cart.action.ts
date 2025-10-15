import { createAction, props } from '@ngrx/store';

export const addItemToCartRequest = createAction('[Cart] Add Item to Cart Request');

export const addItemToCartSuccess = createAction(
  '[Cart] Add Item to Cart Success',
  props<{ payload: any }>()
);

export const addItemToCartFailure = createAction(
  '[Cart] Add Item to Cart Failure',
  props<{ error: any }>()
);

export const getCartItemRequest = createAction('[Cart] Get Cart Request');

export const getCartItemSuccess = createAction(
  '[Cart] Get Cart Success',
  props<{ payload: any }>()
);

export const getCartItemFailure = createAction('[Cart] Get Cart Failure', props<{ error: any }>());

export const removeCartItemRequest = createAction('[Cart] remove Cart Item Request');

export const removeCartItemSuccess = createAction(
  '[Cart] remove Cart Item Success',
  props<{ cartItemId: any }>()
);

export const removeCartItemFailure = createAction(
  '[Cart] remove Cart Item Failure',
  props<{ error: any }>()
);

export const updateCartItemRequest = createAction('[Cart] Update Cart Item Request');

export const updateCartItemSuccess = createAction(
  '[Cart] Update Cart Item Success',
  props<{ payload: any }>()
);

export const updateCartItemFailure = createAction(
  '[Cart] Update Cart Item Failure',
  props<{ error: any }>()
);
