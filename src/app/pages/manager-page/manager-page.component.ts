import { CarsService } from './../../services/cars.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  carForm!: FormGroup;
  isLoading = true;
  carToUpdate: Car = null;

  showFiller = false;
  constructor(
    private fb: FormBuilder,
    private carService: CarsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.buildForm();
    this.getUrlParams();
  }

  buildForm(): void {
    this.carForm = this.fb.group({
      brand: '',
      model: '',
      year: '',
      plate: '',
    });
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      const carId = params.get('postId');

      if (carId) {
        this.carService.getCarById(carId).subscribe((post) => {
          this.carToUpdate = post;
          this.carForm.patchValue({
            brand: this.carToUpdate.brand,
            model: this.carToUpdate.model,
            yera: this.carToUpdate.year,
            plate: this.carToUpdate.plate,
          });
          this.isLoading = false;
        });
        return;
      }
      this.isLoading = false;
    });
  }

  createNewPost(newCar: Car): void {
    this.carService.createNewCar(newCar).then((response) => {
      console.log('response', JSON.stringify(response, null, 4));
      this.router.navigate(['/posts']);
    });
  }

  onSubmit(): void {
    const newCar: Car = {
      brand: this.carForm.get('brand').value,
      model: this.carForm.get('model').value,
      year: this.carForm.get('year').value,
      plate: this.carForm.get('plate').value,
    };
    this.createNewCar(newCar);
  }

  createNewCar(newPost: Car): void {
    this.carService.createNewCar(newPost).then((response) => {
      console.log('response', JSON.stringify(response, null, 4));
      this.router.navigate(['/']);
    });
  }

  updateCar(carData: Car): void {
    this.carService.updateCar(this.carToUpdate.id, carData).then(() => {
      this.router.navigate(['/']);
    });
  }


}
