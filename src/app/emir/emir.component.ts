import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
export class EmirComponent implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  selectedRoles: string[] = [];  // User's selected role IDs
  availableRoles: any[] = [];    // Available roles from the server

  private apiUrl = 'http://localhost:3000/api/users/add';  // Endpoint URL

  constructor(
    private http: HttpClient,
    private userroleService: UserRoleService,
    private authService: AuthService
  ) {}

  token: string | null = '';

  async ngOnInit(): Promise<void> {
    try {
      this.availableRoles = await this.userroleService.getRoles();
    } catch (error) {
      console.error('Error fetching roles', error);
    }
    this.token = this.authService.getToken();
  }

  createUser() {
    if (this.email && this.password && this.firstName && this.lastName) {
      this.createUserRequest().subscribe({
        next: (response) => {
          console.log('User created successfully', response);
          alert('User created successfully');
        },
        error: (error) => {
          console.error('Error creating user', error);
          alert('Failed to create user');
        }
      });
    } else {
      console.log('All required fields are not filled');
      alert('Please fill all required fields');
    }
  }

  private createUserRequest(): Observable<any> {
    const userData = {
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      roles: this.selectedRoles
    };
    return this.http.post<any>(this.apiUrl, userData);
  }
}
