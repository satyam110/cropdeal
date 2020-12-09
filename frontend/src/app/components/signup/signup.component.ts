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
      err => console.log(err)
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
