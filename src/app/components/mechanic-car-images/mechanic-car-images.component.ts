import { CarsService } from 'src/app/services/cars.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-mechanic-car-images',
  templateUrl: './mechanic-car-images.component.html',
  styleUrls: ['./mechanic-car-images.component.scss']
})
export class MechanicCarImagesComponent implements OnInit {

  images: Array<any> = [];
  @Input() car!: Car;

  subirFoto = false;
  uploadPercent!: Observable<number | undefined>;
  urlImage!: Observable<string>;
  @ViewChild("imageUser") inputImageUser!: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    items: 3,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    dots: false,
  }

  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true };  

  constructor(
    private storage: AngularFireStorage,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.images = this.car.mechanicPictures!;
    if (this.car.mechanicPictures){
      this.images = this.car.mechanicPictures!;
    } else {
      this.images = [];
    }
  }

  onUpload(pic: any){
    //console.log(pic.target.files[0])
    const id = Math.random().toString(36).substring(2);
    const file = pic.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize (() => 
      this.urlImage = ref.getDownloadURL())).subscribe();
  }

  async uploadImg(){
    const photo = this.inputImageUser.nativeElement.value;
    this.images.push(photo);
    const data = {
      mechanicPictures: this.images,
    }
    await this.carService.updateCar(data, this.car.carId!).then(() => {
      this.subirFoto = false;
    })
  }

}