import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-login.component.html',
  styleUrl: './chat-login.component.css'
})
export class ChatLoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  rememberMe: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        const { rememberMe } = this.loginForm.value;
        this.authService.setUserToken(response.data.token, response.data.user._id, rememberMe);
        this.authService.setUserInfo(response.data.user.first_name);
        this.router.navigate(['/chat']); 
      },
      error: (err) => {
        console.error('Login failed', err); 
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/chat-login']); 
      },
      error: (err) => {
        console.error('Registration failed', err); 
      }
    });
  }
}