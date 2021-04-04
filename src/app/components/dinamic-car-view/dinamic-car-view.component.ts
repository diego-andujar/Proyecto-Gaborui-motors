import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';
import firebase from "firebase";
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dinamic-car-view',
  templateUrl: './dinamic-car-view.component.html',
  styleUrls: ['./dinamic-car-view.component.scss']
})
export class DinamicCarViewComponent implements OnInit {

  verSolicitud = false;
  photo!: any;
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
    {value: 'aston martin', viewValue: 'Aston Martin'},
    {value: 'audi', viewValue: 'Audi'},
    {value: 'bentley', viewValue: 'Bentley'},
    {value: 'bmw', viewValue: 'BMW'},
    {value: 'buick', viewValue: 'Buick'},
    {value: 'chery', viewValue: 'Chery'},
    {value: 'chevrolet', viewValue: 'Chevrolet'},
    {value: 'chrysler', viewValue: 'Chrysler'},
    {value: 'citroen', viewValue: 'Citroen'},
    {value: 'daewoo', viewValue: 'Daewoo'},
    {value: 'dodge', viewValue: 'Dodge'},
    {value: 'ferrari', viewValue: 'Ferrari'},
    {value: 'fiat', viewValue: 'Fiat'},
    {value: 'ford', viewValue: 'Ford'},
    {value: 'gmc', viewValue: 'GMC'},
    {value: 'honda', viewValue: 'Honda'},
    {value: 'hyundai', viewValue: 'Hyundai'},
    {value: 'jaguar', viewValue: 'Jaguar'},
    {value: 'jeep', viewValue: 'Jeep'},
    {value: 'kia', viewValue: 'Kia'},
    {value: 'lamborghini', viewValue: 'Lamborghini'},
    {value: 'land rover', viewValue: 'Land Rover'},
    {value: 'lexus', viewValue: 'Lexus'},
    {value: 'maserati', viewValue: 'Maserati'},
    {value: 'mazda', viewValue: 'Mazda'},
    {value: 'mclaren', viewValue: 'Mclaren'},
    {value: 'mercedes', viewValue: 'Mercedes'},
    {value: 'mitsubishi', viewValue: 'Mitsubishi'},
    {value: 'nissan', viewValue: 'Nissan'},
    {value: 'peugeot', viewValue: 'peugeot'},
    {value: 'pontiac', viewValue: 'Pontiac'},
    {value: 'porsche', viewValue: 'Porsche'},
    {value: 'renault', viewValue: 'Renault'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'seat', viewValue: 'Seat'},
    {value: 'subaru', viewValue: 'Subaru'},
    {value: 'suzuki', viewValue: 'Suzuki'},
    {value: 'toyota', viewValue: 'Toyota'},
    {value: 'tesla', viewValue: 'Tesla'},
    {value: 'volkswagen', viewValue: 'Volkswagen'},
    {value: 'volvo', viewValue: 'Volvo'},
  ];
  carForm!: FormGroup;
  editCarForm!: FormGroup;
  today = new Date();
  carsLoad = false;

  uploadPercent!: Observable<number | undefined>;
  urlImage!: Observable<string>;
  @ViewChild("imageUser") inputImageUser!: ElementRef;
  subirFoto = false;

  constructor(
    private storage: AngularFireStorage,
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
        this.carsLoad = true;
      })
    })
    this.buildForm();
    this.createEditForm();
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

  uploadImg(car: Car){
    this.photo = this.inputImageUser.nativeElement.value;
    const data = {
      photo: this.inputImageUser.nativeElement.value,
    }
    this.carService.updateCar(data, car.carId!).then(() => {
      this.subirFoto = false;
    })
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

  createEditForm(car?: Car){
    this.editCarForm = this.fb.group({
      brandEdit: "",
      modelEdit: "",
      yearEdit: "",
      plateEdit: "",
    })
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

  async onEdit(car: Car){
    const brand = {
      brand: this.editCarForm.get("brandEdit")?.value,
    }
    const model = {
      model: this.editCarForm.get("modelEdit")?.value,
    }
    const year = {
      year: this.editCarForm.get("yearEdit")?.value,
    }
    const plate = {
      plate: this.editCarForm.get("plateEdit")?.value,
    }
    console.log(brand.brand + " " + model.model + " " + year.year + " " + plate.plate)
    if (brand.brand != undefined && brand != undefined && brand.brand != "" && brand.brand != " "){
      await this.carService.updateCar(brand, car.carId!);
    }
    if (model.model != undefined && model != undefined && model.model != "" && model.model != " "){
      await this.carService.updateCar(model, car.carId!);
    }
    if (year.year != undefined && year != undefined && year.year != "" && year.year != " "){
      await this.carService.updateCar(year, car.carId!);
    }
    if (plate.plate != undefined && plate != undefined && plate.plate != "" && plate.plate != " "){
      await this.carService.updateCar(plate, car.carId!);
    }
    this.editarCarro = false;
    alert("!Se han actualizado los datos de tu vehiculo con exito!");
    this.getCars();
    
    
  }

  createNewCar(newCar: Car): void {
    this.carService.createNewCar(newCar);
    //this.router.navigate(['/']);
  } 
  

  pageSize: number = 1;
  pageNumber: number = 1;
}
