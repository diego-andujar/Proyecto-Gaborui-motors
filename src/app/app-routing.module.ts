<<<<<<< HEAD
import { HomePageComponent } from './pages/home-page/home-page.component';
=======
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
>>>>>>> fuenmayor
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
<<<<<<< HEAD
  { path: "", component: HomePageComponent },
=======
  { path: "sign-up", component: SignUpPageComponent },
  { path: "log-in", component: LogInPageComponent },
  { path: "manager", component: ManagerPageComponent },
>>>>>>> fuenmayor
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
