import { createReducer, on, State } from '@ngrx/store';
import { CartService } from './cart.service';
import {
  addItemToCartFailure,
  addItemToCartSuccess,
  getCartItemFailure,
  getCartItemSuccess,
  removeCartItemFailure,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemSuccess,
} from './cart.action';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  cart: null,
};

export const cartReducer = createReducer(
  initialState,
  on(addItemToCartSuccess, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getCartItemSuccess, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(removeCartItemSuccess, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(updateCartItemSuccess, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    addItemToCartFailure,
    getCartItemFailure,
    updateCartItemFailure,
    removeCartItemFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    })
  )
);
