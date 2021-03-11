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
    this.createUser();
  }

  async onSubmit() {
    this.carList = this.authUsers.getUserCars(this.user.uid);
  }

  newCarButton(){
    this.newCar = !this.newCar;
  }

  createUser(){
    let userToCreate: firebase.User;
    this.authService.getCurrentUser().subscribe((user) => {
      user = user;
      const newUser: User = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
      if (!this.authUsers.userExits(user.uid)){
        this.authUsers.createNewUser(newUser);
      }
      
      /*this.authUsers.getUserByUid(user.uid).subscribe(user => {
        this.userDB = user;
      })*/
    })
  }

}
