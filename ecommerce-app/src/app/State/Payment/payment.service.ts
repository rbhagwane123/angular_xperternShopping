import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { catchError, map, of } from 'rxjs';
import {
  createPaymentFailure,
  createPaymentRequest,
  updatePaymentFailure,
  updatePaymentRequest,
} from './payment.action';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  API_BASE_URL = BASE_API_URL;
  headers: any;

  private getHeader(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private activateRouter: ActivatedRoute
  ) {}

  createPayment(orderId: any) {
    const url = `${this.API_BASE_URL}/api/payments/${orderId}`;
    const headers = this.getHeader();

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          console.log('Payment link', data);
          if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
          }
          return createPaymentRequest({ orderId: data });
        }),
        catchError((error: any) => {
          return of(
            createPaymentFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updatePayment(reqData: any) {
    const url = `${this.API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}?order_id=${reqData.orderId}`;
    const headers = this.getHeader();

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          
          return updatePaymentRequest({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            updatePaymentFailure(
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
