import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit {

  invoices=[];
  id:string;
  role:string;
  loaded=false;
  constructor(private _order:OrderService, private _auth:AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    this.role = localStorage.getItem('role');

    this._order.getInvoices(this.id,this.role)
        .subscribe(
          res => {
            this.invoices = res,
            setInterval(() => {
              this.loaded=true
            },500);
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

}
