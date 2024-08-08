import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/auth`, credentials);
  }

  register(data: { email: string, password: string, first_name: string, last_name: string, phone_number?: string }): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/register`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }

  getUserById(userId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.usersApiUrl}/${userId}`, { headers });
  }

  addUser(userData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.usersApiUrl}/add`, userData, { headers });
  }

  setUserToken(token: string, userId: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
    }
  }
}
