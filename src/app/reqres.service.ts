import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.model';
import { Unknown } from '../models/unknown.model';
import { singleUserResponse } from '../models/singleUser.model';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  private apiUrl = 'https://reqres.in/api';
  private userUrl = 'http://localhost:3000/api/users';


  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<{ data: UserResponse[], total_pages: number }> {
    return this.http.get<{ data: UserResponse[], total_pages: number }>(`${this.apiUrl}/users?page=${page}`);
  }

  getUnknown(): Observable<{ data: Unknown[] }> {
    return this.http.get<{ data: Unknown[] }>(`${this.apiUrl}/unknown`);
  }

  getSingleUser(): Observable<singleUserResponse> {
    return this.http.get<singleUserResponse>(`${this.userUrl}`);
  }
}