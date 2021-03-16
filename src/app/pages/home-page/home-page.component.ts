import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem("user"));
  }

}
