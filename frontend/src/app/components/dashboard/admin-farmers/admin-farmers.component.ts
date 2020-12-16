import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-admin-farmers',
  templateUrl: './admin-farmers.component.html',
  styleUrls: ['./admin-farmers.component.css']
})
export class AdminFarmersComponent implements OnInit {

  farmers=[];
  loaded=false;
  editable=false;
  updated=false;
  deleted=false;
  farmerId:string;
  profileForm : FormGroup;
  id:string;
  role:string;
  constructor(private _adminService:AdminService, private fb: FormBuilder, private _authService:AuthService, private _profile:ProfileService, private _router:Router ) { }

  ngOnInit(): void {
    //getting all farmer profiles
    this._adminService.getFarmers()
        .subscribe(
          res => {
            this.farmers = res.filter(r=> r.role !=='admin'),
            setInterval(() => {
              this.loaded=true
            },400);
          },
          err => {
            if (err instanceof HttpErrorResponse){
              if(err.status === 401 || err.status === 403){
                this._authService.logoutUser();
                this._router.navigate(['/login'])
              }
            }
          }
        )
  }

   //getting specific farmer profile

   getDetails(id,role){
    this.id = id;
    this.role = role;
    this._authService.getUser(id,role)
    .subscribe(
      res => {
        this.profileForm = this.fb.group({
          name:res.name,
          email:res.email,
          phone:res.phone,
          description:res.description
        });
      },
      err => {
        console.log(err);
      }
    )
   }

   updateProfile(){
    //console.log(this.profileForm.value);
    this._profile.updateProfileDetails(this.id,this.role,this.profileForm.value)
        .subscribe(
          res => {
            console.log(res);
            this.editable=false;
            this.updated=true;
            this.ngOnInit();
            this.profileForm.reset();
          },
          err => console.log(err)
        )
   }

   deleteProfile(id,role){
     this._adminService.deleteUser(id,role)
         .subscribe(
           res => {
             console.log(res);
             this.deleted=true;
             this.ngOnInit();
           },
           err => console.log(err)
         )
   }
}
