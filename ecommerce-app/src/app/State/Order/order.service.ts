import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import {
  createOrderFailure,
  createOrderSuccess,
  getOrderByIdFailure,
  getOrderByIdSuccess,
  getOrderHistoryFailure,
  getOrderHistorySuccess,
} from './order.action';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  API_BASE_URL = BASE_API_URL;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createOrder(reqData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .post(`${BASE_API_URL}/api/orders/`, reqData, { headers })
      .pipe(
        map((data: any) => {
          if (data.id) {
            this.router.navigate([`/checkout/payment/${data.id}`], {
              queryParams: { step: '3', order_id: data.id },
            });
          }
          console.log('created order : ', data);

          return createOrderSuccess({ order: data });
        }),
        catchError((error: any) => {
          return of(
            createOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderById(orderId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/jon',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .get(`${this.API_BASE_URL}/api/orders/${orderId}`, { headers })
      .pipe(
        map((data: any) => {
          console.log('Get orders ', data);
          return getOrderByIdSuccess({ order: data });
        }),
        catchError((error: any) => {
          return of(
            getOrderByIdFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/jon',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    return this.http
      .get(`${this.API_BASE_URL}/api/orders/user`, { headers })
      .pipe(
        map((data: any) => {
          console.log('order history ', data);
          return getOrderHistorySuccess({ orders: data });
        }),
        catchError((error: any) => {
          return of(
            getOrderHistoryFailure(
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
