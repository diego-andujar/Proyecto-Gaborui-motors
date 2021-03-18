import { AppointmentServiceService } from './../../services/appointment-service.service';
import { Appointment } from './../../models/appointment';
import { Car } from 'src/app/models/car';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-appointment-form',
  templateUrl: './client-appointment-form.component.html',
  styleUrls: ['./client-appointment-form.component.scss']
})
export class ClientAppointmentFormComponent implements OnInit {

  authForm!: FormGroup;
  @Output() sendFormEvent = new EventEmitter();
  @Input() isRegister: boolean = false;
  @Input() carList: Array<Car> = [];
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  selectedValue!: any;
  car!: Car;
  

  constructor(
    private datePipe : DatePipe,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
    private appointmentService: AppointmentServiceService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.minDate.setDate(this.minDate.getDate() + 7)
    this.maxDate.setDate(this.maxDate.getDate() + 54)
  }

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6
  }

  createForm(): void {
    this.authForm = this.fb.group({
      selectedCar: this.car,
      appointmentDate: '',
      diagnostico: '',
    });
  }

  async googleLogin() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      this.router.navigate(['/']);
    }

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
      date: formValues.appointmentDate,
      userid: localStorage.getItem("user"),
      estado: "solicitada",
      diagnosis: formValues.diagnostico?.value,
      dateCreated: this.datePipe.transform(this.today, "dd-MM-yyyy"),
    }
    this.appointmentService.crearCita(cita);
    this.authForm.reset()
    alert("!Tu cita fue creada con exito!\nPronto te llegara informacion para confirmarla")
  }
}
