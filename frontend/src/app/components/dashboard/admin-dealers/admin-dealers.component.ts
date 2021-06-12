import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-admin-dealers',
  templateUrl: './admin-dealers.component.html',
  styleUrls: ['./admin-dealers.component.css'],
})
export class AdminDealersComponent implements OnInit {
  dealers = [];
  loaded = false;
  editable = false;
  updated = false;
  deleted = false;
  dealerId: string;
  id: string;
  role: string;
  profileForm: FormGroup;
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    // getting all dealer profiles
    this.adminService.getDealers().subscribe(
      (res) => {
        (this.dealers = res.filter((r) => r.role !== 'admin')),
          setInterval(() => {
            this.loaded = true;
          }, 400);
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
  }

  // getting specific farmer profile

  getDetails(id, role): void {
    this.id = id;
    this.role = role;
    this.authService.getUser(id, role).subscribe(
      (res) => {
        this.profileForm = this.fb.group({
          name: res.name,
          email: res.email,
          phone: res.phone,
          description: res.description,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateProfile(): void {
    // console.log(JSON.stringify(this.profileForm.value)+", "+this.id+", "+this.role);
    this.profile
      .updateProfileDetails(this.id, this.role, this.profileForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.editable = false;
          this.updated = true;
          this.ngOnInit();
          this.profileForm.reset();
        },
        (err) => console.log(err)
      );
  }

  deleteProfile(id, role): void {
    this.adminService.deleteUser(id, role).subscribe(
      (res) => {
        console.log(res);
        this.deleted = true;
        this.ngOnInit();
      },
      (err) => console.log(err)
    );
  }
}
