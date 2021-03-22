import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { CarsService } from 'src/app/services/cars.service';
import { UsersService } from 'src/app/services/users.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment-dinamic',
  templateUrl: './appointment-dinamic.component.html',
  styleUrls: ['./appointment-dinamic.component.scss']
})
export class AppointmentDinamicComponent implements OnInit {

  citas!: Array<Appointment>;
  nuevaCita: boolean = false;
  @Input() citasInput: Array<Appointment> = [];
  cars!: Array<Car>;
  car!: any;
  userApp!: any;
  date!: any;
  actualPage: number = 0;
  @Input() cambiarFecha: boolean = false;
  @Input() isManager: boolean = false;
  lowValue: number = 0;
  highValue: number = 1;
  pageSize: number = 1;
  pageNumber: number = 1;
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  dayForm!: FormGroup;
  authForm!: FormGroup;
  @Output() sendFormEvent = new EventEmitter();
  @Input() isRegister: boolean = false;
  carList: Array<Car> = [];
  selectedValue!: any;
  name: string = "";
  user: any;

  constructor(
    private appointService: AppointmentServiceService,
    private authService: AuthService,
    private userService: UsersService,
    private carService: CarsService,
    private datePipe : DatePipe,
    private firestoreService: AppointmentServiceService,
    private fb: FormBuilder,
    private renderer:Renderer2,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate.setDate(this.maxDate.getDate() + 54);
    this.name = (JSON.parse(localStorage.getItem("CurrentUser"))).name;
    if(!this.isManager){
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.carService.getUsCarsNoApp(user.uid).then( doc => {
          this.carList = doc;
        })
      })
      this.appointService.getUserAppoint(localStorage.getItem("UserFireId")).then( doc => {
        this.citas = doc;
      })
      this.createForm();
    } else {
      
    }
  }

  getCars(){
    this.carService.getUsCarsNoApp(this.user.uid).then( doc => {
      this.carList = doc;
    })
  }

  selecDate(){
    this.cambiarFecha = !this.cambiarFecha;
  }

  createForm(): void {
    this.authForm = this.fb.group({
      selectedCar: this.car,
      appointmentDate: '',
      diagnostico: '',
    });
    this.dayForm = this.fb.group({
      appointmentDate: "",
    });
  }

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6
  }

  getApps(){
    this.firestoreService.getAPP().subscribe( res => {
      this.citas = res;
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.actualPage = event.pageIndex;
    return event;
  }

  aceptApp(cita: Appointment){
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId);
  }

  aceptAppClient(cita: Appointment){
    const estado = {estado: "confirmada"};
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId);
  }

  modifyApp(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(date, this.citas[this.actualPage].appId);
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId);
    this.dayForm.reset();
    this.selecDate();
  }

  modifyAppClient(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "solicitada"};
    this.appointService.updateDoc(date, this.citas[this.actualPage].appId);
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId);
    this.dayForm.reset();
    this.selecDate();
  }

  async deleteApp(id: string, car: string){
    this.carService.carForAppointment(car, false);
    this.firestoreService.deleteApp(id);
    alert("!Se elimino su cita con exito!")
    this.getCars();
    this.appointService.getUserAppoint(localStorage.getItem("UserFireId")).then( doc => {
      this.citas = doc;
    })
  }



  async onSubmit() {
    const formValues = {
      selectedCar: this.authForm.get('selectedCar'),
      appointmentDate: this.datePipe.transform(this.authForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
      diagnostico: this.authForm.get('diagnostico'),
    };
    this.sendFormEvent.emit(formValues);
    let cita: Appointment = {
      car: formValues.selectedCar?.value.carId,
      carInfo: formValues.selectedCar?.value.brand + " - " + formValues.selectedCar?.value.model + " - " + formValues.selectedCar?.value.year,
      userName: this.name,
      date: formValues.appointmentDate,
      userid: localStorage.getItem("UserFireId"),
      estado: "solicitada",
      diagnosis: formValues.diagnostico?.value,
      dateCreated: this.datePipe.transform(this.today, "dd-MM-yyyy"),
      carPhoto: formValues.selectedCar?.value.photo,
    }
    console.log(cita.dateCreated + " " + cita.date)
    this.carService.carForAppointment(formValues.selectedCar?.value.carId, true);
    this.firestoreService.crearCita(cita);
    this.authForm.reset()
    this.getCars();
    this.appointService.getUserAppoint(localStorage.getItem("UserFireId")).then( doc => {
      this.citas = doc;
    })
    alert("!Tu cita fue creada con exito!\nPronto te llegara informacion para confirmarla")
  }
}