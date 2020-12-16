import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCropsComponent } from './admin-crops.component';

describe('AdminCropsComponent', () => {
  let component: AdminCropsComponent;
  let fixture: ComponentFixture<AdminCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
