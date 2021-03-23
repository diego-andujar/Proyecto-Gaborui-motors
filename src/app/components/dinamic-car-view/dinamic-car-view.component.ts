import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';
import firebase from "firebase";
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dinamic-car-view',
  templateUrl: './dinamic-car-view.component.html',
  styleUrls: ['./dinamic-car-view.component.scss']
})
export class DinamicCarViewComponent implements OnInit {

  verSolicitud = false;
  editarCarro = false;
  name = JSON.parse(localStorage.getItem("CurrentUser")!).name;
  crearCarro: boolean = false;
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
    private fb: FormBuilder,
    private datePipe : DatePipe,
    private authService: AuthService,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carService.getUsCars(user.uid).then( doc => {
        this.carList = doc;
      })
    })
    this.buildForm()
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

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

  getCars(){
    this.carService.getUsCars(this.user.uid).then( doc => {
      this.carList = doc;
    })
  }

  async activateCar(car: Car){
    const bool: boolean = !car.active;
    const active = {active: bool}
    await this.carService.updateCar(active, car.carId!)
    this.getCars()
    if (bool){
      alert("!Has reactivado este vehiculo con exito!\nAprovecha nuestros servicios");
    } else {
      alert("!Ha desactivado este vehiculo con exito!");
    }
    
  }

  /*async deActivateCar(car: Car){
    const active = {active: false}
    await this.carService.updateCar(active, car.carId)
    this.getCars()
    alert("!Ha desactivado este vehiculo con exito!")
  }*/

  async onSubmit(){
    const newCar: Car = {
      userid: this.user.uid,
      brand: this.carForm.get("brand")?.value,
      model: this.carForm.get("model")?.value,
      year: this.carForm.get("year")?.value,
      plate: this.carForm.get("plate")?.value,
      serialMotor: this.carForm.get("serialMotor")?.value,
      registerDate: this.datePipe.transform(this.today, "dd-MM-yyyy")!,
      photo: "https://c0.klipartz.com/pngpicture/421/615/gratis-png-2017-toyota-yaris-ia-scion-carros-medianos-carros.png",
      active: true,
    }
    newCar.inAppointment = false;
    let existe: boolean = false;
    await this.carService.checkIfCarExists(newCar.serialMotor!).then( doc => {
      existe = doc;
    })
    console.log(existe)
    if (!existe){
      this.createNewCar(newCar);
      this.carForm.reset();
      alert("!Se ha creado con exito tu carro!\nYa puedes pedir una cita para el")
      this.getCars();
      this.crearCarro = !this.crearCarro;
    } else {
      this.carForm.reset();
      alert("!Se ha detectado otro vehiculo con este serial de motor!\nNo pueden exister los mismos vehiculos entre distintos usuarios")
    }
    
  }

  createNewCar(newCar: Car): void {
    this.carService.createNewCar(newCar);
    //this.router.navigate(['/']);
  } 
  

  pageSize: number = 1;
  pageNumber: number = 1;
}
