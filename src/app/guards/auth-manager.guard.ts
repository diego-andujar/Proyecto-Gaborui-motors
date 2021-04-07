import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerGuard implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UsersService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: any = JSON.parse(localStorage.getItem("CurrentUser") || '{}')
    if (user.rol.manager == true){
      return true;
    } else {
      alert("Usted no tiene permisos para entrar a esta seccion")
      return this.router.parseUrl("/");
    }
  }
}
