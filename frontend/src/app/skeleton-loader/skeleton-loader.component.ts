import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  template: `
    <div [ngStyle]="getMyStyles()" class="skelt-load loader"></div>
  `,
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent implements OnInit {

  @Input() Cwidth;
  @Input() Cheight;
  @Input() circle: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  getMyStyles(){
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.circle ? '50%' : ''
    }
    return myStyles;
  }
}
