import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';
import firebase from "firebase";
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dinamic-car-view',
  templateUrl: './dinamic-car-view.component.html',
  styleUrls: ['./dinamic-car-view.component.scss']
})
export class DinamicCarViewComponent implements OnInit {

  verSolicitud = false;
  crearCarro: boolean = true;
  userType: string = "client";
  lowValue: number = 0;
  highValue: number = 1;
  user!: firebase.User;
  carList: Array<Car> = [];
  selectedValue!: string;
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
  carForm!: FormGroup;
  today = new Date();

  constructor(
    private datePipe : DatePipe,
    private authService: AuthService,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carList = this.carService.getUsCars(user.uid)
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

  getCars(){
    this.carList = this.carService.getUsCars(this.user.uid)
  }

  onSubmit(): void {
    const newCar: Car = {
      userid: this.user.uid,
      brand: this.carForm.get("brand")?.value,
      model: this.carForm.get("model")?.value,
      year: this.carForm.get("year")?.value,
      plate: this.carForm.get("plate")?.value,
      serialMotor: this.carForm.get("serialMotor")?.value,
      registerDate: this.datePipe.transform(this.today, "dd-MM-yyyy"),
    }
    this.createNewCar(newCar);
    this.carForm.reset();
    alert("!Se ha creado con exito tu carro!")
  }

  createNewCar(newCar: Car): void {
    this.carService.createNewCar(newCar);
    //this.router.navigate(['/']);
  } 
  

  pageSize: number = 1;
  pageNumber: number = 1;
}
