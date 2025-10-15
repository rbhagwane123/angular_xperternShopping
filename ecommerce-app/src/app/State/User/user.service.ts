import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from './user.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = BASE_API_URL + '/api';
  headers: any;

  constructor(private http: HttpClient, private store: Store) {
    this.headers = this.getHeaders();
    // this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
  }

  private getHeaders(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  getUserProfile() {
    return this.http
      .get(`${this.apiUrl}/users/profile`, { headers: this.headers })
      .pipe(
        map((user: any) => {
          console.log('user profile success ', user);

          return getUserProfileSuccess({ userProfile: user });
        }),
        catchError((error) => {
          return of(
            getUserProfileFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.store.dispatch(logoutSuccess());
  }
}
