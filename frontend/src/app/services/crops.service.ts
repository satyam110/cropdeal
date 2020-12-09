import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  private _cropsUrl = "http://localhost:3001/crops"
  private _farmerCropsUrl = "http://localhost:3001/crops/farmer"
  constructor(private http:HttpClient) { }

  getCrops() {
    return this.http.get<any>(this._cropsUrl);
  }

  postCrop(crop:any){
    return this.http.post<any>(this._cropsUrl,crop);
  }

  getCropById(id:string){
    return this.http.get<any>(`${this._cropsUrl}/${id}`);
  }

  getCropByFarmer(id:string){
    return this.http.get<any>(`${this._farmerCropsUrl}/${id}`);
  }
}
