import { createReducer, on, State } from '@ngrx/store';
import { CartService } from './cart.service';
import {
  addItemToCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  getCartItemFailure,
  getCartItemRequest,
  getCartItemSuccess,
  removeCartItemFailure,
  removeCartItemRequest,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
} from './cart.action';

export interface CartState {
  cartItems: any[];
  loading: boolean;
  error: any;
  cart: any;
}

export const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
  cart: null,
};

export const cartReducer = createReducer(
  initialState,

  on(
    addItemToCartRequest,
    getCartItemSuccess,
    removeCartItemRequest,
    updateCartItemRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  on(addItemToCartSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: [...state.cartItems, action.payload],
  })),

  on(getCartItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: action.payload.cartitems,
    cart: action.payload,
  })),

  on(removeCartItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((item) => item.id !== action.cartItemId),
  })),

  on(updateCartItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.map((item) =>
      item.id === action.payload.id ? action.payload : item
    ),
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
