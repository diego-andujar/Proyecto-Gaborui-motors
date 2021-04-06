import { FirestoreService } from './../../services/firestore.service';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { AuthService } from './../../services/auth.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../models/car';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from "firebase";
import { UsersService } from 'src/app/services/users.service';
import { Appointment } from 'src/app/models/appointment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  expandedElement!: Appointment | null;
  selectedValue!: string;

  lowValue: number = 0;
  highValue: number = 1;
  pageSize: number = 1;
  pageNumber: number = 1;

  selectedCar!: string;
  user!: firebase.User;
  userType: string = "manager";
  isLoading = true;
  carToUpdate!: Car;
  citas: Array<Appointment> = [];
  ordenes: Array<any> = [];
  dataSource = new MatTableDataSource<Appointment>(this.ordenes);
  uploadSuccess: EventEmitter<boolean> = new EventEmitter();

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

  reloadCalendar(event: boolean){
    if (event){
      this.uploadSuccess.emit(true);
    }
  }

  reloadOrders(event: boolean){
    if (event){
      this.appService.getTerminadaApp().then( res => {
        this.ordenes = res;
        this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
      });
    }
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getApps(){
    this.appService.getAPP().subscribe( res => {
      this.citas = res;
    })
  }

  getAppsToShow(num: number){
    if (num === 1){
      this.appService.getEnEsperaApp().then( res => {
        this.ordenes = res;
        this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
        if (this.ordenes.length < 1){
          this.ordenes.push(null);
          alert("No hay ordenes en espera actualmente")
        }
      })
    } else if (num === 2){
      this.appService.getEnProcesoApp().then( res => {
        this.ordenes = res;
        this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
        if (this.ordenes.length < 1){
          this.ordenes.push(null);
          alert("No hay ordenes en proceso actualmente")
        }
      })
    } else if (num === 3){
      this.appService.getTerminadaApp().then( res => {
        this.ordenes = res;
        this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
        if (this.ordenes.length < 1){
          this.ordenes.push(null);
          alert("No hay ordenes terminadas actualmente")
        }
      })
    } else if (num === 4){
      this.appService.getCerradaApp().then( res => {
        this.ordenes = res;
        this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
        if (this.ordenes.length < 1){
          this.ordenes.push(null);
          alert("No hay ordenes cerradas actualmente")
        }
      })
    }
  }

  getAppsOrders(){
    this.appService.getEnEsperaApp().then( res => {
      this.ordenes = res;
      this.dataSource = new MatTableDataSource<Appointment>(this.ordenes);
      if (res.length < 1){
        this.ordenes.push(null);
      }
    })
  }


}
