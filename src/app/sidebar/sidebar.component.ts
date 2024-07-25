// src/app/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../ThemeService';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isVisible: Observable<boolean>;
  isDarkTheme: boolean = false;

  constructor(private sidebarService: SidebarService, private themeService: ThemeService) {
    this.isVisible = this.sidebarService.isVisible$;
  }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });

    // Başlangıçta sidebar'ın kapalı olduğunu kontrol et
    this.sidebarService.isVisible$.subscribe(isVisible => {
      if (isVisible === undefined) {
        this.sidebarService.toggleSidebar(); // Sidebar'ı kapalı yap
      }
    });
  }
}
