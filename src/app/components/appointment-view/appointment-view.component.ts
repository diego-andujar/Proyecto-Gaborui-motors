import { CarsService } from 'src/app/services/cars.service';
import { AppointmentServiceService } from './../../services/appointment-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { DatePipe } from '@angular/common';
import firebase from "firebase";

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  @Input() appointment!: Appointment;
  cars!: Array<Car>;
  car!: Car;
  date!: any;

  constructor(
    private appointService: AppointmentServiceService,
    private carService: CarsService,
    private datePipe : DatePipe,
  ) { }

  ngOnInit(): void {
    this.cars = this.carService.getCarById(this.appointment.car);
    this.car = this.cars[0];
  }


}
