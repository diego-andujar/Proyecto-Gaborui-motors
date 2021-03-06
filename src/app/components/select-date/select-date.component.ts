import { Appointment } from 'src/app/models/appointment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {

  dayForm!: FormGroup;
  cambiarFecha!: boolean;
  @Input() app!: Appointment;
  @Input() isClient: boolean = false;
  @Input() citas!: Array<Appointment>;
  @Output() response = new EventEmitter<string | boolean>(); 
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  datePicker!: MatDatepicker<Date>;
  listAppsConfirmed: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private appointService: AppointmentServiceService,
    private datePipe : DatePipe,
  ) { }

  ngOnInit(): void {
    this.getAppDates();
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate.setDate(this.maxDate.getDate() + 54);
    this.createForm();
  }

  createForm(): void {
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

  modifyApp(cita: Appointment){
    const formValues = {
      appDate:  this.datePipe.transform(this.dayForm.get('appointmentDate')?.value, "dd-MM-yyyy"),
    };
    const date = {date: formValues.appDate};
    let estados = {};
    if (this.isClient){
      estados = {estado: "solicitada"};
    } else {
      estados = {estado: "por confirmar"};
    }
    this.appointService.updateDoc(date, cita.appId!);
    this.appointService.updateDoc(estados, cita.appId!);
    this.dayForm.reset();
    this.selecDate();
    this.response.emit(formValues.appDate!);
  }

  selecDate(){
    this.cambiarFecha = false;
    this.response.emit(false)
  }

  /*myFilter = (d: any): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }*/

}
