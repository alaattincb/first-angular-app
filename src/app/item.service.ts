// src/app/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface RolesResponse{
  code: number;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getAuditLogs(): any[] | PromiseLike<any[]> {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api';
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWE3MDY3MzBhY2YxOTVhNGU5YTZmYiIsImV4cCI6MTQ4NzcxNzQxOTk2ODAwfQ.y9S23LUGLMKtWrNm4smvarlvJkJrNIVLy1JvWSZKYDU';

  constructor(private http: HttpClient) { }

  async getRoles(): Promise<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    
    try {
      const response = await lastValueFrom(this.http.get<RolesResponse>(`${this.apiUrl}/roles`, { headers }));
      console.log(response); 
      return response.data;
    } catch (error) {
      console.error('Error fetching roles', error);
      return [];
    }
  }
}
