import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UsersService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: any = JSON.parse(localStorage.getItem("CurrentUser")!)
    if (user.rol.admin == true){
      return true;
    } else {
      return this.router.parseUrl("/");
    }
  }
}
