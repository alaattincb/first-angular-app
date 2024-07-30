import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmirComponent } from './emir.component';

describe('EmirComponent', () => {
  let component: EmirComponent;
  let fixture: ComponentFixture<EmirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
