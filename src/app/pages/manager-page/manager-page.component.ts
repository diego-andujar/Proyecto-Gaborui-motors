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

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  selectedValue!: string;
  selectedCar!: string;
  user!: firebase.User;
  userType: string = "manager";
  isLoading = true;
  carToUpdate!: Car;
  citas: Array<Appointment> = [];
  lowValue: number = 0;
  highValue: number = 1;
  pageSize: number = 1;
  pageNumber: number = 1;

  carList: Array<Car> = [];
  showFiller = false;
  constructor(
    private authService: AuthService,
    private firestoreService: AppointmentServiceService,
  ) { }



  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.getApps();
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

  getApps(){
    this.firestoreService.getAPP().subscribe( res => {
      this.citas = res;
    })
  }


}
