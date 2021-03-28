import { FirestoreService } from './../../services/firestore.service';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { AuthService } from './../../services/auth.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from "firebase";
import { UsersService } from 'src/app/services/users.service';
import { Appointment } from 'src/app/models/appointment';
import { PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManagerPageComponent implements OnInit {

  columnsToDisplay = ['car', 'repair state', 'mechanic'];
  expandedElement!: Appointment | null;
  selectedValue!: string;
  selectedCar!: string;
  user!: firebase.User;
  userType: string = "manager";
  isLoading = true;
  carToUpdate!: Car;
  citas: Array<Appointment> = [];
  ordenes: Array<any> = [];

  carList: Array<Car> = [];
  showFiller = false;
  constructor(
    private authService: AuthService,
    private appService: AppointmentServiceService,
  ) { }



  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.getApps();
    this.getAppsOrders();
  }

  getApps(){
    this.appService.getAPP().subscribe( res => {
      this.citas = res;
    })
  }

  getAppsOrders(){
    this.appService.getAppOrders().then( res => {
      console.log(res)
      this.ordenes = res;
    })
  }


}
