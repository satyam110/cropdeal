import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CropDetailsComponent } from './crop-details.component';
import { FormBuilder } from '@angular/forms';
import { StripeService } from 'ngx-stripe';

describe('CropDetailsComponent', () => {
  let component: CropDetailsComponent;
  let fixture: ComponentFixture<CropDetailsComponent>;

  beforeEach(async () => {
    let httpClient:HttpClient;
    let httpTestingController:HttpTestingController;
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CropDetailsComponent ],
      providers:[FormBuilder,StripeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
