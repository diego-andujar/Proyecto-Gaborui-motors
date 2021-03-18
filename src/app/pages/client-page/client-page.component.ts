import { Appointment } from './../../models/appointment';
import { CarsService } from 'src/app/services/cars.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import firebase from "firebase";
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientAppointmentFormComponent } from 'src/app/components/client-appointment-form/client-appointment-form.component';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  carList: Array<Car> = [];
  userType: string = "client";
  user!: firebase.User;
  userDB!: User;
  newCar = false;
  appointmentsList: Array<Appointment>= [];
  lowValue: number = 0;
  highValue: number = 1;
  pageSize: number = 1;
  pageNumber: number = 1;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private authUsers: UsersService,
    private carService: CarsService,
    private appointService: AppointmentServiceService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carList = this.carService.getUserCars(user.uid)
      this.appointmentsList = this.appointService.getUserAppointments(user.uid);
    })
  }

  async onSubmit() {
    this.carList = this.authUsers.getUserCars(this.user.uid);
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

  newCarButton(){
    this.newCar = !this.newCar;
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "30%";
    this.dialog.open(ClientAppointmentFormComponent);
  }

  deleteApp(appointment: Appointment){
    this.appointService.deleteAppointment(appointment.appId);
    this.appointmentsList = this.appointService.getUserAppointments(localStorage.getItem("user"));
    alert("!Su cita ha sido eliminado con exito!\nPor favor refresque la pagina")
  }

}
