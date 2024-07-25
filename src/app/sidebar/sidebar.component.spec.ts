import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: sidebarComponent;
  let fixture: ComponentFixture<sidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
