import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from '../../services/crops.service';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  crops=[]
  loaded=false
  constructor(private _authService:AuthService,private _cropsService:CropsService, private _router: Router, private location:Location) { }

  ngOnInit(): void {
    this._cropsService.getCrops()
        .subscribe(
          res => {  this.crops=res,
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
  }

  back(){
    this.location.back();
  }
}
