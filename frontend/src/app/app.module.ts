import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CropsComponent } from './components/crops/crops.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CropsService } from './services/crops.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CropDetailsComponent } from './components/crop-details/crop-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { AddCropComponent } from './components/dashboard/add-crop/add-crop.component';
import { ViewCropComponent } from './components/dashboard/view-crop/view-crop.component';
import { BankDetailsComponent } from './components/dashboard/bank-details/bank-details.component';
import { ProfileService } from './services/profile.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CropsComponent,
    HomeComponent,
    CropDetailsComponent,
    DashboardComponent,
    ProfileComponent,
    AddCropComponent,
    ViewCropComponent,
    BankDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,CropsService,AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
