import { UsersService } from 'src/app/services/users.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
  
  private userId: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UsersService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.getCurrentUser().subscribe((user) => {
      this.userId = user.uid;
    })
    console.log(this.authService.isAuth())
    if (this.authService.isAuth()){
      return true;
    }
    return this.router.parseUrl("/log-in");
    
  }
}
