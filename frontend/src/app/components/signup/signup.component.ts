import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserData = {name:"",email:"",phone:"",password:"",description:"",type:"default"};
  typeHasError=true;
  errorMsg:string
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['/login'])
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if(err.status === 401 || err.status === 403){
            this.errorMsg="Server error"
            this.registerUserData= {name:"",email:"",phone:"",password:"",description:"",type:"default"};
          } else if(err.status === 422){
            this.errorMsg=err.error.message;
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
