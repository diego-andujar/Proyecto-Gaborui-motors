import { CarsService } from 'src/app/services/cars.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {

  images: Array<any> = [
    "../../../assets/ferrari-f40-1-1ccc-1572780026.jpg",
    "../../../assets/datsun240z.jpg",
    "../../../assets/bmw m4 wide.jpg",
  ];;

  subirFoto = false;
  uploadPercent!: Observable<number | undefined>;
  urlImage!: Observable<string>;
  @ViewChild("imageUser") inputImageUser!: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    dots: false,
    center: true,
    autoplay: true,
    autoHeight:true,
  }

  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true };  

  constructor(
    private storage: AngularFireStorage,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
  }

}
