import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { authService } from "src/app/ser"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: firebase.User = null;

  constructor() { }

  ngOnInit(): void {
    this.authService.getCurrentUser().suscribe((user) => (
      this.user = user;
    ))
  }

}
