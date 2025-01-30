import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  register(data: { firstname: string; lastname: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data).pipe(
      tap((response: any) => {
        console.log('Registration successful', response);
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.warn('Geen token gevonden, gebruiker is waarschijnlijk al uitgelogd.');
      return throwError(() => new Error('Geen token gevonden'));
    }
  
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token'); 
        console.log('Logout successful');
        window.location.reload(); 
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return throwError(() => error);
      })
    );
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getUserProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => observer.error('Geen token gevonden'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/auth/user`, { headers });
  }
}
