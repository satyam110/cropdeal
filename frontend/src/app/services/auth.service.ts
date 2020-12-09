import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _farmerRegUrl = 'http://localhost:3000/farmer/signup'
  private _dealerRegUrl = 'http://localhost:3002/dealer/signup'
  private _farmerLoginUrl = 'http://localhost:3000/farmer/login'
  private _dealerLoginUrl = 'http://localhost:3002/dealer/login'
  private _farmerProfileUrl = 'http://localhost:3000/farmer/profile/'
  private _dealerProfileUrl = 'http://localhost:3002/dealer/profile/'

  constructor(private http:HttpClient, private router:Router) { }

  registerUser(user){
    if(user.type === 'farmer'){
      return this.http.post<any>(this._farmerRegUrl,user)
    } else {
      return this.http.post<any>(this._dealerRegUrl,user)
    }

  }

  loginUser(user){
    if(user.type === 'farmer' ){
      return this.http.post<any>(this._farmerLoginUrl, user)
    } else {
      return this.http.post<any>(this._dealerLoginUrl, user)
    }

  }

  getUser(id,role){
    if(role === 'farmer' || role ==='admin'){
      return this.http.get<any>(this._farmerProfileUrl+id);
    } else if (role === 'dealer' || role === 'admin') {
      return this.http.get<any>(this._dealerProfileUrl+id);
    }

  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.clear()
    this.router.navigate(['/home'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getCurrentUser(){
    return localStorage.getItem('currentUser')
  }
}
