import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  success=false;
  bank_details = {bank_name:"",acc_no:null,ifsc_code:""}
  bank_form: FormGroup
  bankDetails:FormGroup
  id = localStorage.getItem('currentUser');
  role = localStorage.getItem('role');
  editable = false;
  loaded=false
  constructor(private fb: FormBuilder, private _profile:ProfileService, private _router:Router, private _authService:AuthService) { }
  ngOnInit(): void {


    //getting bank details

    this._authService.getUser(this.id,this.role)
    .subscribe(
      res => {
        this.bank_details=res.bank_details,
        console.log(this.bank_details);
        this.loaded=true
        this.bankDetails=this.fb.group({
          bank_name: this.bank_details.bank_name,
          acc_no: this.bank_details.acc_no,
          ifsc_code:this.bank_details.ifsc_code
        })
        this.bank_form = this.fb.group({
          bank_details:this.bankDetails
        })
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 || err.status === 403){
            this._authService.logoutUser();
            this._router.navigate(['/login'])
          }
        }
      }
    )

  }



  updateBankDetails(){
    console.log(this.bank_form.value);
    this._profile.updateBankDetails(this.id,this.role,this.bank_form.value)
        .subscribe(
          res => {
            console.log(res)
            this.success=true;
            this.editable=false;
            this.ngOnInit();
            this.bank_form.reset();
          },
          err => console.log(err)
        )
  }
}
