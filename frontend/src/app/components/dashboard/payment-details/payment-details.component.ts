import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  success=false;
  payment_details = {card_type:"",card_number:null,expiry:"",cvv:null}
  cardTypes = ['Credit Card','Debit Card'];
  payment_form: FormGroup
  paymentDetails:FormGroup
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
        this.payment_details=res.payment_details,
        console.log(this.payment_details);
        this.loaded=true
        this.paymentDetails=this.fb.group({
          card_type: this.payment_details.card_type,
          card_number: this.payment_details.card_number,
          expiry:this.payment_details.expiry,
          cvv:this.payment_details.cvv
        })
        this.payment_form = this.fb.group({
          payment_details:this.paymentDetails
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



  updatePaymentDetails(){
    console.log(this.payment_form.value);
    this._profile.updatePaymentDetails(this.id,this.role,this.payment_form.value)
        .subscribe(
          res => {
            console.log(res)
            this.success=true;
            this.editable=false;
            this.ngOnInit();
            this.payment_form.reset();
          },
          err => console.log(err)
        )
  }

}
