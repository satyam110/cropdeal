import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  private _cropsUrl = "http://localhost:3001/crops"
  private _farmerCropsUrl = "http://localhost:3001/crops/farmer"
  private _subscribedCropsUrl = "http://localhost:3002/dealer/subscribe"
  private _cropNameUrl = "http://localhost:3001/crops/dealer/names"
  private _paymentUrl = "http://localhost:3001/payment"
  constructor(private http:HttpClient) { }

  getCrops() {
    return this.http.get<any>(this._cropsUrl);
  }

  postCrop(crop:any, image:File){
    const {name,type,quantity,location,cost,uploader} = crop
    const cropData = new FormData();
    cropData.append("name",name);
    cropData.append("type",type);
    cropData.append("quantity",quantity);
    cropData.append("location",location);
    cropData.append("cost",cost);
    cropData.append("uploader",uploader);
    cropData.append("image",image);
    return this.http.post<any>(this._cropsUrl,cropData);
  }

  getCropById(id:string){
    return this.http.get<any>(`${this._cropsUrl}/${id}`);
  }

  getCropByFarmer(id:string){
    return this.http.get<any>(`${this._farmerCropsUrl}/${id}`);
  }

  getSubscribedCrops(id:string){
    return this.http.get<any>(`${this._subscribedCropsUrl}/${id}`);
  }

  subscribeCrop(id:string,name){
    const body = {crop:name}
    return this.http.put<any>(`${this._subscribedCropsUrl}/${id}`,body)
  }

  updateCrop(id:string,data:any){
    return this.http.put<any>(`${this._cropsUrl}/${id}`,data);
  }

  deleteCrop(id:string){
    return this.http.delete<any>(`${this._cropsUrl}/${id}`)
  }

  stripePayment(stripeData){
    return this.http.post<any>(`${this._paymentUrl}`,stripeData)
  }

  getCropNames(){
    return this.http.get<any>(this._cropNameUrl);
  }
}
