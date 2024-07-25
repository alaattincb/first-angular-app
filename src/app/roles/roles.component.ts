import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'roles',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  roles: any[] = [];

  constructor(private itemService: ItemService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.roles = await this.itemService.getRoles();
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  }

}
