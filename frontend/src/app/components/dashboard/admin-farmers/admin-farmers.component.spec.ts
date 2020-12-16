import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmersComponent } from './admin-farmers.component';
import { AdminService } from '../../../services/admin.service';
describe('AdminFarmersComponent', () => {
  let component: AdminFarmersComponent;
  let fixture: ComponentFixture<AdminFarmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFarmersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFarmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
