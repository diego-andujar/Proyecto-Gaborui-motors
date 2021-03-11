import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import firebase from "firebase";
import { User } from 'src/app/models/user';
import { userInfo } from 'node:os';

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
    private authService: AuthService,
    private authUsers: UsersService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.carList = this.authUsers.getUserCars(user.uid);
    })
  }

  async onSubmit() {
    this.carList = this.authUsers.getUserCars(this.user.uid);
  }

  newCarButton(){
    this.newCar = !this.newCar;
  }

}
