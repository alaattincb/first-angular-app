import { Component, OnInit } from '@angular/core';
import { Model, TodoItem } from './model';
import { SidebarService } from './sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDisplay = false;
  model = new Model();
  items: any;
  isDarkTheme = false;
  showLayout: boolean = true; 

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showLayout = !this.router.url.includes('/login') && !this.router.url.includes('/admin-page') && !this.router.url.includes('/chat-login') && !this.router.url.includes('/chat');
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); 
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
