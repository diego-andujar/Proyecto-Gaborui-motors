import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-vista-gnrl-manager',
  templateUrl: './vista-gnrl-manager.component.html',
  styleUrls: ['./vista-gnrl-manager.component.scss']
})
export class VistaGnrlManagerComponent implements OnInit {
  username!:User;
  user!: firebase.User;
  userFire!: any;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })

    this.username=JSON.parse(localStorage.getItem("CurrentUser")!);
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser")!);
  }
  }


