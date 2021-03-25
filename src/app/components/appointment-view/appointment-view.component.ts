import { element } from 'protractor';
import { UsersService } from 'src/app/services/users.service';
import { CarsService } from 'src/app/services/cars.service';
import { AppointmentServiceService } from './../../services/appointment-service.service';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { DatePipe } from '@angular/common';
import firebase from "firebase";
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppointmentViewComponent implements OnInit {

  citas!: Array<Appointment>;
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
  dataSource: Appointment[] = [];
  columnsToDisplay = ['Detalles del carro ', 'Usuario', 'Fecha solicitada', 'Fecha de la cita', 'estado de la cita'];
  expandedElement!: Appointment;
  @ViewChild('picker')
  datePicker!: MatDatepicker<Date>;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(
    private appointService: AppointmentServiceService,
    private userService: UsersService,
    private carService: CarsService,
    private datePipe : DatePipe,
    private firestoreService: AppointmentServiceService,
    private fb: FormBuilder,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate.setDate(this.maxDate.getDate() + 54);
    if(!this.isManager){
      this.citas =  this.appointService.getUserAppointments(localStorage.getItem("UserFireId")!);
    } else {
      this.getApps();
      this.getCars(0);
      this.getUser(0);
    }
  }

  selecDate(){
    this.cambiarFecha = !this.cambiarFecha;
  }

  createForm(): void {
    this.dayForm = this.fb.group({
      appointmentDate: "",
    });
  }

  getCars(num: number){
    this.carService.getDoc(this.citas[num].car!).subscribe((car) => {
      this.car = car;
    })
  }

  getValores(carId: string){
    this.carService.getAppointmentsCar(carId).subscribe( res => {
      this.car = res;
    })
  }

  /*dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6
  }*/

  getUser(num: number){
    this.userService.getDoc(this.citas[num].userid!).subscribe( res => {
      this.userApp = res;
    })
  }

  getCarAndUser(app: Appointment){
    console.log("hola")
    this.carService.getDoc(app.car!).subscribe((car) => {
      this.car = car;
    })
    this.userService.getDoc(app.userid!).subscribe( res => {
      this.userApp = res;
    })
  }

  getApps(){
    this.firestoreService.getAPP().subscribe( res => {
      this.citas = res;
      this.dataSource = res;
      this.carService.getDoc(res[0].car!).subscribe((car) => {
        this.car = car;
      })
      this.userService.getDoc(res[0].userid!).subscribe((user) => {
        this.userApp = user;
      })
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.actualPage = event.pageIndex;
    this.getCars(event.pageIndex);
    this.getUser(event.pageIndex);
    return event;
  }

  aceptApp(cita: Appointment){
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId!);
  }

  aceptAppClient(cita: Appointment){
    const estado = {estado: "confirmada"};
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId!);
  }

  modifyApp(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(date, this.citas[this.actualPage].appId!);
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId!);
    this.dayForm.reset();
    this.selecDate();
  }

  modifyAppClient(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "solicitada"};
    this.appointService.updateDoc(date, this.citas[this.actualPage].appId!);
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId!);
    this.dayForm.reset();
    this.selecDate();
  }

  onClick(){
    this.datePicker.open();
  }

  public downloadQRCode(appointment: Appointment) {
    console.log("hola")
    const fileNameToDownload = 'cita#' + appointment.appId;
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    fetch(base64Img)
        .then(res => res.blob())
        .then((blob) => {
          // IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob){
              window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
          } else { // Chrome
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = fileNameToDownload;
              link.click();
          }
        })
 }

}
