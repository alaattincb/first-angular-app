import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarState$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
}
