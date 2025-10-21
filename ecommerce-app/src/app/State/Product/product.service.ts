import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  findProductByCategoryFailure,
  findProductByCategorySuccess,
  findProductByIdFailure,
  findProductByIdSuccess,
} from './product.action';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;
  headers: any;

  private getHeader(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  constructor(private store: Store, private http: HttpClient, private router: Router) {}

  findProductByCategory(reqData: any) {
    const headers = this.getHeader();

    const {
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;
    let params = new HttpParams()
      .set('color', color)
      .set('size', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category)
      .set('stock', stock)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http
      .get(`${this.API_BASE_URL}/api/products`, { headers, params })
      .pipe(
        map((data: any) => {
          
          return findProductByCategorySuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            findProductByCategoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  findProductById(productId: any) {
    const headers = this.getHeader();
    return this.http
      .get(`${this.API_BASE_URL}/api/products/id/${productId}`, { headers })
      .pipe(
        map((data: any) => {
          
          return findProductByIdSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            findProductByIdFailure(
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
