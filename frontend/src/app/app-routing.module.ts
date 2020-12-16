import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CropsComponent } from './components/crops/crops.component';
import { HomeComponent } from './components/home/home.component';
import { CropDetailsComponent } from './components/crop-details/crop-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { AddCropComponent } from './components/dashboard/add-crop/add-crop.component';
import { ViewCropComponent } from './components/dashboard/view-crop/view-crop.component';
import { BankDetailsComponent } from './components/dashboard/bank-details/bank-details.component';
import { PaymentDetailsComponent } from './components/dashboard/payment-details/payment-details.component';
import { CropsSubscribedComponent } from './components/dashboard/crops-subscribed/crops-subscribed.component';
import { AdminCropsComponent } from './components/dashboard/admin-crops/admin-crops.component';
import { AdminFarmersComponent } from './components/dashboard/admin-farmers/admin-farmers.component';
import { AdminDealersComponent } from './components/dashboard/admin-dealers/admin-dealers.component';
import { AdminOrdersComponent } from './components/dashboard/admin-orders/admin-orders.component';
import { ViewInvoicesComponent } from './components/dashboard/view-invoices/view-invoices.component';
import { InvoiceDetailsComponent } from './components/dashboard/invoice-details/invoice-details.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {
    path:'crops',
    component:CropsComponent,
    canActivate: [AuthGuard]
  },
  {path:'crops/:id', component:CropDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {
    path:'dashboard/:id',
    component:DashboardComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'addCrop',
        component:AddCropComponent
      },
      {
        path: 'viewCrop',
        component:ViewCropComponent
      },
      {
        path: 'bankDetails',
        component: BankDetailsComponent
      },
      {
        path: 'paymentDetails',
        component: PaymentDetailsComponent
      },
      {
        path: 'subscribedCrops',
        component: CropsSubscribedComponent
      },
      {
        path: 'admin-crop-management',
        component:AdminCropsComponent
      },
      {
        path: 'admin-farmer-management',
        component: AdminFarmersComponent
      },
      {
        path: 'admin-dealer-management',
        component: AdminDealersComponent
      },
      {
        path: 'admin-orders',
        component: AdminOrdersComponent
      },
      {
        path: 'invoices',
        component: ViewInvoicesComponent
      },
      {
        path: 'invoice/:id',
        component: InvoiceDetailsComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
