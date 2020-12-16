import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealersComponent } from './admin-dealers.component';

describe('AdminDealersComponent', () => {
  let component: AdminDealersComponent;
  let fixture: ComponentFixture<AdminDealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDealersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
