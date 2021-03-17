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
  carList!: Array<Car>;
  minDate = new Date();
  maxDate = new Date(2021, 12, 31);
  today = new Date();
  

  constructor(
    private datePipe : DatePipe,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.minDate.setDate(this.minDate.getDate() + 7)
    this.maxDate.setDate(this.maxDate.getDate() + 54)
    console.log(this.minDate + " max " + this.maxDate);
  }

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6
  }

  createForm(): void {
    this.authForm = this.fb.group({
      selectedCar: '',
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
      appointmentDate: this.authForm.get('appointmentDate'),
      diagnostico: this.authForm.get('diagnostico'),
    };
    this.sendFormEvent.emit(formValues);
  }
}
