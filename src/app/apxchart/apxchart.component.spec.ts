import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApxchartComponent } from './apxchart.component';

describe('ApxchartComponent', () => {
  let component: ApxchartComponent;
  let fixture: ComponentFixture<ApxchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApxchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApxchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
