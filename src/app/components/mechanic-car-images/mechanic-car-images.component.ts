import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mechanic-car-images',
  templateUrl: './mechanic-car-images.component.html',
  styleUrls: ['./mechanic-car-images.component.scss']
})
export class MechanicCarImagesComponent implements OnInit {

  images: Array<any> = [];
  @Input() car!: Car;

  constructor() { }

  ngOnInit(): void {
    this.images = this.car.mechanicPictures!;
  }

}
