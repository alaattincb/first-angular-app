import { Component } from '@angular/core';
import { Model, TodoItem } from './model';
import { SidebarService } from './sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisplay = false;
  model = new Model();
  items: any;
  isDarkTheme = false;
  modalService: any;
  
  constructor(public sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
