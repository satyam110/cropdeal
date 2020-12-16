import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-crops-subscribed',
  templateUrl: './crops-subscribed.component.html',
  styleUrls: ['./crops-subscribed.component.css']
})
export class CropsSubscribedComponent implements OnInit {

  crops=[];
  id=localStorage.getItem('currentUser');
  loaded = false;
  names=[];
  constructor(private _cropService:CropsService, private _authService:AuthService, private _router:Router) { }

  ngOnInit(): void {

    this._cropService.getSubscribedCrops(this.id)
        .subscribe(
          res => {
            this.crops = res,
            setInterval(() => {
              this.loaded=true
            },500);
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

      this._cropService.getCropNames()
          .subscribe(
            res=> {
              this.names = res;
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

  subscribeCrop(name){
    console.log(name);
    this._cropService.subscribeCrop(this.id,name)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
          },
          err => {
            console.log(err);
          }
        )
  }

}
