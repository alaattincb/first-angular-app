import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexFill,
  ApexYAxis,
  NgApexchartsModule,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import reactive forms
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';
import { AuthInterceptor } from '../auth.interceptor';
import { UserRoleService } from '../user-role.service';
import { EmirComponent } from "../emir/emir.component";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  fill: ApexFill;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, EmirComponent], 
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminPageComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  roles: any[] = [];
  addForm: FormGroup; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private itemService: ItemService,
    private userroleService: UserRoleService

  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Series A',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'Series B',
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: 'Series C',
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: 'Series D',
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      legend: {
        position: 'top'
      },
      fill: {
        opacity: 1
      },
      yaxis: {
        title: {
          text: 'Values'
        }
      }
    };

    this.addForm = this.fb.group({
      email: [''],
      password: [''],
      first_name: [''],
      last_name: [''],
      phone_number: [''],
      roles: [[]]
    });
  }

  token: string | null = '';
  async ngOnInit(): Promise<void> {
    try {
      this.roles = await this.userroleService.getRoles();
    } catch (error) {
      console.error('Error fetching roles', error);
    }
    this.token = this.authService.getToken();
  }

  loadRoles(): void {
    this.http.get<any[]>('http://localhost:3000/api/roles').subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Loaded roles:', this.roles);
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }
  onSubmit(): void {
    if (this.addForm.invalid) {
      console.error('Form is invalid', this.addForm.errors);
      return;
    }
  
    console.log('Form Data:', this.addForm.value);
  
    this.http.post('http://localhost:3000/api/users/add', this.addForm.value).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
        alert('User added successfully');
        this.addForm.reset();
      },
      error: (err) => {
        console.error('Failed to add user', err);
        alert('Failed to add user');
        console.log(this.addForm.value);
      }
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
