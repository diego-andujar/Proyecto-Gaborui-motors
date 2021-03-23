import { OrdersService } from './../../services/orders.service';
import { CarsService } from './../../services/cars.service';
import { Appointment } from './../../models/appointment';
import { Car } from './../../models/car';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import firebase from "firebase";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  @Input() car!: Car;
  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  userFire: any;
  user!: firebase.User;
  db = firebase.firestore();
  userFireId!: string;
  editarForm = false;

  selectedValue!: string;
  selectedCar!: string;
  tankLevels: any[] = [
    {value: '0.25', viewValue: '1/4 de taqnue'},
    {value: '0.5', viewValue: '1/2 tanque'},
    {value: '0.75', viewValue: '3/4 de tanque'},
    {value: '1', viewValue: 'Tanque lleno'},
  ];
  

  constructor(
    private datePipe : DatePipe,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.editarForm = false;
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser"))
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFireId = localStorage.getItem("UserFireId");
  
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      name: this.car.brand,
      email: this.car.model,
      birthDate: this.car.year,
      cedula: this.car.color,
      phone: this.car.plate,
      genero: this.car.kmWhenIn,
      direccion: this.car.gasTankWhenIn,
      ciudad: this.car.accesories,
    });
  }

  async onSubmit() {
    this.editarForm = false;
    if (this.authForm.pristine) {
      alert("Por favor todos los campos son requeridos!");
    } else {
      const formValues = {
        birthDate: this.datePipe.transform(this.authForm.get("birthDate")?.value, "dd-MM-yyyy"),
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        genero: this.authForm.get('genero'),
        direccion: this.authForm.get('direccion'),
        ciudad: this.authForm.get('ciudad'),
      };
      if ((this.userFire.birthDate === undefined || this.userFire.birthDate.length === 0) && formValues.birthDate?.valueOf != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({birthDate: formValues.birthDate}) 
      }
      if ((this.userFire.cedula === undefined || this.userFire.cedula === null) && formValues.cedula?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
      }
      if (formValues.phone?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({phoneNumber: formValues.phone?.value})
      }
      if ((this.userFire.genero === undefined || this.userFire.genero === null) && formValues.genero?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({genero: formValues.genero?.value})
      }
      if ((this.userFire.address === undefined || this.userFire.address === null) && formValues.direccion?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({address: formValues.direccion?.value})
      }
      if ((this.userFire.city === undefined || this.userFire.city === null) && formValues.ciudad?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({city: formValues.ciudad?.value})
      }
      this.userService.getUser(this.userFire.id);
      this.userService.getDoc(this.userFire.refId).subscribe((user) => {
        this.userFire = user;
      })
    }
    
  }

  validateForm(): boolean { 
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
      return false;
    } 
    
    return true;
  }

  editar(){
    this.editarForm = !this.editarForm;
  }
  /*
  @Input() car!: Car;
  @Input() appointment!: Appointment;

  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  db = firebase.firestore();
  editarForm = false;

  selectedValue!: string;
  selectedCar!: string;
  tankLevels: any[] = [
    {value: '0.25', viewValue: '1/4 de taqnue'},
    {value: '0.5', viewValue: '1/2 tanque'},
    {value: '0.75', viewValue: '3/4 de tanque'},
    {value: '1', viewValue: 'Tanque lleno'},
  ];
  
  @Output() sendFormEvent = new EventEmitter();

  constructor(
    private datePipe : DatePipe,
    private fb: FormBuilder,
    private carService: CarsService,
    private orderService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.editarForm = false;
    console.log(this.car)
    this.createForm();
    console.log(this.car)
  }

  createForm(): void {
    this.authForm = this.fb.group({
      brand: this.car.brand,
      model: this.car.model,
      year: this.car.year,
      color: this.car.color,
      plate: this.car.plate,
      kmWhenIn: this.car.kmWhenIn,
      gasTankWhenIn: this.car.gasTankWhenIn,
      accesories: this.car.accesories,
    });
  }

  async onSubmit() {
    this.editarForm = false;
    if (this.authForm.pristine) {
      alert("Por favor todos los campos son requeridos!");
    } else {
      const formValues = {
        brand: this.authForm.get('brand'),
        model: this.authForm.get('model'),
        year: this.authForm.get('year'),
        color: this.authForm.get('color'),
        plate: this.authForm.get('plate'),
        kmWhenIn: this.authForm.get('kmWhenIn'),
        gasTankWhenIn: this.authForm.get('gasTankWhenIn'),
        accesories: this.authForm.get('accesories'),
      };
      if ((this.car.brand === undefined || this.car.brand.length === 0) && formValues.brand?.valueOf != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({brand: formValues.brand}) 
      }
      if ((this.car.model === undefined || this.car.model === null) && formValues.model?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({model: formValues.model?.value})
      }
      if (formValues.year?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({year: formValues.year?.value})
      }
      if ((this.car.color === undefined || this.car.color === null) && formValues.color?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({color: formValues.color?.value})
      }
      if ((this.car.plate === undefined || this.car.plate === null) && formValues.plate?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({plate: formValues.plate?.value})
      }
      if ((this.car.kmWhenIn === undefined || this.car.kmWhenIn === null) && formValues.kmWhenIn?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({kmWhenIn: formValues.kmWhenIn})
      }
      if ((this.car.gasTankWhenIn === undefined || this.car.gasTankWhenIn === null) && formValues.gasTankWhenIn?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({gasTankWhenIn: formValues.gasTankWhenIn?.value})
      }
      if ((this.car.accesories === undefined || this.car.accesories === null) && formValues.accesories?.value != null){
        const userRef = this.db.collection("users").doc(this.car.carId);
        userRef.update({accesories: formValues.accesories?.value})
      }
    }
    /*else {
      const formValues = {
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        genero: this.authForm.get('genero'),
        direccion: this.authForm.get('direccion'),
        estado: this.authForm.get('estado'),
        ciudad: this.authForm.get('ciudad'),
        postal: this.authForm.get('postal'),
      };
      if ((this.userFire.cedula === undefined || this.userFire.cedula === null) && formValues.cedula?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
      }
      if (formValues.phone?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({phoneNumber: formValues.phone?.value})
      }
      if ((this.userFire.genero === undefined || this.userFire.genero === null) && formValues.genero?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({genero: formValues.genero?.value})
      }
      if ((this.userFire.address === undefined || this.userFire.address === null) && formValues.direccion?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({address: formValues.direccion?.value})
      }
      if ((this.userFire.state === undefined || this.userFire.state === null) && formValues.estado?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({state: formValues.estado?.value})
      }
      if ((this.userFire.city === undefined || this.userFire.city === null) && formValues.ciudad?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({city: formValues.ciudad?.value})
      }
      if ((this.userFire.postalCode === undefined || this.userFire.postalCode === null) && formValues.postal?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({postalCode: formValues.postal?.value})
      }
      this.userService.getUser(this.userFire.id);
      this.userService.getDoc(this.userFire.refId).subscribe((user) => {
        this.userFire = user;
      })
    }*/
  /*}

  validateForm(): boolean { 
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
      return false;
    } 
    
    return true;
  }

  editar(){
    this.editarForm = !this.editarForm;
  }*/

}
