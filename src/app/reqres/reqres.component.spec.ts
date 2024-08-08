import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqresComponent } from './reqres.component';

describe('ReqresComponent', () => {
  let component: ReqresComponent;
  let fixture: ComponentFixture<ReqresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
