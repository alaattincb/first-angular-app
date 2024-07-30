import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

interface RolesResponse {
  code: number;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private apiUrl = 'http://localhost:3000/api/roles';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async getRoles(): Promise<any[]> {
    const token = this.authService.getToken(); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
     
      const response = await lastValueFrom(this.http.get<RolesResponse>(this.apiUrl, { headers }));
      console.log(response); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching roles', error); 
      return [];
    }
  }
}
