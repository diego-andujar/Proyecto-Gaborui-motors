import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase";

@Component({
  selector: 'app-vista-gnrl-manager',
  templateUrl: './vista-gnrl-manager.component.html',
  styleUrls: ['./vista-gnrl-manager.component.scss']
})
export class VistaGnrlManagerComponent implements OnInit {

  user!: firebase.User;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
  }

}
