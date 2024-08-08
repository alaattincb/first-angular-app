import { Component, OnInit } from '@angular/core';
import { ReqresService } from '../reqres.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-reqres',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reqres.component.html',
  styleUrl: './reqres.component.css'
})
export class ReqresComponent implements OnInit{
  users: any[] = [];
  unknown: any[] = [];

  constructor(private reqresService: ReqresService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.reqresService.getUsers().subscribe((response) => {
      this.users = response.data;
    });

    this.reqresService.getUnknown().subscribe((response) => {
      this.unknown = response.data;
    });
  }
}

