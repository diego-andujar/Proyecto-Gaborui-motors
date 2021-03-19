import { UsersService } from 'src/app/services/users.service';
import { FirestoreService } from './../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth.service';
import { CarsService } from 'src/app/services/cars.service';
import firebase from "firebase";
import { DatePipe } from '@angular/common';

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
  today = new Date();

  showFiller = false;

  constructor(
    private fb: FormBuilder,
    private carService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private datePipe : DatePipe,
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
      serialMotor: "",
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
            serialMotor: this.carToUpdate.serialMotor,
            registerDate: this.datePipe.transform(this.today, "dd-MM-yyyy"),
          });
          this.isLoading = false;
        });
        return;
      }
      this.isLoading = false;
    });
  }

 

  createNewCar(newCar: Car): void {
    this.carService.createNewCar(newCar);
    //this.router.navigate(['/']);
  } 

  updateCar(carData: Car): void {
    this.carService.updateCar(this.carToUpdate.brand, carData).then(() => {
      this.router.navigate(['/']);
    });
  }

}
