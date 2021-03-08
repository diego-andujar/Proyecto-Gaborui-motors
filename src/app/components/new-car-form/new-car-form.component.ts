import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth.service';
import { CarsService } from 'src/app/services/cars.service';
import firebase from "firebase";

@Component({
  selector: 'app-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.scss']
})
export class NewCarFormComponent implements OnInit {

  selectedValue!: string;
  selectedCar!: string;
  carBrands: any[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
    {value: 'honda', viewValue: 'Honda'},
    {value: 'toyota', viewValue: 'Toyota'},
    {value: 'mitsubishi', viewValue: 'Mitsubishi'},
    {value: 'renault', viewValue: 'Renault'},
    {value: 'ford', viewValue: 'Ford'},
    {value: 'Hyundai', viewValue: 'Hyundai'},
    {value: 'tesla', viewValue: 'Tesla'},
  ];
  user!: firebase.User;
  carForm!: FormGroup;
  isLoading = true;
  carToUpdate!: Car;

  showFiller = false;

  constructor(
    private fb: FormBuilder,
    private carService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
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
