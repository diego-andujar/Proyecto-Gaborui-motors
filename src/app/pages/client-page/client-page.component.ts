import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import firebase from "firebase";
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  carList: Array<Car> = [];
  user!: firebase.User;

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

  seeCars(){
    console.log("hola")
    this.carList = this.authUsers.getUserCars(this.user.uid);
    console.log(this.carList);
    
  }

  async onSubmit() {
    console.log("hola")
    this.carList = this.authUsers.getUserCars(this.user.uid);
    console.log(this.carList);
    
  }

}
