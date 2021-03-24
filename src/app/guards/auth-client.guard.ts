import { User } from 'src/app/models/user';
import { User } from './../models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UsersService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: User = JSON.parse(localStorage.getItem("CurrentUser")!)
    console.log("tratando de entrar " + user.rol)
    if (user.rol!.client == true){
      return true;
    } else {
      return this.router.parseUrl("/");
    }
    
    
  }
}
