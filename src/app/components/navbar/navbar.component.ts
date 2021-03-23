import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: firebase.User;
  userFire!: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser") || "{}")
  }

  async logOutUser(){
    await this.authService.logout();
    this.router.navigate(["/"]);
  }

}
