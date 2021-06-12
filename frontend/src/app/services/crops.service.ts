import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crop } from '../models/crop.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CropsService {
  private cropsUrl = 'http://localhost:3001/crops';
  private farmerCropsUrl = 'http://localhost:3001/crops/farmer';
  private subscribedCropsUrl = 'http://localhost:3002/dealer/subscribe';
  private cropNameUrl = 'http://localhost:3001/crops/dealer/names';
  private paymentUrl = 'http://localhost:3001/payment';
  constructor(private http: HttpClient) {}

  getCrops(): Observable<any> {
    return this.http.get<any>(this.cropsUrl);
  }

  postCrop(crop: any, image: File): Observable<any> {
    const { name, type, quantity, location, cost, uploader } = crop;
    const cropData = new FormData();
    cropData.append('name', name);
    cropData.append('type', type);
    cropData.append('quantity', quantity);
    cropData.append('location', location);
    cropData.append('cost', cost);
    cropData.append('uploader', uploader);
    cropData.append('image', image);
    return this.http.post<any>(this.cropsUrl, cropData);
  }

  getCropById(id: string): Observable<any> {
    return this.http.get<any>(`${this.cropsUrl}/${id}`);
  }

  getCropByFarmer(id: string): Observable<any> {
    return this.http.get<any>(`${this.farmerCropsUrl}/${id}`);
  }

  getSubscribedCrops(id: string): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.subscribedCropsUrl}/${id}`);
  }

  subscribeCrop(id: string, name): Observable<User> {
    const body = { crop: name };
    return this.http.put<User>(`${this.subscribedCropsUrl}/${id}`, body);
  }

  updateCrop(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.cropsUrl}/${id}`, data);
  }

  deleteCrop(id: string): Observable<any> {
    return this.http.delete<any>(`${this.cropsUrl}/${id}`);
  }

  stripePayment(stripeData): Observable<any> {
    return this.http.post<any>(`${this.paymentUrl}`, stripeData);
  }

  getCropNames(): Observable<any> {
    return this.http.get<any>(this.cropNameUrl);
  }
}
