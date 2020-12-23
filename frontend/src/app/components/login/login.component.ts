import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginUserData = {type:"default",email:"",password:""}
  errorMsg="";
  typeHasError=true;
  clicked=false
  constructor(private auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.loginUser(this.loginUserData)
        .subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token',res.token)
            localStorage.setItem('currentUser',res.id)
            localStorage.setItem('role',res.role)
            localStorage.setItem('email',res.email)
            this._router.navigate([`/dashboard/profile`])
          },
          err => {
            if (err instanceof HttpErrorResponse){
              if(err.status === 401 || err.status === 403){
                this.errorMsg="Login Failed"
                this.loginUserData={type:"default",email:"",password:""}
              }
            }
          }
        )
  }

  validateType(value : string){
    if(value==="default"){
      this.typeHasError=true;
    }else{
      this.typeHasError=false;
    }
   }
}
