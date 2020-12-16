import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-view-crop',
  templateUrl: './view-crop.component.html',
  styleUrls: ['./view-crop.component.css']
})
export class ViewCropComponent implements OnInit {

  crops=[];
  id=localStorage.getItem('currentUser');
  cropId:string;
  loaded=false;
  editable=false;
  success=false;
  deleted=false;
  cropForm:FormGroup;
  constructor(private _cropService:CropsService,private _authService:AuthService, private _router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this._cropService.getCropByFarmer(this.id)
        .subscribe(
          res => {
            this.crops = res,
            setInterval(() => {
              this.loaded=true
            },800);
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

  loadCropDetails(id:string){
    console.log(id);
    this.cropId=id;
    this._cropService.getCropById(id)
        .subscribe(
          res => {
            this.cropForm = this.fb.group({
              name:[res.name, Validators.required],
              type:[res.type, Validators.required],
              quantity:[res.quantity, Validators.required],
              location:[res.location, Validators.required],
              cost:[res.cost, Validators.required],
            })
          },
          err => {
            console.log(err);
          }
        )
  }

  updateCrop(){
    //console.log(this.cropForm);
    this._cropService.updateCrop(this.cropId,this.cropForm.value)
      .subscribe(
      res => {
        console.log(res);
        this.success=true;
        this.editable=false;
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteCrop(id:string){
    //console.log(id);

    this._cropService.deleteCrop(id)
        .subscribe(
          res => {
            console.log(res);
            this.deleted=true;
            this.ngOnInit();
          },
          err => {
            console.log(err);

          }
        )
  }

}
