import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';
import { UserRoleService } from '../user-role.service';
import { ReqresService } from '../reqres.service';
import { CommonModule } from '@angular/common';
import { EmirComponent } from '../emir/emir.component';
import { singleUserResponse } from '../../models/singleUser.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApxChartComponent } from '../apxchart/apxchart.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, EmirComponent, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, ApxChartComponent],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  roles: any[] = [];
  addForm: FormGroup;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private itemService: ItemService,
    private userroleService: UserRoleService,
    private reqresService: ReqresService
  ) {
    this.addForm = this.fb.group({
      email: [''],
      password: [''],
      first_name: [''],
      last_name: [''],
      phone_number: [''],
      roles: [[]]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.roles = await this.userroleService.getRoles();
    } catch (error) {
      console.error('Error fetching roles', error);
    }
    this.loadUserData();
  }

  loadUserData(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (error) => {
          console.error('Error fetching user data', error);
        }
      });
    }
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

  onSubmit(): void {
    if (this.addForm.invalid) {
      console.error('Form is invalid', this.addForm.errors);
      return;
    }

    console.log('Form Data:', this.addForm.value);

    this.http.post('http://localhost:3000/api/users/add', this.addForm.value).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
        alert('User added successfully');
        this.addForm.reset();
      },
      error: (err) => {
        console.error('Failed to add user', err);
        alert('Failed to add user');
        console.log(this.addForm.value);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
