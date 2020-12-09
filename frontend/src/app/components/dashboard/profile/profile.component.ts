import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:string;
  role:string;
  user={role: "", _id: "", name: "", email: "", phone: null, description: "", bank_details:{bank_name:"",acc_no:null,ifsc_code:""} }
  constructor(private _authService:AuthService, private _route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.id = this._route.snapshot.paramMap.get('id');
      console.log(this.id);

      this.role = localStorage.getItem('role');
      this._authService.getUser(this.id,this.role)
          .subscribe(
            res => {this.user=res,console.log(this.user);
            },
            err => {
              if(err instanceof HttpErrorResponse){
                if(err.status === 401 || err.status === 403){
                  this._authService.logoutUser();
                  this.router.navigate(['/login'])
                }
              }
            }
          )
  }

}
