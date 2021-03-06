import { element } from 'protractor';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
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
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import firebase from "firebase";
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-appointment-dinamic',
  templateUrl: './appointment-dinamic.component.html',
  styleUrls: ['./appointment-dinamic.component.scss']
})
export class AppointmentDinamicComponent implements OnInit {

  citas!: Array<Appointment>;
  nuevaCita: boolean = false;
  @Input() citasInput: Array<Appointment> = [];
  @Input() element!: Appointment;
  @Input() appointment!: Appointment;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
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
  @Output() deleting = new EventEmitter<boolean>(); 
  @Output() editOrder = new EventEmitter<boolean>(); 
  @Output() clientEdit = new EventEmitter<boolean>(); 
  @Output() responseClient = new EventEmitter<boolean>(); 
  @Input() isRegister: boolean = false;
  carList: Array<Car> = [];
  selectedValue!: any;
  name: string = "";
  user: any;
  db = firebase.firestore();
  @Output() sendFormEvent = new EventEmitter();
  selectMechanic: boolean = false;
  listAppsConfirmed: Array<Date> = [];

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
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getAppDates()
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate.setDate(this.maxDate.getDate() + 54);
    this.name = (JSON.parse(localStorage.getItem("CurrentUser") || "{}")).name;
    if(!this.isManager){
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.carService.getUsCarsNoApp(user.uid).then( doc => {
          this.carList = doc;
        })
      })
      this.appointService.getUserAppoint(localStorage.getItem("UserFireId")!).then( doc => {
        this.citas = doc;
      })
      this.createForm();
    } else {
      
    }
  }

  

  async onResponse(response: string | boolean, cita: Appointment){
    if (response != null){
      this.selecDate();
      const estado = {estado: "por confirmar"};
      this.appointService.updateDoc(estado, cita.appId!);
      const user = await this.db.collection("users").doc(cita.userid).get();
      const email = user.data()!.email;
      const name = user.data()!.name;
      const title = "Cambio de fecha de tu cita"
      const mssg = "Nuestro gerente ha modificado la fecha para tu cita en nuestro taller debido a falta de tiempo ese dia, ahora deberás ingresar a tu perfil y desde la sección 'citas' podras modificar la fecha de tu cita o bien puedes confirmar esta si estas de acuerdo con la fecha ahi pactada. En caso de aceptar te deberas dirigir al taller entre las 8am y 2pm para hacer la revision inicial del vehiculo. "
      const values = {
        title: title,
        to_name: name,
        client_email: email,
        message: mssg,
      }
      emailjs.send('contact_service', 'appointment_confirmation', values, 'user_XWdrDn6QKZanPmZRRCZ3f')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
          console.log('FAILED...', error);
      });
      this.editOrder.emit(true);
    }
  }

  onResponseClient(response: string | boolean){
    if (response != null){
      this.selecDate();
      this.responseClient.emit(true);
    }
  }

  /*downloadQRCode(appointment: Appointment) {
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
 }*/

  onSubmited(bool: boolean){
    this.selectMechanic = true;
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

  getAppDates(){
    let listApp: Array<Appointment> = [];
    this.appointService.getAppConfirmada().then( doc => {
      listApp = doc;
      listApp.forEach(element => {
        //console.log(element.date);
        let dateToSelect = this.transformDateForCalendar(element.date!);
        let newdate = new Date(dateToSelect!);
        this.listAppsConfirmed.push(newdate);
      });
    });
  }

  transformDateForCalendar(date: string): string{
    const [day, month, year]: string[] = date.split('-');
    let days = Number(day) + 1;
    return`${year}-${month}-${days.toString()}`
  }

  myFilter = (d: any): boolean => {
    const day = d.getDay();
    console.log(day);
    const blockedDates = this.listAppsConfirmed.map(d => d.valueOf());
    return (!blockedDates.includes(d.valueOf())) && day != 6 && day != 0 ;
  }

  dateFilter = (date: any) => {
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

  async aceptApp(cita: Appointment){
    const estado = {estado: "por confirmar"};
    this.appointService.updateDoc(estado, cita.appId!);
    const user = await this.db.collection("users").doc(cita.userid).get();
    const email = user.data()!.email;
    const name = user.data()!.name;
    const title = "Confirma tu cita"
    const mssg = "Felicidades ya tu cita fue agendada por nuestro gerente, ahora deberás ingresar a tu perfil y confirmar la cita en la sección 'citas', después de realizar este proceso solo quedara esperar a que llegue el día pautado y te dirijas al taller entre las 8am y 2pm."
    const values = {
      title: title,
      to_name: name,
      client_email: email,
      message: mssg,
    }
    emailjs.send('contact_service', 'appointment_confirmation', values, 'user_XWdrDn6QKZanPmZRRCZ3f')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
    this.editOrder.emit(true);
  }

  aceptAppClient(cita: Appointment){
    const estado = {estado: "confirmada"};
    this.appointService.updateDoc(estado, this.citas[this.actualPage].appId!);
    const data = {orderOpen: true};
    this.appointService.updateDoc(data, this.citas[this.actualPage].appId!);
    const orderRep = {orderStatus: "en espera"};
    this.appointService.updateDoc(orderRep, this.citas[this.actualPage].appId!);
    const orden: Order = {
      endedRepair: false,
    }
    this.orderService.createOrder(orden, this.citas[this.actualPage].appId!);
    this.ngOnInit();
    this.clientEdit.emit(true);
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
    this.ngOnInit();
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
    this.ngOnInit();
    this.clientEdit.emit(true);
  }

  async deleteApp(app: Appointment){
    const userIds = app.userid;
    const value = {
      inAppointment: false,
    }
    this.carService.updateCar(value, app.car!);
    this.appointService.deleteApp(app.appId!);
    this.getCars();
    this.appointService.getUserAppoint(userIds!).then( doc => {
      console.log(doc)
      this.citas = doc;
    })
    alert("!Se elimino su cita con exito!")
    this.deleting.emit(true);
  }

  async deleteAppManager(app: Appointment){
    const userIds = app.userid;
    const value = {
      inAppointment: false,
    }
    this.carService.updateCar(value, app.car!);
    this.appointService.deleteApp(app.appId!);
    const user = await this.db.collection("users").doc(app.userid).get();
    const email = user.data()!.email;
    const name = user.data()!.name;
    const mssg = "Lo sentimos pero nuestro gerente ha cancelado tu cita, si quieres mas informacion nos puedes escribir a este mismo correo o llamarnos a nuestro numero de contacto. Si desea pedir otra cita puede ingresar a su perfil y dirigirse la sección 'citas'."
    const title = "Cita cancelada"
    const values = {
      title: title,
      to_name: name,
      client_email: email,
      message: mssg,
    }
    emailjs.send('contact_service', 'appointment_confirmation', values, 'user_XWdrDn6QKZanPmZRRCZ3f')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
    alert("!Se elimino la cita con exito!")
    this.editOrder.emit(true);
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
      date: formValues.appointmentDate!,
      userid: localStorage.getItem("UserFireId")!,
      estado: "solicitada",
      diagnosis: formValues.diagnostico?.value,
      dateCreated: this.datePipe.transform(this.today, "dd-MM-yyyy")!,
      carPhoto: formValues.selectedCar?.value.photo,
    }
    this.carService.carForAppointment(formValues.selectedCar?.value.carId, true);
    this.firestoreService.crearCita(cita);
    this.authForm.reset()
    this.getCars();
    this.appointService.getUserAppoint(localStorage.getItem("UserFireId")!).then( doc => {
      this.citas = doc;
    })
    alert("!Tu cita fue creada con exito!\nPronto te llegara informacion para confirmarla")
  }
}