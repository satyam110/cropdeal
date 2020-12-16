import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CropsComponent } from './components/crops/crops.component';
import { HomeComponent } from './components/home/home.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SkeletonLoaderModule } from './skeleton-loader/skeleton-loader.module';
import { CropsSubscribedComponent } from './components/dashboard/crops-subscribed/crops-subscribed.component';
import { PaymentDetailsComponent } from './components/dashboard/payment-details/payment-details.component';
import { AdminFarmersComponent } from './components/dashboard/admin-farmers/admin-farmers.component';
import { AdminDealersComponent } from './components/dashboard/admin-dealers/admin-dealers.component';
import { AdminCropsComponent } from './components/dashboard/admin-crops/admin-crops.component';
import { AdminService } from './services/admin.service';
import { NgxStripeModule } from 'ngx-stripe';
import { ViewInvoicesComponent } from './components/dashboard/view-invoices/view-invoices.component';
import { AdminOrdersComponent } from './components/dashboard/admin-orders/admin-orders.component';
import { OrderService } from './services/order.service';
import { InvoiceDetailsComponent } from './components/dashboard/invoice-details/invoice-details.component';


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
    BankDetailsComponent,
    CropsSubscribedComponent,
    PaymentDetailsComponent,
    AdminFarmersComponent,
    AdminDealersComponent,
    AdminCropsComponent,
    ViewInvoicesComponent,
    AdminOrdersComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SkeletonLoaderModule,
    NgxStripeModule.forRoot('pk_test_51Hxrh3ADSPBvTAXQcHpAD2Tfw7SSEExcOXeM9GIa0xthMQUZrwOx6UuOkmk1r6lTrrw2iGMTPMDKDV4It4OR6JsC003Qfo3V1A')
  ],
  providers: [AuthService,CropsService,AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, ProfileService, AdminService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
