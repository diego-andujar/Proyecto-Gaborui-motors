import { Appointment } from 'src/app/models/appointment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  @Input() citas!: Array<Appointment>;
  @Output() response = new EventEmitter<string | boolean>(); 
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  datePicker!: MatDatepicker<Date>;

  constructor(
    private fb: FormBuilder,
    private appointService: AppointmentServiceService,
    private datePipe : DatePipe,
  ) { }

  ngOnInit(): void {
    console.log(this.app)
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate.setDate(this.maxDate.getDate() + 54);
    this.createForm();
  }

  createForm(): void {
    this.dayForm = this.fb.group({
      appointmentDate: "",
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
    this.response.emit(formValues.appDate!);
  }

  selecDate(){
    this.cambiarFecha = false;
    this.response.emit(false)
  }

  myFilter = (d: any): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
