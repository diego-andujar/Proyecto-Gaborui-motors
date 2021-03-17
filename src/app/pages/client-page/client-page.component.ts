import { CarsService } from 'src/app/services/cars.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import firebase from "firebase";
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientAppointmentFormComponent } from 'src/app/components/client-appointment-form/client-appointment-form.component';

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

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private authUsers: UsersService,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carList = this.carService.getUserCars(user.uid)
      localStorage.setItem("UserCars", JSON.stringify(this.carService.getUserCars(user.uid)));
    })
    console.log("hola")
  }

  async onSubmit() {
    this.carList = this.authUsers.getUserCars(this.user.uid);
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

}
