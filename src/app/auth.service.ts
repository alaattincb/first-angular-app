import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersApiUrl = 'http://localhost:3000/api/users';
  private rolesApiUrl = 'http://localhost:3000/api/roles';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/auth`, credentials);
  }

  register(data: { email: string, password: string, first_name: string, last_name: string, phone_number?: string }): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/register`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersApiUrl}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  addUser(userData: any): Observable<any> {
    const token = this.isLoggedIn();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.usersApiUrl}/add`, userData);
  }
}
