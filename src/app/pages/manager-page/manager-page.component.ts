import { AuthService } from './../../services/auth.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from "firebase";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  selectedValue!: string;
  selectedCar!: string;
  user!: firebase.User;
  carForm!: FormGroup;
  isLoading = true;
  carToUpdate!: Car;

  carList: Array<Car> = [];
  showFiller = false;
  constructor(
    private fb: FormBuilder,
    private carService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private authUsers: UsersService,
  ) { }



  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.carService.getAllCars().subscribe((cars) => {
      this.carList = cars;
    })
    this.getUrlParams();
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



}
