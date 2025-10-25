import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_BASE_URL = BASE_API_URL;
  url = this.API_BASE_URL + '/api/cart';

  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(private store: Store, private http: HttpClient, private route: ActivatedRoute) {}

  addItemCart(reqData: any) {
    console.log('Add item data : ', reqData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(`${this.url}/add`, reqData, { headers })
      .pipe(
        map((data: any) => {
          console.log('Item added successfully', data);
          return addItemToCartSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            addItemToCartFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getCart() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .get(`${this.url}/`, { headers })
      .pipe(
        map((data: any) => {
          // console.log('Service Cart Items ', data);
          return getCartItemSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            getCartItemFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  removeCartItem(cartItemId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .delete(`${this.API_BASE_URL}/api/cart_items/${cartItemId}`, { headers })
      .pipe(
        map((data: any) => {
          console.log('removed Items ', data);
          return removeCartItemSuccess({ cartItemId });
        }),
        catchError((error: any) => {
          return of(
            removeCartItemFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(`${this.API_BASE_URL}/api/cart_items/`, reqData, { headers })
      .pipe(
        map((data: any) => {
          console.log('updated Items ', data);
          return updateCartItemSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            updateCartItemFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
