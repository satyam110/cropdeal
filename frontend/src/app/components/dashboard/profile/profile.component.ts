import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:string;
  role:string;
  profileForm : FormGroup;
  user={role: "", _id: "", name: "", email: "", phone: null, description: "", bank_details:{bank_name:"",acc_no:null,ifsc_code:""} }
  editable=false;
  loaded=false;
  constructor(private _authService:AuthService, private _route:ActivatedRoute, private router:Router, private fb: FormBuilder, private _profile: ProfileService) { }

  ngOnInit(): void {
      // this.id = this._route.snapshot.paramMap.get('id');
      this.id=localStorage.getItem('currentUser')
      console.log(this.id);

      this.role = localStorage.getItem('role');



      this._authService.getUser(this.id,this.role)
          .subscribe(
            res => {
              this.user=res,
              setInterval(() => {
                this.loaded=true
              },800);
              this.profileForm = this.fb.group({
                name:res.name,
                email:res.email,
                phone:res.phone,
                description:res.description
              });
              console.log(this.user);
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

  updateProfile(){
    console.log(this.profileForm.value);
    this._profile.updateProfileDetails(this.id,this.role,this.profileForm.value)
        .subscribe(
          res => {
            console.log(res);
            this.editable=false
            this.ngOnInit();
            this.profileForm.reset();
          },
          err => console.log(err)

        )
  }

}
