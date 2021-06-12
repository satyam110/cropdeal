import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css'],
})
export class AddCropComponent implements OnInit {
  typeHasError = true;
  success = false;
  cropForm: FormGroup;
  url: string;
  constructor(
    private crop: CropsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      name: ['', Validators.required],
      type: ['default', Validators.required],
      imgUrl: [null, Validators.required],
      quantity: [null, Validators.required],
      location: ['', Validators.required],
      cost: ['', Validators.required],
      uploader: localStorage.getItem('currentUser'),
    });
  }

  addCrop(): void {
    this.crop
      .postCrop(this.cropForm.value, this.cropForm.value.imgUrl)
      .subscribe(
        (res) => {
          console.log(res);
          this.cropForm.reset();
          this.success = true;
          this.url = '';
          this.ngOnInit();
        },
        (err) => console.log(err)
      );
  }

  validateType(value: string): void {
    if (value === 'default') {
      this.typeHasError = true;
    } else {
      this.typeHasError = false;
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.cropForm.patchValue({ imgUrl: file });
    this.cropForm.get('imgUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
