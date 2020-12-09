import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements OnInit {
  id:string;
  crop={name:"",type:"",quantity:"",location:"",farmerName:"",farmerPhone: null , description: ""};

  constructor(private route:ActivatedRoute, private cropService:CropsService, private router:Router, private _authService:AuthService, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.cropService.getCropById(this.id)
        .subscribe(
          res => this.crop=res,
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

  back(){
    this.location.back();
  }

}
