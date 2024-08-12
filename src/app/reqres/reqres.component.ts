import { Component, OnInit } from '@angular/core';
import { ReqresService } from '../reqres.service';
import { UserResponse } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reqres',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reqres.component.html',
  styleUrls: ['./reqres.component.css']
})
export class ReqresComponent implements OnInit {
  users: any[] = [];
  pages: number[] = [];
  unknown: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(private reqresService: ReqresService) {}

  ngOnInit(): void {
    this.loadData(this.currentPage);
  }

  loadData(page: number): void {
    this.reqresService.getUsers(page).subscribe(response => {
      this.users = response.data;
      this.totalPages = response.total_pages; 
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
    this.reqresService.getUnknown().subscribe((response) => {
      this.unknown = response.data;
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData(page);
    }
  }
}
