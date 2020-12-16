import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  @ViewChild('receipt') receipt : ElementRef;
  invoice = {_id:"",txn_id:"",productName:"",type:"",quantity:null,totalCost:null,seller:"",sellerName:"",
              sellerEmail:"",sellerPhone:"",buyer:"",buyerName:"",buyerEmail:"",buyerPhone:"",createdAt:null}
  invoiceId:string;

  constructor(private _order:OrderService, private _auth:AuthService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.invoiceId = this._route.snapshot.paramMap.get('id');
    this._order.getInvoiceById(this.invoiceId)
        .subscribe(
          res => {
            this.invoice = res;
            console.log(this.invoice);
          },
          err => {
            if (err instanceof HttpErrorResponse){
              if(err.status === 401 || err.status === 403){
                this._auth.logoutUser();
                this._router.navigate(['/login'])
              }
            }
          }
        )
  }

  downloadPDF(){
    const options = {
      filename: 'invoice_'+this.invoice._id+'.pdf',
      image: {type: 'png'},
      enableLinks: true,
      html2canvas: {},
      jsPDF: {orientation:'landscape'}
    };

    const content: Element = document.getElementById('receipt');

    html2pdf().from(content).set(options).save();
  }
}
