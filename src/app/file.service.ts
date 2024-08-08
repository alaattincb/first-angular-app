import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000/uploads';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}`);
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${filename}`, { responseType: 'blob' });
  }
}
