import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _farmersUrl = 'http://localhost:3000/farmer'
  private _dealersUrl = 'http://localhost:3002/dealer'
  private _cropsUrl = 'http://localhost:3001/admin'
  private _cropDeleteUrl = 'http://localhost:3001/crops'

  constructor(private http:HttpClient, private router:Router) { }

  getFarmers(){
    return this.http.get<any>(this._farmersUrl);
  }

  getDealers(){
    return this.http.get<any>(this._dealersUrl);
  }

  getCrops(){
    return this.http.get<any>(this._cropsUrl);
  }

  approveCrop(id:string){
    const body = {approved:true}
    return this.http.put<any>(`${this._cropsUrl}/${id}`,body)
  }

  deleteCrop(id:string){
    return this.http.delete<any>(`${this._cropDeleteUrl}/${id}`)
  }

  deleteUser(id:string,role:string){
    if(role === 'farmer'){
      return this.http.delete<any>(`${this._farmersUrl}/${id}`)
    }else{
      return this.http.delete<any>(`${this._dealersUrl}/${id}`)
    }
  }
}
