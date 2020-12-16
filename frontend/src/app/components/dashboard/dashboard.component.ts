import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id:string;
  role:string;
  email:string;
  // showProfile = false;
  // showAddCrop = false;
  // showViewCrop = false;
  // showBankDetails = false;
  // showSubCrop = false;
  // showPayment = false;
  // showFarmerMgt = false;
  // showDealerMgt = false;
  // showCropMgt = false;
  // showInvoices = false;
  // showAdminOrders = false;
  constructor(private _authService:AuthService, private _route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.id = this._route.snapshot.paramMap.get('id');
      this.role = localStorage.getItem('role');
      this.email = localStorage.getItem('email');
      // this._authService.getUser(this.id,this.role)
      //     .subscribe(
      //       res => this.user=res,
      //       err => {
      //         if(err instanceof HttpErrorResponse){
      //           if(err.status === 401 || err.status === 403){
      //             this._authService.logoutUser();
      //             this.router.navigate(['/login'])
      //           }
      //         }
      //       }
      //     )
  }

  // setProfileView(){
  //   this.showProfile=true;
  //   this.showAddCrop=false;
  //   this.showViewCrop=false;
  //   this.showBankDetails=false;
  //   this.showSubCrop = false;
  //   this.showPayment = false;
  //   this.showFarmerMgt = false;
  //   this.showDealerMgt = false;
  //   this.showCropMgt = false;
  //   this.showInvoices = false;
  //   this.showAdminOrders =false;
  // }

  // setAddCropView(){
  //   this.showAddCrop=true;
  //   this.showProfile=false;
  //   this.showViewCrop=false;
  //   this.showBankDetails=false;
  //   this.showInvoices = false;
  // }

  // setViewCropView(){
  //   this.showViewCrop=true;
  //   this.showAddCrop=false;
  //   this.showProfile=false;
  //   this.showBankDetails=false;
  //   this.showInvoices = false;
  // }

  // setBankDetailsView(){
  //   this.showBankDetails=true;
  //   this.showViewCrop=false;
  //   this.showAddCrop=false;
  //   this.showProfile=false;
  //   this.showSubCrop = false;
  //   this.showPayment = false;
  //   this.showInvoices = false;
  // }

  // setSubCropView(){
  //   this.showSubCrop=true;
  //   this.showProfile=false;
  //   this.showPayment=false;
  //   this.showBankDetails=false;
  //   this.showInvoices = false;
  // }

  // setPayView(){
  //   this.showPayment=true;
  //   this.showProfile=false;
  //   this.showBankDetails=false;
  //   this.showSubCrop=false;
  //   this.showInvoices = false;
  // }

  // setFarmerView(){
  //   this.showFarmerMgt=true;
  //   this.showProfile=false;
  //   this.showDealerMgt=false;
  //   this.showCropMgt=false;
  //   this.showAdminOrders=false
  // }

  // setDealerView(){
  //   this.showDealerMgt=true;
  //   this.showProfile=false;
  //   this.showFarmerMgt=false;
  //   this.showCropMgt=false;
  //   this.showAdminOrders=false;
  // }

  // setCropMgtView(){
  //   this.showCropMgt=true;
  //   this.showProfile=false;
  //   this.showDealerMgt=false;
  //   this.showFarmerMgt=false;
  //   this.showAdminOrders=false;
  // }

  // setAdminOrdersView(){
  //   this.showAdminOrders=true;
  //   this.showCropMgt=false;
  //   this.showProfile=false;
  //   this.showDealerMgt=false;
  //   this.showFarmerMgt=false;
  // }
  // setInvoicesView(){
  //   this.showInvoices = true;
  //   this.showBankDetails=false;
  //   this.showViewCrop=false;
  //   this.showAddCrop=false;
  //   this.showProfile=false;
  //   this.showSubCrop = false;
  //   this.showPayment = false;
  // }
}
