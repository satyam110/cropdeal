import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-admin-crops',
  templateUrl: './admin-crops.component.html',
  styleUrls: ['./admin-crops.component.css']
})
export class AdminCropsComponent implements OnInit {

  crops=[];
  approvedCrops=[];
  loaded=false;
  approved=false;
  deleted=false;
  cropId:string;
  constructor(private _adminService:AdminService, private _authService:AuthService, private _router:Router, private _cropService: CropsService) { }

  ngOnInit(): void {
    this._adminService.getCrops()
        .subscribe(
          res=>{
            this.crops = res,
            setInterval(()=>{
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

    this._cropService.getCrops()
        .subscribe(
          res=>{
            this.approvedCrops = res,
            setInterval(()=>{
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

  approveCrop(id:string){
   this._adminService.approveCrop(id)
       .subscribe(
         res => {
           console.log(res),
           this.approved=true,
           this.ngOnInit()
          },
          err =>{
            console.log(err);
          }
       )
  }

  deleteCrop(id:string){
    this._adminService.deleteCrop(id)
        .subscribe(
          res => {
            console.log(res),
            this.deleted=true,
            this.ngOnInit()
          },
          err => {
            console.log(err)
          }
        )
  }

}
