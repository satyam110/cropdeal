import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id:string;
  role:string;
  email:string;
  constructor(private _authService:AuthService, private _route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
      this.id = this._route.snapshot.paramMap.get('id');
      this.role = localStorage.getItem('role');
      this.email = localStorage.getItem('email');
  }

}
