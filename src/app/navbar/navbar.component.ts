import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { ThemeService } from '../ThemeService';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDarkTheme = false;

  constructor(private sidebarService: SidebarService, private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isDarkTheme = checkbox.checked;
    this.themeService.toggleTheme(this.isDarkTheme);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
