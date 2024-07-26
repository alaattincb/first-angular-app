import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
    constructor(
      private authService: AuthService,
      private router: Router
    ){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
