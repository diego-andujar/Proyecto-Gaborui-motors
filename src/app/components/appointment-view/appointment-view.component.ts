import { UsersService } from 'src/app/services/users.service';
import { User } from './../../models/user';
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
  citas!: Array<Appointment>;
  cars!: Array<Car>;
  car: Car | undefined;
  date!: any;
  user!: firebase.User;
  lowValue: number = 0;
  highValue: number = 1;
  pageSize: number = 1;
  pageNumber: number = 1;

  constructor(
    private appointService: AppointmentServiceService,
    private userService: UsersService,
    private carService: CarsService,
    private datePipe : DatePipe,
    private firestoreService: AppointmentServiceService,
  ) { }

  ngOnInit(): void {
    console.log("aqui " + this.appointment)
    this.getApps();
  }

  getCar(){
    this.carService.getAppointmentsCar(this.appointment.car).subscribe( res => {
      this.car = res;
    })
  }

  getApps(){
    this.firestoreService.getAPP().subscribe( res => {
      this.citas = res;
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }
}
