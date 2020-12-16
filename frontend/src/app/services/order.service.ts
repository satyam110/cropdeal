import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _sellerUrl = "http://localhost:3001/payment/seller"
  private _buyerUrl = "http://localhost:3001/payment/buyer"
  private _orderUrl = "http://localhost:3001/payment"
  constructor(private http:HttpClient) { }

  getInvoices(id:string,role:string){
    if(role === 'farmer'){
      return this.http.get<any>(`${this._sellerUrl}/${id}`);
    } else if( role === 'dealer') {
      return this.http.get<any>(`${this._buyerUrl}/${id}`);
    } else {
      return this.http.get<any>(this._orderUrl);
    }
  }

  getInvoiceById(id:string){
    return this.http.get<any>(`${this._orderUrl}/${id}`)
  }
}
