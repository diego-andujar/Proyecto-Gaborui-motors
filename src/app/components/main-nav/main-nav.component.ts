import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Roles } from './../../models/roles';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import firebase from "firebase";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  user!: firebase.User;
  userFire!: User;
  isClient: boolean = false;
  isManager: boolean = false;
  isMechanic: boolean = false;
  isAdmin: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService, 
    private userService: UsersService, 
    private router: Router
    ) {}

  async ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
  }

  async getUser(){
    this.userFire = await JSON.parse(localStorage.getItem("CurrentUser")!);
    if (this.userFire.rol?.client){
      this.isClient = true;
    } if (this.userFire.rol?.manager){
      this.isManager = true;
    }
  }

  click(){
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser")!);
    console.log(this.userFire.rol);
    if(this.userFire.rol?.client){
      this.router.navigate(['/perfil', this.user.uid])
    } else if (this.userFire.rol?.manager){
      this.router.navigate(['/manager', this.user.uid])
    } else if (this.userFire.rol?.admin){
      this.router.navigate(['/admin', this.user.uid])
    } else if (this.userFire.rol?.mechanic){
      this.router.navigate(['/mechanic', this.user.uid])
    }
  }
  
  click2(){
    document.getElementById("quienes").scrollIntoView({behavior:"smooth"});
  }

  tocontact(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});
  }

  tomaps(){
    document.getElementById("maps").scrollIntoView({behavior:"smooth"});
  }

  async logOutUser(){
    await this.authService.logout();
    localStorage.removeItem("CurrentUser");
    this.router.navigate(["/"]);
  }
  
}
