import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserRoleService } from '../user-role.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import reactive forms
import { ItemService } from '../item.service';
import { AuthInterceptor } from '../auth.interceptor';
@Component({
  selector: 'app-emir',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './emir.component.html',
  styleUrls: ['./emir.component.css']
})
export class EmirComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  roles: string[] = [];  // Assumes role IDs are strings

  private apiUrl = 'http://localhost:3000/api/users/add';  // Endpoint URL

  constructor(private http: HttpClient,
  private userroleService: UserRoleService,
  private authService: AuthService
  ) {}
  token: string | null = '';
  async ngOnInit(): Promise<void> {
    try {
      this.roles = await this.userroleService.getRoles();
    } catch (error) {
      console.error('Error fetching roles', error);
    }
    this.token = this.authService.getToken();
  }

  loadRoles(): void {
    this.http.get<any[]>('http://localhost:3000/api/roles').subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Loaded roles:', this.roles);
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }
  createUser() {
    if (this.email && this.password && this.firstName && this.lastName) {
      this.createUserRequest().subscribe({
        next: (response) => {
          console.log('User created successfully', response);
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      });
    } else {
      console.log('All required fields are not filled');
    }
  }

  private createUserRequest(): Observable<any> {
    const userData = {
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      roles: this.roles
    };
    return this.http.post<any>(this.apiUrl, userData);
  }
}
