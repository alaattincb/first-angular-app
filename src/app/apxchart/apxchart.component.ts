import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexFill, ApexTitleSubtitle, ApexTooltip, ApexGrid, NgApexchartsModule } from 'ng-apexcharts';
import { NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

@Component({
  selector: 'app-apxchart',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe, NgApexchartsModule],
  templateUrl: './apxchart.component.html',
  styleUrls: ['./apxchart.component.css'],
})
export class ApxChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions!: Partial<ChartOptions>;
  calendar: NgbCalendar;
  formatter: NgbDateParserFormatter;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  private allData = {
    north: [
      { x: '2023-01-01', y: 322 }, { x: '2023-02-01', y: 324 }, { x: '2023-03-01', y: 329 }, { x: '2023-04-01', y: 342 }, { x: '2023-05-01', y: 348 },
      { x: '2023-06-01', y: 334 }, { x: '2023-07-01', y: 325 }, { x: '2023-08-01', y: 316 }, { x: '2023-09-01', y: 318 }, { x: '2023-10-01', y: 330 },
      { x: '2023-11-01', y: 355 }, { x: '2023-12-01', y: 366 }, { x: '2024-01-01', y: 337 }, { x: '2024-02-01', y: 352 }, { x: '2024-03-01', y: 377 },
      { x: '2024-04-01', y: 383 }, { x: '2024-05-01', y: 344 }, { x: '2024-06-01', y: 366 }, { x: '2024-07-01', y: 389 }, { x: '2024-08-01', y: 334 }
    ],
  };

  constructor(calendar: NgbCalendar, formatter: NgbDateParserFormatter) {
    this.calendar = calendar;
    this.formatter = formatter;
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    const filteredData = this.filterDataByDateRange(this.allData.north);
    this.chartOptions = {
      series: [
        { name: "north", data: filteredData },
      ],
      chart: {
        type: "area",
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Area with Negative Values",
        align: "left",
        style: {
          fontSize: "14px"
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 4,
        floating: false,
        labels: {
          style: {
            'colors': "#8e8da4"
          },
          offsetY: -7,
          offsetX: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      fill: {
        opacity: 0.5
      },
      tooltip: {
        x: {
          format: "yyyy-MM-dd"
        },
        fixed: {
          enabled: false,
          position: "topRight"
        }
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    };
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(`Selected fromDate: ${this.fromDate ? this.formatter.format(this.fromDate) : 'None'}`);
    console.log(`Selected toDate: ${this.toDate ? this.formatter.format(this.toDate) : 'None'}`);
    this.updateChartData(); 
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  private filterDataByDateRange(data: any[]): any[] {
    const fromDate = this.fromDate ? new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day) : new Date(0);
    const toDate = this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day) : new Date();

    return data.filter(item => {
      const itemDate = new Date(item.x);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }
}
