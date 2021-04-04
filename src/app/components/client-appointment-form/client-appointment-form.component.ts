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
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-client-appointment-form',
  templateUrl: './client-appointment-form.component.html',
  styleUrls: ['./client-appointment-form.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientAppointmentFormComponent implements OnInit {

  columnsToDisplay = ['car', 'order status', 'repair status'];
  expandedElement!: Appointment | null;
  nuevaCita: boolean = false;
  citasInput!: Array<Appointment>;
  @Input() element!: Appointment;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  @Input() cambiarFecha: boolean = false;
  @Input() isManager: boolean = false;
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  authForm!: FormGroup;
  selectedValue!: string;
  carList: Array<Car> = [];
  car!: any;
  user: any;
  dayForm!: FormGroup;
  name: string = "";
  @Output() sendFormEvent = new EventEmitter();
  listAppsConfirmed: Array<any> = [];

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
    this.getAppDates();
    this.name = (JSON.parse(localStorage.getItem("CurrentUser") || "{}")).name;
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carService.getUsCarsNoApp(user.uid).then( doc => {
        this.carList = doc;
      })
    })
    this.appointService.getUserAppoint(localStorage.getItem("UserFireId")!).then( doc => {
      this.citasInput = doc;
    })
    this.createForm();
  }

  onDeleting(response: string | boolean){
    if (response != null){
      this.appointService.getUserAppoint(localStorage.getItem("UserFireId")!).then( doc => {
        this.citasInput = doc;
      });
    }
  }

  clientEditOrder(event: boolean){
    if (event){
      this.appointService.getUserAppoint(localStorage.getItem("UserFireId")!).then( doc => {
        this.citasInput = doc;
      });
    }
  }

  getCars(){
    this.carService.getUsCarsNoApp(this.user.uid).then( doc => {
      this.carList = doc;
    })
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
        this.listAppsConfirmed.push(newdate.toLocaleDateString());
      });
    });
  }

  transformDateForCalendar(date: string): string{
    const [day, month, year]: string[] = date.split('-');
    let days = Number(day) + 1;
    return`${year}-${month}-${days.toString()}`
  }

  myFilter = (d: any): boolean => {
    const dat = d.toLocaleDateString();
    const day = d.getDay();
    const blockedDates = this.listAppsConfirmed;
    return (!blockedDates.includes(dat)) && day != 6 && day != 0 ;
  }

  dateFilter = (date: any) => {
    const day = date.getDay();
    return day != 0 && day != 6
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
      this.citasInput = doc;
    })
    alert("!Tu cita fue creada con exito!\nPronto te llegara informacion para confirmarla")
  }
}