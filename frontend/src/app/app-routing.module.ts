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
      // {
      //   path:'profile/:id',
      //   component:ProfileComponent
      // },
      {
        path:'addCrop',
        component:AddCropComponent
      },
      {
        path: 'crop/:id',
        component:ViewCropComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
