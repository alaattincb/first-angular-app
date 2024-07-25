import { Component, OnInit } from '@angular/core';
import { Model, TodoItem } from './model';
import { SidebarService } from './sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showLayout = !this.router.url.includes('/login'); 
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); 
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
