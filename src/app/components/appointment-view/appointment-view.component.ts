import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
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
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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

  @Input()
  ngxTimepicker!: NgxMaterialTimepickerComponent; 
  citas!: Array<any>;
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
  @ViewChild('picker')
  datePicker!: MatDatepicker<Date>;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  columnsToDisplay = ['car', 'order status', 'owner'];
  expandedElement!: Appointment | null;
  db = firebase.firestore();


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

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  getAppsToShow(num: number){
    if (num === 1){
      this.appointService.getAppSolicitada().then( res => {
        this.citas = res;
        console.log(this.citas.length)
        if (this.citas.length < 1){
          this.citas.push();
          alert("No hay citas solicitadas actualmente")
        }
      })
    } else if (num === 2){
      this.appointService.getAppPorConfirmar().then( res => {
        this.citas = res;
        console.log(this.citas[0])
        if (this.citas.length < 1){
          this.citas.push();
          alert("No hay citas por confirmar actualmente")
        }
      })
    } else if (num === 3){
      this.appointService.getAppConfirmada().then( res => {
        this.citas = res;
        if (this.citas.length < 1){
          this.citas.push();
          alert("No hay citas confirmadas actualmente")
        }
      })
    }
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
    this.carService.getDoc(app.car!).subscribe((car) => {
      this.car = car;
    })
    this.userService.getDoc(app.userid!).subscribe( res => {
      this.userApp = res;
    })
  }

  getApps(){
    this.appointService.getAppSolicitada().then( res => {
      this.citas = res;
      if (this.citas.length < 1){
        this.citas.push(null);
      }
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

  async aceptApp(cita: Appointment){
    console.log(cita)
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(estado, cita.appId!);
    const user = await this.db.collection("users").doc(cita.userid).get();
    const email = user.data()!.email;
    const name = user.data()!.name;
    const values = {
      to_name: name,
      client_email: email,
    }
    /*emailjs.send('contact_service', 'appointment_confirmation', values, 'user_XWdrDn6QKZanPmZRRCZ3f')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });*/
  }

  onResponse(response: string | boolean){
    if (response != null){
      this.selecDate();
    }
    this.appointService.getAppSolicitada().then( res => {
      this.citas = res;
      if (this.citas.length < 1){
        this.citas.push();
      }
    });
  }

  aceptAppClient(cita: Appointment){
    const estado = {estado: "confirmada"};
    this.appointService.updateDoc(estado, cita.appId!);
    this.appointService.getAppSolicitada().then( res => {
      this.citas = res;
      if (this.citas.length < 1){
        this.citas.push();
      }
    });
  }

  modifyApp(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(date, cita.appId!);
    this.appointService.updateDoc(estado, cita.appId!);
    this.dayForm.reset();
    this.selecDate();
    this.appointService.getAppSolicitada().then( res => {
      this.citas = res;
      if (this.citas.length < 1){
        this.citas.push();
      }
    });
  }

  modifyAppClient(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    const estado = {estado: "solicitada"};
    this.appointService.updateDoc(date, cita.appId!);
    this.appointService.updateDoc(estado, cita.appId!);
    this.dayForm.reset();
    this.selecDate();
    this.appointService.getAppSolicitada().then( res => {
      this.citas = res;
      if (this.citas.length < 1){
        this.citas.push();
      }
    });
  }

  onClick(){
    this.datePicker.open();
  }

  /*public downloadQRCode(appointment: Appointment) {
    const fileNameToDownload = 'cita#' + appointment.appId;
    const base64Img = document.getElementsByClassName('coolQRCode')[1].children[1]['src'];
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
 }*/

}
