import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, PaymentDetails } from '../models/user.model'
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _farmerUrl = 'http://localhost:3000/farmer'
  private _dealerUrl = 'http://localhost:3002/dealer'

  constructor(private http:HttpClient, private router:Router) { }

  updateBankDetails(id,role,data){
    if(role === 'farmer'){
      return this.http.put<User>(`${this._farmerUrl}/${id}`,data);
    } else {
      return this.http.put<User>(`${this._dealerUrl}/${id}`,data);
    }
  }

  updateProfileDetails(id,role,data){
    if(role === 'farmer'){
      return this.http.put<User>(`${this._farmerUrl}/${id}`,data);
    } else {
      return this.http.put<User>(`${this._dealerUrl}/${id}`,data);
    }
  }

  updatePaymentDetails(id,role,data){
    if(role === 'dealer'){
      return this.http.put<PaymentDetails>(`${this._dealerUrl}/${id}`,data);
    }
  }

}
