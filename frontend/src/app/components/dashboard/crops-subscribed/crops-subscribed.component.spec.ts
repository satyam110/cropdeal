import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropsSubscribedComponent } from './crops-subscribed.component';

describe('CropsSubscribedComponent', () => {
  let component: CropsSubscribedComponent;
  let fixture: ComponentFixture<CropsSubscribedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropsSubscribedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropsSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
