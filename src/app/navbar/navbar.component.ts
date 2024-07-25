import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDarkTheme = false;

  toggleTheme(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isDarkTheme = checkbox.checked;
  }
}
