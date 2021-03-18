import { UsersService } from 'src/app/services/users.service';
import { User } from './../../models/user';
import { CarsService } from 'src/app/services/cars.service';
import { AppointmentServiceService } from './../../services/appointment-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { DatePipe } from '@angular/common';
import firebase from "firebase";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  appointment!: Appointment;
  citas!: Array<Appointment>;
  @Input() citasInput: Array<Appointment> = [];
  cars!: Array<Car>;
  car!: any;
  userApp!: any;
  date!: any;
  @Input() isManager: boolean = false;
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
    if(!this.isManager){
      this.citas =  this.appointService.getUserAppointments(localStorage.getItem("UserFireId"));
      console.log("entras " + this.citas)
    } else {
      this.getApps();
      this.getCars(0);
      this.getUser(0);
    }
  }

  getCars(num: number){
    this.carService.getDoc(this.citas[num].car).subscribe((car) => {
      this.car = car;
    })
  }

  getValores(carId: string){
    this.carService.getAppointmentsCar(carId).subscribe( res => {
      this.car = res;
    })
  }

  getCar(){
    this.carService.getAppointmentsCar(this.appointment.car).subscribe( res => {
      this.car = res;
    })
  }

  getUser(num: number){
    this.userService.getDoc(this.citas[num].userid).subscribe( res => {
      this.userApp = res;
    })
    console.log(this.userApp.name)
  }

  getApps(){
    this.firestoreService.getAPP().subscribe( res => {
      this.citas = res;
      this.carService.getDoc(res[0].car).subscribe((car) => {
        this.car = car;
      })
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.getCars(event.pageIndex);
    this.getUser(event.pageIndex);
    return event;
  }
}
