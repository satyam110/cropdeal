import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css']
})
export class AddCropComponent implements OnInit {

  cropData = {name:"",type:"default",quantity:null,location:"",cost:"",uploader:localStorage.getItem('currentUser')};
  typeHasError=true;

  constructor(private _crop:CropsService,private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  addCrop(){
    this._crop.postCrop(this.cropData)
        .subscribe(
          res=>{
            console.log(res)
            this._router.navigate(['/crops'])
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
