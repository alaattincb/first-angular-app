import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../item.service';
import { HttpClientModule } from '@angular/common/http';
 

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.css'
})
export class AuditLogsComponent implements OnInit {
  auditLogs: any[] = [];
  
  constructor(private itemService: ItemService){ }

  async ngOnInit(): Promise<void> {
    this.auditLogs = await this.itemService.getAuditLogs();
  }

}
