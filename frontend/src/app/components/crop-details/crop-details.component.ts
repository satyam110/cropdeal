import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropsService } from 'src/app/services/crops.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Crop } from 'src/app/models/crop.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css'],
})
export class CropDetailsComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  id: string;
  crop: Crop;
  loaded = false;
  buy = false;
  pay = false;
  stripeData: Order;
  showSuccess = false;
  showFailure = false;
  failMsg: string;
  currentRole = localStorage.getItem('role');
  currentUserId = localStorage.getItem('currentUser');
  currentUser: any;
  buyerName: string;
  buyerPhone: any;

  cost: number;
  txnId: string;

  // setting stripe element options
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private cropService: CropsService,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    // getting crop details
    this.id = this.route.snapshot.paramMap.get('id');

    this.cropService.getCropById(this.id).subscribe(
      (res) => {
        (this.crop = res), (this.loaded = true);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.authService.logoutUser();
            this.router.navigate(['/login']);
          }
        }
      }
    );

    // Stripe Payment Gateway Form
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      amount: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });

    // getting buyer details
    this.authService.getUser(this.currentUserId, this.currentRole).subscribe(
      (res) => (this.currentUser = res),
      (err) => console.log(err)
    );
  }

  back(): void {
    this.location.back();
  }

  setCost(cost): void {
    this.cost = cost;
    console.log('cost ' + cost);
  }

  calculate(quantity): void {
    console.log(quantity);
    this.stripeTest.get('amount').setValue(this.cost * quantity);
  }
  // stripe payment token method
  createToken(): void {
    const name = this.stripeTest.get('name').value;
    const addressCity = 'Mumbai';
    const addressCountry = 'India';
    const addressLine1 = 'ABC Street';
    const addressState = 'Maharashtra';
    this.stripeData = this.stripeTest.value;
    this.stripeData.seller = this.crop.uploader;
    this.stripeData.sellerName = this.crop.farmerName;
    this.stripeData.sellerPhone = this.crop.farmerPhone;
    this.stripeData.sellerEmail = this.crop.farmerEmail;
    this.stripeData.buyer = this.currentUserId;
    this.stripeData.buyerName = this.currentUser.name;
    this.stripeData.buyerPhone = this.currentUser.phone;
    this.stripeData.buyerEmail = this.currentUser.email;
    this.stripeData.productName = this.crop.name;
    this.stripeData.type = this.crop.type;
    console.log(this.stripeData);

    this.stripeService
      .createToken(this.card.element, {
        name,
        address_city: addressCity,
        address_country: addressCountry,
        address_line1: addressLine1,
        address_state: addressState,
      })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.stripeData.token = result.token;
          this.cropService.stripePayment(this.stripeData).subscribe((res) => {
            if (res.success) {
              // alert('Payment Successful, Txn ID: '+res.details.balance_transaction);
              this.txnId = res.details.balance_transaction;
              this.stripeTest.reset();
              this.showSuccess = true;
              console.log(res);
            } else {
              this.showFailure = true;
              console.log(res);
            }
          });
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.failMsg = result.error.message;
        }
      });
  }
}
